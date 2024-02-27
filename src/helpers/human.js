export function humanCurrentDate() {
  const td = new Date()
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]
  return this.$t('human-current-date', [
    dayNames[td.getDay()],
    td.getDate(),
    monthNames[td.getMonth()],
    td.getFullYear()
  ])
}

// Return a human-readable date
export function dateToHuman(d) {
  const fd = new Date(d)
  let day = fd.getDate()
  if (day < 10) {
    day = '0' + day
  }
  return day + '/' + (fd.getMonth() + 1) + '/' + fd.getFullYear()
}

export function dateToTimeAgo(d) {
  const fd = new Date(d)
  const now = new Date()
  const secs = (now.getTime() - fd.getTime()) / 1000
  const minutes = Math.floor(secs / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (secs < 60) {
    return this.$t('date.less-minute')
  } else if (minutes == 1) {
    return this.$t('date.minute', [minutes])
  } else if (minutes < 60) {
    return this.$t('date.minutes', [minutes])
  } else if (hours == 1) {
    return this.$t('date.hour', [hours])
  } else if (hours < 24) {
    return this.$t('date.hours', [hours])
  } else if (days == 1) {
    return this.$t('date.day', [days])
  } else if (days < 31) {
    return this.$t('date.days', [days])
  } else if (months == 1) {
    return this.$t('date.month', [months])
  } else if (months < 12) {
    return this.$t('date.months', [months])
  } else if (years == 1) {
    return this.$t('date.year', [years])
  } else {
    return this.$t('date.years', [years])
  }
}

export function getCurrentMonth() {
  const td = new Date()
  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]
  return monthNames[td.getMonth()]
}
