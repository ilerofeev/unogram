import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { getSuggestedProfiles } from '../../services/firebase'

export default function Suggestions({
  userId,
  following,
}: {
  userId?: string
  following?: string[]
}) {
  const [profiles, setProfiles] = useState<{}[] | null>(null)

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId!, following!)
      setProfiles(response)
    }

    if (userId) suggestedProfiles()
  }, [userId])

  if (!profiles) return <Skeleton count={1} height={150} className="mt-5" />

  return profiles.length === 0 ? null : (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
    </div>
  )
}
