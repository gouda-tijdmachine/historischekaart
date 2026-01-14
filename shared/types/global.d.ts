export {}

declare global {
  type tabType = 'property' | 'person' | 'image'
  type ItemType = 'group' | 'layer' | 'item' | 'label'

  interface EndpointType {
    icon: string
    details: string
    search: string
    label: string
  }

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
    description?: string
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
      maxZoom?: number
    }
    begin_year?: number
    end_year?: number
    alternatives?: string[]
  }

  interface Feature {
    type: 'Feature'
    properties: {
      identifier: string
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

  /**
   * Cards
   */
  interface Card {
    id: string
    title: string
    notes?: string
  }

  interface PropertyCard extends Card {
    streets: string[]
  }

  interface PersonCard extends Card {
    address?: string
    year: number
    buildingId?: string
    relation?: string
    source?: string
    profession: string
    propertyIds: string[]
  }

  interface ImageCard extends Card {
    thumbnail: string
    author: string
    year: number
    source: string
    streets: string[]
    propertyIds: string[]
  }

  /**
   * Search Responses
   */
  interface Response {
    identifier: string
  }

  interface StreetResponse extends Response {
    naam: string
    naam_alt?: string
  }

  interface PropertyResponse extends Response {
    naam: string
    straten: StreetResponse[]
  }

  interface PersonResponse extends Response {
    beroep: string
    datering: string
    naam: string
    pandidentifiers: string[]
  }

  interface PeriodResponse extends Response {
    naam: string
    naam_alt: string
    omschrijving?: string
    jaar_start: string
    jaar_einde: string
  }

  interface ImageResponse extends Response {
    titel: string
    thumbnail: string
    vervaardiger: string
    datering: string
    bronorganisatie: string
    straten: StreetResponse[]
    pandidentifiers: string[]
  }

  interface CloseByImageResponse extends Reponse {
    iiif_info_json: string
    thumbnail: string
    titel: string
  }

  /**
   * Detail Responses
   */
  interface PropertyDetailResponse {
    adressen: {
      type: 'StraatNummerAanduiding' | 'PlaatselijkeAanduiding'
      naam: string
      datering: string
      wijk: string
    }[]
    datering: string
    fotos: {
      identifier: string
      thumbnail: string
      titel: string
      datering: string
    }[]
    identifier: string
    naam: string
    personen: {
      beroep: string
      datering: string
      identifier: string
      naam: string
    }[]
  }

  interface PersonDetailResponse {
    identifier: string
    naam: string
    geboortedatum: string
    geboorteplaats: string
    overlijdensdatum: string
    overlijdensplaats: string
    leeftijd: string
    beroep: string
    panden: {
      identifier: string
      naam: string
      bron: {
        naam: string
        naam_kort: string
        datering: string
        url: string
      }
    }[]
  }

  interface ImageDetailResponse {
    identifier: string
    titel: string
    image: string
    thumbnail: string
    iiif_info_json: string
    vervaardiger: string
    informatie_auteursrechten: string
    url: string
    datering: string
    bronbronorganisatie: string
    straten: {
      identifier: string
      naam: string
    }[]
    panden: {
      identifier: string
      naam: string
      straten: string[]
    }[]
    fotos_dichtbij: CloseByImageResponse[]
  }
}
