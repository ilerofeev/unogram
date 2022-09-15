import Link from 'next/link'
import * as ROUTES from '../constants/routes'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore/lite'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { doesUsernameExist } from '../services/firebase'
import Image from 'next/image'
import { firestore } from '../lib/firebase'

export default function SignUp() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const isInvalid = password === '' || emailAddress === ''

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const usernameExists = await doesUsernameExist(username)

    if (usernameExists) {
      setUsername('')
      setError('That username is already taken, please try another.')
    } else {
      try {
        const auth = getAuth()
        const createdUserResult = await createUserWithEmailAndPassword(auth, emailAddress, password)

        // setting displayName of user in authentication
        if (auth.currentUser)
          await updateProfile(auth.currentUser, {
            displayName: username,
          })

        // firebase add to collection
        const collectionRef = collection(firestore, 'users')
        await addDoc(collectionRef, {
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        })

        router.push(ROUTES.DASHBOARD)
      } catch (error) {
        setFullName('')
        setEmailAddress('')
        setPassword('')
        if (error instanceof Error) setError(error.message)
      }
    }
  }

  useEffect(() => {
    document.title = 'Sign Up - Unogram'
  }, [])

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <Image
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram"
          width="460"
          height="627"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border rounded border-gray-primary">
          <h1 className="flex justify-center mt-2 w-6/12 mb-4">
            <Image src="/images/logo.png" alt="Unogram" width="137" height="39" />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              type="text"
              aria-label="Enter your username"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <input
              type="text"
              aria-label="Enter your full name"
              placeholder="Full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
            />
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
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && 'opacity-50'
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border rounded border-gray-primary">
          <p className="text-sm">
            Have an account?{` `}
            <Link href={ROUTES.SIGNIN}>
              <a className="font-bold text-blue-medium">Sign In</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
