export {}

declare global {
  type tabType = 'property' | 'person' | 'image'
  type ItemType = 'group' | 'layer' | 'item' | 'label'

  interface Tab {
    id: string
    label: string
    icon: string
  }

  interface Item {
    id: string
    title: string
    type: ItemType
    subtitle?: string
    icon?: string
    tag?: string
    layerConfig?: {
      type: 'tile' | 'wms'
      url: string
      layers?: string
      version?: string
      attribution: string
      format?: string
      transparent?: boolean
    }
    alternatives?: string[]
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
    notes?: string
  }

  interface PropertyCard extends Card {
    title: string
    streets: string[]
  }

  interface PersonCard extends Card {
    name: string
    address: string
    year: number
    buildingId: string
    relation: string
    source: string
  }

  interface StreetResponse {
    identifier: string
    naam: string
    naam_alt: string
  }

  interface PandResponse {
    identifier: string
    naam: string
    straten: StreetResponse[]
  }

}
