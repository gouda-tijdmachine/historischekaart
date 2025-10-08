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
}

declare module 'click-outside-vue3' {
  const vClickOutside: any
  export default vClickOutside
}
