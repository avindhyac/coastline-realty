'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

// import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    let lastScrollY = window.scrollY
    let frame = 0

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const isNearTop = currentScrollY < 24
        const isScrollingUp = currentScrollY < lastScrollY

        setIsVisible(isNearTop || isScrollingUp)
        lastScrollY = currentScrollY
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 border-b border-[#123f4b]/10 bg-[#fbfaf7]/96 shadow-[0_10px_35px_rgba(18,63,75,0.07)] backdrop-blur transition-transform duration-300',
        isVisible ? 'translate-y-0' : '-translate-y-full',
      ].join(' ')}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container relative flex items-center justify-between gap-8 py-5 md:py-6">
        <Link aria-label="Coastline Realty home" className="text-[#073f4d]" href="/">
          {/* <Logo loading="eager" priority="high" /> */}
          <span className="block font-serif text-3xl leading-none tracking-[-0.03em] md:text-4xl">Coastline</span>
          <span className="block text-sm font-bold uppercase tracking-[0.24em] text-[#123f4b]/75">Realty</span>
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
