import { defineStore } from 'pinia'

// TODO: Use live data to fill the different refs but also create menu items based on the input.
export const useFilterStore = defineStore('filter', () => {
  /**
   * State
   */
  const activeFilters = ref<Record<string, string | undefined> | undefined>()
  const geoJsonData = ref<FeatureCollection>()

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
   * Selected states
   */
  const searchTerm = ref<string>()
  const periodId = ref<string>()
  const streetId = ref<string>()
  const currentYear = ref<number>(1430)

  /**
   * Selected item
   */
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

  const streetIndex = computed<Record<string, string[]>>(() => {
    return unref(streets).reduce((prev: Record<string, string[]>, current: Item) => {
      prev[current.id] = [current.title, ...(current.alternatives ?? [])]
      return prev
    }, {})
  })

  /**
   * Methods
   */
  const findById = (data: Item[], id?: string) => {
    return data.find(item => item.id === id)
  }

  const updateFilters = () => {
    activeFilters.value = {
      searchTerm: unref(searchTerm),
      period: unref(periodId),
      street: unref(streetId),
    }
  }

  const resetFilters = () => {
    activeFilters.value = undefined
    searchTerm.value = ''
    periodId.value = unref(periods)[0]!.id
    streetId.value = unref(streets)[0]!.id
  }

  const streets = ref<Item[]>([])

  const periods = ref<Item[]>([])

  /**
   * Methods
   */
  const fetchData = async () => {
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

  const fetchSearch = async (type: tabType, offset: number = 0, limit: number = 10) => {
    // construct the url params
    const params = {
      q: searchTerm.value,
      tijdvak: periodId.value,
      straat: streetId.value,
      limit,
      offset,
    }

    const urlParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== 'all') {
        urlParams.append(key, String(value))
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

  const iconName = (type: tabType) => {
    return endpoints[type].icon
  }

  return {
    // State
    activeFilters,
    searchTerm,
    periodId,
    streetId,
    currentYear,
    currentHistoricalPeriod,

    streetIndex,

    // Mock data
    streets,
    periods,

    // Methods
    updateFilters,
    resetFilters,
    fetchData,
    findStreetNamesByID,

    // New
    geoJsonData,
    selectedId,
    selectedType,
    selectedTitle,
    updateSelected,
    resetSelected,
    fetchGeoJson,
    fetchSearch,
    fetchDetails,
    iconName,
  }
})
