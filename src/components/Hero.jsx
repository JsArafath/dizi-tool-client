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



      </div>
    </section>
  )
}
