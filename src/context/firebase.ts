import { FirebaseApp } from 'firebase/app'
import { createContext } from 'react'
import { Auth, SignInWithEmailAndPasswordType } from '../lib/firebase'

const FirebaseContext = createContext<{
  firebase: FirebaseApp | null
  getAuth: Auth | null
  signInWithEmailAndPassword: SignInWithEmailAndPasswordType | null
}>({
  firebase: null,
  getAuth: null,
  signInWithEmailAndPassword: null,
})

export default FirebaseContext
