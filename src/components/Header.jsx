import { useCart } from '../context/CartContext'
import { useLang } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

import { Link } from 'react-router-dom'

export default function Header({ onCartOpen, onLoginOpen, onAdminOpen }) {
  const { cart } = useCart()
  const { lang, toggleLang, t } = useLang()
  const { user, logout } = useAuth()
  const count = cart.length

  return (
    <header className="header" id="header">
      <div className="container header-inner">
        <Link to="/" className="logo" id="logo-link">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          OfficialToolStore
        </Link>

        {/* Search Bar */}
        <div style={{ flex: 1, margin: '0 40px', display: 'flex', border: '1px solid #e1e1e1', borderRadius: '4px', overflow: 'hidden' }}>
          <input 
            type="text" 
            placeholder={t.searchProducts} 
            style={{ flex: 1, padding: '10px 16px', border: 'none', outline: 'none' }} 
          />
          <div style={{ borderLeft: '1px solid #e1e1e1', display: 'flex', alignItems: 'center', background: '#fff', padding: '0 10px' }}>
            <select style={{ border: 'none', outline: 'none', background: 'transparent', color: '#888', fontSize: '13px' }}>
              <option>{t.selectCategory}</option>
            </select>
          </div>
          <button style={{ padding: '10px 20px', background: '#8cc63f', border: 'none', color: 'white', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </div>

        <nav className="header-nav">
          <a href="#" className="track-order-btn" id="track-order-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
            </svg>
            {t.trackOrder}
          </a>

          {/* Language Toggle */}
          <button className="lang-toggle-btn" onClick={toggleLang} aria-label="Toggle language">
            <span className="lang-globe-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </span>
            <span className="lang-label">{lang === 'en' ? 'EN' : 'BN'}</span>
          </button>

          {/* Auth + Admin section */}
          {user ? (
            <div className="user-menu" id="user-menu">
              <div className="user-avatar" title={user.name}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user.name.split(' ')[0]}</span>

              {/* Admin Panel button — only for admins */}
              {user.role === 'admin' && (
                <button
                  className="admin-panel-btn"
                  id="admin-panel-btn"
                  onClick={onAdminOpen}
                  title="Admin Panel"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  {lang === 'en' ? 'Admin' : 'অ্যাডমিন'}
                </button>
              )}

              <button
                className="logout-btn"
                id="logout-btn"
                onClick={logout}
                title="Logout"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                {lang === 'en' ? 'Logout' : 'লগআউট'}
              </button>
            </div>
          ) : (
            <button className="login-btn" id="login-btn" onClick={onLoginOpen}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              {lang === 'en' ? 'Login' : 'লগইন'}
            </button>
          )}

          {/* Cart */}
          <button className="cart-btn" id="cart-btn" onClick={onCartOpen} aria-label="Open cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {count > 0 && <span className="cart-count visible">{count}</span>}
          </button>

        </nav>
      </div>

      {/* Green Navigation Bar */}
      <div style={{ background: '#8cc63f', color: 'white' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '50px' }}>
          <div style={{ display: 'flex', gap: '24px', fontSize: '14px', fontWeight: 'bold' }}>
            <Link to="/shop" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
              {t.shop}
            </Link>
            <a href="#" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>{t.order}</a>
            <a href="#" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>{t.get2fa}</a>
            <a href="#" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>{t.blog}</a>
            <a href="#" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>{t.contact}</a>
          </div>
          <a href="#" style={{ background: '#f0506e', color: 'white', textDecoration: 'none', padding: '0 15px', height: '100%', display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '14px', gap: '8px' }}>
            {t.support}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
