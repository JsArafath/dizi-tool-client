import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useLang } from '../context/LanguageContext'
import { Link } from 'react-router-dom'

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
          <div style={{ position: 'relative', width: '100%' }}>
            {product.tags && product.tags.length > 0 && (
              <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '4px', zIndex: 10 }}>
                {product.tags.map((tag, i) => (
                  <span key={i} style={{ background: '#f0506e', color: 'white', fontSize: '11px', fontWeight: 'bold', padding: '2px 6px', textTransform: 'uppercase' }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <Link to={`/product/${product.id}`} style={{ display: 'block' }}>
              <img 
                src={product.image} 
                alt={name} 
                style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} 
              />
            </Link>
          </div>
        ) : (
          <div className="product-icon">
            {product.icon || '📦'}
          </div>
        )}
        <div className="product-card-info" style={{ textAlign: 'center', padding: '15px' }}>
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
            <h3 className="product-name" title={name} style={{ fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '8px', minHeight: '40px' }}>{name}</h3>
          </Link>
          {product.category && (
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
              {product.category}
            </div>
          )}
          {/* Stars */}
          <div style={{ color: '#ffb400', fontSize: '14px', marginBottom: '8px' }}>
            ★★★★★
          </div>
        </div>
      </div>



      {/* Pricing */}
      <div className="pricing-row" style={{ justifyContent: 'center', padding: '0 15px', color: '#8cc63f', fontWeight: 'bold', fontSize: '14px', marginBottom: '15px' }}>
        <div className="price-value">
          {Number(currentBdt).toLocaleString()} VND
        </div>
      </div>

      <div style={{ padding: '0 15px 20px', textAlign: 'center' }}>
        <button
          className="add-to-cart-btn"
          id={`atc-${product.id}`}
          onClick={() => {
            const itemToAdd = hasPackages ? { ...product, selectedPackage: product.packages[selectedPkgIndex] } : product;
            addToCart(itemToAdd);
          }}
          style={{ background: '#8cc63f', color: 'white', padding: '8px 24px', fontSize: '13px', fontWeight: 'bold', borderRadius: '0', border: 'none', cursor: 'pointer', display: 'inline-block', width: 'auto' }}
        >
          SELECT
        </button>
      </div>
    </article>
  )
}
