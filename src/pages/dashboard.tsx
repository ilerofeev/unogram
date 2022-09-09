import { User } from 'firebase/auth'
import { useEffect } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/sidebar'
import Timeline from '../components/Timeline'
import LoggedInUserContext from '../context/loggedInUser'
import useUser from '../hooks/use-user'

export default function Dashboard({ user: loggedInuser }: { user: User | null }) {
  const { user } = useUser(loggedInuser?.uid)

  useEffect(() => {
    document.title = 'Unogram'
  }, [])

  return (
    <LoggedInUserContext.Provider value={{ user }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  )
}
