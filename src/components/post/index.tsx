import { useRef } from 'react'
import { FollowedPhoto } from '../../hooks/use-photos'
import Actions from './Actions'
import Comments from './Comments'
import Footer from './Footer'
import Header from './Header'
import Image from './Image'

export default function Post({ content }: { content: FollowedPhoto }) {
  const commentInput = useRef<HTMLInputElement>(null)

  const handleFocus = () => commentInput.current?.focus()

  return (
    <div
      className="rounded col-span-4 border bg-white
   border-gray-primary mb-12"
    >
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  )
}
