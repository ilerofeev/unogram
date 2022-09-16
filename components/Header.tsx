import { KeyboardEvent, useContext } from 'react'
import * as ROUTES from '../constants/routes'
import Link from 'next/link'
import { getAuth, signOut } from 'firebase/auth'
import useUser from '../hooks/use-user'
import UserContext from '../context/user'
import Image from 'next/image'
import { DEFAULT_IMAGE_PATH } from '../constants/paths'
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'

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
    <header className="h-16 bg-white border-gray-primary mb-8 shadow-sm border-b sticky top-0 z-50">
      <div className="mx-5 lg:mx-auto max-w-6xl flex justify-between h-full items-center">
        <Link href={ROUTES.DASHBOARD} aria-label="Unogram logo">
          <>
            <div className="hidden lg:inline-grid justify-center mt-2 cursor-pointer">
              <Image src="/images/logo.png" alt="Unogram" width="103" height="29" />
            </div>
            <div className="lg:hidden flex-shrink-0 w-8 h-8 cursor-pointer">
              <Image src="/images/logo-mobile.png" alt="Unogram" width="32" height="32" />
            </div>
          </>
        </Link>
        <div className="relative p-3 rounded-md ml-1">
          <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 block w-full p-2 pl-10 sm:text-sm border-gray-300 focus:ring-black-light focus:border-black-light rounded-md"
          />
        </div>
        <div className="flex items-center space-x-4">
          {user.username ? (
            <>
              <Link href={ROUTES.DASHBOARD} aria-label="Dashboard">
                <HomeIcon className="navBtn" />
              </Link>
              <MenuIcon className="h-6 md:hidden cursor-pointer" />
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -top-2 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full grid place-items-center animate-pulse text-white">
                  3
                </div>
              </div>
              <PlusCircleIcon className="navBtn" />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <div className="h-10 w-10 relative rounded-full">
                <Link href={`/p/${user.username}`} aria-label="my profile">
                  <a>
                    <Image
                      src={
                        !['steve', 'orwell', 'dali', 'ilerofeev', 'raphael'].includes(user.username)
                          ? DEFAULT_IMAGE_PATH
                          : `/images/avatars/${user.username}.jpg`
                      }
                      alt={`${user.username} profile`}
                      layout="fill"
                      className="rounded-full cursor-pointer"
                    />
                  </a>
                </Link>
              </div>
              {/* <button
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
              </button> */}
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
    </header>
  )
}
