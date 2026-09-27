import { useState } from 'react'
import { Star, MessageSquare, ThumbsUp, CheckCircle, Send, Sparkles, Heart, User, BarChart2 } from 'lucide-react'

const initialReviews = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    location: 'Downtown Plaza',
    rating: 5,
    category: 'Market Experience',
    date: '2 days ago',
    comment: 'FreshFind made it so easy to find open farmers markets on weekends! The live open status feature saved me a wasted drive.',
    likes: 12,
    userLiked: false
  },
  {
    id: 2,
    name: 'David Miller',
    location: 'Highland Park',
    rating: 5,
    category: 'Produce Quality',
    date: '5 days ago',
    comment: 'The produce guide harvest calendar is fantastic. I found organic heritage tomatoes directly from local family growers!',
    likes: 19,
    userLiked: false
  },
  {
    id: 3,
    name: 'Elena Rostova',
    location: 'Riverfront Bazaar',
    rating: 4,
    category: 'Feature Request',
    date: '1 week ago',
    comment: 'Love the dark mode and bookmarks feature! Would be awesome to see vendor pre-orders added in the future.',
    likes: 8,
    userLiked: false
  }
]

const feedbackCategories = [
  'Market Experience',
  'Produce Quality',
  'Website Design',
  'Feature Request',
  'Other Feedback'
]

const statsData = [
  { label: 'Total Reviews', value: '1,240+' },
  { label: 'Avg. Rating', value: '4.8 ★' },
  { label: 'Would Recommend', value: '96%' }
]

