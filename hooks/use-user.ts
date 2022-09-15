import { useState, useEffect } from 'react'
import { getUserByUserId } from '../services/firebase'

export type User = {
  username: string
  fullName: string
  userId: string
  following: string[]
  followers: string[]
  docId: string
}

export default function useUser(userId?: string) {
  const [activeUser, setActiveUser] = useState<User>({} as User)

  useEffect(() => {
    async function getUserObjByUserId(userId: string) {
      const user = await getUserByUserId(userId)
      setActiveUser(user || {})
    }

    if (userId) {
      getUserObjByUserId(userId)
    }
  }, [userId])

  return { user: activeUser }
}
