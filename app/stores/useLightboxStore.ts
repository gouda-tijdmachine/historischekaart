import { defineStore } from 'pinia'

export const useLightboxStore = defineStore('lightbox', () => {
  const type = ref<LightboxType>()
  const data = ref<ImageDetailResponse>()

  // LocalStorage key
  const HIDE_ON_STARTUP_KEY = 'gtm-hide-about-on-startup'

  // Computed property for hideOnStartup, syncs with localStorage
  const hideOnStartup = computed<boolean>({
    get() {
      return localStorage.getItem(HIDE_ON_STARTUP_KEY) === 'true'
    },
    set(val: boolean) {
      localStorage.setItem(HIDE_ON_STARTUP_KEY, val ? 'true' : 'false')
    },
  })

  const showModal = computed<boolean>(() => {
    return !!unref(type)
  })

  const open = (version: LightboxType, input?: ImageDetailResponse) => {
    type.value = version
    data.value = input
  }

  const close = () => {
    type.value = undefined
    data.value = undefined
  }

  return {
    showModal,
    data,
    type,
    hideOnStartup,
    open,
    close,
  }
})