export default function FeedbackPage({ onShowToast }) {
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [category, setCategory] = useState('Market Experience')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [wouldRecommend, setWouldRecommend] = useState('yes')
  const [submitted, setSubmitted] = useState(false)
  const [reviews, setReviews] = useState(initialReviews)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) {
      onShowToast && onShowToast('Please write your feedback before submitting.')
      return
    }

    const newEntry = {
      id: Date.now(),
      name: name.trim() || 'Anonymous Supporter',
      location: 'Community Member',
      rating,
      category,
      date: 'Just now',
      comment: message.trim(),
      likes: 0,
      userLiked: false
    }

    setReviews([newEntry, ...reviews])
    setSubmitted(true)
    onShowToast && onShowToast('Thank you! Your feedback has been submitted successfully.')
  }

  const handleReset = () => {
    setName('')
    setEmail('')
    setMessage('')
    setRating(5)
    setWouldRecommend('yes')
    setCategory('Market Experience')
    setSubmitted(false)
  }

  const handleLike = (id) => {
    setReviews((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, likes: item.userLiked ? item.likes - 1 : item.likes + 1, userLiked: !item.userLiked }
          : item
      )
    )
  }

  const starColor = (index) => (hoverRating || rating) >= index + 1 ? '#f59e0b' : '#d1d5db'

  return (
    <div>
      {/* Page Hero Banner */}
      <div className="feedback-hero" style={{
        background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #15803d 100%)',
        padding: '52px 0 44px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 80% 30%, rgba(255,255,255,0.06) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(255,255,255,0.04) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.12)', borderRadius: '999px', padding: '6px 16px', marginBottom: '18px' }}>
            <MessageSquare size={14} color="#a7f3d0" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a7f3d0', letterSpacing: '0.05em' }}>COMMUNITY FEEDBACK</span>
          </div>
          <h1 className="feedback-hero-title" style={{ fontWeight: 800, color: '#ffffff', marginBottom: '12px', letterSpacing: '-0.5px' }}>
            Share Your FreshFind Experience
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', maxWidth: '540px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            Your voice shapes our platform. Tell us what you love and how we can serve your community better.
          </p>

          {/* Stats Row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
            {statsData.map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#4ade80' }}>{s.value}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container feedback-page-container" style={{ padding: '50px 24px 80px' }}>
        <div className="feedback-layout">

          {/* ───────────── LEFT: Feedback Form ───────────── */}
          <div className="wow fadeInLeft" data-wow-delay="0.1s">
            <div style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-light)',
              overflow: 'hidden'
            }}>
              {/* Form Header */}
              <div className="feedback-card-header" style={{ background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', padding: '24px 30px 20px', borderBottom: '1px solid var(--border-light)' }}>
                <h2 style={{ fontSize: '1.35rem', color: 'var(--dark-green)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MessageSquare size={20} color="var(--primary-green)" /> Write Your Review
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Share your honest experience with the community</p>
              </div>

              <div className="feedback-card-content" style={{ padding: '28px 30px' }}>
                {submitted ? (
                  /* Success State */
                  <div style={{ textAlign: 'center', padding: '20px 0 10px' }}>
                    <div style={{
                      width: '72px', height: '72px',
                      background: 'linear-gradient(135deg,#dcfce7,#bbf7d0)',
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 20px'
                    }}>
                      <CheckCircle size={38} color="#16a34a" />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--dark-green)', marginBottom: '10px' }}>Thank You!</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px', fontSize: '0.95rem' }}>
                      Your feedback has been published and helps us improve FreshFind for everyone.
                    </p>
                    <button className="btn-primary" style={{ padding: '10px 24px' }} onClick={handleReset}>
                      Submit Another Review
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* Star Rating */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '10px', color: 'var(--dark-green)' }}>
                        Overall Rating *
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                            style={{ padding: '2px', background: 'none', border: 'none', cursor: 'pointer', transition: 'transform 0.15s' }}
                            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(1.3)' }}
                            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                          >
                            <Star size={30} fill={starColor(star - 1)} color={starColor(star - 1)} />
                          </button>
                        ))}
                        <span style={{ marginLeft: '10px', fontSize: '0.9rem', fontWeight: 700, color: '#d97706' }}>
                          {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][rating]}
                        </span>
                      </div>
                    </div>

                    {/* Category Chips */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '10px', color: 'var(--dark-green)' }}>
                        Feedback Topic
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {feedbackCategories.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setCategory(cat)}
                            style={{
                              padding: '6px 14px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                              border: category === cat ? '2px solid var(--primary-green)' : '1.5px solid var(--border-light)',
                              background: category === cat ? 'var(--light-green)' : 'var(--soft-cream)',
                              color: category === cat ? 'var(--primary-green)' : 'var(--text-muted)',
                              transition: 'all 0.18s ease'
                            }}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name & Email */}
                    <div className="feedback-fields">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-green)' }}>Your Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Alex Rivera"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          style={{
                            width: '100%', padding: '10px 13px', borderRadius: '12px',
                            border: '1.5px solid var(--border-light)', background: 'var(--soft-cream)',
                            color: 'var(--text-dark)', fontSize: '0.88rem', outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-green)' }}>Email (Optional)</label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{
                            width: '100%', padding: '10px 13px', borderRadius: '12px',
                            border: '1.5px solid var(--border-light)', background: 'var(--soft-cream)',
                            color: 'var(--text-dark)', fontSize: '0.88rem', outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px', color: 'var(--dark-green)' }}>
                        Your Feedback *
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell us about your experience — what worked well, and what could be improved..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{
                          width: '100%', padding: '11px 13px', borderRadius: '12px',
                          border: '1.5px solid var(--border-light)', background: 'var(--soft-cream)',
                          color: 'var(--text-dark)', fontSize: '0.88rem', lineHeight: 1.6, resize: 'vertical', outline: 'none'
                        }}
                      />
                      <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {message.length} characters
                      </div>
                    </div>

                    {/* Recommend Toggle */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '10px', color: 'var(--dark-green)' }}>
                        Would you recommend FreshFind to a friend?
                      </label>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        {[
                          { value: 'yes', label: '👍 Yes, definitely!' },
                          { value: 'maybe', label: '🤔 Maybe' },
                          { value: 'no', label: '👎 Not yet' }
                        ].map((opt) => (
                          <label key={opt.value} style={{
                            display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
                            fontSize: '0.85rem', fontWeight: wouldRecommend === opt.value ? 700 : 500,
                            color: wouldRecommend === opt.value ? 'var(--primary-green)' : 'var(--text-dark)'
                          }}>
                            <input
                              type="radio"
                              name="recommend"
                              value={opt.value}
                              checked={wouldRecommend === opt.value}
                              onChange={() => setWouldRecommend(opt.value)}
                            />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '13px', fontSize: '0.95rem', justifyContent: 'center', gap: '8px' }}>
                      <Send size={16} /> Submit My Feedback
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* ───────────── RIGHT: Community Reviews ───────────── */}
          <div className="wow fadeInRight" data-wow-delay="0.2s">
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--dark-green)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} color="var(--primary-green)" /> Community Reviews
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, background: 'var(--soft-cream)', padding: '4px 12px', borderRadius: '999px', border: '1px solid var(--border-light)' }}>
                {reviews.length} reviews
              </span>
            </div>

            {/* Rating Summary Bar */}
            <div style={{
              background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '20px 22px',
              boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)', marginBottom: '20px',
              display: 'flex', alignItems: 'center', gap: '20px'
            }}>
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--dark-green)', lineHeight: 1 }}>4.8</div>
                <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', margin: '6px 0 4px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Average Rating</div>
              </div>
              <div style={{ flex: 1 }}>
                {[5, 4, 3, 2, 1].map((star) => {
                  const pct = star === 5 ? 78 : star === 4 ? 16 : star === 3 ? 4 : star === 2 ? 1 : 1
                  return (
                    <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', width: '10px' }}>{star}</span>
                      <Star size={11} fill="#f59e0b" color="#f59e0b" />
                      <div style={{ flex: 1, height: '7px', background: 'var(--soft-cream)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', borderRadius: '999px' }} />
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', width: '28px', textAlign: 'right' }}>{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Review Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '600px', overflowY: 'auto', paddingRight: '4px' }}>
              {reviews.map((fb) => (
                <div
                  key={fb.id}
                  style={{
                    background: 'var(--white)', padding: '20px 22px', borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)',
                    transition: 'box-shadow 0.2s ease'
                  }}
                >
                  {/* Review Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '38px', height: '38px', borderRadius: '50%',
                        background: 'linear-gradient(135deg,#e8f5e9,#dcfce7)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                      }}>
                        <User size={18} color="var(--primary-green)" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--dark-green)' }}>{fb.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{fb.location} · {fb.date}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill={i < fb.rating ? '#f59e0b' : 'none'} color={i < fb.rating ? '#f59e0b' : '#d1d5db'} />
                      ))}
                    </div>
                  </div>

                  {/* Category Tag */}
                  <span style={{
                    display: 'inline-block', fontSize: '0.7rem', fontWeight: 700, padding: '2px 10px',
                    borderRadius: '999px', background: 'var(--light-green)', color: 'var(--primary-green)',
                    border: '1px solid rgba(46,125,50,0.2)', marginBottom: '10px'
                  }}>
                    {fb.category}
                  </span>

                  {/* Comment */}
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.6, marginBottom: '14px' }}>
                    "{fb.comment}"
                  </p>

                  {/* Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--border-light)' }}>
                    <button
                      onClick={() => handleLike(fb.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700,
                        color: fb.userLiked ? 'var(--primary-green)' : 'var(--text-muted)',
                        background: fb.userLiked ? 'var(--light-green)' : 'transparent',
                        padding: '4px 10px', borderRadius: '999px', border: '1px solid',
                        borderColor: fb.userLiked ? 'rgba(46,125,50,0.3)' : 'var(--border-light)',
                        transition: 'all 0.2s ease', cursor: 'pointer'
                      }}
                    >
                      <ThumbsUp size={13} fill={fb.userLiked ? 'currentColor' : 'none'} />
                      {fb.likes} Helpful
                    </button>
                    <span style={{ fontSize: '0.72rem', color: 'var(--primary-green)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Heart size={11} fill="currentColor" /> Verified Visitor
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom CTA Banner */}
        <div className="wow fadeInUp" data-wow-delay="0.3s" style={{
          marginTop: '56px', background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)',
          borderRadius: 'var(--radius-lg)', padding: '38px 40px',
          border: '1px solid rgba(46,125,50,0.15)', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '16px',
              background: 'linear-gradient(135deg,#2e7d32,#15803d)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <BarChart2 size={24} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--dark-green)', marginBottom: '4px' }}>
                Help Shape FreshFind's Future
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
                Every review is read by our team and used to improve the platform for your community.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center', background: 'var(--white)', padding: '12px 22px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark-green)' }}>96%</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Satisfied Users</div>
            </div>
            <div style={{ textAlign: 'center', background: 'var(--white)', padding: '12px 22px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark-green)' }}>1,240+</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Reviews Submitted</div>
            </div>
            <div style={{ textAlign: 'center', background: 'var(--white)', padding: '12px 22px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark-green)' }}>4.8 ★</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Avg. Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
