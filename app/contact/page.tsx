import Footer from '../_components/Footer'
import Header from '../_components/Header'
import Cards from './Cards'

export const metadata = {
  title: 'Contact – Cocktails & Dreams',
  description: 'Conctact us for inquiries, reservations, or feedback.',
}

function page() {
  return (
    <div className="min-h-screen pb-8 grid gap-12">
      <Header />
      <section>
        <Cards />
      </section>
      <Footer />
    </div>
  )
}

export default page
