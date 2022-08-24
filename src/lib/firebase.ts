import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyABkU2O-KVhkxEK-YE54XZqzP8GycV6xSM',
  authDomain: 'unogram-ie.firebaseapp.com',
  projectId: 'unogram-ie',
  storageBucket: 'unogram-ie.appspot.com',
  messagingSenderId: '507415416694',
  appId: '1:507415416694:web:55e13eabdf727e39e73457',
}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore

export { firebase, FieldValue }
