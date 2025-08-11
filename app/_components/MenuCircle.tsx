'use client'

import { Martini } from 'lucide-react'
import { FC } from 'react'
import { useModal } from '../context/MenuContext'

const MenuCircle: FC = () => {
  const { toggleMenu } = useModal()

  return (
    <div className="fixed bottom-4 right-2 flex flex-col items-center">
      <svg width="100" height="30" className="-mb-4">
        <path id="curveNav" d="M10,52 Q52,-30 90,55" fill="transparent" />
        <text width="100%" textAnchor="middle">
          <textPath
            href="#curveNav"
            startOffset="50%"
            className="text-xs fill-gray-900"
          >
            navigation
          </textPath>
        </text>
      </svg>

      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleMenu()
        }}
        className="relative w-12 h-12 rounded-full p-[2px] bg-black/80 border-2 border-gray-500 flex items-center justify-center z-[100] hover:cursor-pointer"
      >
        <div className="w-full h-full rounded-full overflow-hidden hover:bg-gray-100 duration-300 flex items-center justify-center">
          <Martini className="text-white/80 text-center object-cover w-full h-full p-2" />
        </div>
      </button>
    </div>
  )
}

export default MenuCircle
