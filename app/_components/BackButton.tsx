'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ReactElement } from 'react'

function BackButton(): ReactElement {
  return (
    <Link href="/">
      <ArrowLeft /> <p className="text-xs">Home</p>
    </Link>
  )
}

export default BackButton
