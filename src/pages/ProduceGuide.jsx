import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import ProduceCard from '../components/ProduceCard'

export default function ProduceGuide({
  produce,
  bookmarks,
  onToggleBookmark,
  initialCategory = ''
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [activeSeason, setActiveSeason] = useState('')

  const categoryList = ['All', 'Fruits', 'Vegetables', 'Herbs', 'Grains', 'Dairy']
  const seasonsList = ['All', 'Spring', 'Summer', 'Autumn', 'Winter', 'All-Year']
  const filteredItems = useMemo(() => {
    return produce.filter((item) => {
      if (searchTerm) {
        const query = searchTerm.toLowerCase()
        const matchTitle = item.name.toLowerCase().includes(query)
        const matchDesc = item.description.toLowerCase().includes(query)
        if (!matchTitle && !matchDesc) return false
      }

      if (activeCategory && activeCategory !== 'All' && item.category.toLowerCase() !== activeCategory.toLowerCase()) {
        return false
      }

      if (activeSeason && activeSeason !== 'All' && item.season.toLowerCase() !== activeSeason.toLowerCase()) {
        return false
      }

      return true
    })
  }, [produce, searchTerm, activeCategory, activeSeason])

  const handleResetFilters = () => {
    setSearchTerm('')
    setActiveCategory('')
    setActiveSeason('')
  }

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      <div className="section-title wow fadeInDown">
        <h2>Seasonal Produce Guide</h2>
        <p>Browse fresh farm-to-table produce, harvest seasons, and nearby vendor availability</p>
      </div>
      <div className="wow fadeInDown" data-wow-delay="0.1s" style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
        {categoryList.map((cat, idx) => {
          const isSelected = activeCategory === cat || (cat === 'All' && !activeCategory)
          return (
            <button
              key={idx}
              className="btn-secondary"
              style={{
                padding: '9px 20px',
                fontSize: '0.9rem',
                background: isSelected ? 'linear-gradient(135deg, #2e7d32, #1b5e20)' : 'var(--white)',
                color: isSelected ? 'var(--white)' : 'var(--dark-green)',
                borderColor: isSelected ? 'var(--primary-green)' : 'rgba(46, 125, 50, 0.25)',
                boxShadow: isSelected ? '0 4px 12px rgba(46,125,50,0.25)' : 'none'
              }}
              onClick={() => setActiveCategory(cat === 'All' ? '' : cat)}
            >
              {cat}
            </button>
          )
        })}
      </div>
      <div className="filter-bar wow fadeInDown" data-wow-delay="0.2s">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search size={18} color="var(--primary-green)" />
          <input
            type="text"
            className="input-field"
            style={{ width: '100%', paddingRight: searchTerm ? '34px' : '14px' }}
            placeholder="Search produce name, flavor profile, or benefits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{ position: 'absolute', right: '10px', color: '#94a3b8' }}
              aria-label="Clear search query"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--dark-green)' }}>Season:</label>
          <select
            className="input-field"
            value={activeSeason}
            onChange={(e) => setActiveSeason(e.target.value)}
          >
            {seasonsList.map((season, idx) => (
              <option key={idx} value={season === 'All' ? '' : season}>{season}</option>
            ))}
          </select>

          <button
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            onClick={handleResetFilters}
          >
            Reset
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        Showing <strong>{filteredItems.length}</strong> fresh harvest items
      </div>

      {filteredItems.length > 0 ? (
        <div className="produce-grid">
          {filteredItems.map((p, idx) => (
            <div key={p.id} className="wow fadeInUp" data-wow-delay={`${((idx % 3) + 1) * 0.12}s`}>
              <ProduceCard
                produce={p}
                isBookmarked={bookmarks.produce.includes(p.id)}
                onToggleBookmark={onToggleBookmark}
                onSelectCategory={(cat) => setActiveCategory(cat)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🥕</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>No Produce Matches</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
            No harvest items matched your search text or seasonal selection.
          </p>
          <button className="btn-primary" onClick={handleResetFilters}>
            Show All Produce
          </button>
        </div>
      )}
    </div>
  )
}
