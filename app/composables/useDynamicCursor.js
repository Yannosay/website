import { ref } from 'vue'

const mouse = ref({ x: -100, y: -100 })
const target = ref({ x: -100, y: -100 })
const hovered = ref(false)
const pressed = ref(false)
const cursorText = ref('')
const visible = ref(false)
const hidden = ref(false)
const enabled = ref(true)

let raf = null
let initialized = false

function addCursorStyle() {
  if (typeof document === 'undefined') return
  if (document.getElementById('dynamic-cursor-style')) return
  const style = document.createElement('style')
  style.id = 'dynamic-cursor-style'
  style.textContent = 'html, body, a, button, input, textarea, select { cursor: none !important; }'
  document.head.appendChild(style)
}

function removeCursorStyle() {
  if (typeof document === 'undefined') return
  const style = document.getElementById('dynamic-cursor-style')
  if (style) style.remove()
}

function applyEnabledToDom() {
  if (typeof document === 'undefined') return
  if (enabled.value) {
    document.documentElement.style.cursor = 'none'
    addCursorStyle()
  } else {
    document.documentElement.style.cursor = ''
    removeCursorStyle()
  }
}

export function useDynamicCursor() {
  const lerp = (a, b, t) => a + (b - a) * t

  const animate = () => {
    mouse.value.x = lerp(mouse.value.x, target.value.x, 0.15)
    mouse.value.y = lerp(mouse.value.y, target.value.y, 0.15)
    raf = requestAnimationFrame(animate)
  }

  const handleMove = (e) => {
    if (hidden.value) return
    target.value.x = e.clientX
    target.value.y = e.clientY
    if (!visible.value) visible.value = true
  }

  const handleLeave = () => { visible.value = false }
  const handleEnter = () => { visible.value = true }

  const init = () => {
    if (typeof window === 'undefined') return
    if (initialized) return
    initialized = true
    document.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)
    if (enabled.value && raf === null) animate()
  }

  const destroy = () => {
    if (typeof window === 'undefined') return
    document.removeEventListener('mousemove', handleMove)
    document.removeEventListener('mouseleave', handleLeave)
    document.removeEventListener('mouseenter', handleEnter)
    if (raf !== null) {
      cancelAnimationFrame(raf)
      raf = null
    }
    initialized = false
  }

  const hydrate = () => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem('dynamicCursor')
    enabled.value = stored !== 'false'
    applyEnabledToDom()
    if (enabled.value) init()
  }

  const setHover = (val, text = '') => {
    hovered.value = !!val
    cursorText.value = typeof text === 'string' ? text : ''
  }

  const setPressed = (val) => { pressed.value = !!val }

  const setHidden = (val) => {
    hidden.value = !!val
    visible.value = !val
  }

  const resetState = () => {
    visible.value = false
    hovered.value = false
    pressed.value = false
    cursorText.value = ''
  }

  const toggle = () => {
    enabled.value = !enabled.value
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('dynamicCursor', String(enabled.value))
    }
    applyEnabledToDom()
    resetState()
    if (enabled.value) {
      init()
    } else {
      destroy()
    }
  }

  return {
    mouse,
    hovered,
    pressed,
    cursorText,
    visible,
    hidden,
    enabled,
    init,
    destroy,
    hydrate,
    setHover,
    setPressed,
    setHidden,
    toggle,
    resetState
  }
}
