'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useRef, useState } from 'react'
import { useModal } from '../context/MenuContext'
import { useClickOutside } from '../hooks/useClickOutside'
import SpinnerMini from './SpinnerMini'
import {
  Home,
  MessageCircleMore,
  GalleryVerticalEnd,
  MessageCircleQuestionMark,
  Triangle,
} from 'lucide-react'

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
    { href: '/', label: 'Home', icon: Home },
    { href: '/contact', label: 'Contact', icon: MessageCircleMore },
    { href: '/gallery', label: 'Gallery', icon: Triangle },
    { href: '/about', label: 'About', icon: MessageCircleQuestionMark },
  ]

  return (
    <div
      className="bg-secondary border-2 border-card-2 rounded-lg fixed bottom-21 right-10 text-center z-[100] shadow-lg"
      ref={modalRef}
    >
      <div className="grid grid-cols-2 grid-rows-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            href={href}
            onClick={handleClick(href)}
            key={href}
            className={`
            aspect-square flex flex-row gap-1 items-center justify-center 
            transition 
            cursor-pointer
            text-sm 
            hover:bg-primary/10
            focus-visible:outline-none
            ${href === '/' ? 'border-b-1 border-r-1 border-card-2' : ''}
            ${href === '/contact' ? 'border-b-1  border-card-2' : ''}
            ${href === '/gallery' ? 'border-r-1  border-card-2' : ''}
            ${pathname === href ? 'bg-primary/10' : ''}
          `}
          >
            {loadingHref === href ? (
              <SpinnerMini />
            ) : (
              <Icon className="w-5 h-5 " />
            )}
            <span>{label}</span>
          </Link>
        ))}
      </div>
      <code className="text-xs border-t-1 block border-primary/10  pt-2 text-primary px-2">
        Website and design by Alon Perlin
      </code>
    </div>
  )
}

export default MenuModal
