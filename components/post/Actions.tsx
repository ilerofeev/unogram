import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore/lite'
import { KeyboardEvent, useContext, useState } from 'react'
import UserContext from '../../context/user'
import { db } from '../../lib/firebase'
import {
  BookmarkAltIcon,
  ChatIcon,
  HeartIcon as HeartIconFilled,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'

export default function Actions({
  docId,
  totalLikes,
  likedPhoto,
  handleFocus,
}: {
  docId: string
  totalLikes: number
  likedPhoto: boolean
  handleFocus: () => void
}) {
  const user = useContext(UserContext)

  const [toggleLiked, setToggleLiked] = useState(likedPhoto)
  const [likes, setLikes] = useState(totalLikes)

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked)

    const docRef = doc(db, 'photos', docId || '')

    await updateDoc(docRef, {
      likes: toggleLiked ? arrayRemove(user?.uid) : arrayUnion(user?.uid),
    })

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1))
  }

  return (
    <>
      <div className="flex justify-between px-4 pt-3">
        <div className="flex space-x-4">
          <HeartIconFilled
            className={`btn ${toggleLiked ? 'fill-red text-red-primary' : 'text-black-light'}`}
            onClick={handleToggleLiked}
            onKeyDown={(event: KeyboardEvent) => {
              if (event.key === 'Enter') {
                handleToggleLiked()
              }
            }}
          />
          <ChatIcon
            className="btn"
            onClick={handleFocus}
            onKeyDown={(event: KeyboardEvent) => {
              if (event.key === 'Enter') {
                handleFocus()
              }
            }}
          />
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkAltIcon className="btn" />
      </div>
      <div className="p-4 py-0">
        <p className="font-bold">{likes === 1 ? `${likes} like` : `${likes} likes`}</p>
      </div>
    </>
  )
}
