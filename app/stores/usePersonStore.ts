import { defineStore } from 'pinia'

export const usePersonStore = defineStore('person', () => {
  /**
   * Store dependencies
   */
  const filterStore = useFilterStore()

  /**
   * State
   */
  const selectedPersonId = ref<string>()

  /**
   * Mock data
   * TODO: Use real data to replace this
   */
  const data = ref<PersonCard[]>([
    {
      id: '1',
      name: 'Gerrit Corneliszoon',
      year: 1701,
      address: 'Wijk A No. 23',
      buildingId: 'building-1',
      relation: 'huurder',
      source: 'Belastingregister',
    },
    {
      id: '2',
      name: 'Neeltje van der Pol',
      year: 1705,
      address: 'Westhaven 18',
      buildingId: 'building-2',
      relation: 'persoon',
      source: 'Lidmatenboek',
    },
    {
      id: '3',
      name: 'Adriaan de Vries',
      year: 1712,
      address: 'Kleiweg 28-30',
      buildingId: 'building-2',
      relation: 'eigenaar',
      source: 'Kadaster',
      notes: 'Eigenaar volgens vroege kadastrale aantekeningen',
    },
    {
      id: '4',
      name: 'Grietje Hendriksdochter',
      year: 1718,
      address: 'Nieuwe Gouwe 45',
      buildingId: 'building-3',
      relation: 'persoon',
      source: 'Doopboek',
    },
    {
      id: '5',
      name: 'Cornelis van Houten',
      year: 1725,
      address: 'Wijk C No. 8',
      buildingId: 'building-4',
      relation: 'huurder',
      source: 'Gilderegister',
    },
  ])

  const people = computed(() => {
    let filtered = unref(data)

    // Filter by search term
    if (filterStore.activeFilters?.searchTerm) {
      const term = filterStore.activeFilters.searchTerm.toLowerCase()
      filtered = filtered.filter(card =>
        card.name.toLowerCase().includes(term)
        || card.address.toLowerCase().includes(term),
      )
    }

    // Filter by period
    if (filterStore.activeFilters?.period && filterStore.activeFilters?.period !== 'all') {
      const [startYear, endYear] = filterStore.activeFilters.period.split('-').map(Number)
      filtered = filtered.filter(card =>
        card.year >= startYear && card.year <= endYear,
      )
    }

    // Filter by streetName
    // TODO: Fix this, Mock data doesn't support this, turning it off on purpose
    if (filterStore.activeFilters.type === 'disabled' && filterStore.activeFilters?.street && filterStore.activeFilters?.street !== 'Alle Straten') {
      filtered = filtered.filter(card => card.address.contains(filterStore.activeFilters.street))
    }

    return filtered
  })

  return {
    selectedPersonId,
    people,
  }
})
