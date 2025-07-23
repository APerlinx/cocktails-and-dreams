'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ModalContextType = {
  isOpen: boolean
  toggleMenu: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen((prev) => !prev)

  return (
    <ModalContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal must be used within a ModalProvider')
  return context
}
