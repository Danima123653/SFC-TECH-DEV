export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear()

  const handleNav = (targetTab) => {
    onNavigate(targetTab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ marginBottom: '16px' }} onClick={() => handleNav('home')}>
              <img src="/images/logo.png" alt="FreshFind Logo" className="logo-img" />
              <div className="logo-text">
                <span className="logo-title" style={{ color: 'var(--white)' }}>FreshFind</span>
                <span className="logo-subtitle" style={{ color: '#86efac' }}>Farm Fresh • Healthy You</span>
              </div>
            </div>
            <p style={{ color: '#a7f3d0', fontSize: '0.92rem', maxWidth: '340px', lineHeight: 1.7 }}>
              Discover neighborhood farmers markets, certified organic growers, and seasonal harvest. Healthy eating starts directly with family farms.
            </p>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><button onClick={() => handleNav('home')}>Home Overview</button></li>
              <li><button onClick={() => handleNav('directory')}>Market Directory</button></li>
              <li><button onClick={() => handleNav('produce')}>Produce Guide</button></li>
              <li><button onClick={() => handleNav('seasonal')}>Seasonal Calendar</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Shopper Hub</h4>
            <ul>
              <li><button onClick={() => handleNav('bookmarks')}>Saved Bookmarks</button></li>
              <li><button onClick={() => handleNav('about')}>About FreshFind</button></li>
              <li><button onClick={() => handleNav('contact')}>Get in Touch</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Harvest Types</h4>
            <ul>
              <li><button onClick={() => handleNav('produce')}>Orchard Fruits</button></li>
              <li><button onClick={() => handleNav('produce')}>Organic Vegetables</button></li>
              <li><button onClick={() => handleNav('produce')}>Aromatic Herbs</button></li>
              <li><button onClick={() => handleNav('produce')}>Artisan Cheeses & Grains</button></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} FreshFind Discovery Platform. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <span>Certified Regional Partners</span>
            <span>Community Supported Agriculture</span>
            <span>Privacy & Terms</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
