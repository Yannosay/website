import { useDynamicCursor } from '~/composables/useDynamicCursor'

const HOVER_SELECTOR = 'a, button, input, textarea, select, [data-cursor], [data-cursor-text], [data-cursor-hover]'

export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(hover: none)').matches) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const cursor = useDynamicCursor()
  cursor.hydrate()

  const resolveHoverTarget = (node) => {
    if (!node || !(node instanceof Element)) return null
    return node.closest(HOVER_SELECTOR)
  }

  const onMouseOver = (event) => {
    if (!cursor.enabled.value) return
    const target = resolveHoverTarget(event.target)
    if (!target) return
    const text = target.getAttribute('data-cursor-text') || target.getAttribute('data-cursor') || ''
    cursor.setHover(true, text)
  }

  const onMouseOut = (event) => {
    const from = resolveHoverTarget(event.target)
    if (!from) return
    const to = resolveHoverTarget(event.relatedTarget)
    if (from === to) return
    cursor.setHover(false, '')
    cursor.setPressed(false)
  }

  const onMouseDown = (event) => {
    if (!cursor.enabled.value) return
    if (!resolveHoverTarget(event.target)) return
    cursor.setPressed(true)
  }

  const onMouseUp = () => {
    if (!cursor.enabled.value) return
    cursor.setPressed(false)
  }

  document.addEventListener('mouseover', onMouseOver, { passive: true })
  document.addEventListener('mouseout', onMouseOut, { passive: true })
  document.addEventListener('mousedown', onMouseDown, { passive: true })
  document.addEventListener('mouseup', onMouseUp, { passive: true })

  const onIframeEnter = () => {
    document.documentElement.style.cursor = ''
    const style = document.getElementById('dynamic-cursor-style')
    if (style) style.remove()
    cursor.setHidden(true)
  }

  const onIframeLeave = () => {
    if (!cursor.enabled.value) return
    document.documentElement.style.cursor = 'none'
    if (!document.getElementById('dynamic-cursor-style')) {
      const style = document.createElement('style')
      style.id = 'dynamic-cursor-style'
      style.textContent = 'html, body, a, button, input, textarea, select { cursor: none !important; }'
      document.head.appendChild(style)
    }
    cursor.setHidden(false)
  }

  const bindIframe = (iframe) => {
    if (iframe.__cursorIframeBound) return
    iframe.__cursorIframeBound = true
    iframe.addEventListener('mouseenter', onIframeEnter)
    iframe.addEventListener('mouseleave', onIframeLeave)
  }

  document.querySelectorAll('iframe').forEach(bindIframe)

  const iframeObserver = new MutationObserver(() => {
    document.querySelectorAll('iframe').forEach(bindIframe)
  })

  iframeObserver.observe(document.body, { childList: true, subtree: true })
})
