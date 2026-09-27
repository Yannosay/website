const CODE_FENCE_RE = /```[\s\S]*?```/g
const INLINE_CODE_RE = /`[^`]*`/g
const IMAGE_RE = /!\[[^\]]*\]\([^)]*\)/g
const LINK_RE = /\[([^\]]*)\]\([^)]*\)/g
const HEADING_RE = /^#{1,6}\s+/gm
const BOLD_ITALIC_RE = /[*_]{1,3}([^*_]+)[*_]{1,3}/g
const BLOCKQUOTE_RE = /^>\s?/gm
const UL_RE = /^[-*+]\s+/gm
const OL_RE = /^\d+\.\s+/gm
const HTML_TAG_RE = /<[^>]+>/g
const HR_RE = /^---+$/gm
const WS_RE = /\s+/g

export function stripMarkdown(source: string): string {
  if (!source) return ''
  let text = source.replace(CODE_FENCE_RE, ' ')
  text = text.replace(INLINE_CODE_RE, ' ')
  text = text.replace(IMAGE_RE, ' ')
  text = text.replace(LINK_RE, '$1')
  text = text.replace(HEADING_RE, '')
  text = text.replace(BOLD_ITALIC_RE, '$1')
  text = text.replace(BLOCKQUOTE_RE, '')
  text = text.replace(UL_RE, '')
  text = text.replace(OL_RE, '')
  text = text.replace(HTML_TAG_RE, ' ')
  text = text.replace(HR_RE, ' ')
  text = text.replace(WS_RE, ' ').trim()
  return text
}

export function generateExcerpt(source: string, maxLength = 220): { text: string; truncated: boolean } {
  const plain = stripMarkdown(source)
  if (!plain) return { text: '', truncated: false }
  if (plain.length <= maxLength) return { text: plain, truncated: false }
  const slice = plain.slice(0, maxLength)
  const lastSpace = slice.lastIndexOf(' ')
  const cut = lastSpace > maxLength * 0.6 ? lastSpace : maxLength
  return { text: plain.slice(0, cut).trimEnd() + '…', truncated: true }
}

export function computeReadingTimeMinutes(source: string): number {
  const plain = stripMarkdown(source)
  if (!plain) return 1
  const words = plain.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}
