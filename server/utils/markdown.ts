import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('json', json)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('sh', bash)
hljs.registerLanguage('css', css)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('xml', xml)

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value
      }
      return code
    }
  })
)

marked.setOptions({
  breaks: false,
  gfm: true
})

const sanitizingRenderer = new marked.Renderer()
sanitizingRenderer.html = () => ''
marked.use({ renderer: sanitizingRenderer })

const IMAGE_TAG_RE = /<img\s+([^>]*?)\/?>/g
const LINK_TAG_RE = /<a\s+([^>]*?)>/g

const UNSAFE_URL_RE = /^\s*(?:javascript|vbscript|file):/i
const SAFE_URL_PREFIX_RE = /^(?:https?:|\/|\.\/|\.\.\/|#|mailto:|tel:)/i
const SAFE_DATA_IMAGE_RE = /^\s*data:image\/(?:png|jpe?g|gif|webp|avif);/i
const ANY_DATA_URL_RE = /^\s*data:/i

const VIDEO_EXT_RE = /\.(mp4|webm|ogv|mov)(?:[?#].*)?$/i
const YOUTUBE_RE = /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,20})/i
const VIMEO_RE = /vimeo\.com\/(?:video\/)?(\d+)/i

function getVideoMimeType(src: string): string {
  if (/\.mp4(?:[?#].*)?$/i.test(src)) return 'video/mp4'
  if (/\.webm(?:[?#].*)?$/i.test(src)) return 'video/webm'
  if (/\.ogv(?:[?#].*)?$/i.test(src)) return 'video/ogg'
  if (/\.mov(?:[?#].*)?$/i.test(src)) return 'video/quicktime'
  return ''
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function extractAttr(attrs: string, name: string): string {
  const match = attrs.match(new RegExp('\\b' + name + '="([^"]*)"'))
  const value = match && typeof match[1] === 'string' ? match[1] : ''
  return value
}

function processMedia(html: string): string {
  return html.replace(IMAGE_TAG_RE, (match, attrs) => {
    const attrsString = String(attrs)
    const src = extractAttr(attrsString, 'src')
    if (!src) return ''
    if (UNSAFE_URL_RE.test(src)) return ''
    if (ANY_DATA_URL_RE.test(src) && !SAFE_DATA_IMAGE_RE.test(src)) return ''

    const alt = extractAttr(attrsString, 'alt')
    const title = extractAttr(attrsString, 'title')

    const youtubeMatch = src.match(YOUTUBE_RE)
    if (youtubeMatch && typeof youtubeMatch[1] === 'string') {
      const id = youtubeMatch[1]
      const iframeTitle = escapeAttribute(title || alt || 'Video')
      return '<div class="media-embed"><iframe src="https://www.youtube-nocookie.com/embed/' + id + '" title="' + iframeTitle + '" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe></div>'
    }

    const vimeoMatch = src.match(VIMEO_RE)
    if (vimeoMatch && typeof vimeoMatch[1] === 'string') {
      const id = vimeoMatch[1]
      const iframeTitle = escapeAttribute(title || alt || 'Video')
      return '<div class="media-embed"><iframe src="https://player.vimeo.com/video/' + id + '" title="' + iframeTitle + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>'
    }

    if (VIDEO_EXT_RE.test(src)) {
      const mime = getVideoMimeType(src)
      const safeSrc = escapeAttribute(src)
      const sourceTag = mime
        ? '<source src="' + safeSrc + '" type="' + mime + '">'
        : '<source src="' + safeSrc + '">'
      const videoEl = '<video controls preload="metadata" playsinline>' + sourceTag + '</video>'
      if (title) {
        return '<figure class="media-figure">' + videoEl + '<figcaption>' + title + '</figcaption></figure>'
      }
      return '<figure class="media-figure">' + videoEl + '</figure>'
    }

    let next = attrsString
    if (!/\bloading=/.test(next)) next += ' loading="lazy"'
    if (!/\bdecoding=/.test(next)) next += ' decoding="async"'
    const img = '<img ' + next + '>'
    if (title) {
      return '<figure class="media-figure">' + img + '<figcaption>' + title + '</figcaption></figure>'
    }
    return img
  })
}

function processLinks(html: string): string {
  return html.replace(LINK_TAG_RE, (match, attrs) => {
    const attrsString = String(attrs)
    const href = extractAttr(attrsString, 'href')
    if (!href) return match.replace(/\bhref="[^"]*"/, '')
    if (UNSAFE_URL_RE.test(href)) return match.replace(/\bhref="[^"]*"/, '')
    if (ANY_DATA_URL_RE.test(href)) return match.replace(/\bhref="[^"]*"/, '')
    if (!SAFE_URL_PREFIX_RE.test(href)) return match
    if (!/^https?:/i.test(href)) return match

    let next = attrsString
    if (!/\btarget=/.test(next)) next += ' target="_blank"'
    if (!/\brel=/.test(next)) next += ' rel="noopener noreferrer"'
    return '<a ' + next + '>'
  })
}

export function renderMarkdown(source: string): string {
  if (!source) return ''
  const raw = marked.parse(source) as string
  return processLinks(processMedia(raw))
}
