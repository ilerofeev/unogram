import { useState } from 'react'
import { Link } from 'react-router-dom'
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase'

export default function SuggestedProfile({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
}: {
  profileDocId: string
  username: string
  profileId: string
  userId: string
  loggedInUserDocId?: string
}) {
  const [followed, setFollowed] = useState(false)

  async function handleFollowUser() {
    if (!loggedInUserDocId) return
    setFollowed(true)
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false)
    await updateFollowedUserFollowers(profileDocId, userId, false)
  }

  return !followed ? (
    <div className="flex flex-row items-center justify-between">
      <div className="flex justify-between items-center">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt={username}
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null
}
