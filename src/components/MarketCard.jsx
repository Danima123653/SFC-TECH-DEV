import { Clock, Calendar, Heart, ChevronRight, Star } from 'lucide-react'
import { isMarketOpen } from '../utils/isOpen'

export default function MarketCard({ market, onSelectMarket, isBookmarked, onToggleBookmark }) {
  // Check live market status based on real-time browser clock
  const openStatus = isMarketOpen(market)

  return (
    <div className="market-card">
      <div className="card-img-wrapper">
        <img 
          src={market.image} 
          alt={market.name} 
          className="card-img" 
          loading="lazy" 
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = '/images/market-willowcreek.jpg'
          }}
        />
        <div className="card-img-gradient-overlay" />
        
        <button
          className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onToggleBookmark('market', market.id)
          }}
          title={isBookmarked ? 'Remove from bookmarks' : 'Save market'}
          aria-label="Bookmark Market"
        >
          <Heart size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="card-body">
        <div className="card-header-meta">
          <span className={`badge ${openStatus ? 'badge-open' : 'badge-closed'}`}>
            {openStatus && <span className="radar-dot" />}
            {openStatus ? 'Open Now' : 'Closed Today'}
          </span>

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 700, color: '#d97706' }}>
            <Star size={14} fill="#f59e0b" color="#f59e0b" /> {market.rating}
          </span>
        </div>

        <h3 className="card-title">{market.name}</h3>

        <div className="card-location">
       
          <span>{market.address}</span>
        </div>

        <div className="card-location">
          <Calendar size={15} color="var(--primary-green)" />
          <span>{market.days.join(', ')}</span>
        </div>

        <div className="card-location">
          <Clock size={15} color="var(--primary-green)" />
          <span>{market.hours.display}</span>
        </div>


        <div className="card-footer">
          <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            {market.area}
          </span>
          <button 
            className="btn-secondary" 
            style={{ padding: '6px 14px', fontSize: '0.85rem' }} 
            onClick={() => onSelectMarket(market)}
          >
            Details <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
