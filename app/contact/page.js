import Footer from '../_components/Footer'
import Header from '../_components/Header'
import ContactContect from './ContactContect'

function page() {
  return (
    <div className="min-h-screen p-8 grid gap-12">
      <Header />
      <section className="text-center">
        <h1 className="text-3xl font-bold mb-12 mt-4 text-center">
          Contact us
        </h1>
        <p>We give free advice...</p>
        <ContactContect />
      </section>
      <Footer />
    </div>
  )
}

export default page
