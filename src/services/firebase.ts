import { firestore } from '../lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore/lite'

export async function doesUsernameExist(username: string) {
  const collectionRef = collection(firestore, 'users')
  const q = query(collectionRef, where('username', '==', username))
  const result = (await getDocs(q)).docs

  return !!result.map((user) => user.data()).length
}

export async function getUserByUserId(userId: string) {
  const collectionRef = collection(firestore, 'users')
  const q = query(collectionRef, where('userId', '==', userId))
  const result = await getDocs(q)

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }))

  return user
}
