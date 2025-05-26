import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateConfirmationNumber(): string {
  const prefix = 'SBM'
  const timestamp = Date.now().toString().slice(-4)
  const random = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, '0')
  return `${prefix}-${timestamp}${random}`
}
