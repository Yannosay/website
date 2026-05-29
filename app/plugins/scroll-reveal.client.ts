export default defineNuxtPlugin(() => {
  const router = useRouter()
  let observer: IntersectionObserver | null = null

  const observe = () => {
    if (observer) observer.disconnect()

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            observer!.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    nextTick(() => {
      document.querySelectorAll('.reveal:not(.reveal-visible)').forEach((el) => observer!.observe(el))
    })
  }

  router.afterEach(() => observe())

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      document.querySelectorAll('.reveal-visible').forEach(el => el.classList.remove('reveal-visible'))
      observe()
    }
  })

  observe()
})