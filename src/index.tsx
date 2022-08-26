import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import FirebaseContext from './context/firebase'
import { firebase, getAuth, signInWithEmailAndPassword } from './lib/firebase'
import './styles/app.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, getAuth, signInWithEmailAndPassword }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>
)
