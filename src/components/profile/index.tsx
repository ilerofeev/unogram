import { useEffect, useReducer } from 'react'
import Header from './profile-header'
import Photos from './photos'
import { getUserPhotosByUserId } from '../../services/firebase'
import { User } from '../../hooks/use-user'
import { Photo } from '../../hooks/use-photos'

type Reducer = {
  profile: User
  photosCollection: (Photo & { docId: string })[]
  followerCount: number
}

export default function Profile({ user }: { user: User }) {
  const reducer = (state: Reducer, newState: Reducer) => ({ ...state, ...newState })
  const initialState = {
    profile: {} as User,
    photosCollection: [],
    followerCount: 0,
  }

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user.userId)
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: (user.followers && user.followers.length) || 0,
      })
    }
    getProfileInfoAndPhotos()
  }, [user.username])

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  )
}
