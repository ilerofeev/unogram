import { KeyboardEvent, useContext } from 'react'
import * as ROUTES from '../constants/routes'
import Link from 'next/link'
import { getAuth, signOut } from 'firebase/auth'
import useUser from '../hooks/use-user'
import UserContext from '../context/user'
import Image from 'next/image'
import { DEFAULT_IMAGE_PATH } from '../constants/paths'

export default function Header() {
  const loggedInUser = useContext(UserContext)
  const { user } = useUser(loggedInUser?.uid)
  const auth = getAuth()

  function handleSignOut() {
    signOut(auth)
  }

  function handleSignOutKeyboard(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Enter') signOut(auth)
  }

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center cursor-pointer">
            <h1 className="flex justify-center w-full mt-2">
              <Link href={ROUTES.DASHBOARD} aria-label="Unogram logo">
                <a>
                  <Image src="/images/logo.png" alt="Unogram" width="103" height="29" />
                </a>
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center">
            {user.username ? (
              <>
                <Link href={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <a>
                    <svg
                      className="w-8 mr-6 text-black-light cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </a>
                </Link>
                <button
                  type="button"
                  title="Sign Out"
                  onClick={handleSignOut}
                  onKeyDown={handleSignOutKeyboard}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 mr-6 text-black-light cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                </button>
                <div className="flex items-center cursor-pointer">
                  <Link href={`/p/${user.username}`}>
                    <a className="h-8 w-8">
                      <Image
                        className="rounded-full"
                        src={
                          !['steve', 'orwell', 'dali', 'ilerofeev', 'raphael'].includes(
                            user.username
                          )
                            ? DEFAULT_IMAGE_PATH
                            : `/images/avatars/${user.username}.jpg`
                        }
                        alt={`${user.username} profile`}
                        width="32"
                        height="32"
                      />
                    </a>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link href={ROUTES.SIGNIN}>
                  <a>
                    <button
                      type="button"
                      className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                    >
                      Signin
                    </button>
                  </a>
                </Link>
                <Link href={ROUTES.SIGNUP}>
                  <a>
                    <button
                      type="button"
                      className="text-blue-medium font-bold text-sm rounded w-20 h-8"
                    >
                      Sign Up
                    </button>
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
