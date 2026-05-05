import { useState, useEffect, useRef } from 'react'
import { CartProvider } from './context/CartContext'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Toast from './components/Toast'
import AuthModal from './components/AuthModal'
import AdminPanel from './components/AdminPanel'

export default function App() {
  const [cartOpen, setCartOpen]   = useState(false)
  const [authOpen, setAuthOpen]   = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [newProducts, setNewProducts] = useState([])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        setCartOpen(false)
        setAuthOpen(false)
        setAdminOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = (cartOpen || authOpen || adminOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [cartOpen, authOpen, adminOpen])

  const handleProductAdded = (product) => {
    setNewProducts(prev => [...prev, product])
  }

  return (
    <AuthProvider>
      <LanguageProvider>
        <CartProvider>
          <Header
            onCartOpen={() => setCartOpen(true)}
            onLoginOpen={() => setAuthOpen(true)}
            onAdminOpen={() => setAdminOpen(true)}
          />
          <main>
            <Hero />
            <Products extraProducts={newProducts} />
            <HowItWorks />
          </main>
          <Footer />
          <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
          {authOpen  && <AuthModal  onClose={() => setAuthOpen(false)} />}
          {adminOpen && <AdminPanel
            onClose={() => setAdminOpen(false)}
            onProductAdded={handleProductAdded}
          />}
          <Toast />
        </CartProvider>
      </LanguageProvider>
    </AuthProvider>
  )
}
