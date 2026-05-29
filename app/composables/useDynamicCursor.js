import { ref } from 'vue'

const mouse = ref({ x: -100, y: -100 })
const target = ref({ x: -100, y: -100 })
const hovered = ref(false)
const pressed = ref(false)
const cursorText = ref('')
const visible = ref(false)
const hidden = ref(false)
const enabled = ref(typeof window !== 'undefined' ? localStorage.getItem('dynamicCursor') !== 'false' : true)

let raf = null
let initialized = false

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
    visible.value = true
  }

  const handleLeave = () => {
    visible.value = false
  }

  const handleEnter = () => {
    visible.value = true
  }

  const init = () => {
    if (initialized) return
    initialized = true
    document.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)
    animate()
  }

  const destroy = () => {
    document.removeEventListener('mousemove', handleMove)
    document.removeEventListener('mouseleave', handleLeave)
    document.removeEventListener('mouseenter', handleEnter)
    if (raf) cancelAnimationFrame(raf)
    raf = null
    initialized = false
  }

  const setHover = (val, text = '') => {
    hovered.value = val
    cursorText.value = text
  }

  const setPressed = (val) => {
    pressed.value = val
  }

  const setHidden = (val) => {
    hidden.value = val
    visible.value = !val
  }

  const resetState = () => {
    visible.value = false
    hovered.value = false
    pressed.value = false
    cursorText.value = ''
  }

  const addCursorStyle = () => {
    if (document.getElementById('dynamic-cursor-style')) return
    const style = document.createElement('style')
    style.id = 'dynamic-cursor-style'
    style.textContent = 'html * { cursor: none !important; }'
    document.head.appendChild(style)
  }

  const removeCursorStyle = () => {
    const style = document.getElementById('dynamic-cursor-style')
    if (style) style.remove()
  }

  const toggle = () => {
    enabled.value = !enabled.value
    localStorage.setItem('dynamicCursor', enabled.value)
    if (enabled.value) {
      document.documentElement.style.cursor = 'none'
      addCursorStyle()
      resetState()
      if (!initialized) {
        init()
      }
    } else {
      document.documentElement.style.cursor = ''
      removeCursorStyle()
      resetState()
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
    setHover,
    setPressed,
    setHidden,
    toggle,
    resetState
  }
}