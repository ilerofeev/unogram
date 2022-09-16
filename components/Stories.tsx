import { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'
import Story from './Story'

export default function Stories() {
  const [suggestions, setSuggestions] = useState<
    { id: string; avatar: () => string; username: string }[]
  >([])

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
      {suggestions.map((profile) => (
        <Story key={profile.id} img={profile.avatar} username={profile.username} />
      ))}
    </div>
  )
}
