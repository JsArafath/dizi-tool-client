import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, totalUsdt, totalBdt } = useCart();
  const { t } = useLang();
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    paymentMethod: 'bkash',
    trxId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (formData.paymentMethod === 'bkash') {
        if (!formData.trxId) {
          setError('Please enter your bKash Transaction ID (TrxID)');
          setLoading(false);
          return;
        }
        // Manual WhatsApp redirect for now since it's manual bKash
        const message = `*New Order*\n\n*Amount:* ৳${totalBdt}\n*bKash TrxID:* ${formData.trxId}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n\n*Items:*\n${cart.map(item => `- ${item.name.en || item.name} (Qty: ${item.quantity || 1})`).join('\n')}`;
        const encodedMsg = encodeURIComponent(message);
        window.location.href = `https://wa.me/8801879009680?text=${encodedMsg}`;
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/payment/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          totalAmount: totalBdt, // Send amount in BDT
          customerInfo: { email: formData.email, phone: formData.phone },
          paymentMethod: formData.paymentMethod
        })
      });

      const data = await response.json();
      if (data.success && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        setError(data.message || 'Payment initiation failed');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-modal-overlay" onClick={onClose}>
      <div className="checkout-modal-content" onClick={e => e.stopPropagation()}>
        <button className="checkout-close-btn" onClick={onClose}>&times;</button>
        <h2>{t.secureCheckout || 'Secure Checkout'}</h2>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label>{t.emailAddress || 'Email Address'}</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="For digital product delivery"
            />
          </div>
          <div className="form-group">
            <label>{t.phoneNumber || 'Phone Number'}</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
              placeholder="+880..."
            />
          </div>
          
          <div className="form-group">
            <label>{t.paymentMethod || 'Payment Method'}</label>
            <div className="payment-methods">
              <label className={`payment-method-option ${formData.paymentMethod === 'bkash' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="bkash" 
                  checked={formData.paymentMethod === 'bkash'} 
                  onChange={handleChange} 
                />
                <img src="https://scripts.payter.com.bd/bkash.svg" alt="bKash" height="30" />
                <span>bKash</span>
              </label>
              <label className={`payment-method-option ${formData.paymentMethod === 'nagad' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="nagad" 
                  checked={formData.paymentMethod === 'nagad'} 
                  onChange={handleChange} 
                />
                <img src="https://scripts.payter.com.bd/nagad.svg" alt="Nagad" height="30" />
                <span>Nagad</span>
              </label>
            </div>
          </div>

          {formData.paymentMethod === 'bkash' && (
            <div style={{ background: '#e2136e0d', border: '1px dashed #e2136e', padding: '20px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' }}>
              <img src="https://scripts.payter.com.bd/bkash.svg" alt="bKash" height="35" style={{ marginBottom: '15px' }} />
              <p style={{ margin: '0 0 10px 0', fontSize: '15px', color: '#444', lineHeight: '1.5' }}>
                অনুগ্রহ করে নিচের নাম্বারে <strong>৳{totalBdt}</strong> Send Money করুন:
              </p>
              <div style={{ background: '#fff', display: 'inline-block', padding: '10px 20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(226, 19, 110, 0.15)', marginBottom: '15px' }}>
                <h3 style={{ margin: 0, color: '#e2136e', fontSize: '24px', letterSpacing: '1px', userSelect: 'all' }}>01879009680</h3>
              </div>
              <p style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#666' }}>
                টাকা পাঠানোর পর আপনার bKash Transaction ID (TrxID) নিচে প্রদান করুন।
              </p>
              
              <div style={{ textAlign: 'left' }}>
                <input 
                  type="text" 
                  name="trxId" 
                  value={formData.trxId || ''} 
                  onChange={handleChange} 
                  placeholder="Enter bKash TrxID (e.g. 9JA7H8P3M2)"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          )}

          {formData.paymentMethod === 'nagad' && (
            <div style={{ background: '#fdf3ed', border: '1px dashed #ed1c24', padding: '20px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#444' }}>Nagad gateway is currently undergoing maintenance. Please use bKash.</p>
            </div>
          )}
          {error && <div className="checkout-error">{error}</div>}

          <button type="submit" className="checkout-submit-btn" disabled={loading}>
            {loading ? (t.processing || 'Processing...') : (t.payNow || `Pay ৳${totalBdt}`)}
          </button>
        </form>
      </div>
    </div>
  );
}
