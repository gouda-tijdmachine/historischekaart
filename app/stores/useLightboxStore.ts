import { defineStore } from 'pinia'

export const useLightboxStore = defineStore('lightbox', () => {
  const data = ref<ImageDetailResponse>()

  const showModal = computed<boolean>(() => {
    return !!unref(data)
  })

  return {
    showModal,
    data,
  }
})
