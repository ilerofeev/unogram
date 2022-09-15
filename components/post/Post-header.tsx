import Image from 'next/image'
import Link from 'next/link'
import { DEFAULT_IMAGE_PATH } from '../../constants/paths'

export default function PostHeader({ username }: { username: string }) {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link href={`/p/${username}`} className="flex items-center">
          <a className="flex">
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
        <p className="font-bold ml-3">{username}</p>
      </div>
    </div>
  )
}
