'use client'

import { useEffect, useRef } from 'react'
import { useModal } from '../context/MenuContext'
import { useClickOutside } from '../hooks/useClickOutside'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function MenuModal() {
  const pathname = usePathname()
  const { isOpen, toggleMenu } = useModal()
  const modalRef = useRef()

  useClickOutside(modalRef, () => {
    if (isOpen) toggleMenu()
  })

  useEffect(() => {
    if (pathname === '/' && isOpen) {
      toggleMenu()
    }
  }, [pathname, isOpen, toggleMenu])

  if (!isOpen) return null

  return (
    <div
      className="bg-[#0a0a0a] border-2 border-gray-500/20 rounded-xl fixed bottom-17 right-8 text-center"
      ref={modalRef}
    >
      <ul className="p-4">
        <li className="hover:bg-gray-500/20 rounded-sm p-1 hover:cursor-pointer border-b-1 border-gray-500/20">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:bg-gray-500/20 rounded-sm p-1 hover:cursor-pointer">
          Contact
        </li>
      </ul>
      <code className="text-xs border-t-2 border-gray-500/20 p-2 rounded-xl">
        Website and desgin by Alon Perlin
      </code>
    </div>
  )
}

export default MenuModal
