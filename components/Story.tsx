export default function Story({ img, username }: { img: () => string; username: string }) {
  return (
    <div>
      <img
        src={img()}
        alt="avatar"
        className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 hover: p[1.65px]
            transition transform duration-200 ease-out"
      />
      <p className="text-sm w-14 truncate text-center">{username}</p>
    </div>
  )
}
