import { defineStore } from 'pinia'

// TODO: Use live data to fill the different refs but also create menu items based on the input.
export const useFilterStore = defineStore('filter', () => {
  /**
   * State
   */
  const activeFilters = ref<Record<string, string | undefined> | undefined>()
  const geoJsonData = ref<FeatureCollection>()

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
  const selectedType = ref<string>()
  const selectedId = ref<string>()

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

  const updateSelected = (type: string, id: string) => {
    selectedId.value = id
    selectedType.value = type
  }

  const fetchGeoJson = async (year: number) => {
    geoJsonData.value = await useCallApi(`pandgeometrieen/${year}`)
  }

  const fetchSearch = async (endpoint: string, offset: number = 0, limit: number = 10) => {
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
    const url = queryString ? `${endpoint}?${queryString}` : endpoint
    return await useCallApi(url)
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
    updateSelected,
    fetchGeoJson,
    fetchSearch,
  }
})
