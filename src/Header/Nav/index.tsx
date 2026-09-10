'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

const navLinkClass = (active: boolean) =>
  [
    'min-h-11 px-1 py-2 text-base font-semibold transition hover:text-[#0b5264]',
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

      {isPropertyDetail ? (
        <a className="hidden min-h-12 items-center bg-[#073f4d] px-5 py-3 text-base font-bold text-white hover:bg-[#0b5264] md:inline-flex" href="#inquiry">
          Schedule Viewing
        </a>
      ) : (
        <Link className="hidden min-h-12 items-center bg-[#073f4d] px-5 py-3 text-base font-bold text-white hover:bg-[#0b5264] md:inline-flex" href="/contact">
          Contact Us
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
            {isPropertyDetail ? (
              <a className="mt-2 bg-[#073f4d] px-5 py-4 text-center text-base font-bold text-white" href="#inquiry">Schedule Viewing</a>
            ) : (
              <Link className="mt-2 bg-[#073f4d] px-5 py-4 text-center text-base font-bold text-white" href="/contact">Contact Us</Link>
            )}
          </nav>
        </div>
      ) : null}
    </div>
  )
}
