'use client'

import { usePathname } from 'next/navigation'
import BackButton from './BackButton'

function Header() {
  const pathname = usePathname()
  if (pathname === '/') return ''
  return <BackButton />
}

export default Header
