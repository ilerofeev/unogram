import { useContext, useEffect, useState } from 'react'
import UserContext from '../context/user'
import { getPhotos, getUserByUserId } from '../services/firebase'

export type Photo = {
  userId: string
  likes: string[]
  dateCreated: number
  imageSrc: string
  username: string
  caption: string
  userLikedPhoto: boolean
  comments: { comment: string; displayName: string }[]
}

export type FollowedPhoto = Photo & {
  docId: string
}

export default function usePhotos() {
  const [photos, setPhotos] = useState<FollowedPhoto[] | null>(null)

  const user = useContext(UserContext)

  useEffect(() => {
    async function getTimelinePhotos() {
      const { following } = await getUserByUserId(user!.uid)
      let followedUserPhotos: FollowedPhoto[] = []

      if (following.length > 0) {
        followedUserPhotos = await getPhotos(user!.uid, following)
      }

      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated)
      setPhotos(followedUserPhotos)
    }

    if (user) getTimelinePhotos()
  }, [user?.uid])

  return { photos }
}
