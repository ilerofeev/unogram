import '../wdyr'
import '../styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import FirebaseContext from '../context/firebase'
import useAuthListener from '../hooks/use-auth-listener'
import UserContext from '../context/user'
import type { AppProps } from 'next/app'
import { firestore } from '../lib/firebase'
import { Suspense } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const { user } = useAuthListener()

  return (
    <FirebaseContext.Provider value={{ firestore }}>
      <UserContext.Provider value={user}>
        <Suspense fallback={<p>Loading...</p>}>
          <Component user={user} {...pageProps} />
        </Suspense>
      </UserContext.Provider>
    </FirebaseContext.Provider>
  )
}

export default MyApp
