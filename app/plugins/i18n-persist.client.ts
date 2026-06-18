export default defineNuxtPlugin((nuxtApp) => {
  const saved = localStorage.getItem('locale')
  if (saved === 'en' || saved === 'de') {
    (nuxtApp as any).$i18n.locale.value = saved
  }
})