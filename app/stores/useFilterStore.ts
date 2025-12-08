import { defineStore } from 'pinia'

// TODO: Use live data to fill the different refs but also create menu items based on the input.
export const useFilterStore = defineStore('filter', () => {
  /**
   * Constants
   */
  const endpoints: Record<tabType, EndpointType> = {
    property: {
      icon: 'lucide:house',
      details: 'pand',
      search: 'panden',
    },
    person: {
      icon: 'lucide:user',
      details: 'persoon',
      search: 'personen',
    },
    image: {
      icon: 'lucide:image',
      details: 'foto',
      search: 'fotos',
    },
  }

  /**
   * State
   */
  const currentYear = ref<number>(1430)
  const geoJsonData = ref<FeatureCollection>()
  const streets = ref<Item[]>([])
  const periods = ref<Item[]>([])
  const selectedId = ref<string>()
  const selectedType = ref<tabType>()
  const selectedTitle = ref<string>()

  /**
   * Computed Properties
   */
  const currentHistoricalPeriod = computed<string>(() => {
    const activePeriod = periods
      .value
      .find(period =>
        period.begin_year && period.end_year
        && currentYear.value >= period.begin_year
        && currentYear.value <= period.end_year,
      )
    return activePeriod ? activePeriod.title : ''
  })

  /**
   * Methods
   */
  const initializeData = async () => {
    // Fetch the street data
    const streetData = await useCallApi('straten')
    if (Array.isArray(streetData)) {
      const streetOptions = [{
        type: 'item',
        id: 'all',
        title: 'Alle Straten',
      } as Item]

      streetOptions.push(...streetData.map((street: StreetResponse) => {
        return {
          type: 'item',
          id: street.identifier,
          title: street.naam,
          alternatives: street.naam_alt?.split(', '),
        } as Item
      }))

      streets.value = streetOptions
    }

    // Fetch the periods
    const data = await useCallApi('tijdvakken')
    if (Array.isArray(data)) {
      const periodOptions = [{
        type: 'item',
        id: 'all',
        title: 'Alle Perioden',
      } as Item]

      periodOptions.push(...data.map((period: PeriodResponse) => {
        return {
          type: 'item',
          id: period.identifier,
          title: period.naam,
          begin_year: parseInt(period.jaar_start, 10),
          end_year: parseInt(period.jaar_einde, 10),
        } as Item
      }))

      periods.value = periodOptions
    }
  }

  const findStreetNamesByID = (ids: string[]) => {
    return unref(streets)
      .filter((street) => {
        return ids.includes(street.id)
      })
      .map((street) => {
        return street.title
      })
  }

  const updateSelected = (type: tabType, id: string, title: string) => {
    selectedId.value = id
    selectedType.value = type
    selectedTitle.value = title
  }

  const resetSelected = () => {
    selectedId.value = undefined
    selectedType.value = undefined
    selectedTitle.value = undefined
  }

  const fetchGeoJson = async (year: number) => {
    geoJsonData.value = await useCallApi(`pandgeometrieen/${year}`)
  }

  const fetchSearch = async (type: tabType, params: Record<string, string | number>) => {
    const translationIndex: Record<string, string> = {
      searchTerm: 'q',
      periodId: 'tijdvak',
      streetId: 'straat',
      limit: 'limit',
      offset: 'offset',
    }

    const urlParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== 'all' && translationIndex[key] !== undefined) {
        urlParams.append(translationIndex[key], String(value))
      }
    })
    const queryString = urlParams.toString()
    const endpoint = endpoints[type].search
    const url = queryString ? `${endpoint}?${queryString}` : endpoint
    return await useCallApi(url)
  }

  const fetchDetails = async () => {
    const id = unref(selectedId)
    const type = unref(selectedType)

    if (id && type) {
      const endpoint = endpoints[type].details
      return await useCallApi(`${endpoint}/${encodeURIComponent(id)}`)
    }
    return false
  }

  // TODO: Check if this is actually useful, either remove or implement it everywhere
  const iconName = (type: tabType) => {
    return endpoints[type].icon
  }

  return {
    // State
    currentHistoricalPeriod,
    currentYear,
    geoJsonData,
    selectedId,
    selectedTitle,
    selectedType,

    // Data
    periods,
    streets,

    // Methods
    fetchDetails,
    fetchGeoJson,
    fetchSearch,
    findStreetNamesByID,
    iconName,
    initializeData,
    resetSelected,
    updateSelected,
  }
})
