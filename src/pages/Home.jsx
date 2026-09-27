import { useState, useEffect } from 'react'
import { Search, Calendar, ShoppingBag, ShieldCheck, HeartPulse, Users, ArrowRight, Compass, Sparkles, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import MarketCard from '../components/MarketCard'
import ProduceCard from '../components/ProduceCard'

export default function Home({
  markets,
  produce,
  onSelectMarket,
  bookmarks,
  onToggleBookmark,
  onNavigate,
  onShowToast,
  onApplySearchFilters
}) {
  const [searchArea, setSearchArea] = useState('')
  const [searchDay, setSearchDay] = useState('')
  const [searchProduce, setSearchProduce] = useState('')
  const [locationStatus, setLocationStatus] = useState('')

  const handleHeroSearch = (e) => {
    e.preventDefault()
    onApplySearchFilters({ area: searchArea, day: searchDay, produce: searchProduce })
    onNavigate('directory')
  }

  const handleUseLocation = () => {
    setLocationStatus('Locating your position...')
    
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.')
      if (onShowToast) onShowToast('Browser does not support geolocation.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(2)
        const lng = position.coords.longitude.toFixed(2)
        setLocationStatus(`Found your area (${lat}°, ${lng}°)!`)
        if (onShowToast) onShowToast('Location found! Showing nearby Downtown markets.')
        onApplySearchFilters({ area: 'Downtown' })
        onNavigate('directory')
      },
      () => {
        setLocationStatus('Location access was denied. Please choose your area.')
        if (onShowToast) onShowToast('Location access denied. Please select an area manually.')
      }
    )
  }

  const featuredMarkets = markets.slice(0, 3)
  const seasonalProduce = produce.slice(0, 6)

  const produceCategories = [
    { name: 'Fruits', image: '/images/category-fruits.png', icon: 'Fr', desc: 'Crisp apples, stone fruits & berries' },
    { name: 'Vegetables', image: '/images/category-vegetables.png', icon: 'Vg', desc: 'Organically grown greens & root veg' },
    { name: 'Herbs', image: '/images/category-herbs.png', icon: 'Hb', desc: 'Culinary and medicinal fresh herbs' },
    { name: 'Grains', image: '/images/category-grains.png', icon: 'Gr', desc: 'Whole heirloom grains & stoneground flours' },
    { name: 'Dairy', image: '/images/category-dairy.png', icon: 'Dr', desc: 'Pasture-raised farm milk & artisan cheeses' }
  ]

  const workflowSteps = [
    {
      num: '1',
      title: 'Find a Market',
      desc: 'Search by neighborhood, operating days, or farm produce.',
      detail: 'Find verified regional farmers markets near your doorstep in seconds with live neighborhood and distance sorting.',
      icon: Compass,
      actionText: 'Browse Market Directory',
      actionTab: 'directory'
    },
    {
      num: '2',
      title: 'Check Live Hours',
      desc: 'See if stalls are open right now before leaving home.',
      detail: 'Real-time open & closing radar badges prevent wasted trips so you arrive when local produce is at peak freshness.',
      icon: Calendar,
      actionText: 'Check Live Hours',
      actionTab: 'directory'
    },
    {
      num: '3',
      title: 'Save Favorites',
      desc: 'Bookmark vendors and add personal notes for your next trip.',
      detail: 'Curate your custom weekend shopping list and pin your favorite growers for quick, convenient access anytime.',
      icon: Award,
      actionText: 'View My Saved Bookmarks',
      actionTab: 'bookmarks'
    },
    {
      num: '4',
      title: 'Support Local Farms',
      desc: 'Eat healthier while directly backing family-run farm businesses.',
      detail: 'Enjoy peak flavor and 100% natural nutritional value while directly strengthening your local community economy.',
      icon: Users,
      actionText: 'Explore Seasonal Produce',
      actionTab: 'seasonal'
    }
  ]

  const [activeStepSlide, setActiveStepSlide] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepSlide((prev) => (prev + 1) % workflowSteps.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [workflowSteps.length, activeStepSlide])

  return (
    <div>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content wow fadeInLeft">
            <h1>
              Taste the Difference of <span className="highlight-green">Fresh Local</span> Harvest
            </h1>
            
            <p>
              Connect directly with verified farmers markets, independent growers, and peak-season harvest across your community. Real food, grown with care, straight from the earth to your kitchen table.
            </p>
 <form onSubmit={handleHeroSearch} className="search-box-card wow fadeInUp" data-wow-delay="0.15s">
              <div className="search-controls-grid">
                <div className="input-group">
                  <label>Area / Neighborhood</label>
                  <select
                    className="input-field"
                    value={searchArea}
                    onChange={(e) => setSearchArea(e.target.value)}
                  >
                    <option value="">All Areas</option>
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
                </div>

                <div className="input-group">
                  <label><Calendar size={14} /> Open Day</label>
                  <select
                    className="input-field"
                    value={searchDay}
                    onChange={(e) => setSearchDay(e.target.value)}
                  >
                    <option value="">Any Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>

                <div className="input-group">
                  <label><ShoppingBag size={14} /> Produce Category</label>
                  <select
                    className="input-field"
                    value={searchProduce}
                    onChange={(e) => setSearchProduce(e.target.value)}
                  >
                    <option value="">All Produce</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Herbs">Herbs</option>
                    <option value="Grains">Grains</option>
                    <option value="Dairy">Dairy</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary" style={{ height: '46px', borderRadius: '10px', padding: '0 24px' }}>
                  <Search size={18} /> Search
                </button>
              </div>

              <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <button type="button" className="geolocation-btn" onClick={handleUseLocation}>
                  <Compass size={15} /> Find Markets Near My Current Location
                </button>
                {locationStatus && (
                  <span style={{ fontSize: '0.825rem', color: 'var(--primary-green)', fontWeight: 700 }}>
                    {locationStatus}
                  </span>
                )}
              </div>
            </form>
          </div>
          <div className="hero-showcase-container wow zoomIn" data-wow-delay="0.25s">
            <div className="orbit-scene">
              <div className="orbit-glow-backdrop" />
              <div className="orbit-ring-outer" />
              <div className="orbit-ring-inner" />
              <div className="orbit-center-core">
                <div className="center-core-badge">
                  <img src="/images/logo.png" alt="FreshFind Logo" className="center-core-logo-img" />
                </div>
              </div>
              <div className="orbit-rotation-track">
                <div className="orbit-item orbit-item-1" title="Fresh Harvest Basket">
                  <div className="orbit-card">
                    <img src="/images/basket1.jpg" alt="Organic Vegetable Basket" className="orbit-img" />
                  </div>
                </div>

                <div className="orbit-item orbit-item-2" title="Seasonal Greens Basket">
                  <div className="orbit-card">
                    <img src="/images/basket2.jpg" alt="Fresh Farm Produce" className="orbit-img" />
                  </div>
                </div>

                <div className="orbit-item orbit-item-3" title="Farm Harvest Basket">
                  <div className="orbit-card">
                    <img src="/images/basket3.png" alt="Market Fresh Vegetables" className="orbit-img" />
                  </div>
                </div>

                <div className="orbit-item orbit-item-4" title="Artisan Veggie Basket">
                  <div className="orbit-card">
                    <img src="/images/basket4.jpg" alt="Crisp Garden Produce" className="orbit-img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container" style={{ padding: '20px 24px 50px' }}>
        <div className="section-title wow fadeInDown">
          <h2>Why Choose FreshFind?</h2>
          <p>We empower communities to support local agriculture and eat healthier produce</p>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card wow fadeInUp" data-wow-delay="0.1s">
            <div className="benefit-icon"><ShieldCheck /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Verified Local Farmers</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Direct access to registered small family growers and independent regional producers.
            </p>
          </div>

          <div className="benefit-card wow fadeInUp" data-wow-delay="0.2s">
            <div className="benefit-icon"><ShoppingBag /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>True Peak Freshness</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Harvested at natural ripeness without long cold storage or industrial preservatives.
            </p>
          </div>

          <div className="benefit-card wow fadeInUp" data-wow-delay="0.3s">
            <div className="benefit-icon"><HeartPulse /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Nutrient-Dense Food</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Full of natural vitamins, antioxidants, and pure flavor from sustainable soil.
            </p>
          </div>

          <div className="benefit-card wow fadeInUp" data-wow-delay="0.4s">
            <div className="benefit-icon"><Users /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Thriving Communities</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Every dollar spent at a farmers market recirculates directly in your local economy.
            </p>
          </div>
        </div>
      </section>
      <section className="container" style={{ padding: '30px 24px 60px' }}>
        <div className="section-title wow fadeInDown">
          <h2>Featured Farmers Markets</h2>
          <p>Explore some of the highest-rated markets open in your neighborhood</p>
        </div>

        <div className="markets-grid">
          {featuredMarkets.map((m, idx) => (
            <div key={m.id} className="wow fadeInUp" data-wow-delay={`${(idx + 1) * 0.15}s`}>
              <MarketCard
                market={m}
                onSelectMarket={onSelectMarket}
                isBookmarked={bookmarks.markets.includes(m.id)}
                onToggleBookmark={onToggleBookmark}
              />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }} className="wow fadeInUp" data-wow-delay="0.3s">
          <button className="btn-secondary" onClick={() => onNavigate('directory')}>
            Explore All Markets <ArrowRight size={16} />
          </button>
        </div>
      </section>
      <section className="container" style={{ padding: '30px 24px 60px' }}>
        <div className="section-title wow fadeInDown">
          <h2>In-Season Highlights</h2>
          <p>Nature's finest seasonal produce at their peak harvest quality</p>
        </div>

        <div className="produce-grid">
          {seasonalProduce.map((p, idx) => (
            <div key={p.id} className="wow fadeInUp" data-wow-delay={`${((idx % 3) + 1) * 0.15}s`}>
              <ProduceCard
                produce={p}
                isBookmarked={bookmarks.produce.includes(p.id)}
                onToggleBookmark={onToggleBookmark}
                onSelectCategory={(cat) => {
                  onApplySearchFilters({ category: cat })
                  onNavigate('produce')
                }}
              />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }} className="wow fadeInUp" data-wow-delay="0.3s">
          <button className="btn-secondary" onClick={() => onNavigate('seasonal')}>
            View Full Seasonal Guide <ArrowRight size={16} />
          </button>
        </div>
      </section>
      <section className="container" style={{ padding: '30px 24px 60px' }}>
        <div className="section-title wow fadeInDown">
          <h2>Browse By Produce Category</h2>
          <p>Quickly locate fresh staples and artisanal farm goods</p>
        </div>

        <div className="categories-grid">
          {produceCategories.map((c, idx) => (
            <div
              key={idx}
              className="category-card wow zoomIn"
              data-wow-delay={`${idx * 0.1}s`}
              onClick={() => {
                onApplySearchFilters({ category: c.name })
                onNavigate('produce')
              }}
            >
              <div className="category-icon">
                {c.image ? (
                  <img src={c.image} alt={c.name} className="category-icon-img" />
                ) : (
                  c.icon
                )}
              </div>
              <h3>{c.name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container" style={{ padding: '30px 24px 60px' }}>
        <div className="section-title wow fadeInDown">
          <h2>How FreshFind Works</h2>
          <p>Simple and seamless steps to fresh farm-to-table eating</p>
        </div>

        <div className="steps-slider-container wow fadeInUp" data-wow-delay="0.15s" style={{ position: 'relative', paddingBottom: '70px' }}>
          <button
            type="button"
            className="slider-nav-btn prev"
            onClick={() => setActiveStepSlide((prev) => (prev - 1 + workflowSteps.length) % workflowSteps.length)}
            aria-label="Previous step"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="steps-slider-viewport">
            <div
              className="steps-slider-track"
              style={{ transform: `translateX(-${activeStepSlide * 100}%)` }}
            >
              {workflowSteps.map((s, idx) => {
                const StepIcon = s.icon
                return (
                  <div key={idx} className="step-slide-item">
                    <div className="step-slide-card step-slide-featured-card">
                      {idx === activeStepSlide && (
                        <div key={activeStepSlide} className="step-slide-progress-bar" />
                      )}
                      <div className="step-slide-header">
                        <span className="step-slide-badge">Step {s.num}</span>
                        <div className="step-slide-icon-wrap">
                          <StepIcon size={26} />
                        </div>
                      </div>
                      <h3 className="step-slide-title">{s.title}</h3>
                      <p className="step-slide-main-desc">{s.desc}</p>
                      <p className="step-slide-detail">{s.detail}</p>
                      <div className="step-slide-footer">
                        <button
                          type="button"
                          className="btn-primary"
                          style={{ padding: '10px 22px', fontSize: '0.9rem' }}
                          onClick={() => onNavigate(s.actionTab)}
                        >
                          {s.actionText} <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <button
            type="button"
            className="slider-nav-btn next"
            onClick={() => setActiveStepSlide((prev) => (prev + 1) % workflowSteps.length)}
            aria-label="Next step"
          >
            <ChevronRight size={22} />
          </button>

          {/* Basket image — absolutely at bottom-left of slider container, half inside half outside */}
          <img
            className="workflow-basket-image"
            src="/images/veggie-basket-new.jpg"
            alt="Fresh Vegetable Basket"
            style={{
              position: 'absolute',
              bottom: '0px',
              left: '30px',
              width: '200px',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '50%',
              animation: 'basketFloat 3s ease-in-out infinite',
              filter: 'drop-shadow(0 8px 18px rgba(46,125,50,0.3))',
              zIndex: 20,
              pointerEvents: 'none'
            }}
          />
        </div>
        <div className="steps-slider-dots">
          {workflowSteps.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`slider-dot ${idx === activeStepSlide ? 'active' : ''}`}
              onClick={() => setActiveStepSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>
      <section className="container">
        <div className="location-banner wow zoomIn" data-wow-delay="0.15s">
          <div>
            <h2>Find Nearby Markets Today</h2>
            <p style={{ opacity: 0.95, maxWidth: '520px', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Looking for freshly picked fruits and greens right now? Tap below to calculate distance to the nearest open farmers market.
            </p>
          </div>
          <button className="btn-accent" onClick={handleUseLocation}>
            <Compass size={20} /> Use My Current Location
          </button>
        </div>
      </section>
    </div>
  )
}
