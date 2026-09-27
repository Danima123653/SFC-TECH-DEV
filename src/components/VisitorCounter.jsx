import { useState, useEffect, useRef } from 'react'
import { Users } from 'lucide-react'

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(() => {
    try {
      const stored = localStorage.getItem('freshfind_visitor_count')
      return stored ? parseInt(stored, 10) : 1422
    } catch {
      return 1422
    }
  })

  const [liveShoppers, setLiveShoppers] = useState(24)
  const [isPopping, setIsPopping] = useState(false)
  const hasCounted = useRef(false)

  useEffect(() => {
  
    if (hasCounted.current) return
    hasCounted.current = true

    try {
     
      const current = parseInt(localStorage.getItem('freshfind_visitor_count') || '1422', 10)
      const nextCount = current + 1
      localStorage.setItem('freshfind_visitor_count', nextCount.toString())
      setVisitorCount(nextCount)

      // Pop animation on update
      setIsPopping(true)
      const popTimer = setTimeout(() => setIsPopping(false), 700)

      // Live active shoppers online fluctuation (changes naturally without altering total visits)
      const interval = setInterval(() => {
        setLiveShoppers(() => Math.floor(Math.random() * (32 - 18 + 1)) + 18)
      }, 8000)

      return () => {
        clearTimeout(popTimer)
        clearInterval(interval)
      }
    } catch (err) {
      console.warn('Storage unavailable:', err)
    }
  }, [])

  return (
    <div 
      className="top-bar-item visitor-counter"
      title="Live community shopper counter"
      style={{ userSelect: 'none' }}
    >
      <Users size={14} color="#ffedd5" />
      <span>
        Visits:{' '}
        <strong 
          style={{ 
            color: isPopping ? '#fef08a' : '#ffffff', 
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            display: 'inline-block',
            transform: isPopping ? 'scale(1.2)' : 'scale(1)'
          }}
        >
          {visitorCount.toLocaleString()}
        </strong>
      </span>

      <span style={{ 
        marginLeft: '6px', 
        fontSize: '0.74rem', 
        background: 'rgba(255, 255, 255, 0.2)', 
        color: '#ffffff', 
        padding: '1px 8px', 
        borderRadius: '999px',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontWeight: 600
      }}>
        <span style={{ 
          width: '5px', 
          height: '5px', 
          borderRadius: '50%', 
          background: '#ffffff',
          display: 'inline-block',
          boxShadow: '0 0 6px #ffffff'
        }} />
        {liveShoppers} online
      </span>
    </div>
  )
}
