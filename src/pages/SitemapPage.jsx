import {
  Home, Map, Leaf, Sun, Bookmark, Info, Phone, MessageSquare, LayoutGrid,
  ChevronRight, Globe, Database, Cpu, FileCode, Box, Layers, ArrowRight
} from 'lucide-react'

const siteStructure = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    color: '#16a34a',
    bg: '#dcfce7',
    description: 'Hero search, featured markets, seasonal produce, workflow steps, category browser',
    subItems: [
      'Hero Section – Area/Day/Produce Search',
      'Why Choose FreshFind? (Benefits)',
      'Featured Farmers Markets',
      'In-Season Highlights',
      'Browse By Produce Category',
      'How FreshFind Works (Step Slider)',
    ]
  },
  {
    id: 'directory',
    label: 'Markets',
    icon: Map,
    color: '#0284c7',
    bg: '#e0f2fe',
    description: 'Search, filter, and explore all farmers markets with live open/closed status',
    subItems: [
      'Search & Filter Bar',
      'Market Cards Grid',
      'Live Open / Closed Status Badge',
      'Bookmark Toggle',
      'Market Detail Modal (popup)',
    ]
  },
  {
    id: 'produce',
    label: 'Produce Guide',
    icon: Leaf,
    color: '#15803d',
    bg: '#f0fdf4',
    description: 'Browse all produce items with category filters and bookmark support',
    subItems: [
      'Category Filter Tabs',
      'Produce Cards Grid',
      'Bookmark Toggle per Item',
    ]
  },
  {
    id: 'seasonal',
    label: 'Seasonal',
    icon: Sun,
    color: '#d97706',
    bg: '#fef3c7',
    description: 'Seasonal harvest recommendations based on the current month',
    subItems: [
      'Current Season Banner',
      'Seasonal Produce Cards',
      'Month-by-month Harvest Calendar',
    ]
  },
  {
    id: 'bookmarks',
    label: 'Bookmarks',
    icon: Bookmark,
    color: '#7c3aed',
    bg: '#ede9fe',
    description: 'Saved markets and produce items for quick access',
    subItems: [
      'Saved Markets List',
      'Saved Produce List',
      'Remove Bookmark Option',
      'Empty State Prompt',
    ]
  },
  {
    id: 'about',
    label: 'About',
    icon: Info,
    color: '#0e7490',
    bg: '#cffafe',
    description: 'FreshFind mission, core values, team info and community CTA',
    subItems: [
      'About Banner Image',
      'Mission Statement',
      'Core Values Grid',
      'Community CTA',
    ]
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Phone,
    color: '#b45309',
    bg: '#fef3c7',
    description: 'Contact form with name, email, message and toast confirmation',
    subItems: [
      'Contact Form',
      'Submit Feedback Toast',
      'Location & Hours Info',
    ]
  },
  {
    id: 'feedback',
    label: 'Feedback',
    icon: MessageSquare,
    color: '#dc2626',
    bg: '#fee2e2',
    description: 'User reviews, star rating form, and community feedback wall',
    subItems: [
      'Hero Stats Banner',
      'Star Rating Selector',
      'Topic Category Chips',
      'Name / Email / Message Form',
      'Recommend Radio Buttons',
      'Community Reviews Panel',
      'Rating Distribution Bar',
      'Helpful Like Toggle per Review',
    ]
  },
]

const components = [
  { name: 'Navbar', desc: 'Top bar (clock, zoom, visitor count), logo, nav links, theme toggle, auth buttons' },
  { name: 'Footer', desc: 'Explore links, Shopper Hub, Harvest Types, copyright row' },
  { name: 'MarketCard', desc: 'Market thumbnail, name, open badge, distance, bookmark button' },
  { name: 'MarketDetailModal', desc: 'Full market popup with hours, location, produce list' },
  { name: 'ProduceCard', desc: 'Produce image, category tag, season badge, bookmark button' },
  { name: 'Chatbot', desc: 'Floating chat bubble with keyword-based navigation bot' },
  { name: 'AuthModal', desc: 'Login / Signup modal with form validation' },
  { name: 'RealTimeClock', desc: 'Live date & time display in top bar' },
  { name: 'VisitorCounter', desc: 'Live visit count + online users badge in top bar' },
  { name: 'Breadcrumbs', desc: 'Navigation breadcrumbs utility component' },
]

const dataFiles = [
  { name: 'markets.json', desc: 'All farmers market records – name, area, hours, produce, coordinates' },
  { name: 'produce.json', desc: 'All produce items – name, category, season, description, image' },
]

const utilities = [
  { name: 'isOpen.js', desc: 'Helper to determine if a market is currently open based on day/hours' },
  { name: 'useWow.js', desc: 'Custom React hook to initialize WOW.js scroll animations' },
]

