'use client'

import React, { useEffect, useState } from 'react'

type LoaderBarProps = {
  loading: boolean
  progress?: number
}

export const LoaderBar: React.FC<LoaderBarProps> = ({ loading, progress }) => {
  const [internalProgress, setInternalProgress] = useState(0)

  useEffect(() => {
    if (!loading) {
      setInternalProgress(0)
      return
    }
    if (typeof progress === 'number') {
      setInternalProgress(progress)
      return
    }
    let curr = 0
    const interval = setInterval(() => {
      curr = Math.min(curr + Math.random() * 0.15, 0.95)
      setInternalProgress(curr)
    }, 120)
    return () => clearInterval(interval)
  }, [loading, progress])

  useEffect(() => {
    if (!loading && internalProgress > 0) {
      setInternalProgress(1)
      const timeout = setTimeout(() => setInternalProgress(0), 400)
      return () => clearTimeout(timeout)
    }
  }, [loading, internalProgress])

  const visible = loading || internalProgress > 0.01

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-50 pointer-events-none
        transition-opacity duration-300
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{ height: 4 }}
    >
      <div className="relative w-full h-full bg-transparent">
        <div
          className="
            absolute left-0 top-0 h-full rounded-full
            bg-gradient-to-r from-transparent via-primary/60 to-primary
            shadow-lg transition-all duration-200
          "
          style={{
            width: `${internalProgress * 100}%`,
            opacity: internalProgress > 0 ? 1 : 0,
            transition: 'width 200ms cubic-bezier(.4,1.4,.4,1), opacity 0.2s',
          }}
        />
      </div>
    </div>
  )
}
