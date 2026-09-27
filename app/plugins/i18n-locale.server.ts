export default defineNuxtPlugin((nuxtApp) => {
  const i18n = (nuxtApp as any).$i18n
  if (!i18n) return

  const cookie = useCookie<string | null>('yp_locale', { default: () => null })
  const stored = cookie.value
  if (stored === 'en' || stored === 'de') {
    i18n.locale.value = stored
  }
})
