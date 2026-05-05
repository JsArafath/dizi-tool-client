import { useCart } from '../context/CartContext'
import { useLang } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

export default function Header({ onCartOpen, onLoginOpen, onAdminOpen }) {
  const { cart } = useCart()
  const { lang, toggleLang, t } = useLang()
  const { user, logout } = useAuth()
  const count = cart.length

  return (
    <header className="header" id="header">
      <div className="container header-inner">
        <a href="#" className="logo" id="logo-link">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <path d="M8 21h8M12 17v4"/>
          </svg>
          OfficialTool<span className="logo-dot">Store</span>
        </a>

        <nav className="header-nav">
          <a href="#" className="track-order-btn" id="track-order-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
            </svg>
            {t.trackOrder}
          </a>

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

          {/* Language Toggle */}
          <button className="lang-toggle-btn" id="lang-toggle-btn" onClick={toggleLang}
            title={lang === 'en' ? 'বাংলায় দেখুন' : 'View in English'}>
            <span className="lang-globe-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </span>
            <span className="lang-label">{lang === 'en' ? 'বাংলা' : 'EN'}</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
