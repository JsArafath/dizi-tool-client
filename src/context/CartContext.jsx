import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState({ visible: false, msg: '' })

  const showToast = useCallback((msg) => {
    setToast({ visible: true, msg })
    setTimeout(() => setToast({ visible: false, msg: '' }), 2600)
  }, [])

  const addToCart = useCallback((product) => {
    setCart(prev => {
      if (prev.find(i => i.id === product.id)) {
        showToast(`Already in cart!`)
        return prev
      }
      showToast('Added to cart ✓')
      return [...prev, product]
    })
  }, [showToast])

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const totalUsdt = cart.reduce((s, i) => s + i.usdt, 0)
  const totalInr  = cart.reduce((s, i) => s + i.inr, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalUsdt, totalInr, toast }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
