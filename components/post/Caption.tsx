export default function Caption({ caption, username }: { caption: string; username: string }) {
  return (
    <div className="p-5 truncate">
      <span className="mr-1 font-bold">{username}</span>
      {caption}
    </div>
  )
}
