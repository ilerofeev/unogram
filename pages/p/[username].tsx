import UserProfile from '../../components/profile'
import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import { getUserByUsername } from '../../services/firebase'
import { User } from '../../hooks/use-user'
import { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes'

export default function Profile() {
  const router = useRouter()
  const { username } = router.query
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function checkUserExists() {
      const [user] = typeof username === 'string' ? await getUserByUsername(username) : [null]
      if (user?.userId) {
        setUser(user)
      } else {
        router.push(ROUTES.NOT_FOUND)
      }
    }

    if (username) checkUserExists()
  }, [username, router])

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null
}
