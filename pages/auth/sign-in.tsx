import Link from 'next/link'
import * as ROUTES from '../../constants/routes'
import { FormEvent, useEffect, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { getProviders, signIn } from 'next-auth/react'

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default function SignIn({ providers }: { providers: any[] }) {
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const isInvalid = password === '' || emailAddress === ''

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    if (!getAuth || !signInWithEmailAndPassword) return
    event.preventDefault()
    try {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, emailAddress, password)
      router.push(ROUTES.DASHBOARD)
    } catch (error: any) {
      setEmailAddress('')
      setPassword('')
      setError(error.message)
    }
  }

  useEffect(() => {
    document.title = 'Sign In - Unogram'
  }, [])

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <Image
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram"
          width="461"
          height="627"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border rounded border-gray-primary">
          <h1 className="flex justify-center mt-2 w-6/12 mb-4">
            <Image src="/images/logo.png" alt="Unogram" width="137" height="39" />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignIn} method="POST">
            <input
              type="text"
              aria-label="Enter your email address"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              type="password"
              aria-label="Enter your email password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    className="p-3 bg-blue-500 rounded-lg text-white"
                    onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && 'opacity-50'
              }`}
            >
              Login
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border rounded border-gray-primary">
          <p className="text-sm">
            {`Don't gave an account? `}
            <Link href={ROUTES.SIGNUP}>
              <a className="font-bold text-blue-medium">Sign up</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
