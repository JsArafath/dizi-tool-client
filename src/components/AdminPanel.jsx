import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'

const ICONS = ['📦', '🔵', '🟠', '🎵', '📺', '🎮', '💻', '🔑', '⭐', '🛡️', '🤖', '🎬', '🅰️']
const BG_COLORS = [
  { label: 'Blue', value: '#e8f4ff' },
  { label: 'Orange', value: '#fff3e8' },
  { label: 'Green', value: '#edfff3' },
  { label: 'Red', value: '#fff0f0' },
  { label: 'Purple', value: '#eef0ff' },
  { label: 'Gray', value: '#f0f4f8' },
  { label: 'Dark', value: '#1a1a1a' },
]

const EMPTY = {
  nameEn: '', nameBn: '',
  shortDescEn: '', shortDescBn: '',
  fullDescEn: '', fullDescBn: '',
  icon: '📦', iconBg: '#e8f4ff',
  stock: '', usdt: '', bdt: '',
}

export default function AdminPanel({ onClose, onProductAdded }) {
  const { user } = useAuth()
  const { lang } = useLang()
  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [activeTab, setActiveTab] = useState('add') // 'add', 'manage', 'reviews'
  const [products, setProducts] = useState([])
  const [reviews, setReviews] = useState([])

  const L = {
    en: {
      title: 'Admin Panel',
      sub: 'Manage your store products',
      nameEn: 'Product Name (English) *',
      nameBn: 'Product Name (বাংলা)',
      shortEn: 'Short Description (English)',
      shortBn: 'Short Description (বাংলা)',
      fullEn: 'Full Description (English)',
      fullBn: 'Full Description (বাংলা)',
      icon: 'Icon Emoji',
      iconBg: 'Icon Background',
      stock: 'Stock Quantity *',
      usdt: 'Price in USDT *',
      bdt: 'Price in BDT *',
      add: 'Add Product',
      adding: 'Adding...',
      successMsg: '✅ Product added successfully!',
      addProductTab: 'Add Product',
      manageTab: 'Manage Products',
      manageReviewsTab: 'Manage Reviews',
      deleteConfirm: 'Are you sure you want to delete this product?',
      deleteSuccess: '✅ Product deleted successfully',
    },
    bn: {
      title: 'অ্যাডমিন প্যানেল',
      sub: 'স্টোরের পণ্য পরিচালনা করুন',
      nameEn: 'পণ্যের নাম (ইংরেজি) *',
      nameBn: 'পণ্যের নাম (বাংলা)',
      shortEn: 'সংক্ষিপ্ত বিবরণ (ইংরেজি)',
      shortBn: 'সংক্ষিপ্ত বিবরণ (বাংলা)',
      fullEn: 'সম্পূর্ণ বিবরণ (ইংরেজি)',
      fullBn: 'সম্পূর্ণ বিবরণ (বাংলা)',
      icon: 'আইকন ইমোজি',
      iconBg: 'আইকন ব্যাকগ্রাউন্ড',
      stock: 'স্টক পরিমাণ *',
      usdt: 'মূল্য (USDT) *',
      bdt: 'মূল্য (BDT) *',
      add: 'পণ্য যোগ করুন',
      adding: 'যোগ হচ্ছে...',
      successMsg: '✅ পণ্য সফলভাবে যোগ হয়েছে!',
      addProductTab: 'পণ্য যোগ',
      manageTab: 'পণ্য পরিচালনা',
      manageReviewsTab: 'রিভিউ পরিচালনা',
      deleteConfirm: 'আপনি কি নিশ্চিত যে পণ্যটি ডিলিট করবেন?',
      deleteSuccess: '✅ পণ্য সফলভাবে ডিলিট হয়েছে',
    },
  }
  const l = L[lang]

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      const data = await res.json()
      if (data.success) {
        setProducts(data.products)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews`)
      const data = await res.json()
      if (data.success) {
        setReviews(data.reviews)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setSuccess('')
    if (!form.nameEn || !form.usdt || !form.bdt || !form.stock) {
      setError('Please fill in all required (*) fields')
      return
    }
    setLoading(true)
    try {
      const token = localStorage.getItem('ots_token')
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message)
      setSuccess(l.successMsg)
      setForm(EMPTY)
      onProductAdded(data.product)
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm(l.deleteConfirm)) return;
    try {
      const token = localStorage.getItem('ots_token')
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      const data = await res.json()
      if (data.success) {
        setProducts(products.filter(p => p.id !== id))
        alert(l.deleteSuccess)
        window.location.reload() // Quick way to refresh frontend list
      }
    } catch (err) {
      console.error(err)
      alert("Failed to delete")
    }
  }

  const handleDeleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const token = localStorage.getItem('ots_token')
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      const data = await res.json()
      if (data.success) {
        setReviews(reviews.filter(r => r.id !== id))
        window.location.reload()
      }
    } catch (err) {
      console.error(err)
      alert("Failed to delete review")
    }
  }

  return (
    <div className="admin-overlay" id="admin-overlay" onClick={onClose}>
      <div className="admin-panel" id="admin-panel" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="admin-panel-header">
          <div>
            <div className="admin-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Admin — {user?.name}
            </div>
            <h2 className="admin-title">{l.title}</h2>
            <p className="admin-sub">{l.sub}</p>
          </div>
          <button className="admin-close-btn" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #eee', overflowX: 'auto' }}>
          <button 
            style={{ flex: 1, padding: '15px', border: 'none', background: activeTab === 'add' ? '#fff8f5' : 'white', cursor: 'pointer', fontWeight: activeTab === 'add' ? 'bold' : 'normal', color: activeTab === 'add' ? 'var(--orange)' : 'var(--gray)' }}
            onClick={() => setActiveTab('add')}
          >
            {l.addProductTab}
          </button>
          <button 
            style={{ flex: 1, padding: '15px', border: 'none', background: activeTab === 'manage' ? '#fff8f5' : 'white', cursor: 'pointer', fontWeight: activeTab === 'manage' ? 'bold' : 'normal', color: activeTab === 'manage' ? 'var(--orange)' : 'var(--gray)' }}
            onClick={() => { setActiveTab('manage'); fetchProducts(); }}
          >
            {l.manageTab}
          </button>
          <button 
            style={{ flex: 1, padding: '15px', border: 'none', background: activeTab === 'reviews' ? '#fff8f5' : 'white', cursor: 'pointer', fontWeight: activeTab === 'reviews' ? 'bold' : 'normal', color: activeTab === 'reviews' ? 'var(--orange)' : 'var(--gray)' }}
            onClick={() => { setActiveTab('reviews'); fetchReviews(); }}
          >
            {l.manageReviewsTab}
          </button>
        </div>

        {/* Messages */}
        {error   && <div className="admin-msg admin-msg-error">{error}</div>}
        {success && <div className="admin-msg admin-msg-success">{success}</div>}

        {/* Form Tab */}
        {activeTab === 'add' && (
          <form className="admin-form" onSubmit={handleSubmit} id="admin-add-form">
            {/* Icon row */}
            <div className="admin-section-label">Icon & Background</div>
            <div className="admin-icon-row">
              <div className="admin-field">
                <label>{l.icon}</label>
                <div className="icon-picker">
                  {ICONS.map(ic => (
                    <button
                      key={ic} type="button"
                      className={`icon-option${form.icon === ic ? ' selected' : ''}`}
                      onClick={() => set('icon', ic)}
                    >{ic}</button>
                  ))}
                </div>
              </div>
              <div className="admin-field">
                <label>{l.iconBg}</label>
                <div className="bg-picker">
                  {BG_COLORS.map(c => (
                    <button
                      key={c.value} type="button"
                      className={`bg-option${form.iconBg === c.value ? ' selected' : ''}`}
                      style={{ background: c.value }}
                      onClick={() => set('iconBg', c.value)}
                      title={c.label}
                    />
                  ))}
                </div>
                {/* Preview */}
                <div className="icon-preview" style={{ background: form.iconBg }}>
                  {form.icon}
                </div>
              </div>
            </div>

            {/* Names */}
            <div className="admin-section-label">Product Name</div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label>{l.nameEn}</label>
                <input type="text" value={form.nameEn} onChange={e => set('nameEn', e.target.value)}
                  placeholder="e.g. Netflix Premium UHD 1 Month" required />
              </div>
              <div className="admin-field">
                <label>{l.nameBn}</label>
                <input type="text" value={form.nameBn} onChange={e => set('nameBn', e.target.value)}
                  placeholder="যেমন: Netflix প্রিমিয়াম UHD ১ মাস" />
              </div>
            </div>

            {/* Short desc */}
            <div className="admin-section-label">Short Description</div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label>{l.shortEn}</label>
                <textarea value={form.shortDescEn} onChange={e => set('shortDescEn', e.target.value)}
                  placeholder="Brief product summary..." rows={3} />
              </div>
              <div className="admin-field">
                <label>{l.shortBn}</label>
                <textarea value={form.shortDescBn} onChange={e => set('shortDescBn', e.target.value)}
                  placeholder="সংক্ষিপ্ত পণ্য বিবরণ..." rows={3} />
              </div>
            </div>

            {/* Full desc */}
            <div className="admin-section-label">Full Description</div>
            <div className="admin-grid-2">
              <div className="admin-field">
                <label>{l.fullEn}</label>
                <textarea value={form.fullDescEn} onChange={e => set('fullDescEn', e.target.value)}
                  placeholder="Detailed description..." rows={4} />
              </div>
              <div className="admin-field">
                <label>{l.fullBn}</label>
                <textarea value={form.fullDescBn} onChange={e => set('fullDescBn', e.target.value)}
                  placeholder="বিস্তারিত বিবরণ..." rows={4} />
              </div>
            </div>

            {/* Pricing */}
            <div className="admin-section-label">Stock & Pricing</div>
            <div className="admin-grid-3">
              <div className="admin-field">
                <label>{l.stock}</label>
                <input type="number" value={form.stock} onChange={e => set('stock', e.target.value)}
                  placeholder="e.g. 50" min="0" required />
              </div>
              <div className="admin-field">
                <label>{l.usdt}</label>
                <input type="number" value={form.usdt} onChange={e => set('usdt', e.target.value)}
                  placeholder="e.g. 5.00" step="0.01" min="0" required />
              </div>
              <div className="admin-field">
                <label>{l.bdt}</label>
                <input type="number" value={form.bdt} onChange={e => set('bdt', e.target.value)}
                  placeholder="e.g. 529" min="0" required />
              </div>
            </div>

            <button type="submit" className="admin-submit-btn" disabled={loading}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              {loading ? l.adding : l.add}
            </button>
          </form>
        )}

        {/* Manage Tab */}
        {activeTab === 'manage' && (
          <div style={{ padding: '20px' }}>
            {products.length === 0 ? <p>Loading products...</p> : (
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {products.map(p => (
                  <li key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #eee' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '24px', background: p.iconBg, width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>{p.icon}</span>
                      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{p.name[lang] || p.name.en}</div>
                    </div>
                    <button 
                      onClick={() => handleDelete(p.id)}
                      style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div style={{ padding: '20px' }}>
            {reviews.length === 0 ? <p>No reviews found.</p> : (
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {reviews.map(r => (
                  <li key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #eee' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{r.author} <span style={{ color: '#fbbf24' }}>{'⭐'.repeat(r.rating)}</span></div>
                      <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{r.comment}</div>
                    </div>
                    <button 
                      onClick={() => handleDeleteReview(r.id)}
                      style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginLeft: '10px' }}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
