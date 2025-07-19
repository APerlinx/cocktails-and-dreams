import Link from 'next/link'
import Footer from '../_components/Footer'
import GalleryGrid from './GalleryGrid'

function page() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl">Gallery page - in progress</h1>
      <GalleryGrid />
      <Link href="/">Go back</Link>
      <Footer />
    </div>
  )
}

export default page
