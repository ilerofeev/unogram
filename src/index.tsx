import './wdyr'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import FirebaseContext from './context/firebase'
import { firestore } from './lib/firebase'
import './styles/app.css'
import 'react-loading-skeleton/dist/skeleton.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firestore }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>
)
