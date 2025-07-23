'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useEffect, useRef, useState } from 'react'
import { useModal } from '../context/MenuContext'
import { useClickOutside } from '../hooks/useClickOutside'

const MenuModal: FC = () => {
  const pathname = usePathname()
  const [prevPath, setPrevPath] = useState('')
  const { isOpen, toggleMenu } = useModal()
  const modalRef = useRef<HTMLDivElement>(null)

  useClickOutside(modalRef, () => {
    if (isOpen) toggleMenu()
  })

  useEffect(() => {
    if (pathname !== prevPath && isOpen) {
      toggleMenu()
    }
    setPrevPath(pathname)
  }, [pathname, isOpen, toggleMenu, prevPath])

  if (!isOpen) return null

  return (
    <div
      className="bg-primary-foreground border-2 border-gray-500/20 rounded-xl fixed bottom-17 right-8 text-center"
      ref={modalRef}
    >
      <ul className="p-4">
        <li className="hover:bg-gray-500/20 rounded-sm p-1 hover:cursor-pointer border-b-1 border-gray-500/20">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:bg-gray-500/20 rounded-sm p-1 hover:cursor-pointer">
          <Link href="/contact">Contact</Link>
        </li>
        <li className="hover:bg-gray-500/20 rounded-sm p-1 hover:cursor-pointer">
          <Link href="/gallery">Gallery</Link>
        </li>
      </ul>
      <code className="text-xs border-t-2 border-gray-500/20 p-2 rounded-xl">
        Website and desgin by Alon Perlin
      </code>
    </div>
  )
}

export default MenuModal
