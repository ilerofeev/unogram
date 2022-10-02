import { arrayUnion, doc, updateDoc } from 'firebase/firestore/lite'
import { FormEvent, RefObject, useContext, useState } from 'react'
import UserContext from '../../context/user'
import { db } from '../../lib/firebase'
import { EmojiHappyIcon } from '@heroicons/react/outline'

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}: {
  docId: string
  comments: { comment: string; displayName: string }[]
  setComments: (comments: { comment: string; displayName: string }[]) => void
  commentInput: RefObject<HTMLInputElement>
}) {
  const [comment, setComment] = useState('')
  const user = useContext(UserContext)

  const handleSubmitComment = async (event: FormEvent) => {
    event.preventDefault()

    if (!user?.displayName) return

    setComments([...comments, { displayName: user.displayName, comment }])
    setComment('')

    const docRef = doc(db, 'photos', docId || '')

    return await updateDoc(docRef, {
      comments: arrayUnion({ displayName: user?.displayName, comment }),
    })
  }

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex items-center p-4"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
        }
      >
        <EmojiHappyIcon className="btn" />
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="border-none flex-1 focus:ring-0 outline-none"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-semibold text-blue-400 ${!comment && 'opacity-25'}`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  )
}
