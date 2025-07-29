'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, ReactElement } from 'react'
import MenuCircle from './MenuCircle'

function Footer(): ReactElement {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'
  const [loadingLink, setLoadingLink] = useState<string | null>(null)

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
      href: 'https://www.instagram.com/p/C7EWI3oNHFf/',
      text: 'Go to our instagram →',
      icon: 'instagram',
    },
  ]

  const handleClick =
    (href: string, isExternal: boolean) => (e: React.MouseEvent) => {
      if (!isExternal) {
        e.preventDefault()
        setLoadingLink(href)
        router.push(href)
      }
    }

  return (
    <footer
      className={`row-start-3 flex gap-[24px] flex-wrap items-center justify-center ${textColorClass} `}
    >
      {links.map(({ href, text, icon }) => {
        const isExternal = href.startsWith('http')
        const isLoading = loadingLink === href

        const commonClass = `flex items-center gap-2 hover:underline hover:underline-offset-4 transition-opacity ${
          isLoading ? 'opacity-50 pointer-events-none' : ''
        } ${pathname === href ? 'underline underline-offset-4' : ''}`

        const iconSrc = `/${icon}${isHome ? '' : '-dark'}.svg`

        return isExternal ? (
          <a
            key={text}
            href={href}
            className={commonClass}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src={iconSrc}
              alt={`${icon} icon`}
              width={16}
              height={16}
            />
            {text}
          </a>
        ) : (
          <Link
            key={text}
            href={href}
            className={commonClass}
            onClick={handleClick(href, isExternal)}
          >
            <Image
              aria-hidden
              src={iconSrc}
              alt={`${icon} icon`}
              width={16}
              height={16}
            />
            {text}
          </Link>
        )
      })}

      {!isHome && <MenuCircle />}
    </footer>
  )
}

export default Footer
