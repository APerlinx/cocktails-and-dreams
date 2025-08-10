import { Loader } from 'lucide-react'

interface SpinnerProps {
  className?: string
}

export function SearchSpinner({ className = '' }: SpinnerProps) {
  return <Loader className={`animate-spin ${className}`} strokeWidth={2} />
}
