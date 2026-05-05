import { useLang } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="footer" id="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <span className="logo footer-logo">
            OfficialTool<span className="logo-dot">Store</span>
          </span>
          <p className="footer-tagline">{t.footerTagline}</p>
        </div>

        <div className="footer-socials">
          <a href="https://t.me/officialtoolstore" target="_blank" rel="noreferrer" className="social-icon" id="footer-telegram" aria-label="Telegram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </a>
          <a href="https://t.me/officialtoolsupport" target="_blank" rel="noreferrer" className="social-icon" id="footer-support" aria-label="Support">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </a>
          <a href="mailto:support@officialtoolstore.com" className="social-icon" id="footer-email" aria-label="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>

        <div className="footer-copy">&copy; 2026 OfficialToolStore</div>
      </div>
    </footer>
  )
}
