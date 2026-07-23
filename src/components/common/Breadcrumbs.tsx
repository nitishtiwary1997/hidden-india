import React from 'react';
import Link from 'next/link';
import { LocationBreadcrumb } from '@/types';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items }: { items: LocationBreadcrumb[] }) {
  return (
    <nav className="flex items-center gap-1 text-xs text-slate-400 py-3 overflow-x-auto" aria-label="Breadcrumb">
      <Link href="/" className="flex items-center gap-1 hover:text-amber-400 transition-colors shrink-0">
        <Home className="w-3.5 h-3.5 text-amber-400" />
        <span>Home</span>
      </Link>

      {items.map((item, idx) => (
        <React.Fragment key={item.href}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          {idx === items.length - 1 ? (
            <span className="text-amber-400 font-semibold truncate shrink-0">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-amber-400 transition-colors shrink-0">
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
