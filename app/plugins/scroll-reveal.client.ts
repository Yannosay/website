export default defineNuxtPlugin(() => {
  const router = useRouter()
  const isInViewport = (el: Element, offset = 0) => {
    const rect = el.getBoundingClientRect()
    return rect.top < window.innerHeight - offset && rect.bottom > 0
  }
  const revealAll = () => {
    document.querySelectorAll('.reveal:not(.reveal-visible)').forEach(el => {
      if (isInViewport(el, 40)) {
        el.classList.add('reveal-visible')
      }
    })
  }
  const resetAll = () => {
    document.querySelectorAll('.reveal-visible').forEach(el => el.classList.remove('reveal-visible'))
  }
  const onScroll = () => revealAll()
  nextTick(() => revealAll())
  router.afterEach(() => {
    resetAll()
    nextTick(() => revealAll())
  })
  window.addEventListener('pageshow', () => {
    resetAll()
    nextTick(() => revealAll())
  })
  window.addEventListener('scroll', onScroll, { passive: true })
})