export default function SitemapPage({ onNavigate }) {
  return (
    <div>
      {/* Hero Banner */}
      <div className="sitemap-hero" style={{
        background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #15803d 100%)',
        padding: '50px 0 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.07) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.12)', borderRadius: '999px', padding: '6px 16px', marginBottom: '16px' }}>
            <Globe size={14} color="#a7f3d0" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#a7f3d0', letterSpacing: '0.06em' }}>SITE STRUCTURE</span>
          </div>
          <h1 className="sitemap-hero-title" style={{ fontWeight: 800, color: '#fff', marginBottom: '10px', letterSpacing: '-0.5px' }}>
            FreshFind Sitemap
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.78)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
            A complete overview of every page, component, data source, and utility in this project.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px 80px' }}>

        {/* ── Pages Section ── */}
        <div className="wow fadeInUp" style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg,#2e7d32,#15803d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LayoutGrid size={20} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--dark-green)', margin: 0 }}>Pages</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>All navigable pages in the application</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {siteStructure.map((page, i) => {
              const Icon = page.icon
              return (
                <div
                  key={page.id}
                  className="wow fadeInUp"
                  data-wow-delay={`${i * 0.06}s`}
                  style={{
                    background: 'var(--white)',
                    border: '1.5px solid var(--border-light)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    cursor: 'pointer'
                  }}
                  onClick={() => onNavigate(page.id)}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {/* Card Top */}
                  <div style={{ background: page.bg, padding: '18px 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: page.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={18} color="#fff" />
                      </div>
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: page.color }}>{page.label}</span>
                    </div>
                    <ArrowRight size={16} color={page.color} />
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '14px 20px 18px' }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.5 }}>
                      {page.description}
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {page.subItems.map((item, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', fontSize: '0.78rem', color: 'var(--text-dark)' }}>
                          <ChevronRight size={12} color={page.color} style={{ marginTop: '3px', flexShrink: 0 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Components & Data Row ── */}
        <div className="sitemap-lower-grid" style={{ marginBottom: '40px' }}>

          {/* Components */}
          <div className="wow fadeInLeft">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box size={18} color="#fff" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--dark-green)', margin: 0 }}>Components</h2>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Reusable UI building blocks</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {components.map((c, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '12px',
                  background: 'var(--white)', border: '1px solid var(--border-light)',
                  borderRadius: '12px', padding: '12px 16px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileCode size={14} color="#7c3aed" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#7c3aed', marginBottom: '2px' }}>{c.name}.jsx</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data + Utilities */}
          <div className="wow fadeInRight">
            {/* Data Files */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'linear-gradient(135deg,#0284c7,#0369a1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Database size={18} color="#fff" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--dark-green)', margin: 0 }}>Data Files</h2>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>JSON data sources powering the app</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {dataFiles.map((d, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '12px',
                  background: 'var(--white)', border: '1px solid var(--border-light)',
                  borderRadius: '12px', padding: '12px 16px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Database size={14} color="#0284c7" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0284c7', marginBottom: '2px' }}>{d.name}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{d.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Utilities */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'linear-gradient(135deg,#b45309,#92400e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Cpu size={18} color="#fff" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--dark-green)', margin: 0 }}>Utilities</h2>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Helper functions and custom hooks</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {utilities.map((u, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '12px',
                  background: 'var(--white)', border: '1px solid var(--border-light)',
                  borderRadius: '12px', padding: '12px 16px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Cpu size={14} color="#b45309" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#b45309', marginBottom: '2px' }}>{u.name}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{u.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'linear-gradient(135deg,#dc2626,#b91c1c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Layers size={18} color="#fff" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--dark-green)', margin: 0 }}>Tech Stack</h2>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Core technologies used</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                { label: 'React 18', color: '#0ea5e9', bg: '#e0f2fe' },
                { label: 'Vite', color: '#7c3aed', bg: '#ede9fe' },
                { label: 'JavaScript', color: '#d97706', bg: '#fef3c7' },
                { label: 'CSS Variables', color: '#16a34a', bg: '#dcfce7' },
                { label: 'Lucide Icons', color: '#0e7490', bg: '#cffafe' },
                { label: 'WOW.js', color: '#dc2626', bg: '#fee2e2' },
                { label: 'LocalStorage', color: '#b45309', bg: '#fef3c7' },
                { label: 'Geolocation API', color: '#0284c7', bg: '#e0f2fe' },
              ].map((t, i) => (
                <span key={i} style={{
                  padding: '5px 13px', borderRadius: '999px', fontSize: '0.78rem',
                  fontWeight: 700, color: t.color, background: t.bg,
                  border: `1px solid ${t.color}30`
                }}>{t.label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="wow fadeInUp" style={{
          marginTop: '8px',
          background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)',
          borderRadius: '20px', padding: '32px 36px',
          border: '1px solid rgba(46,125,50,0.15)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--dark-green)', marginBottom: '8px' }}>
            Explore the Application
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Click on any page card above to navigate directly, or use the navbar to browse.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { id: 'home', label: '🏠 Home' },
              { id: 'directory', label: '🗺️ Markets' },
              { id: 'produce', label: '🥦 Produce' },
              { id: 'feedback', label: '💬 Feedback' },
            ].map(link => (
              <button
                key={link.id}
                className="btn-secondary"
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                onClick={() => onNavigate(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
