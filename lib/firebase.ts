import { getApp, getApps, initializeApp } from 'firebase/app'
import 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import { getFirestore } from 'firebase/firestore/lite'

const config = {
  apiKey: 'AIzaSyABkU2O-KVhkxEK-YE54XZqzP8GycV6xSM',
  authDomain: 'unogram-ie.firebaseapp.com',
  projectId: 'unogram-ie',
  storageBucket: 'unogram-ie.appspot.com',
  messagingSenderId: '507415416694',
  appId: '1:507415416694:web:55e13eabdf727e39e73457',
}

const app = !getApps().length ? initializeApp(config) : getApp()
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
