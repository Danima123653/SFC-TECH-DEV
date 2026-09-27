import { Heart, Sun, Store, Sparkles } from 'lucide-react'

export default function ProduceCard({ produce, isBookmarked, onToggleBookmark, onSelectCategory }) {
  return (
    <div className="produce-card">
      <div className="card-img-wrapper">
        <img 
          src={produce.image} 
          alt={produce.name} 
          className="card-img" 
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = '/images/produce-basil.jpg'
          }}
        />
        <div className="card-img-gradient-overlay" />

        <button
          className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onToggleBookmark('produce', produce.id)
          }}
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark produce'}
          aria-label="Bookmark Produce"
        >
          <Heart size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="card-body">
        <div className="card-header-meta">
          <span className="badge badge-category">
            {produce.category}
          </span>
          <span className="badge badge-season">
            <Sun size={12} /> {produce.season}
          </span>
        </div>

        <h3 className="card-title">{produce.name}</h3>
        
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.5 }}>
          {produce.description}
        </p>

        <div style={{ 
          fontSize: '0.825rem', 
          background: 'var(--soft-cream)', 
          padding: '8px 12px', 
          borderRadius: 'var(--radius-sm)', 
          marginBottom: '14px',
          color: 'var(--dark-green)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Sparkles size={14} color="#d97706" />
          <span><strong>Peak Months:</strong> {produce.availability}</span>
        </div>

        <div className="card-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            <Store size={14} color="var(--primary-green)" />
            <span>{produce.relatedMarkets ? produce.relatedMarkets.length : 0} markets carry this</span>
          </div>

          <button
            className="btn-secondary"
            style={{ padding: '5px 12px', fontSize: '0.8rem' }}
            onClick={() => onSelectCategory && onSelectCategory(produce.category)}
          >
            {produce.category}
          </button>
        </div>
      </div>
    </div>
  )
}
