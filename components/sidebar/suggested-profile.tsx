import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase'
import { DEFAULT_IMAGE_PATH } from '../../constants/paths'

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
    <div className="flex items-center justify-between mt-3">
      <Image
        className="rounded-full border p-[2px]"
        src={
          !['steve', 'orwell', 'dali', 'ilerofeev', 'raphael'].includes(username)
            ? DEFAULT_IMAGE_PATH
            : `/images/avatars/${username}.jpg`
        }
        alt={username}
        width="40"
        height="40"
      />

      <div className="flex-1 ml-4">
        <h2 className="font-bold text-sm">
          <Link href={`/p/${username}`}>{username}</Link>
        </h2>
        {/* <h3 className="text-xs text-gray-400">Works at {}</h3> */}
      </div>

      <button className="text-blue-400 text-sm" type="button" onClick={handleFollowUser}>
        Follow
      </button>
    </div>
  ) : null
}
