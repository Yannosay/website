export default defineNuxtPlugin((nuxtApp) => {
  const i18n = (nuxtApp as any).$i18n
  if (!i18n) return

  const stored = window.localStorage.getItem('locale')
  if ((stored === 'en' || stored === 'de') && stored !== i18n.locale.value) {
    i18n.locale.value = stored
  }
  window.localStorage.removeItem('locale')

  const writeCookie = (code: string) => {
    document.cookie = `yp_locale=${code}; path=/; max-age=31536000; SameSite=Lax`
  }

  if (i18n.locale.value) writeCookie(i18n.locale.value)

  watch(i18n.locale, (next: string) => {
    if (next) writeCookie(next)
  })
})
