import { defineStore } from 'pinia'

export const useLightboxStore = defineStore('lightbox', () => {
  const type = ref<LightboxType>()
  const data = ref<ImageDetailResponse>()

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
    open,
    close,
  }
})
