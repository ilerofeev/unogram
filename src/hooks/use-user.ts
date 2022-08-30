import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/user'
import { getUserByUserId } from '../services/firebase'

export type User = {
  username: string
  fullName: string
  userId: string
  following: string[]
  docId: string
}

export default function useUser() {
  const [activeUser, setActiveUser] = useState<User>({} as User)

  const user = useContext(UserContext)

  useEffect(() => {
    async function getUserObjByUserId() {
      const response = (await getUserByUserId(user!.uid)) as User[]
      setActiveUser(response[0])
    }

    if (user?.uid) {
      getUserObjByUserId()
    }
  }, [user])

  return { user: activeUser }
}
