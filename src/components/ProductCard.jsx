import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useLang } from '../context/LanguageContext'

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false)
  const { addToCart } = useCart()
  const { lang, t } = useLang()

  // Package logic
  const hasPackages = product.packages && product.packages.length > 0;
  const [selectedPkgIndex, setSelectedPkgIndex] = useState(0);
  
  const currentUsdt = hasPackages ? product.packages[selectedPkgIndex].usdt : product.usdt;
  const currentBdt = hasPackages ? product.packages[selectedPkgIndex].bdt : product.bdt;

  // Pick the right language for name/desc
  const name      = product.name[lang]
  const shortDesc = product.shortDesc[lang]
  const fullDesc  = product.fullDesc[lang]

  return (
    <article className="product-card" data-id={product.id}>
      {/* Top row */}
      <div className="product-card-top">
        {product.image ? (
          <img 
            src={product.image} 
            alt={name} 
            style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
          />
        ) : (
          <div className="product-icon" style={{ background: product.iconBg || '#f0f4f8' }}>
            {product.icon || '📦'}
          </div>
        )}
        <div className="product-card-info">
          <h3 className="product-name">{name}</h3>
          <div className="product-badges">
            <span className="badge badge-warranty">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              {t.warranty}
            </span>
            <span className="badge badge-refund">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.27"/>
              </svg>
              {t.refundPolicy}
            </span>
            <span className="badge badge-speed">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              60 min
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="product-desc">{shortDesc}</p>
        <button
          className={`view-details-btn${open ? ' open' : ''}`}
          id={`vd-${product.id}`}
          onClick={() => setOpen(v => !v)}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points={open ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}/>
          </svg>
          {open ? t.hideDetails : t.viewDetails}
        </button>
        {open && (
          <div className="product-full-desc open" id={`fd-${product.id}`}>
            {fullDesc}
          </div>
        )}
      </div>

      {/* Stock */}
      <div className="stock-row">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
        </svg>
        <span className="stock-in">{product.stock} {t.inStock}</span>
        <span className="stock-divider">|</span>
        <span className="stock-sold">{product.sold.toLocaleString()} {t.sold}</span>
      </div>

      {/* Pricing */}
      <div className="pricing-row">
        <div className="price-box">
          <div className="price-label">BINANCE</div>
          <div className="price-value">${Number(currentUsdt).toFixed(2)}</div>
          <div className="price-currency">USDT</div>
        </div>
        <div className="price-box">
          <div className="price-label">BKASH / NAGAD</div>
          <div className="price-value">৳{currentBdt}</div>
          <div className="price-currency">BDT</div>
        </div>
      </div>

      {/* Package Selection */}
      {hasPackages && (
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Select Duration</label>
          <select 
            value={selectedPkgIndex} 
            onChange={e => setSelectedPkgIndex(Number(e.target.value))}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', background: '#f8fafc', color: '#0f172a', fontWeight: '600' }}
          >
            {product.packages.map((pkg, idx) => (
              <option key={idx} value={idx}>{pkg.duration}</option>
            ))}
          </select>
        </div>
      )}

      {/* Add to cart */}
      <button
        className="add-to-cart-btn"
        id={`atc-${product.id}`}
        onClick={() => {
          const itemToAdd = hasPackages ? { ...product, selectedPackage: product.packages[selectedPkgIndex] } : product;
          addToCart(itemToAdd);
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        {t.addToCart}
      </button>
    </article>
  )
}
