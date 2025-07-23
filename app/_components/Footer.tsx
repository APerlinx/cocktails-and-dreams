'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactElement } from 'react'
import MenuCircle from './MenuCircle'

function Footer(): ReactElement {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const textColorClass = isHome ? 'text-white' : 'text-black'

  const links = [
    {
      href: '/contact',
      text: 'Contact',
      icon: 'chat',
    },
    {
      href: '/about',
      text: 'About us',
      icon: 'question',
    },
    {
      href: '',
      text: 'Go to our instagram →',
      icon: 'instagram',
    },
  ]

  return (
    <footer
      className={`row-start-3 flex gap-[24px] flex-wrap items-center justify-center ${textColorClass}`}
    >
      {links.map(({ href, text, icon }) => (
        <Link
          key={text}
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href={href}
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src={`/${icon}${isHome ? '' : '-dark'}.svg`}
            alt={`${icon} icon`}
            width={16}
            height={16}
          />
          {text}
        </Link>
      ))}

      {!isHome && <MenuCircle />}
    </footer>
  )
}

export default Footer
