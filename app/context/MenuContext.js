'use client'

const { createContext, useState, useContext } = require('react')

const MenuContext = createContext()

function MenuProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  function toggleMenu() {
    setIsOpen((open) => !open)
  }
  return (
    <MenuContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  )
}

function useModal() {
  const context = useContext(MenuContext)
  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider')
  return context
}

export { MenuProvider, useModal }
