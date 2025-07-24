'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import clsx from 'clsx'
import SpinnerMini from './SpinnerMini'

type NavigateButtonProps = {
  href: string
  children: React.ReactNode
  className?: string
}

export default function NavigateButton({
  href,
  children,
  className,
}: NavigateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    router.push(href)
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={clsx(
        'rounded-full transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto disabled:opacity-70',
        className
      )}
    >
      {isLoading ? <SpinnerMini /> : children}
    </button>
  )
}
