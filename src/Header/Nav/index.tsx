'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CurrencySwitcher } from '@/components/CurrencySwitcher'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

const navLinkClass = (active: boolean) =>
  [
    'group relative inline-flex min-h-12 items-center px-1 py-2 text-base font-semibold leading-none transition duration-300 after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:bg-[#073f4d] after:transition-transform after:duration-300 hover:text-[#073f4d] hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#073f4d]',
    active
      ? 'text-[#073f4d] after:scale-x-100'
      : 'text-[#073f4d]/70 after:scale-x-0 hover:text-[#073f4d]',
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
        <a className="c-button c-button--gooey hidden min-h-12 self-center md:ml-4 md:inline-flex lg:ml-7" href="#inquiry">
          <span className="c-button__label">Schedule Viewing</span>
          <span className="c-button__blobs" aria-hidden="true"><span /><span /><span /></span>
        </a>
      ) : (
        <Link className="c-button c-button--gooey hidden min-h-12 self-center md:ml-4 md:inline-flex lg:ml-7" href="/properties">
          <span className="c-button__label">View Properties</span>
          <span className="c-button__blobs" aria-hidden="true"><span /><span /><span /></span>
        </Link>
      )}

      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#123f4b]/20 text-[#073f4d] transition hover:border-[#073f4d]/45 hover:bg-[#073f4d]/5 lg:hidden"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        <span className="relative block h-4 w-5" aria-hidden="true">
          <span className={["absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition duration-200", isOpen ? 'translate-y-[7px] rotate-45' : ''].join(' ')} />
          <span className={["absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition duration-200", isOpen ? 'opacity-0' : ''].join(' ')} />
          <span className={["absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition duration-200", isOpen ? '-translate-y-[7px] -rotate-45' : ''].join(' ')} />
        </span>
      </button>

      {isOpen ? (
        <div className="absolute inset-x-4 top-[calc(100%+0.5rem)] border border-[#123f4b]/12 bg-[#fbfaf7] p-5 shadow-[0_22px_70px_rgba(18,63,75,0.16)] lg:hidden">
          <nav className="grid gap-3" aria-label="Mobile navigation" onClick={() => setIsOpen(false)}>
            {links}
            <CurrencySwitcher className="mt-1 justify-self-start" />
            {isPropertyDetail ? (
              <a className="c-button c-button--gooey mt-2 w-full" href="#inquiry"><span className="c-button__label">Schedule Viewing</span><span className="c-button__blobs" aria-hidden="true"><span /><span /><span /></span></a>
            ) : (
              <Link className="c-button c-button--gooey mt-2 w-full" href="/properties"><span className="c-button__label">View Properties</span><span className="c-button__blobs" aria-hidden="true"><span /><span /><span /></span></Link>
            )}
          </nav>
        </div>
      ) : null}
    </div>
  )
}
