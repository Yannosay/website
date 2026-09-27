import { generateExcerpt } from '~~/server/utils/text'

type NewsSummary = {
  slug?: string
  title?: string
  date?: string
  updated?: string
  excerpt?: string
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toRfc822(dateStr: string): string {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return new Date().toUTCString()
  }
  return new Date(`${dateStr}T00:00:00Z`).toUTCString()
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const base = String(config.public.siteUrl || '').replace(/\/$/, '')
  const newsApi = String(config.public.newsApi || '').replace(/\/$/, '')

  let items: NewsSummary[] = []
  try {
    const list = await $fetch<NewsSummary[]>(`${newsApi}/api/news`, {
      headers: { Accept: 'application/json' }
    })
    if (Array.isArray(list)) {
      items = list.filter((item) => item && typeof item.slug === 'string')
    }
  } catch {
    items = []
  }

  const channelItems = items.slice(0, 30).map((item) => {
    const slug = String(item.slug)
    const link = `${base}/news/${slug}`
    const title = escapeXml(String(item.title || slug))
    const description = escapeXml(
      String(item.excerpt || generateExcerpt('').text || item.title || '')
    )
    const pubDate = toRfc822(String(item.date || ''))
    return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
    </item>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Yannosay Productions — News</title>
    <link>${base}/news</link>
    <description>Latest announcements from Yannosay Productions.</description>
    <language>en-US</language>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml"/>
${channelItems}
  </channel>
</rss>
`

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=600, s-maxage=1800, stale-while-revalidate=3600')
  return xml
})
