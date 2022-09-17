import { useRef } from 'react'
import { FollowedPhoto } from '../../hooks/use-photos'
import Actions from './Actions'
import Comments from './Comments'
import Caption from './Caption'
import PostHeader from './Post-header'
import Image from 'next/image'

export default function Post({ content }: { content: FollowedPhoto }) {
  const commentInput = useRef<HTMLInputElement>(null)

  const handleFocus = () => commentInput.current?.focus()

  return (
    <div className="rounded col-span-4 border bg-white my-7">
      <PostHeader username={content.username} />
      <Image
        src={content.imageSrc}
        alt={content.caption}
        width="768"
        height="843"
        className="w-full object-cover"
      />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Caption caption={content.caption} username={content.username} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  )
}
