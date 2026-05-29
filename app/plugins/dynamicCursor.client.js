import { useDynamicCursor } from '~/composables/useDynamicCursor'

export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return
  if ('ontouchstart' in window) return

  const cursor = useDynamicCursor()

  if (cursor.enabled.value) {
    cursor.init()
    document.documentElement.style.cursor = 'none'
    const style = document.createElement('style')
    style.id = 'dynamic-cursor-style'
    style.textContent = 'html * { cursor: none !important; }'
    document.head.appendChild(style)
  } else {
    document.documentElement.style.cursor = ''
  }

  const selector = 'a, button, input, textarea, select, [data-cursor], [data-cursor-text], [data-cursor-hover]'

  const onEnter = (el) => {
    if (!cursor.enabled.value) return
    const text = el.getAttribute('data-cursor-text') || el.getAttribute('data-cursor') || ''
    cursor.setHover(true, text)
  }

  const onLeave = () => {
    cursor.setHover(false, '')
    cursor.setPressed(false)
  }

  const onDown = () => {
    if (!cursor.enabled.value) return
    cursor.setPressed(true)
  }

  const onUp = () => cursor.setPressed(false)

  let hoveredElement = null

  const bindElement = (el) => {
    if (el.__cursorBound) return
    el.__cursorBound = true
    el.addEventListener('mouseenter', () => {
      onEnter(el)
      hoveredElement = el
    })
    el.addEventListener('mouseleave', () => {
      onLeave()
      hoveredElement = null
    })
    el.addEventListener('mousedown', onDown)
    el.addEventListener('mouseup', onUp)
    el.addEventListener('mouseout', (e) => {
      if (el.contains(e.relatedTarget)) return
      onLeave()
      hoveredElement = null
    })
  }

  const removalObserver = new MutationObserver(() => {
    if (hoveredElement && !document.body.contains(hoveredElement)) {
      cursor.setHover(false, '')
      cursor.setPressed(false)
      hoveredElement = null
    }
  })

  removalObserver.observe(document.body, { childList: true, subtree: true })

  const observer = new MutationObserver(() => {
    document.querySelectorAll(selector).forEach(bindElement)
  })

  observer.observe(document.body, { childList: true, subtree: true })

  document.querySelectorAll(selector).forEach(bindElement)

  const handleIframeEnter = () => {
    document.documentElement.style.cursor = ''
    const style = document.getElementById('dynamic-cursor-style')
    if (style) style.remove()
    cursor.setHidden(true)
  }

  const handleIframeLeave = () => {
    if (cursor.enabled.value) {
      document.documentElement.style.cursor = 'none'
      const existingStyle = document.getElementById('dynamic-cursor-style')
      if (!existingStyle) {
        const style = document.createElement('style')
        style.id = 'dynamic-cursor-style'
        style.textContent = 'html * { cursor: none !important; }'
        document.head.appendChild(style)
      }
      cursor.setHidden(false)
    }
  }

  const bindIframe = (iframe) => {
    if (iframe.__cursorIframeBound) return
    iframe.__cursorIframeBound = true
    iframe.addEventListener('mouseenter', handleIframeEnter)
    iframe.addEventListener('mouseleave', handleIframeLeave)
  }

  document.querySelectorAll('iframe').forEach(bindIframe)

  const iframeObserver = new MutationObserver(() => {
    document.querySelectorAll('iframe').forEach(bindIframe)
  })

  iframeObserver.observe(document.body, { childList: true, subtree: true })
})