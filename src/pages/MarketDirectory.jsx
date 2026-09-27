import { useState, useMemo } from 'react'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import MarketCard from '../components/MarketCard'
import { isMarketOpen } from '../utils/isOpen'

export default function MarketDirectory({
  markets,
  onSelectMarket,
  bookmarks,
  onToggleBookmark,
  initialFilters = {}
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArea, setSelectedArea] = useState(initialFilters.area || '')
  const [selectedDay, setSelectedDay] = useState(initialFilters.day || '')
  const [selectedProduce, setSelectedProduce] = useState(initialFilters.produce || '')
  const [onlyOpenNow, setOnlyOpenNow] = useState(false)
  const [sortBy, setSortBy] = useState('name')
  const filteredMarkets = useMemo(() => {
    return markets.filter((market) => {
      if (searchTerm) {
        const query = searchTerm.toLowerCase()
        const matchesName = market.name.toLowerCase().includes(query)
        const matchesArea = market.area.toLowerCase().includes(query)
        const matchesProduce = market.produce.some((item) => item.toLowerCase().includes(query))
        if (!matchesName && !matchesArea && !matchesProduce) return false
      }
      if (selectedArea && market.area.toLowerCase() !== selectedArea.toLowerCase()) {
        return false
      }
      if (selectedDay && !market.days.some((d) => d.toLowerCase() === selectedDay.toLowerCase())) {
        return false
      }
      if (selectedProduce && !market.produce.some((p) => p.toLowerCase() === selectedProduce.toLowerCase())) {
        return false
      }
      if (onlyOpenNow && !isMarketOpen(market)) {
        return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'area') return a.area.localeCompare(b.area)
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0)
      if (sortBy === 'time') return a.hours.open.localeCompare(b.hours.open)
      return 0
    })
  }, [markets, searchTerm, selectedArea, selectedDay, selectedProduce, onlyOpenNow, sortBy])

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedArea('')
    setSelectedDay('')
    setSelectedProduce('')
    setOnlyOpenNow(false)
    setSortBy('name')
  }

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      <div className="section-title wow fadeInDown">
        <h2>Local Market Directory</h2>
        <p>Discover community farmers markets, certified farm stands, and live schedules</p>
      </div>
      <div className="filter-bar wow fadeInDown" data-wow-delay="0.1s">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search size={18} color="var(--primary-green)" />
          <input
            type="text"
            className="input-field"
            style={{ width: '100%', paddingRight: searchTerm ? '34px' : '15px' }}
            placeholder="Search by market name, area or produce item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{ position: 'absolute', right: '10px', color: '#94a3b8' }}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <select
            className="input-field"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
          >
            <option value="">All Neighborhoods</option>
            <option value="Downtown">Downtown</option>
            <option value="Riverfront">Riverfront</option>
            <option value="Highland Park">Highland Park</option>
            <option value="Sunnyvale">Sunnyvale</option>
            <option value="West End">West End</option>
            <option value="Oakridge">Oakridge</option>
            <option value="Harbor District">Harbor District</option>
            <option value="Valley Plaza">Valley Plaza</option>
            <option value="East Bay">East Bay</option>
            <option value="Northside">Northside</option>
          </select>

          <select
            className="input-field"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="">All Operating Days</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>

          <select
            className="input-field"
            value={selectedProduce}
            onChange={(e) => setSelectedProduce(e.target.value)}
          >
            <option value="">All Produce Types</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Herbs">Herbs</option>
            <option value="Grains">Grains</option>
            <option value="Dairy">Dairy</option>
          </select>

          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', userSelect: 'none' }}>
            <input
              type="checkbox"
              style={{ width: '16px', height: '16px', accentColor: 'var(--primary-green)' }}
              checked={onlyOpenNow}
              onChange={(e) => setOnlyOpenNow(e.target.checked)}
            />
            Open Now Only
          </label>

          <select
            className="input-field"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by: Name (A-Z)</option>
            <option value="rating">Sort by: Rating (High to Low)</option>
            <option value="area">Sort by: Area</option>
            <option value="time">Sort by: Opening Hour</option>
          </select>

          <button className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem' }} onClick={handleResetFilters}>
            Reset
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        Showing <strong>{filteredMarkets.length}</strong> of {markets.length} registered markets
      </div>

      {filteredMarkets.length > 0 ? (
        <div className="markets-grid">
          {filteredMarkets.map((m, idx) => (
            <div key={m.id} className="wow fadeInUp" data-wow-delay={`${((idx % 3) + 1) * 0.12}s`}>
              <MarketCard
                market={m}
                onSelectMarket={onSelectMarket}
                isBookmarked={bookmarks.markets.includes(m.id)}
                onToggleBookmark={onToggleBookmark}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🥬</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>No Matching Markets Found</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
            We could not find any farmers markets matching your specific filters.
          </p>
          <button className="btn-primary" onClick={handleResetFilters}>
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  )
}
