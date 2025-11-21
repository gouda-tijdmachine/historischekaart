export default async function useCallApi(path: string) {
  try {
    const config = useRuntimeConfig()
    const url = `${config.public.baseUrl}/${path}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`)
    }
    return await response.json()
  }
  catch (error) {
    console.error(`Failed to fetch data from ${path}:`, error)
  }
}
