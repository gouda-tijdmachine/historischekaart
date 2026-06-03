import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', () => {
  /**
   * Constants
   */
  const endpoints: Record<tabType, EndpointType> = {
    property: {
      icon: 'lucide:house',
      details: 'pand',
      search: 'panden',
      label: 'Panden',
    },
    person: {
      icon: 'lucide:user',
      details: 'persoon',
      search: 'personen',
      label: 'Personen',
    },
    image: {
      icon: 'lucide:image',
      details: 'foto',
      search: 'fotos',
      label: 'Plaatjes',
    },
  }

  /**
   * State
   */
  const currentYear = ref<number>(1550)
  const geoJsonData = ref<FeatureCollection>()
  const streets = ref<Item[]>([])
  const periods = ref<Item[]>([])
  const selectedId = ref<string>()
  const selectedType = ref<tabType>('property')
  const parentEntry = ref<{ type: tabType, id: string }>()
  const additionalHighlights = ref<any[]>([])
  const route = useRoute()

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

  const tabConfig = computed<Tab[]>(() => {
    return Object.entries(endpoints).map(([key, value]) => ({
      id: key as tabType,
      label: value.label,
      icon: value.icon,
    }))
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
        title: 'Alle straten',
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
        title: 'Alle tijdvakken',
      } as Item]

      periodOptions.push(...data.map((period: PeriodResponse) => {
        return {
          type: 'item',
          id: period.identifier,
          title: period.naam,
          tag: period.naam_alt,
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

  const updateSelected = async (type: tabType, id: string) => {
    // Store the previous value in the parent Entry
    if (selectedId.value && selectedType.value) {
      parentEntry.value = { type: selectedType.value, id: selectedId.value }
    }

    await navigateTo({ path: '/', query: {
      type,
    }, hash: `#${id}` })
  }

  const resetSelected = () => {
    parentEntry.value = undefined
    additionalHighlights.value = []
    navigateTo('/')
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

  const fetchDetails = async (type?: tabType, id?: string) => {
    id = id ?? unref(selectedId)
    type = type ?? unref(selectedType)

    if (id && type) {
      const endpoint = endpoints[type].details
      return await useCallApi(`${endpoint}/${encodeURIComponent(id)}`)
    }
    return false
  }

  const iconName = (type: tabType) => {
    return endpoints[type].icon
  }

  const handleRouteUpdate = () => {
    selectedType.value = typeof route.query.type === 'string' ? route.query.type as tabType : 'property'
    selectedId.value = (route.hash ?? '').replace('#', '')
  }

  return {
    // State
    currentHistoricalPeriod,
    currentYear,
    geoJsonData,
    selectedId,
    selectedType,
    tabConfig,

    // Data
    periods,
    streets,
    parentEntry,
    additionalHighlights,

    // Methods
    handleRouteUpdate,
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
