import { useEffect, useState } from 'react'
import { getPhotos } from '../services/firebase'
import { User } from './use-user'

export type Photo = {
  userId: string
  likes: string[]
  dateCreated: number
  imageSrc: string
  username: string
  caption: string
  userLikedPhoto: boolean
  comments: { comment: string; displayName: string }[]
  docId: string
}

export type FollowedPhoto = Photo & {
  docId: string
}

export default function usePhotos(user: User) {
  const [photos, setPhotos] = useState<FollowedPhoto[] | null>(null)

  useEffect(() => {
    async function getTimelinePhotos() {
      if (user.following?.length > 0) {
        const followedUserPhotos: FollowedPhoto[] = await getPhotos(user!.userId, user!.following)

        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated)
        setPhotos(followedUserPhotos)
        return
      }
      setPhotos([])
    }

    if (user) getTimelinePhotos()
  }, [user?.userId])

  return { photos }
}
