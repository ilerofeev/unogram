import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { User } from '../../hooks/use-user'
import { getSuggestedProfiles } from '../../services/firebase'
import SuggestedProfile from './suggested-profile'

export default function Suggestions({
  userId,
  following,
  loggedInUserDocId,
}: {
  userId?: string
  following?: string[]
  loggedInUserDocId?: string
}) {
  const [profiles, setProfiles] = useState<User[] | null>(null)

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId!, following!)
      setProfiles(response)
    }

    if (userId) suggestedProfiles()
  }, [userId, following])

  if (!profiles) return <Skeleton count={1} height={150} className="mt-5" />

  return profiles.length === 0 ? null : (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {userId &&
          profiles.map((profile) => (
            <SuggestedProfile
              key={profile.userId}
              profileDocId={profile.docId}
              username={profile.username}
              profileId={profile.userId}
              userId={userId}
              loggedInUserDocId={loggedInUserDocId}
            />
          ))}
      </div>
    </div>
  )
}
