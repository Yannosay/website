import { ref, shallowRef } from 'vue'

const stack = ref([])
const originalBodyStyle = {}

function saveBodyStyle() {
  originalBodyStyle.overflow = document.body.style.overflow
  originalBodyStyle.position = document.body.style.position
  originalBodyStyle.width = document.body.style.width
  originalBodyStyle.top = document.body.style.top
  originalBodyStyle.paddingRight = document.body.style.paddingRight
}

function lockScroll() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  const scrollY = window.scrollY

  saveBodyStyle()

  document.documentElement.style.setProperty('overflow', 'hidden', 'important')
  document.documentElement.style.setProperty('padding-right', `${scrollbarWidth}px`, 'important')
  document.body.style.setProperty('overflow', 'hidden', 'important')
  document.body.style.setProperty('position', 'fixed', 'important')
  document.body.style.setProperty('top', `-${scrollY}px`, 'important')
  document.body.style.setProperty('width', '100%', 'important')
  document.body.style.setProperty('padding-right', `${scrollbarWidth}px`, 'important')
}

function unlockScroll() {
  const scrollY = parseInt(document.body.style.top || '0', 10) * -1

  document.documentElement.style.removeProperty('overflow')
  document.documentElement.style.removeProperty('padding-right')
  document.body.style.removeProperty('overflow')
  document.body.style.removeProperty('position')
  document.body.style.removeProperty('top')
  document.body.style.removeProperty('width')
  document.body.style.removeProperty('padding-right')

  document.body.style.overflow = originalBodyStyle.overflow || ''
  document.body.style.position = originalBodyStyle.position || ''
  document.body.style.width = originalBodyStyle.width || ''
  document.body.style.top = originalBodyStyle.top || ''
  document.body.style.paddingRight = originalBodyStyle.paddingRight || ''

  if (!isNaN(scrollY)) {
    window.scrollTo(0, scrollY)
  }
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
        id: Symbol(),
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
    const modal = stack.value.find(m => m.id === id)
    if (!modal || modal.leaving) return
    modal.resolve(value)
    modal.leaving = true

    setTimeout(() => {
      const index = stack.value.findIndex(m => m.id === id)
      if (index !== -1) {
        stack.value.splice(index, 1)
      }
      const anyBlocking = stack.value.some(m => !m.scrollable)
      if (!anyBlocking) {
        unlockScroll()
      }
    }, 220)
  }

  const closeTop = (value = null) => {
    const visible = stack.value.filter(m => !m.leaving)
    if (!visible.length) return
    const top = visible[visible.length - 1]
    if (!top.closable) return
    close(top.id, value)
  }

  const closeAll = () => {
    stack.value.forEach(m => {
      if (!m.leaving) {
        m.resolve(null)
        m.leaving = true
      }
    })

    setTimeout(() => {
      stack.value = []
      unlockScroll()
    }, 220)
  }

  return { stack, open, close, closeTop, closeAll }
}