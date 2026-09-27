import { useState, useEffect } from 'react'
import { X, Calendar, Clock, Heart, Share2, Edit3, Trash2, Check, ExternalLink } from 'lucide-react'
import Breadcrumbs from './Breadcrumbs'
import { isMarketOpen } from '../utils/isOpen'

export default function MarketDetailModal({ market, onClose, isBookmarked, onToggleBookmark, onNavigateDirectory, onShowToast }) {
  if (!market) return null

  const openStatus = isMarketOpen(market)
  const [noteInput, setNoteInput] = useState('')
  const [savedNote, setSavedNote] = useState('')
  const [isEditingNote, setIsEditingNote] = useState(false)

  // Load session note for this particular market
  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem('freshfind_market_notes') || '{}')
      const noteForMarket = stored[market.id] || ''
      setSavedNote(noteForMarket)
      setNoteInput(noteForMarket)
    } catch {
     
      setSavedNote('')
    }
  }, [market.id])

  const handleSaveNote = () => {
    if (!noteInput.trim()) return

    const notesObj = JSON.parse(sessionStorage.getItem('freshfind_market_notes') || '{}')
    notesObj[market.id] = noteInput.trim()
    sessionStorage.setItem('freshfind_market_notes', JSON.stringify(notesObj))
    setSavedNote(noteInput.trim())
    setIsEditingNote(false)
    if (onShowToast) onShowToast('Personal note saved for this session!')
  }

  const handleDeleteNote = () => {
    const notesObj = JSON.parse(sessionStorage.getItem('freshfind_market_notes') || '{}')
    delete notesObj[market.id]
    sessionStorage.setItem('freshfind_market_notes', JSON.stringify(notesObj))
    setSavedNote('')
    setNoteInput('')
    setIsEditingNote(false)
    if (onShowToast) onShowToast('Note removed from session storage.')
  }

  const handleShareMarket = async () => {
    const shareUrl = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: market.name,
          text: `Check out ${market.name} in ${market.area} on FreshFind!`,
          url: shareUrl
        })
        return
      } catch (err) {
        
      }
    }

    
    navigator.clipboard.writeText(shareUrl)
    if (onShowToast) onShowToast('Link copied to clipboard!')
  }

  const breadcrumbsList = [
    { label: 'Home', action: onClose },
    { label: 'Market Directory', action: onNavigateDirectory },
    { label: market.name, action: null }
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={20} />
        </button>

   
        <div style={{ position: 'relative' }}>
          <img src={market.image} alt={market.name} className="modal-header-img" />
          <div className="card-img-gradient-overlay" />
          <span
            className={`badge ${openStatus ? 'badge-open' : 'badge-closed'}`}
            style={{ position: 'absolute', bottom: '20px', left: '26px' }}
          >
            {openStatus && <span className="radar-dot" />}
            {openStatus ? 'Open Now' : 'Closed Today'}
          </span>
        </div>

        <div className="modal-content-body">
          <Breadcrumbs items={breadcrumbsList} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', margin: '16px 0' }}>
            <div>
              <h2 style={{ fontSize: '2.1rem', marginBottom: '6px' }}>{market.name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                <span>{market.address} ({market.area})</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className={`btn-secondary ${isBookmarked ? 'active' : ''}`}
                style={{ padding: '8px 18px' }}
                onClick={() => onToggleBookmark('market', market.id)}
              >
                <Heart size={16} fill={isBookmarked ? '#ef4444' : 'none'} color={isBookmarked ? '#ef4444' : 'currentColor'} />
                {isBookmarked ? 'Saved' : 'Save Market'}
              </button>

              <button className="btn-primary" style={{ padding: '8px 18px' }} onClick={handleShareMarket}>
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', margin: '20px 0 28px', lineHeight: 1.7 }}>
            {market.description}
          </p>

          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '28px' }}>
            <div style={{ background: 'var(--soft-cream)', padding: '18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: 800, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--dark-green)' }}>
                <Calendar size={17} color="var(--primary-green)" /> Weekly Schedule
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)' }}>{market.days.join(', ')}</p>
            </div>

            <div style={{ background: 'var(--soft-cream)', padding: '18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: 800, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--dark-green)' }}>
                <Clock size={17} color="var(--primary-green)" /> Operating Hours
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)' }}>{market.hours.display}</p>
            </div>
          </div>

          
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Available Fresh Produce</h4>
            <div className="tag-list">
              {market.produce.map((item, idx) => (
                <span key={idx} className="tag" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

        
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Market Location Map</h4>
            <div className="map-placeholder">
              <div style={{ fontWeight: 800, fontSize: '1.15rem' }}>{market.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                GPS: {market.latitude}° N, {market.longitude}° W
              </div>
              <a
                href={`https://www.google.com/maps?q=${market.latitude},${market.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ padding: '6px 16px', fontSize: '0.825rem', marginTop: '6px' }}
              >
                Open in Google Maps <ExternalLink size={13} />
              </a>
            </div>
          </div>

          
          <div className="notes-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--dark-green)' }}>Shopper Notes</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Kept during this browser session</span>
            </div>

            {savedNote && !isEditingNote ? (
              <div>
                <p style={{ background: 'var(--white)', padding: '14px', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem', marginBottom: '14px', border: '1px solid #bbf7d0', color: '#166534' }}>
                  "{savedNote}"
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn-secondary" style={{ padding: '5px 14px', fontSize: '0.825rem' }} onClick={() => setIsEditingNote(true)}>
                    <Edit3 size={13} /> Edit Note
                  </button>
                  <button className="btn-secondary" style={{ padding: '5px 14px', fontSize: '0.825rem', color: '#b91c1c' }} onClick={handleDeleteNote}>
                    <Trash2 size={13} /> Delete Note
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <textarea
                  className="input-field"
                  style={{ width: '100%', minHeight: '85px', marginBottom: '12px', background: 'var(--white)' }}
                  placeholder="e.g. Try the artisanal sourdough stall on the west entrance, opens early..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn-primary" style={{ padding: '7px 18px', fontSize: '0.85rem' }} onClick={handleSaveNote}>
                    <Check size={14} /> Save Note
                  </button>
                  {isEditingNote && (
                    <button className="btn-secondary" style={{ padding: '7px 18px', fontSize: '0.85rem' }} onClick={() => setIsEditingNote(false)}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
