export function useCanonical(pathOverride?: string) {
  const config = useRuntimeConfig()
  const route = useRoute()
  const base = String(config.public.siteUrl || '').replace(/\/$/, '')
  const path = pathOverride ?? route.path
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`
  useHead({ link: [{ rel: 'canonical', href: url }] })
}
