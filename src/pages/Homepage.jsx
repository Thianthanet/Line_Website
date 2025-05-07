import { useEffect } from 'react'
import liff from '@line/liff'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Homepage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    liff.init({ liffId: "2007368813-M6JWQelg" }).then(() => {
      if (!liff.isLoggedIn()) {
        liff.login()
      } else {
        liff.getProfile().then(async (profile) => {
          const userId = profile.userId
          const token = liff.getAccessToken()
          
          login({ userId, token })

          const res = await fetch('http://localhost:3001/api/check-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
          })
          
          const data = await res.json()
          if (data.exists) navigate('/repair')
          else navigate('/register')
        })
      }
    })
  }, [])

  return <div>Loading...</div>
}

export default Homepage
