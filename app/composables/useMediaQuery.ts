export function useMediaQuery(query: string): Readonly<Ref<boolean>> {
  const mql = import.meta.client ? window.matchMedia(query) : null
  const matches = ref<boolean>(mql?.matches ?? false)

  const handler = (event: MediaQueryListEvent) => {
    matches.value = event.matches
  }

  onMounted(() => mql?.addEventListener('change', handler))
  onBeforeUnmount(() => mql?.removeEventListener('change', handler))

  return readonly(matches)
}

// Houd deze waarde gelijk aan $breakpoint-mobile in assets/scss/mixins.scss
export function useIsMobile(): Readonly<Ref<boolean>> {
  return useMediaQuery('(max-width: 48rem)')
}
