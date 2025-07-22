import Image from 'next/image'
import ContactImages from './ContactImages'
import Link from 'next/link'

async function ContactContect() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gallery`, {
    next: { revalidate: 3600 },
  })
  const media = await res.json()
  return (
    <div className="grid grid-cols-2 mt-20">
      <ContactImages media={media} />
      <div className="flex flex-col justify-center items-center border-2 border-gray-500 rounded-lg">
        <Image
          src="/logo-text.svg"
          height={400}
          width={200}
          alt="small logo for contact section"
        />
        <div className="flex flex-col gap-2 items-center">
          And you can contact us directly here
          <div className="flex flex-row gap-2 text-lg ">
            <span>Idan | 052484808</span>
            <Link href="">
              <Image
                src="/whatsapp.svg"
                height={24}
                width={24}
                alt="whatsapp"
              />
            </Link>
          </div>
          <div className="flex flex-row gap-2 text-lg">
            <span>Ofir | 0547960040</span>
            <Link href="">
              <Image
                src="/whatsapp.svg"
                height={24}
                width={24}
                alt="whatsapp"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactContect
