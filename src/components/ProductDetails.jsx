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

  const [selectedPkgIndex, setSelectedPkgIndex] = useState(0)
  const [accountType, setAccountType] = useState('Shared')

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
  const currentPkg = product.packages && product.packages.length > 0 ? product.packages[selectedPkgIndex] : product;
  const displayBdt = currentPkg ? currentPkg.bdt : product.bdt;

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
            ৳ {Number(displayBdt).toLocaleString()}
          </div>



          {/* Options (Dynamic based on product.options) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px', fontSize: '13px' }}>
            
            {product.options?.guarantee && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '120px', fontWeight: 'bold', color: '#333' }}>Guarantee :</div>
                <div style={{ color: '#333', fontWeight: '500' }}>
                  {product.options.guarantee}
                </div>
              </div>
            )}

            {product.packages && product.packages.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '120px', fontWeight: 'bold', color: '#333' }}>Duration :</div>
                <div style={{ display: 'flex', gap: '15px', color: '#666', flexWrap: 'wrap' }}>
                  {product.packages.map((pkg, idx) => (
                    <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                      <input type="radio" name="duration" checked={selectedPkgIndex === idx} onChange={() => setSelectedPkgIndex(idx)} /> 
                      <span style={{ color: selectedPkgIndex === idx ? '#333' : 'inherit', fontWeight: selectedPkgIndex === idx ? '500' : 'normal' }}>{pkg.duration}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '120px', fontWeight: 'bold', color: '#333' }}>Account type :</div>
              <div style={{ display: 'flex', gap: '15px', color: '#666', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                  <input type="radio" name="acctype" checked={accountType === 'Shared'} onChange={() => setAccountType('Shared')} /> 
                  <span style={{ color: accountType === 'Shared' ? '#333' : 'inherit', fontWeight: accountType === 'Shared' ? '500' : 'normal' }}>Shared</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                  <input type="radio" name="acctype" checked={accountType === 'Owned'} onChange={() => setAccountType('Owned')} /> 
                  <span style={{ color: accountType === 'Owned' ? '#333' : 'inherit', fontWeight: accountType === 'Owned' ? '500' : 'normal' }}>Owned</span>
                </label>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'center' }}>
            <div style={{ padding: '0 15px', background: '#f5f5f5', borderRadius: '4px', height: '36px', display: 'flex', alignItems: 'center', fontSize: '13px', color: '#555', fontWeight: 'bold' }}>
              Stock: {product.stock}
            </div>
            
            <button 
              onClick={() => addToCart({...product, quantity: 1, selectedPackage: currentPkg, accountType})}
              style={{ background: '#8cc63f', color: 'white', padding: '0 20px', height: '36px', border: 'none', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              ADD TO CART
            </button>
            <button 
              onClick={() => addToCart({...product, quantity: 1, selectedPackage: currentPkg, accountType})}
              style={{ background: '#8cc63f', color: 'white', padding: '0 20px', height: '36px', border: 'none', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              BUY NOW
            </button>
          </div>

          <button onClick={() => window.open('https://wa.me/8801879009680', '_blank')} style={{ background: '#8cc63f', color: 'white', padding: '10px 20px', border: 'none', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            FOR INQUIRIES, PLEASE CALL 01879009680 <span style={{ fontSize: '16px' }}>📞</span>
          </button>

          <div style={{ background: '#f5f5f5', padding: '10px 15px', fontSize: '12px', color: '#666', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            👁 4 People are viewing this product right now!
          </div>

          {/* Meta Info */}
          <div style={{ fontSize: '13px', color: '#666', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div><strong style={{ color: '#333' }}>SKU:</strong> taphoai-{product.id}</div>
            {product.category && <div><strong style={{ color: '#333' }}>Category:</strong> {product.category}</div>}
            {product.tags && product.tags.length > 0 && <div><strong style={{ color: '#333' }}>Tags:</strong> {product.tags.join(', ')}</div>}
          </div>

        </div>
      </div>
    </div>
  )
}
