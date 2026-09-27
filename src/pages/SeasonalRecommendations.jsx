import { useState, useMemo } from 'react'
import { Sun, CloudRain, Snowflake, Flower2, Calendar } from 'lucide-react'
import ProduceCard from '../components/ProduceCard'

export default function SeasonalRecommendations({ produce, bookmarks, onToggleBookmark }) {
  const [activeSeason, setActiveSeason] = useState('Summer')

  const seasonsList = [
    { 
      id: 'Spring', 
      label: 'Spring Harvest', 
      icon: <Flower2 size={20} />, 
      months: 'March - May', 
      accentColor: '#16a34a',
      desc: 'Wild berries, crisp leafy greens, spring radishes, and young tender herbs.' 
    },
    { 
      id: 'Summer', 
      label: 'Summer Harvest', 
      icon: <Sun size={20} />, 
      months: 'June - August', 
      accentColor: '#f59e0b',
      desc: 'Sun-kissed peaches, heirloom beefsteak tomatoes, sweet corn, and aromatic basil.' 
    },
    { 
      id: 'Autumn', 
      label: 'Autumn Harvest', 
      icon: <Calendar size={20} />, 
      months: 'September - November', 
      accentColor: '#ea580c',
      desc: 'Crisp apples, hearty root squash, sweet potatoes, and fragrant rosemary.' 
    },
    { 
      id: 'Winter', 
      label: 'Winter Harvest', 
      icon: <Snowflake size={20} />, 
      months: 'December - February', 
      accentColor: '#0284c7',
      desc: 'Frost-sweetened Tuscan kale, bright citrus fruits, and hearty stoneground oats.' 
    }
  ]

  const seasonalItems = useMemo(() => {
    return produce.filter((p) => {
      return p.season.toLowerCase() === activeSeason.toLowerCase() || p.season === 'All-Year'
    })
  }, [produce, activeSeason])

  const currentSeasonInfo = seasonsList.find((s) => s.id === activeSeason) || seasonsList[0]

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      <div className="section-title wow fadeInDown">
        <h2>Seasonal Produce Recommendations</h2>
        <p>Eating with the seasons guarantees the richest natural flavors, highest nutrient density, and lowest carbon footprint.</p>
      </div>
      <div className="wow fadeInDown" data-wow-delay="0.1s" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '36px' }}>
        {seasonsList.map((season, idx) => {
          const isSelected = activeSeason === season.id
          return (
            <div
              key={season.id}
              onClick={() => setActiveSeason(season.id)}
              style={{
                background: isSelected ? 'linear-gradient(135deg, #1b5e20, #2e7d32)' : 'var(--white)',
                color: isSelected ? 'var(--white)' : 'var(--text-dark)',
                padding: '24px 20px',
                borderRadius: 'var(--radius-md)',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                border: isSelected ? '2px solid var(--accent-green)' : '1px solid rgba(46, 125, 50, 0.12)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isSelected ? 'translateY(-4px)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', fontWeight: 800, fontSize: '1.05rem' }}>
                <span style={{ color: isSelected ? '#a7f3d0' : season.accentColor }}>
                  {season.icon}
                </span>
                <span>{season.label}</span>
              </div>
              <div style={{ fontSize: '0.825rem', opacity: isSelected ? 0.9 : 0.65, fontWeight: 600 }}>
                {season.months}
              </div>
            </div>
          )
        })}
      </div>
      <div className="wow fadeInLeft" data-wow-delay="0.2s" style={{
        background: 'linear-gradient(135deg, #f0fdf4, #e8f5e9)',
        padding: '28px',
        borderRadius: 'var(--radius-md)',
        marginBottom: '40px',
        borderLeft: '6px solid var(--primary-green)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h3 style={{ fontSize: '1.35rem', marginBottom: '8px', color: 'var(--dark-green)' }}>
          {currentSeasonInfo.label} Overview ({currentSeasonInfo.months})
        </h3>
        <p style={{ color: '#166534', fontSize: '1rem', lineHeight: 1.6 }}>
          {currentSeasonInfo.desc}
        </p>
      </div>
      <div className="produce-grid">
        {seasonalItems.map((p, idx) => (
          <div key={p.id} className="wow fadeInUp" data-wow-delay={`${((idx % 3) + 1) * 0.12}s`}>
            <ProduceCard
              produce={p}
              isBookmarked={bookmarks.produce.includes(p.id)}
              onToggleBookmark={onToggleBookmark}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
