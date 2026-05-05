import { useLang } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLang()

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToHow = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero">
      <div className="container hero-inner">

        {/* Badge */}
        <span className="hero-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L9 9H1l7 5-3 8 7-5 7 5-3-8 7-5h-8z"/>
          </svg>
          {t.heroBadge}
        </span>

        {/* Heading */}
        <h1 className="hero-heading">
          {t.heroHeading1}<br />
          <span className="hero-highlight">{t.heroHeading2}</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub">{t.heroSub}</p>

        {/* CTA Buttons */}
        <div className="hero-cta-row">
          <button className="hero-cta-primary" id="hero-explore-btn" onClick={scrollToProducts}>
            {t.exploreProducts}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
          <button className="hero-cta-secondary" id="hero-how-btn" onClick={scrollToHow}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="10 8 14 12 10 16"/>
            </svg>
            {t.howItWorksBtn}
          </button>
        </div>

        {/* Trust pills */}
        <div className="hero-trust-row">
          <span className="trust-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {t.pill1}
          </span>
          <span className="trust-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            {t.pill2}
          </span>
          <span className="trust-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            {t.pill3}
          </span>
          <a href="https://t.me/officialtoolstore" target="_blank" rel="noreferrer" className="trust-pill trust-pill-tg" id="telegram-cta-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            {t.telegramSupport}
          </a>
        </div>

      </div>
    </section>
  )
}
