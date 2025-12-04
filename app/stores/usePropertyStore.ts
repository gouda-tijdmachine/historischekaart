import { defineStore } from 'pinia'

export const usePropertyStore = defineStore('property', () => {
  /**
   * Store dependencies
   */
  const filterStore = useFilterStore()

  /**
   * State
   */
  const selectedPropertyId = ref<string>()

  /**
   * Mock data
   * TODO: Use real data to replace this
   */
  const _properties = ref<PropertyCard[]>([])

  /**
   * Computed Properties
   */
  const properties = computed(() => {
    let filtered = unref(_properties)
    const searchTerm = unref(filterStore.activeFilters?.searchTerm)
    const street = unref(filterStore.activeFilters?.street)

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter((card: PropertyCard) => {
        const inTitle = card.title.toLowerCase().includes(term)
        const inStreet = findByStreetName(card, term)
        return inTitle || inStreet
      })
    }

    // Filter by period (disabled)
    // if (filterStore.activeFilters?.period && filterStore.activeFilters?.period !== 'all') {
    //   const [startYear, endYear] = filterStore.activeFilters.period.split('-').map(Number)
    //   filtered = filtered.filter(card =>
    //     card.yearBuilt >= startYear! && card.yearBuilt <= endYear!,
    //   )
    // }

    // Filter by streetName

    if (street && street !== 'all') {
      filtered = filtered.filter(card => card.streets.includes(street))
    }

    // Filter by status (disabled)
    // if (filterStore.activeFilters?.status && filterStore.activeFilters?.status !== 'all') {
    //   const hasYearDemolished = !!(filterStore.activeFilters.status === 'demolished')
    //   filtered = filtered.filter((card) => {
    //     const cardHasDemolishedDate = typeof card.yearDemolished !== 'undefined'
    //     return hasYearDemolished ? cardHasDemolishedDate : !cardHasDemolishedDate
    //   })
    // }

    return filtered
  })

  /**
   * Methods
   */
  const findByStreetName = (haystack: PropertyCard, needle: string) => {
    const index = unref(filterStore.streetIndex)
    const result = (haystack.streets || []).map((id: string) => {
      return index[id]
    })
      .filter(value => value)
      .flat()
      .find((value: string | undefined) => {
        return value?.toLowerCase().includes(needle)
      })
    return !!result
  }

  const fetchData = async () => {
    const data = await useCallApi('panden')
    if (data.aantal > 0 && Array.isArray(data.panden)) {
      _properties.value = data.panden.map((pand: PropertyResponse) => {
        const output: PropertyCard = {
          id: pand.identifier!,
          title: pand.naam!,
          streets: (pand.straten ?? []).map((street: StreetResponse) => street.identifier),
        }
        return output
      })
    }
  }

  const fetchDetails = async (id: string) => {
    const data = await useCallApi(`pand/${encodeURIComponent(id)}`)
    console.warn(data)
  }

  return {
    selectedPropertyId,
    properties,
    fetchData,
    fetchDetails,
  }
})
