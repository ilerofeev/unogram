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
  const [suggestions, setSuggestions] = useState<User[] | null>(null)

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId!, following!)
      setSuggestions(response)
    }

    if (userId) suggestedProfiles()
  }, [userId, following])

  if (!suggestions) return <Skeleton count={1} height={150} className="mt-5" />

  return suggestions.length === 0 ? null : (
    <div className="mt-4">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See all</button>
      </div>
      {userId &&
        suggestions.map((profile) => (
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
  )
}
