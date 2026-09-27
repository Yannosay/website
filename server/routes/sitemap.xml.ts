type NewsSummary = { slug?: string; date?: string; updated?: string }

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const base = String(config.public.siteUrl || '').replace(/\/$/, '')
  const newsApi = String(config.public.newsApi || '').replace(/\/$/, '')

  let newsItems: NewsSummary[] = []
  try {
    const list = await $fetch<NewsSummary[]>(`${newsApi}/api/news`, {
      headers: { Accept: 'application/json' }
    })
    if (Array.isArray(list)) {
      newsItems = list.filter((item) => item && typeof item.slug === 'string' && /^[a-z0-9-]{1,128}$/.test(item.slug))
    }
  } catch {
    newsItems = []
  }

  const toolSlugs = ['sinth', 'not-finished-yet']

  const urls: string[] = []
  const push = (loc: string, changefreq: string, priority: string, lastmod?: string) => {
    const lastmodTag = lastmod && /^\d{4}-\d{2}-\d{2}$/.test(lastmod) ? `<lastmod>${lastmod}</lastmod>` : ''
    urls.push(`  <url><loc>${base}${loc}</loc>${lastmodTag}<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`)
  }

  push('/', 'weekly', '1.0')
  push('/news', 'weekly', '0.8')
  push('/tools', 'monthly', '0.8')
  for (const slug of toolSlugs) push(`/tools/${slug}`, 'monthly', '0.6')
  for (const item of newsItems) {
    const slug = String(item.slug)
    const lastmod = item.updated || item.date
    push(`/news/${slug}`, 'weekly', '0.7', lastmod)
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400')
  return xml
})
