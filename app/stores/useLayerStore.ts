import { defineStore } from 'pinia'

export const useLayerStore = defineStore('layer', () => {
  /**
   * State
   */
  const token = useRuntimeConfig().public.token
  const selectedLayerId = ref<string>('knaw-huc')
  const proxyUrl = 'https://www.goudatijdmachine.nl/omeka/map-proxy/?url='

  // Mock data
  const layers = ref<Item[]>([
    // Base maps
    {
      id: 'base-maps',
      title: 'Basiskaarten',
      type: 'group',
    },
    {
      id: 'openstreetmap',
      title: 'Open Streetmap',
      type: 'layer',
      subtitle: 'Open-source kaart',
      icon: 'lucide:map',
      tag: '2024',
      layerConfig: {
        type: 'tile',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    },
    {
      id: 'mapbox-light',
      title: 'Mapbox Light',
      type: 'layer',
      subtitle: 'Lichte kaartweergave',
      icon: 'lucide:map',
      tag: '2024',
      layerConfig: {
        type: 'tile',
        url: `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=${token}`,
        attribution: '&copy; <a href="https://www.mapbox.com/feedback/">Mapbox</a>',
      },
    },
    {
      id: 'mapbox-monochrome',
      title: 'Mapbox MonochromeLightBlue',
      type: 'layer',
      subtitle: 'Monochrome blauwe kaart',
      icon: 'lucide:map',
      tag: '2024',
      layerConfig: {
        type: 'tile',
        url: `https://api.mapbox.com/styles/v1/goudatijdmachine/ckxeio7ei0yr414mxuznqj3hw/tiles/{z}/{x}/{y}?access_token=${token}`,
        attribution: '&copy; <a href="https://www.mapbox.com/feedback/">Mapbox</a>',
      },
    },

    // Historical maps
    {
      id: 'historische-kaarten',
      title: 'Historische kaarten',
      type: 'group',
    },
    {
      id: 'jacob-van-deventer-1572',
      title: 'Jacob van Deventer',
      type: 'layer',
      subtitle: 'Vroegste stadsplattegrond',
      icon: 'lucide:building',
      tag: '1572',
      layerConfig: {
        type: 'wms',
        url: `${proxyUrl}https://gis.gouda.nl/geoserver/CHRASTER/wms?`,
        layers: 'Jacob_van_Deventer',
        transparent: true,
        attribution: '<a href="https://gis.gouda.nl">Gemeente Gouda</a>',
      },
    },
    {
      id: 'braun-hogenberg-1585',
      title: 'Braun en Hogenberg',
      type: 'layer',
      subtitle: 'Historische stadsafbeelding',
      icon: 'lucide:building',
      tag: '1585',
      layerConfig: {
        type: 'wms',
        url: `${proxyUrl}https://gis.gouda.nl/geoserver/CHRASTER/wms?`,
        layers: 'braun_hogenberg',
        transparent: true,
        attribution: '<a href="https://gis.gouda.nl">Gemeente Gouda</a>',
      },
    },
    // {
    //   id: 'kadastrale-kaart-1613',
    //   title: 'Kadastrale kaart 1613',
    //   type: 'layer',
    //   subtitle: 'Vroege kadastrale opname',
    //   icon: 'lucide:calendar',
    //   tag: '1613',
    //   layerConfig: {
    //     type: 'wms',
    //     url: `${proxyUrl}https://gis.gouda.nl/geoserver/CHRASTER/wms`,
    //     layers: 'Kadastrale_kaart_1613',
    //     transparent: true,
    //     attribution: '<a href="https://gis.gouda.nl">Gemeente Gouda</a>',
    //   },
    // },
    {
      id: 'blaeu-1649',
      title: 'Blaeu',
      type: 'layer',
      subtitle: 'Historische stadsplattegrond',
      icon: 'lucide:building',
      tag: '1649',
      layerConfig: {
        type: 'wms',
        url: `${proxyUrl}https://gis.gouda.nl/geoserver/CHRASTER/wms?`,
        layers: 'StadsplattegrondBlaeu1649',
        transparent: true,
        attribution: '<a href="https://gis.gouda.nl">Gemeente Gouda</a>',
      },
    },
    // {
    //   id: 'minuutplannen-1832',
    //   title: 'Gecombineerde minuutplannen 1832',
    //   type: 'layer',
    //   subtitle: 'Kadastrale minuutplannen',
    //   icon: 'lucide:calendar',
    //   tag: '1832',
    //   layerConfig: {
    //     type: 'tile',
    //     url: 'https://mapwarper.net/maps/tile/62081/{z}/{x}/{y}.png',
    //     transparent: true,
    //     attribution: '<a href="https://www.goudatijdmachine.nl">Gouda Tijdmachine</a>',
    //   },
    // },
    {
      id: 'knaw-huc',
      title: 'Minuutplans',
      type: 'layer',
      subtitle: 'HISGIS',
      icon: 'lucide:map',
      tag: '1832',
      layerConfig: {
        type: 'tile',
        url: `https://tileserver.huc.knaw.nl/{z}/{x}/{y}`,
        attribution: 'KNAW / HUC',
      },
    },
    {
      id: 'kadastrale-kaart-1832',
      title: 'Kadastrale kaart',
      type: 'layer',
      subtitle: 'Eerste kadastrale opname',
      icon: 'lucide:calendar',
      tag: '1832',
      layerConfig: {
        type: 'wms',
        url: `${proxyUrl}https://gis.gouda.nl/geoserver/CHRASTER/wms?`,
        layers: 'Kadastrale_kaart_1832',
        transparent: true,
        attribution: '<a href="https://gis.gouda.nl">Gemeente Gouda</a>',
      },
    },
    // {
    //   id: 'tmk-kleur-1850',
    //   title: 'Topografische Kaart 1850 (TMK Kleur)',
    //   type: 'layer',
    //   subtitle: 'Militaire kaart in kleur',
    //   icon: 'lucide:calendar',
    //   tag: '1850',
    //   layerConfig: {
    //     type: 'wms',
    //     url: 'https://geo.rug.nl/image/services/HistorischeKaarten/TMK_Kleur/ImageServer/WMSServer',
    //     layers: '0',
    //     transparent: true,
    //     attribution: '<a href="https://geo.rug.nl/portal/home/">Universiteit Groningen</a>',
    //   },
    // },
    // {
    //   id: 'tmk-grijs-1850',
    //   title: 'Topografische Kaart 1850 (TMK Z/W)',
    //   type: 'layer',
    //   subtitle: 'Militaire kaart zwart/wit',
    //   icon: 'lucide:calendar',
    //   tag: '1850',
    //   layerConfig: {
    //     type: 'wms',
    //     url: 'https://geo.rug.nl/image/services/HistorischeKaarten/TMKZwartWit/ImageServer/WMSServer',
    //     layers: '0',
    //     transparent: true,
    //     attribution: '<a href="https://geo.rug.nl/portal/home/">Universiteit Groningen</a>',
    //   },
    // },
    // {
    //   id: 'bonnebladen-1865',
    //   title: 'Bonnebladen 1865',
    //   type: 'layer',
    //   subtitle: 'Topografische kaart 19e eeuw',
    //   icon: 'lucide:calendar',
    //   tag: '1865',
    //   layerConfig: {
    //     type: 'wms',
    //     url: 'https://geo.rug.nl/image/services/HistorischeKaarten/Bonnebladen/ImageServer/WMSServer',
    //     layers: '0',
    //     transparent: true,
    //     attribution: '<a href="https://geo.rug.nl/portal/home/">Universiteit Groningen</a>',
    //   },
    // },

    // Aerial photos
    {
      id: 'luchtfotos',
      title: 'Luchtfoto\'s',
      type: 'group',
    },
    {
      id: 'lufo-1977',
      title: 'Luchtfoto',
      type: 'layer',
      subtitle: '',
      icon: 'lucide:camera',
      tag: '1977',
      layerConfig: {
        type: 'wms',
        url: `${proxyUrl}https://gis.gouda.nl/geoserver/RASTER/wms?`,
        layers: 'Lufo_1977_Binnenstad',
        transparent: true,
        attribution: '<a href="https://gis.gouda.nl">Gemeente Gouda</a>',
      },
    },
    {
      id: 'lufo-1987',
      title: 'Luchtfoto',
      type: 'layer',
      subtitle: '',
      icon: 'lucide:camera',
      tag: '1987',
      layerConfig: {
        type: 'wms',
        url: `${proxyUrl}https://gis.gouda.nl/geoserver/RASTER/wms?`,
        layers: 'Lufo_1987_Binnenstad',
        transparent: true,
        attribution: '<a href="https://gis.gouda.nl">Gemeente Gouda</a>',
      },
    },
    {
      id: 'lufo-2005',
      title: 'Luchtfoto',
      type: 'layer',
      subtitle: '',
      icon: 'lucide:camera',
      tag: '2005',
      layerConfig: {
        type: 'wms',
        url: `${proxyUrl}https://gis.gouda.nl/geoserver/Luchtfoto/wms?`,
        layers: 'lufo_2005',
        transparent: true,
        attribution: '<a href="https://gis.gouda.nl">Gemeente Gouda</a>',
      },
    },
    {
      id: 'lufo-2010',
      title: 'Luchtfoto',
      type: 'layer',
      subtitle: '',
      icon: 'lucide:camera',
      tag: '2010',
      layerConfig: {
        type: 'wms',
        url: `${proxyUrl}https://gis.gouda.nl/geoserver/Luchtfoto/wms?`,
        layers: 'lufo_2010',
        transparent: true,
        attribution: '<a href="https://gis.gouda.nl">Gemeente Gouda</a>',
      },
    },
    {
      id: 'lufo-2015',
      title: 'Luchtfoto',
      type: 'layer',
      subtitle: '',
      icon: 'lucide:camera',
      tag: '2015',
      layerConfig: {
        type: 'wms',
        url: `${proxyUrl}https://gis.gouda.nl/geoserver/Luchtfoto/wms?`,
        layers: 'lufo_2015',
        transparent: true,
        attribution: '<a href="https://gis.gouda.nl">Gemeente Gouda</a>',
      },
    },
    {
      id: 'lufo-2021',
      title: 'Luchtfoto',
      type: 'layer',
      subtitle: '',
      icon: 'lucide:camera',
      tag: '2021',
      layerConfig: {
        type: 'wms',
        url: 'https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0?',
        layers: '2021_orthoHR',
        attribution: '<a href="https://www.pdok.nl/">PDOK</a>',
      },
    },
    // {
    //   id: 'lufo-2022',
    //   title: 'Luchtfoto 2022',
    //   type: 'layer',
    //   subtitle: 'PDOK luchtfoto 2022',
    //   icon: 'lucide:camera',
    //   tag: '2022',
    //   layerConfig: {
    //     type: 'wms',
    //     url: 'https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0',
    //     layers: '2022_orthoHR',
    //     attribution: '<a href="https://www.pdok.nl/">PDOK</a>',
    //   },
    // },
    // {
    //   id: 'lufo-2023',
    //   title: 'Luchtfoto 2023',
    //   type: 'layer',
    //   subtitle: 'PDOK luchtfoto 2023',
    //   icon: 'lucide:camera',
    //   tag: '2023',
    //   layerConfig: {
    //     type: 'wms',
    //     url: 'https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0',
    //     layers: '2023_orthoHR',
    //     attribution: '<a href="https://www.pdok.nl/">PDOK</a>',
    //   },
    // },
    {
      id: 'lufo-2024',
      title: 'Luchtfoto',
      type: 'layer',
      subtitle: '',
      icon: 'lucide:camera',
      tag: '2024',
      layerConfig: {
        type: 'wms',
        url: 'https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0?',
        layers: '2024_orthoHR',
        attribution: '<a href="https://www.pdok.nl/">PDOK</a>',
      },
    },

    // // Data layers
    // {
    //   id: 'data-lagen',
    //   title: 'Data lagen',
    //   type: 'group',
    // },
    // {
    //   id: 'rijksmonumenten',
    //   title: 'Rijksmonumenten',
    //   type: 'layer',
    //   subtitle: 'Beschermde rijksmonumenten',
    //   icon: 'lucide:landmark',
    //   tag: '2024',
    //   layerConfig: {
    //     type: 'wms',
    //     url: `${proxyUrl}https://gis.gouda.nl/geoserver/Bouwen/wms`,
    //     layers: 'Rijksmonumenten',
    //
    //     transparent: true,
    //     attribution: '<a href="https://gis.gouda.nl">Gemeente Gouda</a>',
    //   },
    // },
    // {
    //   id: 'gemeentelijke-monumenten',
    //   title: 'Gemeentelijke monumenten',
    //   type: 'layer',
    //   subtitle: 'Beschermde gemeentelijke monumenten',
    //   icon: 'lucide:landmark',
    //   tag: '2024',
    //   layerConfig: {
    //     type: 'wms',
    //     url: `${proxyUrl}https://gis.gouda.nl/geoserver/Bouwen/wms`,
    //     layers: 'WKPB_Gemeentelijke_monumenten',
    //
    //     transparent: true,
    //     attribution: '<a href="https://gis.gouda.nl">Gemeente Gouda</a>',
    //   },
    // },
    // {
    //   id: 'bag-gebouwen',
    //   title: 'Gebouwen (BAG)',
    //   type: 'layer',
    //   subtitle: 'Huidige gebouwen',
    //   icon: 'lucide:building',
    //   tag: '2024',
    //   layerConfig: {
    //     type: 'wms',
    //     url: 'https://service.pdok.nl/lv/bag/wms/v2_0',
    //     layers: 'pand',
    //     transparent: true,
    //
    //     attribution: '<a href="https://www.pdok.nl/">PDOK</a>',
    //   },
    // },
    // {
    //   id: 'kadastrale-percelen',
    //   title: 'Kadastrale percelen (BRK)',
    //   type: 'layer',
    //   subtitle: 'Huidige percelen',
    //   icon: 'lucide:square',
    //   tag: '2024',
    //   layerConfig: {
    //     type: 'wms',
    //     url: 'https://service.pdok.nl/kadaster/cp/wms/v1_0',
    //     layers: 'CP.CadastralParcel',
    //     transparent: true,
    //     version: '1.3.0',
    //
    //     attribution: '<a href="https://www.pdok.nl/">PDOK</a>',
    //   },
    // },
  ])

  /**
   * Computed properties
   */
  const selectedTileLayer = computed<Record<string, any>>(() => {
    // Find the layer using the selectedLayerId
    let layer = (layers.value || []).find(layer => layer.id === selectedLayerId.value)

    // If the selected Later wasn't found or it's a wms layer, fallback to the first tile layer
    if (layer?.layerConfig?.type !== 'tile') {
      layer = (layers.value || []).find(layer => layer.layerConfig?.type === 'tile')
    }

    // If still no layer was found (or it's missing a config), throw an error
    if (!layer || !layer.layerConfig) {
      throw Error('invalid default layer')
    }

    // Return the selectedTileLayer
    return { ...layer.layerConfig, id: layer.id, title: layer.title }
  })

  const selectedWmsLayer = computed<Record<string, any> | undefined>(() => {
    // Find the layer using the selectedLayerId and check if the type is a wms
    const layer = (layers.value || []).find(layer => layer.id === selectedLayerId.value && layer?.layerConfig?.type === 'wms')

    // If we found a layer, return it with the correct stup
    if (layer) {
      return { ...layer.layerConfig, id: layer.id, title: layer.title }
    }
  })

  return {
    selectedLayerId,
    layers,

    selectedTileLayer,
    selectedWmsLayer,
  }
})
