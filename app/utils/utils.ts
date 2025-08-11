import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeSearch(input: string): string {
  return input
    .replace(/[!(){}\[\]^~?:\\=&><*]/g, '')
    .replace(/[\u27A4-\u27AF]/g, '')
    .replace(/["']/g, '')
    .trim()
}
