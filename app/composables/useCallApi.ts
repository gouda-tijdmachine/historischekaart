export default async function useCallApi(path: string) {
  const config = useRuntimeConfig()
  const url = `${config.public.baseUrl}/${path}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`)
  }
  return await response.json()
}
