import Footer from '../_components/Footer'
import Header from '../_components/Header'
import Cards from './Cards'

function page() {
  return (
    <div className="min-h-screen p-8 grid gap-12">
      <Header />
      <section>
        <Cards />
      </section>
      <Footer />
    </div>
  )
}

export default page
