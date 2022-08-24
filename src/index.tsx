import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import FirebaseContext from './context/firebase'
import { firebase, FieldValue } from './lib/firebase'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>
)
