import Link from 'next/link'
import useUser from '../hooks/use-user'
import UserContext from '../context/user'
import Image from 'next/image'
import { useContext } from 'react'
import * as ROUTES from '../constants/routes'
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
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'

export default function Header() {
  const loggedInUser = useContext(UserContext)
  const { user } = useUser(loggedInUser?.uid)
  const { data: session } = useSession()

  const [, setOpen] = useRecoilState(modalState)

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
          {session ? (
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
              <PlusCircleIcon className="navBtn" onClick={() => setOpen(true)} />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <div className="h-10 w-10 relative rounded-full overflow-hidden">
                <Link href={`/p/${user.username}`} aria-label="my profile">
                  <a onClick={() => signOut()}>
                    <Image
                      src={session?.user?.image || DEFAULT_IMAGE_PATH}
                      // src={
                      //   !['steve', 'orwell', 'dali', 'ilerofeev', 'raphael'].includes(user.username)
                      //     ? DEFAULT_IMAGE_PATH
                      //     : `/images/avatars/${user.username}.jpg`
                      // }
                      alt={`${user.username} profile`}
                      layout="fill"
                      className="cursor-pointer"
                    />
                  </a>
                </Link>
              </div>
              {/* <Link href={ROUTES.SIGNIN}>
                   <a>
                     <button
                       type="button"
                       className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                     >
                       Signin
                     </button>
                   </a>
                 </Link>
                */}
            </>
          ) : (
            <>
              {/* <Link href={ROUTES.SIGNIN}>
                <a> */}
              <button
                onClick={() => signIn()}
                type="button"
                className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              >
                Signin
              </button>
              {/* </a> */}
              {/* </Link> */}
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
