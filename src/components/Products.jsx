import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { useLang } from '../context/LanguageContext'

export default function Products({ extraProducts = [] }) {
  const { t } = useLang()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(r => r.json())
      .then(data => {
        if (data.success) setProducts(data.products)
      })
      .catch(() => {
        // Fallback: show nothing if server is down
      })
      .finally(() => setLoading(false))
  }, [])

  // Merge server products with newly added ones (from AdminPanel)
  const all = [
    ...products,
    ...extraProducts.filter(ep => !products.find(p => p.id === ep.id))
  ]

  return (
    <section className="products-section" id="products">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.availableProducts}</h2>
          <p className="section-sub">
            {t.payWith} <strong>{t.payWithBold1}</strong> {t.payWithOr} <strong>{t.payWithBold2}</strong> {t.payWithSuffix}
          </p>
        </div>
        {loading ? (
          <div className="products-loading">
            <div className="spinner" />
          </div>
        ) : (
          <div className="products-grid" id="products-grid">
            {all.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
