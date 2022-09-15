import { RefObject, useState } from 'react'
import { formatDistance } from 'date-fns'
import Link from 'next/link'
import AddComment from './Add-comment'

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}: {
  docId: string
  comments: { comment: string; displayName: string }[]
  posted: number
  commentInput: RefObject<HTMLInputElement>
}) {
  const [comments, setComments] = useState(allComments)
  const [commentsSlice, setCommentsSlice] = useState(3)

  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 3)
  }

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.slice(0, commentsSlice).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link href={`/p/${item.displayName}`}>
              <a>
                <span className="mr-1 font-bold">{item.displayName}</span>
              </a>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        {comments.length >= 3 && commentsSlice < comments.length && (
          <button
            className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
            type="button"
            onClick={showNextComments}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                showNextComments()
              }
            }}
          >
            View more comments
          </button>
        )}
        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  )
}
