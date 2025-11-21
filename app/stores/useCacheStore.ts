import { defineStore } from 'pinia'

export const useCacheStore = defineStore('cache', () => {
  const _data = ref<Record<string, any>>({})

  const storeCache = (identifier: string, data: any) => {
    _data.value[identifier] = data
  }

  const getCache = (identifier: string) => {
    return _data.value[identifier]
  }

  return {
    storeCache,
    getCache,
  }
})
