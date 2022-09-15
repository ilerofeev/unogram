import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import Image from 'next/image'
import { DEFAULT_IMAGE_PATH } from '../../constants/paths'

export default function User({ username, fullName }: { username?: string; fullName?: string }) {
  if (!username || !fullName) return <Skeleton count={1} height={61} />

  return (
    <Link href={`/p/${username}`}>
      <a className="grid grid-cols-4 gap-4 mb-6 items-center">
        <div className="flex items-center justify-between col-span-1">
          <Image
            className="rounded-full w-16 flex mr-3"
            src={
              !['steve', 'orwell', 'dali', 'ilerofeev', 'raphael'].includes(username)
                ? DEFAULT_IMAGE_PATH
                : `/images/avatars/${username}.jpg`
            }
            alt={username}
            width="62.66"
            height="62.66"
          />
        </div>
        <div className="col-span-3">
          <p className="font-bold text-sm">{username}</p>
          <p className="text-sm">{fullName}</p>
        </div>
      </a>
    </Link>
  )
}
