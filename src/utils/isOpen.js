// Determines whether a market is open right now based on client day & time
export function isMarketOpen(market) {
  if (!market?.days || !market?.hours) return false

  const now = new Date()
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const today = weekDays[now.getDay()]

  const operatesToday = market.days.some((d) => d.toLowerCase() === today.toLowerCase())
  if (!operatesToday) return false

  const { open, close } = market.hours
  if (!open || !close) return false

  const [openHour, openMin] = open.split(':').map(Number)
  const [closeHour, closeMin] = close.split(':').map(Number)

  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const openTimeMinutes = openHour * 60 + openMin
  const closeTimeMinutes = closeHour * 60 + closeMin

  return currentMinutes >= openTimeMinutes && currentMinutes <= closeTimeMinutes
}
