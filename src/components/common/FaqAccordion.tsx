'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ faqs, title = 'Frequently Asked Questions' }: { faqs: FaqItem[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-amber-400" />
        <span>{title}</span>
      </h3>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="glass-panel rounded-2xl border border-slate-800/80 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-5 py-4 text-left font-semibold text-slate-200 hover:text-amber-400 flex items-center justify-between gap-4 transition-colors text-sm sm:text-base"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-4 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
