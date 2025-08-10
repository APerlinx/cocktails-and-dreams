import { Geist, Geist_Mono } from 'next/font/google'
import './_styles/globals.css'
import { ModalProvider } from './context/MenuContext'
import MenuModal from './_components/MenuModal'
import { ReactNode } from 'react'
import { Metadata } from 'next'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Cocktails and dreams',
  description: 'Cocktails and dreams website',
  openGraph: {
    title: 'Cocktails and dreams',
    description: 'Active bar with cocktails specialty',
    url: 'www.cocktailsndreams.art',
    siteName: 'Cocktails & Dreams',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Cocktail bar preview',
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
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModalProvider>
          {children} <MenuModal />
        </ModalProvider>
      </body>
    </html>
  )
}
