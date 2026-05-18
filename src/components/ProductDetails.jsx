import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useLang } from '../context/LanguageContext'

export default function ProductDetails({ extraProducts = [] }) {
  const { id } = useParams()
  const { addToCart } = useCart()
  const { lang, t } = useLang()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    // Scroll to top when page opens
    window.scrollTo(0, 0)

    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          const all = [
            ...data.products,
            ...extraProducts.filter(ep => !data.products.find(p => p.id === ep.id))
          ]
          const found = all.find(p => p.id === Number(id))
          setProduct(found)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id, extraProducts])

  if (loading) return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}><div className="spinner" /></div>
  if (!product) return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}><h2>Product not found</h2><Link to="/">Go back</Link></div>

  const name = product.name[lang] || product.name.en

  return (
    <div className="container" style={{ padding: '20px 24px', maxWidth: '1180px', margin: '0 auto', background: '#fff', minHeight: '80vh' }}>
      
      {/* Breadcrumbs */}
      <div style={{ fontSize: '12px', color: '#888', marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#888', textDecoration: 'none' }}>Homepage</Link> / 
        {product.category && <span style={{ margin: '0 5px' }}>{product.category} / </span>}
        <span style={{ color: '#333' }}>{name}</span>
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* Left Column - Image */}
        <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
          <div style={{ position: 'relative' }}>
             {product.tags && product.tags.length > 0 && (
              <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '4px', zIndex: 10 }}>
                {product.tags.map((tag, i) => (
                  <span key={i} style={{ background: '#f0506e', color: 'white', fontSize: '11px', fontWeight: 'bold', padding: '2px 6px', textTransform: 'uppercase' }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <img src={product.image} alt={name} style={{ width: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Right Column - Details */}
        <div style={{ flex: '1 1 500px' }}>
          <h1 style={{ fontSize: '28px', color: '#333', marginBottom: '15px', fontWeight: '500' }}>{name}</h1>
          <div style={{ fontSize: '24px', color: '#8cc63f', fontWeight: 'bold', marginBottom: '20px' }}>
            ৳ {Number(product.bdt).toLocaleString()} {product.packages && product.packages.length > 1 ? `- ৳ ${Number(product.packages[product.packages.length-1].bdt).toLocaleString()}` : ''}
          </div>

          {/* Discount Table (Mocked) */}
          <div style={{ marginBottom: '20px', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '10px 0' }}>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Quantity discounts</div>
            <table style={{ width: '100%', fontSize: '13px', color: '#888', textAlign: 'left' }}>
              <tbody>
                <tr>
                  <th style={{ padding: '4px 0', fontWeight: 'normal' }}>Quantity</th>
                  <th style={{ padding: '4px 0', fontWeight: 'normal' }}>3 - 4</th>
                  <th style={{ padding: '4px 0', fontWeight: 'normal' }}>5+</th>
                </tr>
                <tr>
                  <td style={{ padding: '4px 0' }}>Discount</td>
                  <td style={{ padding: '4px 0', color: '#8cc63f' }}>৳ 50</td>
                  <td style={{ padding: '4px 0', color: '#8cc63f' }}>৳ 100</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Options (Dynamic based on product.options) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px', fontSize: '13px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '120px', fontWeight: 'bold', color: '#333' }}>Guarantee :</div>
              <div style={{ display: 'flex', gap: '15px', color: '#666' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="radio" name="guarantee" readOnly checked={product.options?.guarantee === 'It comes with a warranty.'} disabled={product.options?.guarantee !== 'It comes with a warranty.'} /> 
                  <span style={{ color: product.options?.guarantee === 'It comes with a warranty.' ? '#333' : 'inherit', fontWeight: product.options?.guarantee === 'It comes with a warranty.' ? '500' : 'normal', opacity: product.options?.guarantee === 'It comes with a warranty.' ? 1 : 0.5 }}>It comes with a warranty.</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="radio" name="guarantee" readOnly checked={product.options?.guarantee === 'No warranty' || !product.options?.guarantee} disabled={product.options?.guarantee !== 'No warranty' && product.options?.guarantee} /> 
                  <span style={{ color: (product.options?.guarantee === 'No warranty' || !product.options?.guarantee) ? '#333' : 'inherit', fontWeight: (product.options?.guarantee === 'No warranty' || !product.options?.guarantee) ? '500' : 'normal', opacity: (product.options?.guarantee === 'No warranty' || !product.options?.guarantee) ? 1 : 0.5 }}>No warranty</span>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '120px', fontWeight: 'bold', color: '#333' }}>Share :</div>
              <div style={{ display: 'flex', gap: '15px', color: '#666' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="radio" name="share" readOnly checked={product.options?.share === 'Pro trial' || !product.options?.share} disabled={product.options?.share !== 'Pro trial' && product.options?.share} /> 
                  <span style={{ color: (product.options?.share === 'Pro trial' || !product.options?.share) ? '#333' : 'inherit', fontWeight: (product.options?.share === 'Pro trial' || !product.options?.share) ? '500' : 'normal', opacity: (product.options?.share === 'Pro trial' || !product.options?.share) ? 1 : 0.5 }}>Pro trial</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="radio" name="share" readOnly checked={product.options?.share === 'Blocks'} disabled={product.options?.share !== 'Blocks'} /> 
                  <span style={{ color: product.options?.share === 'Blocks' ? '#333' : 'inherit', fontWeight: product.options?.share === 'Blocks' ? '500' : 'normal', opacity: product.options?.share === 'Blocks' ? 1 : 0.5 }}>Blocks</span>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '120px', fontWeight: 'bold', color: '#333' }}>Duration :</div>
              <div style={{ display: 'flex', gap: '15px', color: '#666' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="radio" name="duration" readOnly checked={product.options?.duration === '10-15 days'} disabled={product.options?.duration !== '10-15 days'} /> 
                  <span style={{ color: product.options?.duration === '10-15 days' ? '#333' : 'inherit', fontWeight: product.options?.duration === '10-15 days' ? '500' : 'normal', opacity: product.options?.duration === '10-15 days' ? 1 : 0.5 }}>10-15 days</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="radio" name="duration" readOnly checked={product.options?.duration === 'Random' || !product.options?.duration} disabled={product.options?.duration !== 'Random' && product.options?.duration} /> 
                  <span style={{ color: (product.options?.duration === 'Random' || !product.options?.duration) ? '#333' : 'inherit', fontWeight: (product.options?.duration === 'Random' || !product.options?.duration) ? '500' : 'normal', opacity: (product.options?.duration === 'Random' || !product.options?.duration) ? 1 : 0.5 }}>Random</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="radio" name="duration" readOnly checked={product.options?.duration === '30 days'} disabled={product.options?.duration !== '30 days'} /> 
                  <span style={{ color: product.options?.duration === '30 days' ? '#333' : 'inherit', fontWeight: product.options?.duration === '30 days' ? '500' : 'normal', opacity: product.options?.duration === '30 days' ? 1 : 0.5 }}>30 days</span>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '120px', fontWeight: 'bold', color: '#333' }}>Account type :</div>
              <div style={{ display: 'flex', gap: '15px', color: '#666' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="radio" name="acctype" readOnly checked={product.options?.accountType === 'Owner'} disabled={product.options?.accountType !== 'Owner'} /> 
                  <span style={{ color: product.options?.accountType === 'Owner' ? '#333' : 'inherit', fontWeight: product.options?.accountType === 'Owner' ? '500' : 'normal', opacity: product.options?.accountType === 'Owner' ? 1 : 0.5 }}>Owner</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="radio" name="acctype" readOnly checked={product.options?.accountType === 'Session' || !product.options?.accountType} disabled={product.options?.accountType !== 'Session' && product.options?.accountType} /> 
                  <span style={{ color: (product.options?.accountType === 'Session' || !product.options?.accountType) ? '#333' : 'inherit', fontWeight: (product.options?.accountType === 'Session' || !product.options?.accountType) ? '500' : 'normal', opacity: (product.options?.accountType === 'Session' || !product.options?.accountType) ? 1 : 0.5 }}>Session</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="radio" name="acctype" readOnly checked={product.options?.accountType === 'Shop level'} disabled={product.options?.accountType !== 'Shop level'} /> 
                  <span style={{ color: product.options?.accountType === 'Shop level' ? '#333' : 'inherit', fontWeight: product.options?.accountType === 'Shop level' ? '500' : 'normal', opacity: product.options?.accountType === 'Shop level' ? 1 : 0.5 }}>Shop level</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'center' }}>
            <div style={{ display: 'flex', border: '1px solid #ddd', height: '36px' }}>
              <button style={{ padding: '0 10px', background: '#fff', border: 'none', borderRight: '1px solid #ddd', cursor: 'pointer' }} onClick={() => setQty(Math.max(1, qty-1))}>-</button>
              <input type="text" value={qty} readOnly style={{ width: '40px', textAlign: 'center', border: 'none', outline: 'none', fontSize: '13px' }} />
              <button style={{ padding: '0 10px', background: '#fff', border: 'none', borderLeft: '1px solid #ddd', cursor: 'pointer' }} onClick={() => setQty(qty+1)}>+</button>
            </div>
            
            <button 
              onClick={() => addToCart({...product, quantity: qty})}
              style={{ background: '#8cc63f', color: 'white', padding: '0 20px', height: '36px', border: 'none', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              ADD TO CART
            </button>
            <button 
              onClick={() => addToCart({...product, quantity: qty})}
              style={{ background: '#8cc63f', color: 'white', padding: '0 20px', height: '36px', border: 'none', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              BUY NOW
            </button>
          </div>

          <button style={{ background: '#8cc63f', color: 'white', padding: '10px 20px', border: 'none', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            FOR INQUIRIES, PLEASE CALL <span style={{ fontSize: '16px' }}>📞</span>
          </button>

          <div style={{ background: '#f5f5f5', padding: '10px 15px', fontSize: '12px', color: '#666', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            👁 4 People are viewing this product right now!
          </div>

          {/* Meta Info */}
          <div style={{ fontSize: '13px', color: '#666', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div><strong style={{ color: '#333' }}>SKU:</strong> taphoai-{product.id}</div>
            {product.category && <div><strong style={{ color: '#333' }}>Category:</strong> {product.category}</div>}
            {product.tags && product.tags.length > 0 && <div><strong style={{ color: '#333' }}>Tags:</strong> {product.tags.join(', ')}</div>}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <strong style={{ color: '#333' }}>Share:</strong>
              <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>f</span>
              <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>X</span>
              <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>in</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
