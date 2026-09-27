export function useRelativeTime() {
  const { locale } = useI18n()

  const format = (dateStr: string): string => {
    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr
    const then = new Date(`${dateStr}T00:00:00Z`).getTime()
    if (Number.isNaN(then)) return dateStr
    const now = Date.now()
    const diffSeconds = Math.round((then - now) / 1000)
    const rtf = new Intl.RelativeTimeFormat(locale.value || 'en', { numeric: 'auto' })
    const ranges: Array<[Intl.RelativeTimeFormatUnit, number]> = [
      ['year', 60 * 60 * 24 * 365],
      ['month', 60 * 60 * 24 * 30],
      ['week', 60 * 60 * 24 * 7],
      ['day', 60 * 60 * 24],
      ['hour', 60 * 60],
      ['minute', 60]
    ]
    for (const [unit, seconds] of ranges) {
      if (Math.abs(diffSeconds) >= seconds) {
        return rtf.format(Math.round(diffSeconds / seconds), unit)
      }
    }
    return rtf.format(diffSeconds, 'second')
  }

  return { format }
}
