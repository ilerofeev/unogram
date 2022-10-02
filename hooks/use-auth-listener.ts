import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import * as ROUTES from '../constants/routes'

export default function useAuthListener() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (localStorage.getItem('authUser')) setUser(JSON.parse(localStorage.getItem('authUser')!))
    const auth = getAuth()
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser))
        setUser(authUser)
        router.push(ROUTES.DASHBOARD)
      } else {
        localStorage.removeItem('authUser')
        setUser(null)
      }
    })
    return () => listener()
  }, [])

  return { user }
}
