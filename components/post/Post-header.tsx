import Image from 'next/image'
import Link from 'next/link'
import { DEFAULT_IMAGE_PATH } from '../../constants/paths'
import { DotsHorizontalIcon } from '@heroicons/react/outline'

export default function PostHeader({ username }: { username: string }) {
  return (
    <div className="flex items-center border-b border-gray-primary h-4 p-5 py-8">
      <Link href={`/p/${username}`} className="flex items-center">
        <a className="flex border p-1 mr-3 rounded-full">
          <Image
            className="rounded-full"
            src={
              !['steve', 'orwell', 'dali', 'ilerofeev', 'raphael'].includes(username)
                ? DEFAULT_IMAGE_PATH
                : `/images/avatars/${username}.jpg`
            }
            alt={`${username} profile picture`}
            width="32"
            height="32"
          />
        </a>
      </Link>
      <Link href={`/p/${username}`}>
        <p className="flex-1 font-bold cursor-pointer">{username}</p>
      </Link>
      <DotsHorizontalIcon className="h-5 cursor-pointer" />
    </div>
  )
}
