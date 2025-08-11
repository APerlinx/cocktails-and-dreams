import { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ReactNode } from 'react'
import MenuModal from './_components/MenuModal'
import './_styles/globals.css'
import { ModalProvider } from './context/MenuContext'

const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cocktails and dreams',
  description: 'Cocktails and dreams website',
  openGraph: {
    title: 'Cocktails and dreams',
    description: 'Active bar with cocktails specialty',
    url: 'https://www.cocktailsndreams.art',
    siteName: 'Cocktails & Dreams',
    images: [
      {
        url: 'https://res.cloudinary.com/dlvlvj00u/image/upload/v1754298988/main_hyzm8z.jpg',
        width: 1200,
        height: 630,
        alt: 'Cocktails & Dreams event preview',
      },
    ],
    type: 'website',
  },
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body className="antialiased">
        <ModalProvider>
          {children} <MenuModal />
        </ModalProvider>
      </body>
    </html>
  )
}
