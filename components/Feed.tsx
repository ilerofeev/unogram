import Stories from './Stories'
import Posts from './Posts'
import SidebarProfile from './sidebar/sidebar-profile'
import Suggestions from './sidebar/suggestions'
import { useContext } from 'react'
import LoggedInUserContext from '../context/loggedInUser'

export default function Feed() {
  const {
    user: { docId, username, fullName, userId, following },
  } = useContext(LoggedInUserContext)

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>
      <section className="hidden xl:inline-grid md:col-span-1 ml-10">
        <div className="fixed">
          <SidebarProfile username={username} fullName={fullName} />
          <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
        </div>
      </section>
    </main>
  )
}
