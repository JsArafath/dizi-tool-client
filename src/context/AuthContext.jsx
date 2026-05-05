import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const API = `${import.meta.env.VITE_API_URL}/api/auth`

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Restore session on mount
  useEffect(() => {
    const token = localStorage.getItem('ots_token')
    const saved = localStorage.getItem('ots_user')
    if (token && saved) {
      setUser(JSON.parse(saved))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    setError(null)
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!data.success) throw new Error(data.message)
    localStorage.setItem('ots_token', data.token)
    localStorage.setItem('ots_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  const register = async (name, email, password) => {
    setError(null)
    const res = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()
    if (!data.success) throw new Error(data.message)
    localStorage.setItem('ots_token', data.token)
    localStorage.setItem('ots_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    localStorage.removeItem('ots_token')
    localStorage.removeItem('ots_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
