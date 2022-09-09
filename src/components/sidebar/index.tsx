import { useContext } from 'react'
import LoggedInUserContext from '../../context/loggedInUser'
import Suggestions from './suggestions'
import User from './user'

export default function Sidebar() {
  const {
    user: { docId, username, fullName, userId, following },
  } = useContext(LoggedInUserContext)

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
    </div>
  )
}
