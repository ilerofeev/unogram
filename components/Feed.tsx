import Stories from './Stories'
import Sidebar from '../components/sidebar'
import Timeline from '../components/Timeline'

export default function Feed() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
      <section className="col-span-2">
        <Stories />
        {/* <Timeline /> */}
      </section>
      <section>{/* <Sidebar /> */}</section>
    </main>
  )
}