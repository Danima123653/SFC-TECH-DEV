import { ArrowRight, Leaf, Shield, HeartHandshake } from 'lucide-react'

export default function AboutPage({ onNavigate }) {
  const coreValues = [
    {
      icon: <Leaf size={26} />,
      title: '100% Local Agriculture',
      desc: 'We prioritize family farms within 100 miles of your community to ensure maximum freshness.'
    },
    {
      icon: <Shield size={26} />,
      title: 'Verified Schedules',
      desc: 'Real-time operating hours prevent wasted trips and connect you with active harvest stands.'
    },
    {
      icon: <HeartHandshake size={26} />,
      title: 'Fair Farmer Earnings',
      desc: 'Direct farm sales help family farmers keep over 85% of each food dollar spent.'
    }
  ]

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      <div className="section-title wow fadeInDown">
        <h2>About FreshFind</h2>
      </div>

      <div className="about-banner-wrapper wow zoomIn" data-wow-delay="0.1s" style={{ marginBottom: '44px', overflow: 'hidden', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)' }}>
        <img 
          src="/images/about-banner.png" 
          alt="Fresh & Healthy Vegetables - Straight from Farmers to Your Table" 
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
        />
      </div>

  
      <div className="wow fadeInLeft" data-wow-delay="0.15s" style={{
        background: 'var(--white)',
        padding: '48px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '48px',
        border: '1px solid rgba(46,125,50,0.1)'
      }}>
        <h3 style={{ fontSize: '1.9rem', marginBottom: '16px', color: 'var(--dark-green)' }}>Our Mission & Values</h3>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-dark)', lineHeight: 1.8, marginBottom: '20px' }}>
          FreshFind was created to revitalize direct-to-consumer regional agriculture. We believe that access to fresh, unadulterated, locally-grown organic produce is essential for community wellbeing and environmental sustainability.
        </p>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
          By compiling verified weekly operating schedules, real-time open status notifications, produce harvest availability calendars, and interactive neighborhood navigation, FreshFind makes supporting local farmers easy and rewarding.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '56px' }}>
        {coreValues.map((v, i) => (
          <div key={i} className="benefit-card wow fadeInUp" data-wow-delay={`${(i + 1) * 0.15}s`}>
            <div className="benefit-icon">{v.icon}</div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{v.title}</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{v.desc}</p>
          </div>
        ))}
      </div>

     
      <div className="wow zoomIn" data-wow-delay="0.2s" style={{
        background: 'linear-gradient(135deg, #1b5e20, #2e7d32)',
        color: 'var(--white)',
        padding: '50px',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <h3 style={{ fontSize: '2rem', color: 'var(--white)', marginBottom: '12px' }}>Are You a Local Grower or Market Organizer?</h3>
        <p style={{ opacity: 0.9, maxWidth: '600px', margin: '0 auto 24px', fontSize: '1.05rem', lineHeight: 1.6 }}>
          We would love to feature your stalls on FreshFind. Submit your listing to reach thousands of neighborhood shoppers looking for organic produce.
        </p>
        <button className="btn-accent" onClick={() => onNavigate('contact')}>
          Get in Touch With Us <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
