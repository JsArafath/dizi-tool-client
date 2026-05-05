import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login, register } = useAuth()
  const { lang } = useLang()

  const labels = {
    en: {
      loginTitle: 'Welcome Back',
      loginSub: 'Sign in to your account',
      regTitle: 'Create Account',
      regSub: 'Join OfficialToolStore today',
      name: 'Full Name',
      email: 'Email Address',
      password: 'Password',
      loginBtn: 'Sign In',
      regBtn: 'Create Account',
      switchToReg: "Don't have an account? Sign up",
      switchToLogin: 'Already have an account? Sign in',
      loading: 'Please wait...',
    },
    bn: {
      loginTitle: 'স্বাগতম',
      loginSub: 'আপনার অ্যাকাউন্টে প্রবেশ করুন',
      regTitle: 'অ্যাকাউন্ট তৈরি করুন',
      regSub: 'আজই OfficialToolStore এ যোগ দিন',
      name: 'পূর্ণ নাম',
      email: 'ইমেইল ঠিকানা',
      password: 'পাসওয়ার্ড',
      loginBtn: 'সাইন ইন',
      regBtn: 'অ্যাকাউন্ট তৈরি করুন',
      switchToReg: 'অ্যাকাউন্ট নেই? নিবন্ধন করুন',
      switchToLogin: 'ইতিমধ্যে অ্যাকাউন্ট আছে? সাইন ইন করুন',
      loading: 'অপেক্ষা করুন...',
    },
  }
  const l = labels[lang]

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(form.email, form.password)
      } else {
        await register(form.name, form.email, form.password)
      }
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-overlay" id="auth-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        id="auth-modal"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button className="auth-modal-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <path d="M8 21h8M12 17v4"/>
            </svg>
          </div>
          <span>OfficialTool<strong>Store</strong></span>
        </div>

        {/* Title */}
        <div className="auth-title-block">
          <h2>{mode === 'login' ? l.loginTitle : l.regTitle}</h2>
          <p>{mode === 'login' ? l.loginSub : l.regSub}</p>
        </div>

        {/* Error */}
        {error && <div className="auth-error">{error}</div>}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} id="auth-form">
          {mode === 'register' && (
            <div className="auth-field">
              <label htmlFor="auth-name">{l.name}</label>
              <input
                id="auth-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">{l.email}</label>
            <input
              id="auth-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">{l.password}</label>
            <input
              id="auth-password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            id="auth-submit-btn"
            disabled={loading}
          >
            {loading
              ? l.loading
              : mode === 'login' ? l.loginBtn : l.regBtn}
          </button>
        </form>

        {/* Switch mode */}
        <button
          className="auth-switch-btn"
          id="auth-switch-btn"
          onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError('') }}
        >
          {mode === 'login' ? l.switchToReg : l.switchToLogin}
        </button>

        {/* Demo hint */}
        {mode === 'login' && (
          <div className="auth-demo-hint">
            <span>Demo → </span>
            <code>admin@officialtoolstore.com</code>
            <span> / </span>
            <code>admin123</code>
          </div>
        )}
      </div>
    </div>
  )
}
