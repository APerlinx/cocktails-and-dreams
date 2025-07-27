import Footer from '../_components/Footer'
import Header from '../_components/Header'
import GalleryGrid from './GalleryGrid'

async function page() {
  return (
    <div className="min-h-screen pb-8 grid gap-12">
      <Header />
      <div>
        <GalleryGrid />
      </div>
      <Footer />
    </div>
  )
}

export default page
