import { useLang } from '../context/LanguageContext'

export default function HowItWorks() {
  const { t } = useLang()

  const steps = [
    {
      label: t.step1Label,
      title: t.step1Title,
      desc: t.step1Desc,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      ),
    },
    {
      label: t.step2Label,
      title: t.step2Title,
      desc: t.step2Desc,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
    },
    {
      label: t.step3Label,
      title: t.step3Title,
      desc: t.step3Desc,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      ),
    },
  ]

  return (
    <section className="how-section" id="how-it-works">
      <div className="container">
        <h2 className="section-title">{t.howItWorks}</h2>
        <div className="steps-grid">
          {steps.map((step) => (
            <div className="step-card" key={step.label}>
              <div className="step-icon">{step.icon}</div>
              <span className="step-label">{step.label}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
