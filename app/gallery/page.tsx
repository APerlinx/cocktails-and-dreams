import Footer from '../_components/Footer'
import Header from '../_components/Header'
import GalleryGrid from './GalleryGrid'

async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gallery`, {
    cache: 'no-store',
  })
  const media = await res.json()

  return (
    <div className="min-h-screen pb-8 grid gap-12">
      <Header />
      <div>
        <GalleryGrid media={media} />
      </div>
      <Footer />
    </div>
  )
}

export default page
