import { Firestore } from 'firebase/firestore'
import { createContext } from 'react'

const FirebaseContext = createContext<{
  firestore: Firestore | null
}>({
  firestore: null,
})

export default FirebaseContext
