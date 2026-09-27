import { useState, useEffect } from 'react'
import { Menu, X, User, LogOut, Sun, Moon } from 'lucide-react'
import RealTimeClock from './RealTimeClock'
import VisitorCounter from './VisitorCounter'

export default function Navbar({ activeTab, setActiveTab, onOpenAuth, currentUser, onLogout, bookmarkCount, theme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'directory', label: 'Markets' },
    { id: 'produce', label: 'Produce Guide' },
    { id: 'seasonal', label: 'Seasonal' },
    { id: 'bookmarks', label: 'Bookmarks', count: bookmarkCount },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'sitemap', label: 'Sitemap' }
  ]

  const handleNavigate = (tabId) => {
    setActiveTab(tabId)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const [zoom, setZoom] = useState(() => {
    try { return parseFloat(localStorage.getItem('freshfind_zoom') || '1') } catch { return 1 }
  })

  const applyZoom = (newZoom) => {
    const clamped = Math.min(1.5, Math.max(0.7, parseFloat(newZoom.toFixed(1))))
    setZoom(clamped)
    document.body.style.zoom = clamped
    try { localStorage.setItem('freshfind_zoom', clamped) } catch {}
  }

  useEffect(() => { document.body.style.zoom = zoom }, [])

  return (
    <header className="app-header">
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-info">
            <RealTimeClock />
          </div>

          {/* Zoom Controls - no label */}
          <div className="zoom-controls" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <button
              onClick={() => applyZoom(zoom - 0.1)}
              title="Zoom Out"
              style={{
                width: '24px', height: '24px', borderRadius: '6px',
                background: 'rgba(255,255,255,0.18)', color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
                lineHeight: 1, transition: 'all 0.15s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.32)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
            >−</button>
            <button
              onClick={() => applyZoom(1)}
              title="Reset Zoom"
              style={{
                padding: '0 9px', height: '24px', borderRadius: '6px',
                background: 'rgba(255,255,255,0.18)', color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer',
                transition: 'all 0.15s', whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.32)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
            >{Math.round(zoom * 100)}%</button>
            <button
              onClick={() => applyZoom(zoom + 0.1)}
              title="Zoom In"
              style={{
                width: '24px', height: '24px', borderRadius: '6px',
                background: 'rgba(255,255,255,0.18)', color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
                lineHeight: 1, transition: 'all 0.15s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.32)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
            >+</button>
          </div>

          <VisitorCounter />
        </div>
      </div>

      
      <div className="container">
        <nav className="navbar">
          <div className="logo" onClick={() => handleNavigate('home')}>
            <img src="/images/logo.png" alt="FreshFind Logo" className="logo-img" />
            <div className="logo-text">
              <span className="logo-title">FreshFind</span>
              <span className="logo-subtitle">Farm Fresh • Healthy You</span>
            </div>
          </div>

         
          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            {navLinks.map((item) => {
              const isActive = activeTab === item.id
              return (
                <li key={item.id}>
                  <button
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavigate(item.id)}
                  >
                    <span>{item.label}</span>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="bookmark-counter-pill">
                        {item.count}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}

          </ul>

          <div className="nav-actions">
            <button
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Dark / Light Theme"
            >
              {theme === 'dark' ? (
                <Sun size={19} color="#fbbf24" />
              ) : (
                <Moon size={19} color="#475569" />
              )}
            </button>

            {currentUser ? (
              <div className="nav-auth-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--dark-green)', whiteSpace: 'nowrap' }}>
                  Hi, {currentUser.name}
                </span>
                <button 
                  className="btn-secondary" 
                  style={{ padding: '5px 11px', fontSize: '0.78rem' }} 
                  onClick={onLogout}
                >
                  <LogOut size={13} /> Logout
                </button>
              </div>
            ) : (
              <div className="nav-auth-actions" style={{ display: 'flex', gap: '6px' }}>
                <button 
                  className="btn-secondary" 
                  style={{ padding: '6px 13px', fontSize: '0.8rem' }} 
                  onClick={() => onOpenAuth('login')}
                >
                  <User size={13} /> Log In
                </button>
                <button 
                  className="btn-primary" 
                  style={{ padding: '6px 13px', fontSize: '0.8rem' }} 
                  onClick={() => onOpenAuth('signup')}
                >
                  Sign Up
                </button>
              </div>
            )}

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
