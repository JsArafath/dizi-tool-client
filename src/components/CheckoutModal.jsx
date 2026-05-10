import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, totalUsdt, totalBdt } = useCart();
  const { t } = useLang();
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    paymentMethod: 'bkash'
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

          {error && <div className="checkout-error">{error}</div>}

          <button type="submit" className="checkout-submit-btn" disabled={loading}>
            {loading ? (t.processing || 'Processing...') : (t.payNow || `Pay ৳${totalBdt}`)}
          </button>
        </form>
      </div>
    </div>
  );
}
