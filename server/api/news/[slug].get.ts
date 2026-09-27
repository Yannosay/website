import { renderMarkdown } from '~~/server/utils/markdown'

type ArticlePayload = {
  slug: string
  title: string
  date: string
  publishedAt: string | null
  updatedAt: string | null
  excerpt: string
  banner: string
  bannerAlt: string
  author: string | null
  tags: string[]
  featured: boolean
  readingTimeMinutes: number | null
  html: string
}

export default defineEventHandler(async (event): Promise<ArticlePayload> => {
  setHeader(event, 'Cache-Control', 'no-store, must-revalidate')
  const config = useRuntimeConfig()
  const base = String(config.public.newsApi || '').replace(/\/$/, '')
  const slug = getRouterParam(event, 'slug')

  if (!slug || !/^[a-z0-9-]{1,128}$/.test(slug)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid slug' })
  }

  let article: Record<string, unknown>
  try {
    article = await $fetch<Record<string, unknown>>(`${base}/api/news/${slug}`, {
      headers: { Accept: 'application/json' }
    })
  } catch (err: unknown) {
    const status = (err as { response?: { status?: number } })?.response?.status
    if (status === 404) {
      throw createError({ statusCode: 404, statusMessage: 'Article not found' })
    }
    throw createError({ statusCode: 502, statusMessage: 'News API unavailable' })
  }

  if (!article || typeof article !== 'object') {
    throw createError({ statusCode: 502, statusMessage: 'Malformed article payload' })
  }

  const content = String(article.content || '')
  const html = renderMarkdown(content)

  const rawTags = article.tags
  const tags = Array.isArray(rawTags) ? rawTags.map((t) => String(t)).filter(Boolean) : []

  const readingTime = Number(article.readingTimeMinutes)

  const banner = article.banner ? String(article.banner) : ''
  const bannerAlt = article.bannerAlt ? String(article.bannerAlt) : String(article.title || '')

  return {
    slug: String(article.slug || slug),
    title: String(article.title || ''),
    date: String(article.date || ''),
    publishedAt: article.publishedAt ? String(article.publishedAt) : null,
    updatedAt: article.updatedAt ? String(article.updatedAt) : null,
    excerpt: String(article.excerpt || ''),
    banner,
    bannerAlt,
    author: article.author ? String(article.author) : null,
    tags,
    featured: Boolean(article.featured),
    readingTimeMinutes: Number.isFinite(readingTime) && readingTime > 0 ? readingTime : null,
    html
  }
})
