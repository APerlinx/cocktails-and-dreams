'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const MenuModal = dynamic(() => import('./MenuModal'), { ssr: false })

export default function LazyMenuModal() {
  const pathname = usePathname()
  if (pathname === '/') return null
  return <MenuModal />
}
