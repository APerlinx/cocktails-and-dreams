'use client'

import { usePathname } from 'next/navigation'
import { ReactElement } from 'react'
import BackButton from './BackButton'
import { FileQuestionMark, GalleryThumbnails } from 'lucide-react'

function Header(): ReactElement | null {
  const pathname = usePathname()
  if (pathname === '/') return null
  return (
    <header className="fixed top-4 left-8 z-50 hover:cursor-pointer">
      <nav className="flex flex-col gap-2 text-center">
        <BackButton />
      </nav>
    </header>
  )
}

export default Header
