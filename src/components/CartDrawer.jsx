import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useLang } from '../context/LanguageContext'
import CheckoutModal from './CheckoutModal'

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, totalUsdt, totalBdt } = useCart()
  const { t, lang } = useLang()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleCheckoutClick = (e) => {
    e.preventDefault();
    setIsCheckoutOpen(true);
  }

  return (
    <>
      <div
        className={`cart-overlay${isOpen ? ' open' : ''}`}
        id="cart-overlay"
        onClick={onClose}
      />

      <aside className={`cart-drawer${isOpen ? ' open' : ''}`} id="cart-drawer" aria-label="Shopping cart">
        <div className="cart-drawer-header">
          <h2 className="cart-title">{t.yourCart}</h2>
          <button className="cart-close-btn" id="cart-close-btn" onClick={onClose} aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="cart-body" id="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty" id="cart-empty">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <p>{t.cartEmpty}</p>
            </div>
          ) : (
            <ul className="cart-items" id="cart-items">
              {cart.map(item => {
                const itemName = typeof item.name === 'object' ? (item.name[lang] || item.name.en) : item.name;
                return (
                <li className="cart-item" key={item.id}>
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt="cart item" 
                      style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} 
                    />
                  ) : (
                    <div className="cart-item-icon" style={{ background: item.iconBg || '#eee' }}>
                      {item.icon || '📦'}
                    </div>
                  )}
                  <div className="cart-item-info">
                    <div className="cart-item-name">
                      {itemName.length > 50 ? itemName.slice(0, 50) + '…' : itemName}
                      {item.selectedPackage && (
                        <span style={{ display: 'block', fontSize: '11px', color: '#64748b', marginTop: '2px', fontWeight: 'bold' }}>
                          [{item.selectedPackage.duration}]
                        </span>
                      )}
                    </div>
                    <div className="cart-item-price">
                      ${(item.selectedPackage ? item.selectedPackage.usdt : item.usdt).toFixed(2)} USDT · ৳{item.selectedPackage ? item.selectedPackage.bdt : item.bdt} BDT
                    </div>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove from cart"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </li>
                );
              })}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer" id="cart-footer">
            <div className="cart-total-row">
              <span>{t.totalUsdt}</span>
              <strong id="cart-total-usdt">${totalUsdt.toFixed(2)}</strong>
            </div>
            <div className="cart-total-row">
              <span>{t.totalInr}</span>
              <strong id="cart-total-inr">৳{totalBdt}</strong>
            </div>
            <button
              onClick={handleCheckoutClick}
              className="checkout-btn"
              id="checkout-btn"
            >
              {t.checkoutNow || 'Checkout Now'}
            </button>
          </div>
        )}
      </aside>
      
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  )
}
