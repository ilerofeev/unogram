import { firestore } from '../lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore/lite'

export async function doesUsernameExist(username: string) {
  const collectionRef = collection(firestore, 'users')
  const q = query(collectionRef, where('username', '==', username))
  const docs = (await getDocs(q)).docs

  return !!docs.map((user) => user.data()).length
}
