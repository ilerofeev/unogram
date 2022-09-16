import Header from '../components/Header'
import LoggedInUserContext from '../context/loggedInUser'
import useUser from '../hooks/use-user'
import Feed from '../components/Feed'
import CommonHead from '../components/CommonHead'
import { User } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as ROUTES from '../constants/routes'

export default function Dashboard({ user: loggedInuser }: { user: User }) {
  const router = useRouter()
  const { user } = useUser(loggedInuser?.uid)

  useEffect(() => {
    if (!!!loggedInuser) router.push(ROUTES.SIGNIN)

    document.title = 'Unogram'
  }, [router, loggedInuser])

  return (
    user.userId && (
      <div className="h-screen overflow-y-scroll scrollbar-hide">
        <CommonHead />

        <LoggedInUserContext.Provider value={{ user }}>
          <Header />
          <Feed />
        </LoggedInUserContext.Provider>
      </div>
    )
  )
}
