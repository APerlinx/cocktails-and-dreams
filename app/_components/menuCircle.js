'use client'

import Image from 'next/image'
import { useModal } from '../context/MenuContext'

function MenuCircle() {
  const { toggleMenu } = useModal()

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        toggleMenu()
      }}
      className="fixed bottom-4 right-8 z-50 hover:cursor-pointer"
    >
      <div className="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-br from-white/20 via-gray-300/20 to-transparent">
        <div className="w-full h-full rounded-full overflow-hidden bg-black  hover:bg-gray-500/10 duration-300">
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
