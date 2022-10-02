import { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'
import Story from './Story'
import { useSession } from 'next-auth/react'

export default function Stories() {
  const [suggestions, setSuggestions] = useState<
    { id: string; avatar: () => string; username: string }[]
  >([])

  const { data: session } = useSession()

  useEffect(() => {
    const suggestionsData = [...Array(14)].map((_, i) => ({
      id: faker.datatype.uuid(),
      avatar: faker.image.avatar,
      username: faker.internet.userName(),
    }))

    setSuggestions(suggestionsData)
  }, [])

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black-light">
      {/* @ts-ignore*/}
      {session && <Story img={session.user.image} username={session.user.username} />}

      {suggestions.map((profile) => (
        <Story key={profile.id} img={profile.avatar()} username={profile.username} />
      ))}
    </div>
  )
}
