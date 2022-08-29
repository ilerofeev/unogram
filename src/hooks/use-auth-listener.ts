import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firestore } from '../lib/firebase'

export default function useAuthListener() {
  const [user, setUser] = useState(
    localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')!) : null
  )

  useEffect(() => {
    const auth = getAuth()
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser))
        setUser(authUser)
      } else {
        localStorage.removeItem('authUser')
        setUser(null)
      }
    })

    return () => listener()
  }, [firestore])

  return { user }
}
