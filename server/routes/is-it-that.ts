import { defineEventHandler, createError, setHeader, setResponseHeader } from 'h3'

export default defineEventHandler(async (event) => {
  const htmlContent = await useStorage('assets:templates').getItemRaw('html/is-it-that/index.html')

  if (!htmlContent) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Resource Not Found'
    })
  }

  setHeader(event, 'Content-Type', 'text/html; charset=utf-8')
  setResponseHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800')

  return htmlContent
})