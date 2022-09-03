export default function Image({ src, caption }: { src: string; caption: string }) {
  return <img src={src} alt={caption} />
}
