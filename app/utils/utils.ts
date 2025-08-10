import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeSearch(input: string): string {
  return (
    input
      // Remove Cloudinary special/reserved chars that can break the query
      .replace(/[!(){}\[\]^~?:\\=&><*]/g, '')
      // Remove any arrow icons or other weird glyphs
      .replace(/[\u27A4-\u27AF]/g, '')
      // Remove quotes
      .replace(/["']/g, '')
      // Trim whitespace
      .trim()
  )
}
