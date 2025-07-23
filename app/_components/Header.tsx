'use client'

import { usePathname } from 'next/navigation'
import { ReactElement } from 'react'
import BackButton from './BackButton'

function Header(): ReactElement | null {
  const pathname = usePathname()
  if (pathname === '/') return null
  return <BackButton />
}

export default Header
