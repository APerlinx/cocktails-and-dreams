'use client'
import { useRef } from 'react'
import { useModal } from '../context/MenuContext'
import { useClickOutside } from '../hooks/useClickOutside'
import { HiOutlineHome, HiOutlinePhone } from 'react-icons/hi'

function MenuModal() {
  const { isOpen, toggleMenu } = useModal()
  const modalRef = useRef()
  useClickOutside(modalRef, () => {
    if (isOpen) toggleMenu()
  })
  if (!isOpen) return null

  return (
    <div
      className="bg-[#0a0a0a] border-2 border-gray-500/20 rounded-xl fixed bottom-17 right-8 text-center"
      ref={modalRef}
    >
      <ul className="p-4">
        <li className="hover:bg-gray-500/20 rounded-sm p-1 hover:cursor-pointer">
          Home
        </li>
        <li className="hover:bg-gray-500/20 rounded-sm p-1 hover:cursor-pointer">
          Contact
        </li>
        <li className="hover:bg-gray-500/20 rounded-sm p-1 hover:cursor-pointer">
          About
        </li>
      </ul>
      <code className="text-xs border-t-2 border-gray-500/20 p-2 rounded-xl">
        Website and desgin by Alon Perlin
      </code>
    </div>
  )
}

export default MenuModal
