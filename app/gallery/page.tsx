import Footer from '../_components/Footer'
import Header from '../_components/Header'
import { getStaticMediaStats } from '../_lib/data-service'
import GalleryGrid from './GalleryGrid'

async function page() {
  const galleryStats = await getStaticMediaStats('gallery')

  return (
    <div className="min-h-screen pb-8 grid gap-12">
      <Header />
      <div>
        <GalleryGrid stats={galleryStats} />
      </div>
      <Footer />
    </div>
  )
}

export default page
