import Skeleton from 'react-loading-skeleton'
import usePhotos from '../hooks/use-photos'
import Post from './post'

export default function Timeline() {
  const { photos } = usePhotos()

  function renderPhotos() {
    if (!photos) return <Skeleton count={4} width={640} height={500} className="mb-5" />

    return photos.length > 0 ? (
      photos.map((photo) => <Post key={photo.docId} content={photo} />)
    ) : (
      <p className="text-center text-2xl">Follow people to see photos</p>
    )
  }

  return <div className="container col-span-2">{renderPhotos()}</div>
}
