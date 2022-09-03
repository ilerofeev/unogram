export default function Footer({ caption, username }: { caption: string; username: string }) {
  return (
    <div className="p-4 pt-2 pb-0">
      <span className="mr-1 font-bold">{username}</span>
      <span>{caption}</span>
    </div>
  )
}
