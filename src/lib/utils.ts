import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

export function formatPlaceType(type: string): string {
  return type
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function formatBudgetBadge(budget?: string): { label: string; color: string } {
  switch (budget) {
    case 'FREE':
      return { label: 'Free Entry', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
    case 'BUDGET':
      return { label: 'Budget Friendly', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' };
    case 'MODERATE':
      return { label: 'Moderate', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
    case 'LUXURY':
      return { label: 'Premium/Luxury', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' };
    default:
      return { label: 'Flexible', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' };
  }
}
