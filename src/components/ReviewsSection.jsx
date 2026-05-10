import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import ReviewModal from './ReviewModal';

export default function ReviewsSection() {
  const { lang } = useLang();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const L = {
    en: {
      title: 'Customer Reviews',
      sub: 'See what our customers are saying about us',
      writeBtn: 'Write a Review',
      empty: 'No reviews yet. Be the first to review!',
    },
    bn: {
      title: 'কাস্টমার রিভিউ',
      sub: 'আমাদের গ্রাহকরা কী বলছেন তা দেখুন',
      writeBtn: 'রিভিউ লিখুন',
      empty: 'এখনও কোনো রিভিউ নেই। প্রথম রিভিউটি আপনিই দিন!',
    }
  };
  const l = L[lang];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/reviews`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setReviews(data.reviews);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleReviewAdded = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  return (
    <section className="reviews-section" style={{ padding: '60px 0', background: '#f8fafc' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="section-title">{l.title}</h2>
          <p className="section-sub" style={{ marginBottom: '20px' }}>{l.sub}</p>
          <button 
            className="view-details-btn" 
            style={{ background: 'var(--orange)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => setModalOpen(true)}
          >
            {l.writeBtn}
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>{l.empty}</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {reviews.map(review => (
              <div key={review.id} style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{review.author}</div>
                  <div style={{ color: '#fbbf24', letterSpacing: '2px' }}>
                    {'⭐'.repeat(review.rating)}
                  </div>
                </div>
                <div style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  "{review.comment}"
                </div>
                <div style={{ marginTop: '16px', fontSize: '0.8rem', color: '#94a3b8' }}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ReviewModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onReviewAdded={handleReviewAdded} 
      />
    </section>
  );
}
