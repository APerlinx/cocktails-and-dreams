import { Geist, Geist_Mono } from 'next/font/google'
import './_styles/globals.css'
import { ModalProvider } from './context/MenuContext'
import MenuModal from './_components/MenuModal'
import { ReactNode } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Cocktails and dreams',
  description: 'Cocktail and dreams website',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
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
