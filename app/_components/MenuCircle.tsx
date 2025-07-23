'use client'

import Image from 'next/image'
import { FC } from 'react'
import { useModal } from '../context/MenuContext'

const MenuCircle: FC = () => {
  const { toggleMenu } = useModal()

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        toggleMenu()
      }}
      className="fixed bottom-4 right-8 z-50 hover:cursor-pointer"
    >
      <div className="relative w-12 h-12 rounded-full p-[2px] bg-black/80 border-2 border-gray-500">
        <div className="w-full h-full rounded-full overflow-hidden hover:bg-gray-100 duration-300">
          <Image
            src="/logo-notext.svg"
            alt="home page link"
            width={12}
            height={12}
            className="object-cover w-full h-full p-2"
          />
        </div>
      </div>
    </button>
  )
}

export default MenuCircle
