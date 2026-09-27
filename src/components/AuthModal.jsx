import { useState } from 'react'
import { X, Lock, Mail, User } from 'lucide-react'

const USERS_KEY = 'freshfind_users'

function getRegisteredUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveRegisteredUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export default function AuthModal({ initialMode = 'login', onClose, onLoginSuccess }) {
  const [currentMode, setCurrentMode] = useState(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState('')

  const resetFields = () => {
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setValidationError('')
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setValidationError('')

    if (!email || !email.includes('@')) {
      setValidationError('Valid email address daalen.')
      return
    }

    if (!password || password.length < 6) {
      setValidationError('Password kam az kam 6 characters ka hona chahiye.')
      return
    }

    if (currentMode === 'signup') {
  
      if (!name.trim()) {
        setValidationError('Apna poora naam daalen.')
        return
      }
      if (password !== confirmPassword) {
        setValidationError('Passwords match nahi kar rahe.')
        return
      }

      const users = getRegisteredUsers()
      const alreadyExists = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())

      if (alreadyExists) {
        setValidationError('Yeh email already registered hai. Login karein.')
        return
      }

      const newUser = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password
      }
      users.push(newUser)
      saveRegisteredUsers(users)

      
      const sessionUser = { name: newUser.name, email: newUser.email }
      localStorage.setItem('freshfind_user', JSON.stringify(sessionUser))
      onLoginSuccess(sessionUser)
      onClose()

    } else {
     
      const users = getRegisteredUsers()
      const matched = users.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password
      )

      if (!matched) {
        setValidationError('Email ya password ghalat hai. Dobara check karein.')
        return
      }

      const sessionUser = { name: matched.name, email: matched.email }
      localStorage.setItem('freshfind_user', JSON.stringify(sessionUser))
      onLoginSuccess(sessionUser)
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: '440px', padding: '36px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--dark-green)' }}>
            {currentMode === 'login' ? 'Welcome Back' : 'Create Free Account'}
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {currentMode === 'login'
              ? 'Apne saved markets aur notes access karein'
              : 'Local food community mein shamil hon'}
          </p>
        </div>

        {validationError && (
          <div style={{
            background: '#fee2e2',
            color: '#b91c1c',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            marginBottom: '18px',
            border: '1px solid #fecaca'
          }}>
            {validationError}
          </div>
        )}

        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {currentMode === 'signup' && (
            <div className="input-group">
              <label><User size={13} /> Full Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="Apna naam likhein"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="input-group">
            <label><Mail size={13} /> Email Address</label>
            <input
              type="email"
              className="input-field"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label><Lock size={13} /> Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {currentMode === 'signup' && (
            <div className="input-group">
              <label><Lock size={13} /> Confirm Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '8px', padding: '12px' }}
          >
            {currentMode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '22px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          {currentMode === 'login' ? (
            <span>
              Account nahi hai?{' '}
              <button
                style={{ color: 'var(--primary-green)', fontWeight: 700, textDecoration: 'underline' }}
                onClick={() => { setCurrentMode('signup'); resetFields() }}
              >
                Sign Up karein
              </button>
            </span>
          ) : (
            <span>
              Already account hai?{' '}
              <button
                style={{ color: 'var(--primary-green)', fontWeight: 700, textDecoration: 'underline' }}
                onClick={() => { setCurrentMode('login'); resetFields() }}
              >
                Sign In karein
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
