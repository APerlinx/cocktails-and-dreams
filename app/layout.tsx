import { Metadata } from 'next'
import { ReactNode } from 'react'
import LazyMenuModal from './_components/LazyMenuModal'
import './_styles/globals.css'
import { ModalProvider } from './context/MenuContext'
import { Geist, Geist_Mono } from 'next/font/google'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cocktailsndreams.art'),
  title: {
    default: 'בר אקטיבי לאירועים | Cocktails & Dreams',
    template: '%s | Cocktails & Dreams',
  },
  description:
    'בר קוקטיילים לאירועים פרטיים ועסקיים, סדנאות קוקטיילים ושירותי בר בכל הארץ.',

  openGraph: {
    type: 'website',
    locale: 'he_IL',
    siteName: 'קוקטיילס אנד דרימס',
    title: 'בר קוקטיילים לאירועים | קוקטיילס אנד דרימס',
    description: 'בר קוקטיילים לאירועים, סדנאות קוקטיילים ושירותי בר בכל הארץ.',
    url: 'https://www.cocktailsndreams.art',
    images: [
      {
        url: 'https://res.cloudinary.com/dlvlvj00u/image/upload/v1754298988/main_hyzm8z.jpg',
        width: 1200,
        height: 630,
        alt: 'קוקטיילס אנד דרימס — תצוגה מקדימה לאירוע',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'בר קוקטיילים לאירועים | קוקטיילס אנד דרימס',
    description:
      'סדנאות קוקטיילים ושירותי בר לאירועים פרטיים ועסקיים בכל הארץ.',
    images: [
      'https://res.cloudinary.com/dlvlvj00u/image/upload/v1754298988/main_hyzm8z.jpg',
    ],
  },
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModalProvider>
          {children}
          <LazyMenuModal />
        </ModalProvider>
      </body>
    </html>
  )
}
