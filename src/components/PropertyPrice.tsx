'use client'

import { useCurrency } from '@/providers/Currency'

export function PropertyPrice({ className, value }: { className?: string; value?: number | null }) {
  const { formatPrice } = useCurrency()

  return <p className={className}>{formatPrice(value)}</p>
}
