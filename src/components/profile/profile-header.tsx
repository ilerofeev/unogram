import { Dispatch, useContext, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import useUser, { User } from '../../hooks/use-user'
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase'
import { DEFAULT_IMAGE_PATH } from '../../constants/paths'
import UserContext from '../../context/user'

export default function Header({
  photosCount,
  profile,
  followerCount,
  setFollowerCount,
}: {
  photosCount: number
  profile: User
  followerCount: number
  setFollowerCount: Dispatch<any>
}) {
  const { docId, followers, following, fullName, userId, username } = profile
  const loggedInUser = useContext(UserContext)
  const { user } = useUser(loggedInUser?.uid)

  const [isFollowingProfile, setIsFollowingProfile] = useState<boolean | null>(null)
  const activeBtnFollow = user && user.username && user?.username !== username

  const handleToggleFollow = async () => {
    if (user === null || typeof isFollowingProfile !== 'boolean') return
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile)
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    })
    await toggleFollow(isFollowingProfile, user.docId, docId, userId, user.userId)
  }

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(user!.username, userId)
      setIsFollowingProfile(!!isFollowing)
    }

    if (user?.username && userId) {
      isLoggedInUserFollowingProfile()
    }
  }, [user?.username, userId])

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {username ? (
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`${fullName} profile picture`}
            src={`/images/avatars/${username}.jpg`}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = DEFAULT_IMAGE_PATH
            }}
          />
        ) : (
          <Skeleton circle height={150} width={150} count={1} />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center items-center">
          <p className="text-2xl mr-4">{username}</p>
          {activeBtnFollow && isFollowingProfile === null ? (
            <Skeleton count={1} width={80} height={32} />
          ) : (
            activeBtnFollow && (
              <button
                className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                type="button"
                onClick={handleToggleFollow}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleToggleFollow()
                  }
                }}
              >
                {isFollowingProfile ? 'Unfollow' : 'Follow'}
              </button>
            )
          )}
        </div>
        <div className="container flex mt-4">
          {!followers || !following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span> photos
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following?.length}</span> following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
        </div>
      </div>
    </div>
  )
}
