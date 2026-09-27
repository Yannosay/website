export function useDateFormat() {
  const { locale } = useI18n()

  const languageTag = () => (locale.value === 'de' ? 'de-DE' : 'en-US')

  const formatLong = (dateStr: string): string => {
    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr || ''
    return new Date(`${dateStr}T00:00:00Z`).toLocaleDateString(languageTag(), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    })
  }

  const formatShort = (dateStr: string): string => {
    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr || ''
    return new Date(`${dateStr}T00:00:00Z`).toLocaleDateString(languageTag(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC'
    })
  }

  const formatTime = (iso: string | null | undefined): string => {
    if (!iso) return ''
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    return d.toLocaleTimeString(languageTag(), {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      timeZoneName: 'short'
    })
  }

  const formatLongDateTime = (iso: string | null | undefined): string => {
    if (!iso) return ''
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    return d.toLocaleString(languageTag(), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      timeZoneName: 'short'
    })
  }

  return { formatLong, formatShort, formatTime, formatLongDateTime }
}
