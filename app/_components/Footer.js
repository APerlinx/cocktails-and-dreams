import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      <Link
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="/contact"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/chat.svg"
          alt="Chat icon"
          width={16}
          height={16}
        />
        Contact
      </Link>
      <Link
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="/about"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/question.svg"
          alt="question icon"
          width={16}
          height={16}
        />
        About us
      </Link>
      <Link
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href=""
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/instagram.svg"
          alt="Globe icon"
          width={16}
          height={16}
        />
        Go to our instagram →
      </Link>
    </footer>
  )
}

export default Footer
