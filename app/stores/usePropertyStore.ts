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
  const data = ref<PropertyCard[]>([
    {
      id: 'building-1',
      title: 'Het Stadshuis',
      address: 'Verponding No. 156',
      streetName: 'Markt',
      yearBuilt: 1459,
      notes: 'Gotisch stadhuis, later verbouwd in renaissancestijl',
    },
    {
      id: 'building-2',
      title: 'Sint-Janskerk',
      address: 'Verponding No. 1',
      streetName: 'Achter de Kerk',
      yearBuilt: 1485,
      notes: 'Laat-gotische kruiskerk, langste kerk van Nederland',
    },
    {
      id: 'building-3',
      title: 'De Goudse Waag',
      address: 'Verponding No. 234',
      streetName: 'NieuwHaven',
      yearBuilt: 1668,
      notes: 'Classicistisch weeggebouw door Pieter Post',
    },
    {
      id: 'building-4',
      title: 'Gasthuis',
      address: 'Verponding No. 89',
      streetName: 'Spieringstraat',
      yearBuilt: 1592,
      yearDemolished: 1886,
      notes: 'Voormalig gasthuis, later armenvoorziening',
    },
  ])

  const properties = computed(() => {
    let filtered = unref(data)

    // Filter by search term
    if (filterStore.activeFilters?.searchTerm) {
      const term = filterStore.activeFilters.searchTerm.toLowerCase()
      filtered = filtered.filter(card =>
        card.title.toLowerCase().includes(term)
        || card.address.toLowerCase().includes(term)
        || card.streetName.toLowerCase().includes(term),
      )
    }

    // Filter by period
    if (filterStore.activeFilters?.period && filterStore.activeFilters?.period !== 'all') {
      const [startYear, endYear] = filterStore.activeFilters.period.split('-').map(Number)
      filtered = filtered.filter(card =>
        card.yearBuilt >= startYear && card.yearBuilt <= endYear,
      )
    }

    // Filter by streetName

    if (filterStore.activeFilters?.street && filterStore.activeFilters?.street !== 'Alle Straten') {
      filtered = filtered.filter(card => card.streetName === filterStore.activeFilters.street)
    }

    // Filter by status
    if (filterStore.activeFilters?.status && filterStore.activeFilters?.status !== 'all') {
      const hasYearDemolished = !!(filterStore.activeFilters.status === 'demolished')
      filtered = filtered.filter((card) => {
        const cardHasDemolishedDate = typeof card.yearDemolished !== 'undefined'
        return hasYearDemolished ? cardHasDemolishedDate : !cardHasDemolishedDate
      })
    }

    return filtered
  })

  return {
    selectedPropertyId,
    properties,
  }
})
