import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combines Tailwind class names and removes conflicts, e.g. cn('p-2', 'p-4') -> 'p-4'.
// Every shadcn component uses this.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
