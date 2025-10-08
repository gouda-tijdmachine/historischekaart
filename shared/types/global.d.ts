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
}

declare module 'click-outside-vue3' {
  const vClickOutside: any
  export default vClickOutside
}
