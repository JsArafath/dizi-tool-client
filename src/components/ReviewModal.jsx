import { useState } from 'react';
import { useLang } from '../context/LanguageContext';

export default function ReviewModal({ isOpen, onClose, onReviewAdded }) {
  const { lang } = useLang();
  const [formData, setFormData] = useState({ author: '', rating: 5, comment: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const L = {
    en: {
      title: 'Share Your Experience',
      sub: 'Your feedback helps us improve and helps others make better choices.',
      name: 'Your Name',
      rating: 'Your Rating',
      comment: 'Review Details',
      submit: 'Submit Feedback',
      submitting: 'Submitting...',
    },
    bn: {
      title: 'আপনার অভিজ্ঞতা শেয়ার করুন',
      sub: 'আপনার মতামত আমাদের আরও ভালো সেবা দিতে সাহায্য করে।',
      name: 'আপনার নাম',
      rating: 'আপনার রেটিং',
      comment: 'আপনার মন্তব্য',
      submit: 'সাবমিট করুন',
      submitting: 'সাবমিট হচ্ছে...',
    }
  };
  const l = L[lang];

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.author || !formData.comment) {
      setError('Name and comment are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      
      onReviewAdded(data.review);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="checkout-modal-overlay" 
      style={{ 
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)', 
        backgroundColor: 'rgba(15, 23, 42, 0.6)' 
      }} 
      onClick={onClose}
    >
      <div 
        className="checkout-modal-content" 
        style={{ 
          background: 'white', 
          borderRadius: '24px', 
          padding: '40px', 
          width: '100%',
          maxWidth: '500px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          transform: 'translateY(0)',
          animation: 'modalSlideUp 0.3s ease-out',
          position: 'relative'
        }} 
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>{l.title}</h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '8px', lineHeight: '1.5' }}>{l.sub}</p>
          </div>
          <button 
            className="checkout-close-btn" 
            onClick={onClose}
            style={{ background: '#f1f5f9', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', transition: 'all 0.2s', top: '24px', right: '24px' }}
            onMouseOver={e => { e.currentTarget.style.background = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'; }}
            onMouseOut={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#64748b'; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
          {error && <div className="checkout-error" style={{ borderRadius: '12px', padding: '12px' }}>{error}</div>}
          
          <div className="checkout-field" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: '#334155', fontSize: '0.95rem' }}>{l.name}</label>
            <input 
              type="text" 
              required 
              value={formData.author}
              onChange={e => setFormData({ ...formData, author: e.target.value })}
              placeholder="e.g. John Doe"
              style={{ width: '100%', padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={e => e.target.style.borderColor = 'var(--orange)'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div className="checkout-field" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: '#334155', fontSize: '0.95rem' }}>{l.rating}</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setFormData({ ...formData, rating: star })}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0',
                    cursor: 'pointer',
                    fontSize: '2rem',
                    color: (hoveredRating || formData.rating) >= star ? '#fbbf24' : '#e2e8f0',
                    transition: 'color 0.2s, transform 0.1s',
                    transform: hoveredRating === star ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="checkout-field" style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: '#334155', fontSize: '0.95rem' }}>{l.comment}</label>
            <textarea 
              required 
              rows="4"
              value={formData.comment}
              onChange={e => setFormData({ ...formData, comment: e.target.value })}
              placeholder="Tell us what you liked (or didn't like)..."
              style={{ width: '100%', padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit', resize: 'vertical' }}
              onFocus={e => e.target.style.borderColor = 'var(--orange)'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <button 
            type="submit" 
            className="checkout-submit-btn" 
            disabled={loading}
            style={{ width: '100%', padding: '16px', borderRadius: '14px', fontSize: '1.1rem', background: 'var(--orange)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)', transition: 'transform 0.1s, box-shadow 0.1s' }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {loading ? l.submitting : l.submit}
          </button>
        </form>

        <style>{`
          @keyframes modalSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}
