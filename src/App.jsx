import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MarketDetailModal from './components/MarketDetailModal'
import Chatbot from './components/Chatbot'
import AuthModal from './components/AuthModal'

import Home from './pages/Home'
import MarketDirectory from './pages/MarketDirectory'
import ProduceGuide from './pages/ProduceGuide'
import SeasonalRecommendations from './pages/SeasonalRecommendations'
import BookmarksPage from './pages/BookmarksPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FeedbackPage from './pages/FeedbackPage'
import SitemapPage from './pages/SitemapPage'

import initialMarkets from './data/markets.json'
import initialProduce from './data/produce.json'

import './wow.css'
import { useWow } from './utils/useWow'

export default function App() {
  useWow()
  const [activeTab, setActiveTab] = useState('home')
  const [markets, setMarkets] = useState(initialMarkets)
  const [produce, setProduce] = useState(initialProduce)
  const [selectedMarket, setSelectedMarket] = useState(null)
  const [searchFilters, setSearchFilters] = useState({})
  const [authMode, setAuthMode] = useState(null)
  const [toastMessage, setToastMessage] = useState('')

  // Theme State (light / dark)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('freshfind_theme') || 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    if (theme === 'dark') {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
    try {
      localStorage.setItem('freshfind_theme', theme)
    } catch (err) {
      console.warn('Storage unavailable:', err)
    }
  }, [theme])

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // Retrieve user session and bookmarks from browser localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('freshfind_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('freshfind_bookmarks')
      return saved ? JSON.parse(saved) : { markets: ['m1', 'm3'], produce: ['p1', 'p3'] }
    } catch {
      return { markets: ['m1', 'm3'], produce: ['p1', 'p3'] }
    }
  })

  // Keep in sync with public data using cache-busting timestamp
  useEffect(() => {
    fetch(`/data/markets.json?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => setMarkets(data))
      .catch((err) => console.error('Error fetching market listings:', err))

    fetch(`/data/produce.json?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => setProduce(data))
      .catch((err) => console.error('Error fetching produce data:', err))
  }, [])
  useEffect(() => {
    localStorage.setItem('freshfind_bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const showToast = (message) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage('')
    }, 3200)
  }

  const handleToggleBookmark = (type, id) => {
    setBookmarks((prev) => {
      const currentList = prev[type] || []
      const exists = currentList.includes(id)
      const updatedList = exists
        ? currentList.filter((item) => item !== id)
        : [...currentList, id]

      showToast(exists ? 'Removed from your bookmarks' : 'Saved to your bookmarks!')

      return {
        ...prev,
        [type]: updatedList
      }
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('freshfind_user')
    setCurrentUser(null)
    showToast('Logged out successfully')
  }

  const totalBookmarksCount = (bookmarks.markets?.length || 0) + (bookmarks.produce?.length || 0)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={(mode) => setAuthMode(mode)}
        currentUser={currentUser}
        onLogout={handleLogout}
        bookmarkCount={totalBookmarksCount}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'home' && (
          <Home
            markets={markets}
            produce={produce}
            onSelectMarket={(m) => setSelectedMarket(m)}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onNavigate={(tab) => setActiveTab(tab)}
            onShowToast={showToast}
            onApplySearchFilters={(filters) => setSearchFilters(filters)}
          />
        )}

        {activeTab === 'directory' && (
          <MarketDirectory
            markets={markets}
            onSelectMarket={(m) => setSelectedMarket(m)}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            initialFilters={searchFilters}
          />
        )}

        {activeTab === 'produce' && (
          <ProduceGuide
            produce={produce}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            initialCategory={searchFilters.category || ''}
          />
        )}

        {activeTab === 'seasonal' && (
          <SeasonalRecommendations
            produce={produce}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'bookmarks' && (
          <BookmarksPage
            markets={markets}
            produce={produce}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onSelectMarket={(m) => setSelectedMarket(m)}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage onNavigate={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'contact' && (
          <ContactPage onShowToast={showToast} />
        )}

        {activeTab === 'feedback' && (
          <FeedbackPage onShowToast={showToast} />
        )}

        {activeTab === 'sitemap' && (
          <SitemapPage onNavigate={(tab) => setActiveTab(tab)} />
        )}
      </main>

      <Footer onNavigate={(tab) => setActiveTab(tab)} />

      {/* Selected Market Modal Details */}
      {selectedMarket && (
        <MarketDetailModal
          market={selectedMarket}
          onClose={() => setSelectedMarket(null)}
          isBookmarked={bookmarks.markets.includes(selectedMarket.id)}
          onToggleBookmark={handleToggleBookmark}
          onNavigateDirectory={() => {
            setSelectedMarket(null)
            setActiveTab('directory')
          }}
          onShowToast={showToast}
        />
      )}
      {authMode && (
        <AuthModal
          initialMode={authMode}
          onClose={() => setAuthMode(null)}
          onLoginSuccess={(user) => {
            setCurrentUser(user)
            showToast(`Welcome, ${user.name}!`)
          }}
        />
      )}
      <Chatbot onNavigate={(tab) => setActiveTab(tab)} />
      {toastMessage && (
        <div className="toast">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
