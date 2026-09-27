export default defineEventHandler(async (event): Promise<unknown[]> => {
  setHeader(event, 'Cache-Control', 'no-store, must-revalidate')
  const config = useRuntimeConfig()
  const base = String(config.public.newsApi || '').replace(/\/$/, '')
  try {
    const list: unknown = await $fetch(`${base}/api/news`, {
      headers: { Accept: 'application/json' }
    })
    return Array.isArray(list) ? list : []
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'News API unavailable' })
  }
})
