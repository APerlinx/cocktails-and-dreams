import { ReactElement } from 'react'
import Footer from '../_components/Footer'
import Header from '../_components/Header'
import AboutImages from './AboutImages'

async function AboutPage(): Promise<ReactElement> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gallery`, {
    next: { revalidate: 3600 },
  })
  const media = await res.json()

  return (
    <div className="min-h-screen p-8 grid gap-12">
      <Header />
      <section className="text-center">
        <h1 className="text-3xl font-bold mb-12 mt-4">About Us</h1>
        <AboutImages media={media} />
      </section>
      <Footer />
    </div>
  )
}

export default AboutPage
