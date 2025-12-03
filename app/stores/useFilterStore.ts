import { defineStore } from 'pinia'

// TODO: Use live data to fill the different refs but also create menu items based on the input.
export const useFilterStore = defineStore('filter', () => {
  /**
   * State
   */
  const activeFilters = ref<Record<string, string | undefined> | undefined>()

  /**
   * Selected states
   */
  const searchTerm = ref<string>()
  const periodId = ref<string>()
  const streetId = ref<string>()
  const statusId = ref<string>()
  const currentYear = ref<number>(1430)

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
      status: findById(unref(statuses), unref(statusId))?.id,
    }
  }

  const resetFilters = () => {
    activeFilters.value = undefined
    searchTerm.value = ''
    periodId.value = unref(periods)[0]!.id
    streetId.value = unref(streets)[0]!.id
    statusId.value = unref(statuses)[0]!.id
  }

  const statuses = ref<Item[]>([
    {
      id: 'all',
      title: 'Alle statussen',
      type: 'item',
    },
    {
      id: 'demolished',
      title: 'Gesloopt',
      type: 'item',
    },
    {
      id: 'existing',
      title: 'Bestaand',
      type: 'item',
    },
  ])

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

  return {
    // State
    activeFilters,
    searchTerm,
    periodId,
    streetId,
    statusId,
    currentYear,
    currentHistoricalPeriod,

    streetIndex,

    // Mock data
    statuses,
    streets,
    periods,

    // Methods
    updateFilters,
    resetFilters,
    fetchData,
    findStreetNamesByID,
  }
})
