import { useState } from 'react'
import { Mail, Phone, Send, CheckCircle2 } from 'lucide-react'

export default function ContactPage({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      if (onShowToast) onShowToast('Please fill out all required fields.')
      return
    }

    setHasSubmitted(true)
    if (onShowToast) onShowToast('Message sent! Our team will reply shortly.')
  }

  const handleResetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' })
    setHasSubmitted(false)
  }

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      <div className="section-title wow fadeInDown">
        <h2>Contact Our Team</h2>
        <p>Questions about market hours, seasonal schedules, or listing your farm?</p>
      </div>

      <div className="contact-layout">
      
        <div className="contact-form-card wow fadeInLeft" data-wow-delay="0.1s" style={{
          background: 'var(--white)',
          padding: '40px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid rgba(46,125,50,0.1)'
        }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '20px', color: 'var(--dark-green)' }}>Send Us a Note</h3>

          {hasSubmitted ? (
            <div style={{
              textAlign: 'center',
              padding: '44px 24px',
              background: 'linear-gradient(135deg, #f0fdf4, #e8f5e9)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #bbf7d0'
            }}>
              <CheckCircle2 size={52} color="var(--primary-green)" style={{ margin: '0 auto 16px' }} />
              <h4 style={{ fontSize: '1.35rem', color: 'var(--dark-green)', marginBottom: '8px' }}>Thank You for Reaching Out!</h4>
              <p style={{ color: '#166534', fontSize: '0.98rem', marginBottom: '24px', lineHeight: 1.6 }}>
                Your message has been received by our community coordinators. We typically respond within 24 business hours.
              </p>
              <button className="btn-secondary" onClick={handleResetForm}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="input-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="e.g. sarah@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Subject</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Market listing suggestion or inquiry"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Message *</label>
                <textarea
                  className="input-field"
                  rows="5"
                  placeholder="Tell us what you have in mind..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '8px', alignSelf: 'flex-start' }}>
                <Send size={16} /> Send Message
              </button>
            </form>
          )}
        </div>
 <div className="wow fadeInRight" data-wow-delay="0.15s">
          <div className="contact-info-card" style={{
            background: 'var(--white)',
            padding: '36px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '24px',
            border: '1px solid rgba(46,125,50,0.1)'
          }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '24px', color: 'var(--dark-green)' }}>Direct Support</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'var(--light-green)', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Email Us</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>SFC Tech-Dev@gmail.com</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'var(--light-green)', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Call Our Desk</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>03058418880</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'var(--light-green)', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--primary-green)' }}>HQ</span>
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Headquarters</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Progressive Center Karachi,Pakistan </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-map-card" style={{
            background: 'var(--white)',
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid rgba(46,125,50,0.1)'
          }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--dark-green)' }}>FreshFind HQ Area</h4>
            <div className="map-placeholder" style={{ height: '180px', margin: 0 }}>
              <div style={{ fontWeight: 800 }}>FreshFind Community Hub</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>100 Harvest Way, Green City</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
