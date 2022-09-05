import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserByUsername } from '../services/firebase'
import * as ROUTES from '../constants/routes'
import Header from '../components/header'
import UserProfile from '../components/profile'
import { User } from '../hooks/use-user'

export default function Profile() {
  const { username } = useParams()
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function checkUserExists() {
      const [user] = await getUserByUsername(username!)
      if (user?.userId) {
        setUser(user)
      } else {
        navigate(ROUTES.NOT_FOUND)
      }
    }

    if (username) checkUserExists()
  }, [username, history])

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null
}
