'use client'

import { useCurrency, type Currency } from '@/providers/Currency'

export function CurrencySwitcher({ className = '' }: { className?: string }) {
  const { currency, setCurrency } = useCurrency()

  return (
    <div className={`inline-flex items-center rounded-full border border-[#123f4b]/15 bg-white/45 p-1 text-xs font-bold ${className}`}>
      {(['USD', 'LKR'] as Currency[]).map((option) => (
        <button
          aria-pressed={currency === option}
          className={[
            'rounded-full px-3 py-2 leading-none transition',
            currency === option ? 'bg-[#073f4d] text-white shadow-sm' : 'text-[#073f4d]/75 hover:text-[#073f4d]',
          ].join(' ')}
          key={option}
          onClick={() => setCurrency(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  )
}
