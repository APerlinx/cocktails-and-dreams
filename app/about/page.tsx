import { ReactElement } from 'react'
import Footer from '../_components/Footer'
import Header from '../_components/Header'
import Content from './Content'

async function AboutPage(): Promise<ReactElement> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/about-media`,
    {
      cache: 'no-store',
    }
  )
  const media = await res.json()

  return (
    <div className="min-h-screen pb-8 grid gap-12">
      <Header />
      <section className="text-center">
        <Content media={media} />
      </section>
      <Footer />
    </div>
  )
}

export default AboutPage
