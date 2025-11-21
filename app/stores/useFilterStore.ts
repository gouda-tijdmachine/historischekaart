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
    const activePeriod = historicalPeriods
      .slice()
      .reverse()
      .find(period => currentYear.value >= period.year)
    return activePeriod ? activePeriod.description : ''
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

  /**
   * Mock data
   */
  const historicalPeriods = [
    { year: 1400, label: '1400', description: 'Late Middeleeuwen' },
    { year: 1500, label: '1500', description: 'Renaissance' },
    { year: 1600, label: '1600', description: 'Gouden Eeuw begin' },
    { year: 1650, label: '1650', description: 'Gouden Eeuw hoogtij' },
    { year: 1700, label: '1700', description: 'Achttiende eeuw' },
    { year: 1800, label: '1800', description: 'Franse tijd' },
    { year: 1850, label: '1850', description: 'Negentiende eeuw' },
    { year: 1900, label: '1900', description: 'Industrialisatie' },
    { year: 1950, label: '1950', description: 'Wederopbouw' },
    { year: 2000, label: '2000', description: 'Hedendaags' },
  ]

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

  const periods = ref<Item[]>([
    {
      id: 'all',
      title: 'Alle perioden',
      type: 'item',
    },
    {
      id: '1400-1600',
      title: 'Middeleeuwen/Renaissance (1400-1600)',
      type: 'item',
    },
    {
      id: '1600-1700',
      title: '17e eeuw (1600-1700)',
      type: 'item',
    },
    {
      id: '1700-1800',
      title: '18e eeuw (1700-1800)',
      type: 'item',
    },
    {
      id: '1800-1850',
      title: 'Vroeg 19e eeuw (1800-1850)',
      type: 'item',
    },
    {
      id: '1850-1900',
      title: 'Laat 19e eeuw (1850-1900)',
      type: 'item',
    },
    {
      id: '1900-1950',
      title: 'Vroeg 20e eeuw (1900-1950)',
      type: 'item',
    },
  ])

  /**
   * Methods
   */
  const fetchData = async () => {
    // Fetch the street data
    const data = await useCallApi('straten')
    if (Array.isArray(data)) {
      const options = [{
        type: 'item',
        id: 'all',
        title: 'Alle Straten',
      } as Item]

      options.push(...data.map((street: StreetResponse) => {
        return {
          type: 'item',
          id: street.identifier,
          title: street.naam,
          alternatives: street.naam_alt?.split(', '),
        } as Item
      }))

      streets.value = options
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
