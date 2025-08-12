import { ReactElement } from 'react'
import Footer from '../_components/Footer'
import Header from '../_components/Header'
import { getStaticMedia } from '../_lib/data-service'
import Content from './Content'

export const metadata = {
  title: 'עלינו',
  description: 'Get to know about or journey.',
}

async function AboutPage(): Promise<ReactElement> {
  const media = await getStaticMedia('about-media')

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
