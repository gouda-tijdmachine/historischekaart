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
    begin_year?: number
    end_year?: number
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
    address?: string
    year: number
    buildingId?: string
    relation?: string
    source?: string
    profession: string
    propertyIds: string[]
  }

  interface ImageCard extends Card {
    title: string
    thumbnail: string
    author: string
    year: number
    source: string
    streets: string[]
    propertyIds: string[]
  }

  interface StreetResponse {
    identifier: string
    naam: string
    naam_alt?: string
  }

  interface PropertyResponse {
    identifier: string
    naam: string
    straten: StreetResponse[]
  }

  interface PersonResponse {
    identifier: string
    beroep: string
    datering: string
    naam: string
    pandidentifiers: string[]
  }

  interface PeriodResponse {
    identifier: string
    naam: string
    omschrijving?: string
    jaar_start: string
    jaar_einde: string
  }

  interface ImageResponse {
    identifier: string
    titel: string
    thumbnail: string
    vervaardiger: string
    datering: string
    bronorganisatie: string
    straten: StreetResponse[]
    pandidentifiers: string[]
  }
}
