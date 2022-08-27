import { initializeApp } from 'firebase/app'
import 'firebase/firestore'

import { getFirestore } from 'firebase/firestore/lite'

const config = {
  apiKey: 'AIzaSyABkU2O-KVhkxEK-YE54XZqzP8GycV6xSM',
  authDomain: 'unogram-ie.firebaseapp.com',
  projectId: 'unogram-ie',
  storageBucket: 'unogram-ie.appspot.com',
  messagingSenderId: '507415416694',
  appId: '1:507415416694:web:55e13eabdf727e39e73457',
}

initializeApp(config)
const firestore = getFirestore()

export { firestore }
