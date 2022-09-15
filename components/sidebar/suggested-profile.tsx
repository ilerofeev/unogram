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
    <div className="flex flex-row items-center justify-between">
      <div className="flex justify-between items-center">
        <Image
          className="rounded-full w-8 flex"
          src={
            !['steve', 'orwell', 'dali', 'ilerofeev', 'raphael'].includes(username)
              ? DEFAULT_IMAGE_PATH
              : `/images/avatars/${username}.jpg`
          }
          alt={username}
          width="32"
          height="32"
        />
        <Link href={`/p/${username}`}>
          <a>
            <p className="font-bold text-sm ml-3">{username}</p>
          </a>
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
