import Footer from '../_components/Footer'
import GalleryGrid from './GalleryGrid'

async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gallery`, {
    cache: 'no-store',
  })
  const media = await res.json()

  return (
    <div className="font-sans grid grid-rows-[auto_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>
        <GalleryGrid media={media} />
      </div>
      <Footer />
    </div>
  )
}

export default page
