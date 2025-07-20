'use client'

import Image from 'next/image'
import Link from 'next/link'

function BackButton() {
  return (
    <Link href="/" className="fixed top-4 left-8 z-50 hover:cursor-pointer">
      <Image src="/arrow-left.svg" width={24} height={24} alt="Home" />
    </Link>
  )
}

export default BackButton
