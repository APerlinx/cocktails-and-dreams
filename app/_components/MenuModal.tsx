'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useRef, useState } from 'react'
import { useModal } from '../context/MenuContext'
import { useClickOutside } from '../hooks/useClickOutside'
import SpinnerMini from './SpinnerMini'

const MenuModal: FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [prevPath, setPrevPath] = useState('')
  const [loadingHref, setLoadingHref] = useState<string | null>(null)
  const { isOpen, toggleMenu } = useModal()
  const modalRef = useRef<HTMLDivElement>(null)

  useClickOutside(modalRef, () => {
    if (isOpen) toggleMenu()
  })

  useEffect(() => {
    setLoadingHref(null)

    if (pathname !== prevPath && isOpen) {
      toggleMenu()
    }
    setPrevPath(pathname)
  }, [pathname, isOpen, prevPath, toggleMenu])

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (href !== pathname) {
      setLoadingHref(href)
      router.push(href)
    }
  }

  if (!isOpen) return null

  const links = [
    { href: '/', label: 'Home' },
    { href: '/contact', label: 'Contact' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
  ]

  return (
    <div
      className="bg-primary-foreground border-2 border-gray-500/20 rounded-xl fixed bottom-17 right-8 text-center"
      ref={modalRef}
    >
      <ul className="p-4">
        {links.map(({ href, label }) => (
          <li
            key={href}
            className={`hover:bg-gray-500/20 rounded-sm p-1 hover:cursor-pointer border-b border-gray-500/20 last:border-b-0 ${
              pathname === href ? 'bg-gray-500/20' : ''
            }`}
          >
            <Link
              href={href}
              onClick={handleClick(href)}
              className="flex items-center justify-center gap-2"
            >
              {loadingHref === href ? <SpinnerMini /> : label}
            </Link>
          </li>
        ))}
      </ul>
      <code className="text-xs border-t-2 border-gray-500/20 p-2 ">
        Website and design by Alon Perlin
      </code>
    </div>
  )
}

export default MenuModal
