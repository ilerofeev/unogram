import { useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
import LoggedInUserContext from '../context/loggedInUser'
import usePhotos from '../hooks/use-photos'
import Post from './post'

export default function Timeline() {
  const { user } = useContext(LoggedInUserContext)
  const { photos } = usePhotos(user)

  function renderPhotos() {
    if (!user.following) return <Skeleton count={2} width={640} height={500} className="mb-5" />

    return user.following.length === 0 ? (
      <p className="flex justify-center font-bold">Follow other people to see Photos</p>
    ) : (
      photos && photos.map((content) => <Post key={content.docId} content={content} />)
    )
  }

  return <div className="container col-span-2">{renderPhotos()}</div>
}
