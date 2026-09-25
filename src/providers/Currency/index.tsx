'use client'

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type Currency = 'USD' | 'LKR'

const STORAGE_KEY = 'coastline-currency'
const LKR_PER_USD = Number(process.env.NEXT_PUBLIC_LKR_PER_USD || 300)

type CurrencyContextValue = {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (lkrValue?: number | null) => string
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    if (typeof window === 'undefined') return 'USD'

    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'LKR' || stored === 'USD' ? stored : 'USD'
  })

  const setCurrency = (value: Currency) => {
    setCurrencyState(value)
    window.localStorage.setItem(STORAGE_KEY, value)
  }

  const formatPrice = useCallback(
    (lkrValue?: number | null) => {
      if (!lkrValue) return 'Price on request'

      if (currency === 'LKR') {
        return `LKR ${Number(lkrValue).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
      }

      return `USD ${(Number(lkrValue) / LKR_PER_USD).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
    },
    [currency],
  )

  const value = useMemo(() => ({ currency, setCurrency, formatPrice }), [currency, formatPrice])

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider')
  return context
}
