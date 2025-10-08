export {}

declare global {
  interface Tab {
    id: string
    label: string
    icon: string
  }

  interface Item {
    id: string
    type: string
    title: string
    subtitle?: string
    icon?: string
    tag?: string
  }

  interface Feature {
    type: 'Feature'
    properties: {
      title: string
      pid: string
      yearFrom: number
      id: string
      [key: string]: string | number
    }
    geometry: {
      type: 'Polygon' | 'Point' | 'LineString' | 'MultiPolygon' | 'MultiPoint' | 'MultiLineString'
      coordinates: number[][] | number[][][]
    }
  }

  interface FeatureCollection {
    type: 'FeatureCollection'
    features: Feature[]
  }

  interface Card {
    id: string
    address: string
    notes?: string
  }

  interface PropertyCard extends Card {
    title: string
    streetName: string
    yearBuilt: number
    yearDemolished?: number
  }

  interface PersonCard extends Card {
    name: string
    year: number
    buildingId: string
    relation: string
    source: string
  }
}

declare module 'click-outside-vue3' {
  const vClickOutside: any
  export default vClickOutside
}
