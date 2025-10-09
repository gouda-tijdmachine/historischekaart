import { defineStore } from 'pinia'

// TODO: Use live data to fill the different refs but also create menu items based on the input.
export const useFilterStore = defineStore('filter', () => {
  /**
   * State
   */
  const activeFilters = ref<Record<string, string> | undefined>()

  /**
   * Selected states
   */
  const searchTerm = ref<string>()
  const periodId = ref<string>()
  const streetId = ref<string>()
  const statusId = ref<string>()

  /**
   * Methods
   */
  const findById = (data: Ref, id: string) => {
    return data.find(item => item.id === id)
  }

  const updateFilters = () => {
    activeFilters.value = {
      searchTerm: unref(searchTerm),
      period: unref(periodId),
      street: findById(unref(streets), unref(streetId))?.title,
      status: findById(unref(statuses), unref(statusId))?.id,
    }
  }

  const resetFilters = () => {
    activeFilters.value = undefined
    searchTerm.value = ''
    periodId.value = unref(periods)[0].id
    streetId.value = unref(streets)[0].id
    statusId.value = unref(statuses)[0].id
  }

  /**
   * Mock data
   */
  const statuses = ref([
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

  const streets = ref([
    {
      id: 'all',
      title: 'Alle Straten',
      type: 'item',
    },
    {
      id: 'item-1',
      title: 'Markt',
      type: 'item',
    },
    {
      id: 'item-2',
      title: 'Achter de Kerk',
      type: 'item',
    },
    {
      id: 'item-3',
      title: 'NieuwHaven',
      type: 'item',
    },
    {
      id: 'item-4',
      title: 'Spieringstraat',
      type: 'item',
    },
    {
      id: 'item-5',
      title: 'Lange Groenendaal',
      type: 'item',
    },
    {
      id: 'item-6',
      title: 'Nieuwstraat',
      type: 'item',
    },
    {
      id: 'item-7',
      title: 'Oosthaven',
      type: 'item',
    },
    {
      id: 'item-8',
      title: 'Nieuwe Gouwe',
      type: 'item',
    },
    {
      id: 'item-9',
      title: 'Turfsingel',
      type: 'item',
    },
    {
      id: 'item-10',
      title: 'Blekerssingel',
      type: 'item',
    },
    {
      id: 'item-11',
      title: 'Korte Groenendaal',
      type: 'item',
    },
    {
      id: 'item-12',
      title: 'Westhaven',
      type: 'item',
    },
    {
      id: 'item-13',
      title: 'Kleiweg',
      type: 'item',
    },
    {
      id: 'item-14',
      title: 'Korte Tiendeweg',
      type: 'item',
    },
  ])

  const periods = ref([
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

  return {
    // State
    activeFilters,
    searchTerm,
    periodId,
    streetId,
    statusId,

    // Mock data
    statuses,
    streets,
    periods,

    // Methods
    updateFilters,
    resetFilters,
  }
})
