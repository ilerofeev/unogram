import { db } from '../lib/firebase'
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore/lite'
import { User } from '../hooks/use-user'
import { Photo } from '../hooks/use-photos'

export async function doesUsernameExist(username: string) {
  const collectionRef = collection(db, 'users')
  const q = query(collectionRef, where('username', '==', username))
  const result = (await getDocs(q)).docs

  return !!result.map((user) => user.data()).length
}

export async function getUserByUserId(userId: string) {
  const collectionRef = collection(db, 'users')
  const q = query(collectionRef, where('userId', '==', userId))
  const result = await getDocs(q)

  const [user] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }))

  return { ...(user as User) }
}

export async function getSuggestedProfiles(userId: string, following: string[]) {
  const collectionRef = collection(db, 'users')
  const q = query(collectionRef, where('userId', '!=', userId), limit(10))
  const result = await getDocs(q)

  const profiles = result.docs
    .map(
      (item) =>
        ({
          ...item.data(),
          docId: item.id,
        } as User)
    )
    .filter((profile) => !following.includes(profile.userId))

  return profiles
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId: string,
  profileId: string,
  isFollowingProfile: boolean
) {
  const docRef = doc(db, 'users', loggedInUserDocId)
  await updateDoc(docRef, {
    following: isFollowingProfile ? arrayRemove(profileId) : arrayUnion(profileId),
  })
}

export async function updateFollowedUserFollowers(
  profileDocId: string,
  loggedInUserDocId: string,
  isFollowingProfile: boolean
) {
  const docRef = doc(db, 'users', profileDocId)
  await updateDoc(docRef, {
    followers: isFollowingProfile ? arrayRemove(loggedInUserDocId) : arrayUnion(loggedInUserDocId),
  })
}

export async function getPhotos(userId: string, following: string[]) {
  const collectionRef = collection(db, 'photos')
  const q = query(collectionRef, where('userId', 'in', following))

  const result = await getDocs(q)

  const userFollowersPhotos = result.docs.map(
    (photo) =>
      ({
        ...photo.data(),
        docId: photo.id,
      } as Photo)
  )

  const photosWithUserDetails = await Promise.all(
    userFollowersPhotos.map(async (photo) => {
      let userLikedPhoto = false
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true
      }
      const { username } = await getUserByUserId(photo.userId)
      return { ...photo, username, userLikedPhoto }
    })
  )

  return photosWithUserDetails
}

export async function getUserByUsername(username: string) {
  const collectionRef = collection(db, 'users')
  const q = query(collectionRef, where('username', '==', username.toLowerCase()))
  const result = (await getDocs(q)).docs

  return result.map(
    (item) =>
      ({
        ...item.data(),
        docId: item.id,
      } as User)
  )
}

export async function getUserPhotosByUserId(userId: string) {
  const collectionRef = collection(db, 'photos')
  const q = query(collectionRef, where('userId', '==', userId))
  const result = (await getDocs(q)).docs

  const photos = result.map(
    (photo) =>
      ({
        ...photo.data(),
        docId: photo.id,
      } as Photo)
  )
  return photos
}

export async function isUserFollowingProfile(loggedInUserUsername: string, profileUserId: string) {
  const collectionRef = collection(db, 'users')
  const q = query(
    collectionRef,
    where('username', '==', loggedInUserUsername),
    where('following', 'array-contains', profileUserId)
  )
  const result = (await getDocs(q)).docs

  return !!result.length
}

export async function toggleFollow(
  isFollowingProfile: boolean,
  activeUserDocId: string,
  profileDocId: string,
  profileUserId: string,
  followingUserId: string
) {
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile)
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile)
}
