import { ref, shallowRef } from 'vue'

const stack = ref([])
let scrollbarWidth = 0
let storedScrollY = 0
let routeWhenLocked = ''

const MODAL_ANIMATION_MS = 220

function lockScroll() {
  if (stack.value.length > 0) return
  scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  storedScrollY = window.scrollY
  routeWhenLocked = window.location.href

  document.documentElement.style.setProperty('overflow', 'hidden', 'important')
  document.documentElement.style.setProperty('padding-right', `${scrollbarWidth}px`, 'important')
  document.body.style.setProperty('overflow', 'hidden', 'important')
  document.body.style.setProperty('position', 'fixed', 'important')
  document.body.style.setProperty('top', `-${storedScrollY}px`, 'important')
  document.body.style.setProperty('left', '0', 'important')
  document.body.style.setProperty('right', '0', 'important')
  document.body.style.setProperty('padding-right', `${scrollbarWidth}px`, 'important')
}

function unlockScroll() {
  const scrollY = storedScrollY
  const routeChanged = window.location.href !== routeWhenLocked

  document.documentElement.style.removeProperty('overflow')
  document.documentElement.style.removeProperty('padding-right')
  document.body.style.removeProperty('overflow')
  document.body.style.removeProperty('position')
  document.body.style.removeProperty('top')
  document.body.style.removeProperty('left')
  document.body.style.removeProperty('right')
  document.body.style.removeProperty('padding-right')

  if (routeChanged) {
    storedScrollY = 0
    return
  }

  if (scrollY > 0) {
    window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' })
  }
  storedScrollY = 0
}

export function useModal() {
  const open = (component, props = {}, options = {}) => {
    if (typeof options === 'string') {
      options = { size: options }
    }
    const { size = 'md', scrollable = false, closable = true } = options

    if (stack.value.length === 0 && !scrollable) {
      lockScroll()
    }

    return new Promise((resolve) => {
      stack.value.push({
        id: Symbol('modal'),
        component: shallowRef(component),
        props,
        size,
        scrollable,
        closable,
        leaving: false,
        resolve
      })
    })
  }

  const close = (id, value = null) => {
    const modal = stack.value.find((m) => m.id === id)
    if (!modal || modal.leaving) return
    modal.resolve(value)
    modal.leaving = true

    setTimeout(() => {
      const index = stack.value.findIndex((m) => m.id === id)
      if (index !== -1) {
        stack.value.splice(index, 1)
      }
      const anyBlocking = stack.value.some((m) => !m.scrollable && !m.leaving)
      if (!anyBlocking) {
        unlockScroll()
      }
    }, MODAL_ANIMATION_MS)
  }

  const closeTop = (value = null) => {
    const visible = stack.value.filter((m) => !m.leaving)
    if (!visible.length) return
    const top = visible[visible.length - 1]
    if (!top.closable) return
    close(top.id, value)
  }

  const closeAll = () => {
    stack.value.forEach((m) => {
      if (!m.leaving) {
        m.resolve(null)
        m.leaving = true
      }
    })

    setTimeout(() => {
      stack.value = []
      unlockScroll()
    }, MODAL_ANIMATION_MS)
  }

  return { stack, open, close, closeTop, closeAll }
}
