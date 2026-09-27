import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

export default function RealTimeClock() {
  const [currentDate, setCurrentDate] = useState(() => new Date())

  useEffect(() => {
    
    const ticker = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)

    return () => clearInterval(ticker)
  }, [])

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })

  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  return (
    <div className="top-bar-item">
      <Clock size={14} color="#ffedd5" />
      <span>{formattedDate} • {formattedTime}</span>
    </div>
  )
}
