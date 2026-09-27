import { useState, useEffect } from 'react'
import { Download, Store, ShoppingBag, FileText, Trash2 } from 'lucide-react'
import MarketCard from '../components/MarketCard'
import ProduceCard from '../components/ProduceCard'

export default function BookmarksPage({
  markets,
  produce,
  bookmarks,
  onToggleBookmark,
  onSelectMarket,
  onShowToast
}) {
  const [activeTab, setActiveTab] = useState('markets')
  const [sessionNotes, setSessionNotes] = useState({})
  useEffect(() => {
    try {
      const storedNotes = JSON.parse(sessionStorage.getItem('freshfind_market_notes') || '{}')
      setSessionNotes(storedNotes)
    } catch {
      setSessionNotes({})
    }
  }, [bookmarks])

  const savedMarkets = markets.filter((m) => bookmarks.markets.includes(m.id))
  const savedProduce = produce.filter((p) => bookmarks.produce.includes(p.id))

  const handleExportJSON = () => {
    const exportPayload = {
      exportTimestamp: new Date().toISOString(),
      app: 'FreshFind Discovery Platform',
      savedMarkets,
      savedProduce,
      sessionNotes
    }

    const jsonString = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2))
    const link = document.createElement('a')
    link.href = jsonString
    link.download = `freshfind-bookmarks-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(link)
    link.click()
    link.remove()

    if (onShowToast) onShowToast('Exported saved bookmarks as JSON!')
  }

  const handleExportText = () => {
    let report = `FRESHFIND SAVED BOOKMARKS REPORT\nGenerated: ${new Date().toLocaleString()}\n`
    report += `==============================================\n\n`
    
    report += `SAVED FARMERS MARKETS (${savedMarkets.length}):\n`
    savedMarkets.forEach((m, idx) => {
      report += `[${idx + 1}] ${m.name}\n`
      report += `    Area: ${m.area}\n`
      report += `    Address: ${m.address}\n`
      report += `    Days: ${m.days.join(', ')}\n`
      report += `    Hours: ${m.hours.display}\n`
      if (sessionNotes[m.id]) {
        report += `    My Notes: "${sessionNotes[m.id]}"\n`
      }
      report += `\n`
    })

    report += `SAVED SEASONAL PRODUCE (${savedProduce.length}):\n`
    savedProduce.forEach((p, idx) => {
      report += `[${idx + 1}] ${p.name} (${p.category})\n`
      report += `    Season: ${p.season}\n`
      report += `    Availability: ${p.availability}\n`
      report += `    Description: ${p.description}\n\n`
    })

    const textString = 'data:text/plain;charset=utf-8,' + encodeURIComponent(report)
    const link = document.createElement('a')
    link.href = textString
    link.download = `freshfind-saved-report-${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(link)
    link.click()
    link.remove()

    if (onShowToast) onShowToast('Downloaded text summary report!')
  }

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      <div className="section-title wow fadeInDown">
        <h2>My Saved Bookmarks & Notes</h2>
        <p>Keep track of your favorite local markets, seasonal produce, and shopper notes</p>
      </div>
<div className="wow fadeInUp" data-wow-delay="0.1s" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn-secondary"
            style={{
              padding: '10px 22px',
              background: activeTab === 'markets' ? 'linear-gradient(135deg, #2e7d32, #1b5e20)' : 'var(--white)',
              color: activeTab === 'markets' ? 'var(--white)' : 'var(--dark-green)',
              borderColor: activeTab === 'markets' ? 'var(--primary-green)' : 'rgba(46, 125, 50, 0.25)',
              boxShadow: activeTab === 'markets' ? '0 4px 12px rgba(46,125,50,0.25)' : 'none'
            }}
            onClick={() => setActiveTab('markets')}
          >
            <Store size={16} /> Saved Markets ({savedMarkets.length})
          </button>

          <button
            className="btn-secondary"
            style={{
              padding: '10px 22px',
              background: activeTab === 'produce' ? 'linear-gradient(135deg, #2e7d32, #1b5e20)' : 'var(--white)',
              color: activeTab === 'produce' ? 'var(--white)' : 'var(--dark-green)',
              borderColor: activeTab === 'produce' ? 'var(--primary-green)' : 'rgba(46, 125, 50, 0.25)',
              boxShadow: activeTab === 'produce' ? '0 4px 12px rgba(46,125,50,0.25)' : 'none'
            }}
            onClick={() => setActiveTab('produce')}
          >
            <ShoppingBag size={16} /> Saved Produce ({savedProduce.length})
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={handleExportText}>
            <FileText size={15} /> Export TXT Report
          </button>
          <button className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }} onClick={handleExportJSON}>
            <Download size={15} /> Export JSON
          </button>
        </div>
      </div>
      {activeTab === 'markets' && (
        savedMarkets.length > 0 ? (
          <div className="wow fadeInUp" data-wow-delay="0.15s">
            <div className="markets-grid">
              {savedMarkets.map((m) => (
                <MarketCard
                  key={m.id}
                  market={m}
                  onSelectMarket={onSelectMarket}
                  isBookmarked={true}
                  onToggleBookmark={onToggleBookmark}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>No Saved Markets Yet</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Click the heart icon on any market card in the directory to store your favorites here.
            </p>
          </div>
        )
      )}
      {activeTab === 'produce' && (
        savedProduce.length > 0 ? (
          <div className="wow fadeInUp" data-wow-delay="0.15s">
            <div className="produce-grid">
              {savedProduce.map((p) => (
                <ProduceCard
                  key={p.id}
                  produce={p}
                  isBookmarked={true}
                  onToggleBookmark={onToggleBookmark}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>No Saved Produce Yet</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Tap the heart icon on any fruit or vegetable to save it to your harvest list.
            </p>
          </div>
        )
      )}
    </div>
  )
}
