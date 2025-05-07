import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // อ่านจาก localStorage ตอนโหลดครั้งแรก
    const storedAuth = localStorage.getItem('auth')
    return storedAuth ? JSON.parse(storedAuth) : { userId: null, token: null }
  })

  // sync กับ localStorage เมื่อ auth เปลี่ยน
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth))
  }, [auth])

  const login = ({ userId, token }) => {
    setAuth({ userId, token })
  }

  const logout = () => {
    setAuth({ userId: null, token: null })
    localStorage.removeItem('auth') // ล้างข้อมูลเมื่อ logout
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
