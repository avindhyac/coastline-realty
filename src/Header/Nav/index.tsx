'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CurrencySwitcher } from '@/components/CurrencySwitcher'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

const navLinkClass = (active: boolean) =>
  [
    'inline-flex min-h-12 items-center px-1 py-2 text-base font-semibold leading-none transition hover:text-[#0b5264]',
    active ? 'border-b-2 border-[#073f4d] text-[#073f4d]' : 'text-[#073f4d]/82',
  ].join(' ')

export const HeaderNav: React.FC<{ data: HeaderType }> = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const mode = searchParams.get('mode') || 'buy'
  const isPropertyDetail = pathname.startsWith('/properties/')

  const links = (
    <>
      <Link className={navLinkClass(pathname === '/properties' && mode === 'buy')} href="/properties?mode=buy">Buy</Link>
      <Link className={navLinkClass(pathname === '/properties' && mode === 'rent')} href="/properties?mode=rent">Rent</Link>
      <Link className={navLinkClass(pathname === '/properties' && mode === 'lease')} href="/properties?mode=lease">Lease</Link>
    </>
  )

  return (
    <div className="flex items-center gap-4">
      <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
        {links}
      </nav>

      <CurrencySwitcher className="hidden md:inline-flex" />

      {isPropertyDetail ? (
        <a className="hidden min-h-12 items-center self-center rounded-sm bg-gradient-to-r from-[#073f4d] to-[#0b5264] px-5 py-3 text-sm font-bold uppercase leading-none tracking-[0.14em] text-white shadow-[0_12px_26px_rgba(7,63,77,0.22)] ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(7,63,77,0.3)] md:ml-4 md:inline-flex lg:ml-7" href="#inquiry">
          Schedule Viewing
        </a>
      ) : (
        <Link className="hidden min-h-12 items-center self-center rounded-sm bg-gradient-to-r from-[#073f4d] to-[#0b5264] px-5 py-3 text-sm font-bold uppercase leading-none tracking-[0.14em] text-white shadow-[0_12px_26px_rgba(7,63,77,0.22)] ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(7,63,77,0.3)] md:ml-4 md:inline-flex lg:ml-7" href="/properties">
          View Properties
        </Link>
      )}

      <button
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
        className="min-h-12 border border-[#123f4b]/20 px-4 text-base font-bold text-[#073f4d] lg:hidden"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        Menu
      </button>

      {isOpen ? (
        <div className="absolute inset-x-4 top-[calc(100%+0.5rem)] border border-[#123f4b]/12 bg-[#fbfaf7] p-5 shadow-[0_22px_70px_rgba(18,63,75,0.16)] lg:hidden">
          <nav className="grid gap-3" aria-label="Mobile navigation" onClick={() => setIsOpen(false)}>
            {links}
            <CurrencySwitcher className="mt-1 justify-self-start" />
            {isPropertyDetail ? (
              <a className="mt-2 rounded-sm bg-gradient-to-r from-[#073f4d] to-[#0b5264] px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_12px_26px_rgba(7,63,77,0.22)]" href="#inquiry">Schedule Viewing</a>
            ) : (
              <Link className="mt-2 rounded-sm bg-gradient-to-r from-[#073f4d] to-[#0b5264] px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_12px_26px_rgba(7,63,77,0.22)]" href="/properties">View Properties</Link>
            )}
          </nav>
        </div>
      ) : null}
    </div>
  )
}
