import '../wdyr'
import '../styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import FirebaseContext from '../context/firebase'
import useAuthListener from '../hooks/use-auth-listener'
import UserContext from '../context/user'
import type { AppProps } from 'next/app'
import { db } from '../lib/firebase'
import { Suspense } from 'react'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { user } = useAuthListener()

  return (
    <SessionProvider session={session}>
      <FirebaseContext.Provider value={{ firestore: db }}>
        <UserContext.Provider value={user}>
          <Suspense fallback={<p>Loading...</p>}>
            <RecoilRoot>
              <Component user={user} {...pageProps} />
            </RecoilRoot>
          </Suspense>
        </UserContext.Provider>
      </FirebaseContext.Provider>
    </SessionProvider>
  )
}

export default MyApp
