import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import Image from 'next/image'
import { DEFAULT_IMAGE_PATH } from '../../constants/paths'
import { getAuth, signOut } from 'firebase/auth'
import { KeyboardEvent } from 'react'

export default function SidebarProfile({
  username,
  fullName,
}: {
  username?: string
  fullName?: string
}) {
  const auth = getAuth()

  if (!username || !fullName) return <Skeleton count={1} height={61} />

  function handleSignOut() {
    signOut(auth)
  }

  function handleSignOutKeyboard(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Enter') signOut(auth)
  }

  return (
    <div className="flex items-center justify-between mt-14">
      <Link href={`/p/${username}`}>
        <a>
          <Image
            className="rounded-full border p-[2px]"
            src={
              !['steve', 'orwell', 'dali', 'ilerofeev', 'raphael'].includes(username)
                ? DEFAULT_IMAGE_PATH
                : `/images/avatars/${username}.jpg`
            }
            alt={username}
            width="64"
            height="64"
          />
        </a>
      </Link>
      <div className="mx-4">
        <Link href={`/p/${username}`}>
          <a>
            <h2 className="font-bold">{username}</h2>
          </a>
        </Link>
        <h3 className="text-sm text-gray-400">{fullName}</h3>
      </div>
      <button
        className="text-blue-400 text-sm font-semibold"
        onClick={handleSignOut}
        onKeyDown={handleSignOutKeyboard}
      >
        Sign Out
      </button>
    </div>
  )
}
