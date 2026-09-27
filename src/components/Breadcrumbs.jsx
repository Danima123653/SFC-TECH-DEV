import { ChevronRight } from 'lucide-react'

export default function Breadcrumbs({ items, onNavigate }) {
  return (
    <div className="breadcrumbs">
      {items.map((item, index) => (
        <span key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          {index > 0 && <ChevronRight size={14} color="#9ca3af" />}
          {item.action ? (
            <span
              onClick={item.action}
              style={{ cursor: 'pointer', color: 'var(--primary-green)', fontWeight: 600 }}
            >
              {item.label}
            </span>
          ) : (
            <span style={{ color: 'var(--text-dark)', fontWeight: 700 }}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </div>
  )
}
