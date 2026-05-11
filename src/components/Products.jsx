import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { useLang } from '../context/LanguageContext'
import { useSearchParams } from 'react-router-dom'

export default function Products({ extraProducts = [], isShopPage = false }) {
  const { t } = useLang()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          const all = [
            ...data.products,
            ...extraProducts.filter(ep => !data.products.find(p => p.id === ep.id))
          ]
          setProducts(all)
        }
      })
      .catch(err => console.error('Failed to load products:', err))
      .finally(() => setLoading(false))
  }, [extraProducts])

  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const cat = searchParams.get('cat') || ''

  let all = [...products]
  
  if (q) {
    all = all.filter(p => 
      (p.name?.en?.toLowerCase() || '').includes(q.toLowerCase()) || 
      (p.name?.bn?.toLowerCase() || '').includes(q.toLowerCase()) ||
      (p.category?.toLowerCase() || '').includes(q.toLowerCase())
    )
  }

  if (cat) {
    all = all.filter(p => p.category === cat)
  }

  const featured = all.slice(0, 10)
  const bestSelling = all.slice(10, 20)

  // Calculate dynamic categories and counts for the Shop Banner
  const categoryCounts = {}
  products.forEach(p => {
    const cat = p.category || 'UNCATEGORIZED'
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
  })
  const categoryList = Object.keys(categoryCounts).map(cat => ({
    name: cat,
    count: categoryCounts[cat]
  }))

  return (
    <>
      {/* Dark Shop Banner */}
      {isShopPage && (
        <div style={{ backgroundColor: '#111', color: 'white', padding: '70px 0 80px', width: '100%' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '56px', fontWeight: '600', marginBottom: '50px', letterSpacing: '1px' }}>Shop</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px 50px', maxWidth: '1000px', margin: '0 auto' }}>
              {categoryList.map(c => (
                <div key={c.name} style={{ textAlign: 'left', minWidth: '130px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#888' }}>
                    {c.count} {t.products || 'Products'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="products-section" id="products">
        <div className="container">
          
          {/* Header (Featured or Shop) */}
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '30px', marginTop: isShopPage ? '40px' : '0' }}>
          <h2 className="section-title" style={{ fontSize: '24px', color: '#333', fontWeight: '500', marginBottom: '10px' }}>
            {isShopPage ? t.allProducts : t.featuredProducts}
          </h2>
          {!isShopPage && <p style={{ color: '#888', fontSize: '14px' }}>{t.featuredSubtitle}</p>}
        </div>

        {loading ? (
          <div className="products-loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {/* Featured or Shop Grid */}
            <div className="products-grid" id="products-grid">
              {(isShopPage ? all : featured).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Elements only shown on Home Page */}
            {!isShopPage && (
              <>
                {/* SEE MORE Button */}
                <div style={{ textAlign: 'center', marginTop: '30px', marginBottom: '40px' }}>
                  <button style={{ background: '#8cc63f', color: 'white', border: 'none', padding: '10px 25px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '2px' }}>
                    {t.seeMore}
                  </button>
                </div>

                {/* Diamond Divider */}
                <div style={{ textAlign: 'center', color: '#8cc63f', fontSize: '14px', letterSpacing: '8px', overflow: 'hidden', whiteSpace: 'nowrap', marginBottom: '40px' }}>
                  ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦ ♦
                </div>

                {/* Bestselling Section */}
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <h2 className="section-title" style={{ fontSize: '24px', color: '#333', fontWeight: '500', marginBottom: '10px' }}>
                    {t.bestSelling}
                  </h2>
                  <p style={{ color: '#888', fontSize: '14px' }}>{t.bestSellingSubtitle}</p>
                </div>

                <div className="products-grid" id="bestselling-grid">
                  {bestSelling.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
    </>
  )
}
