'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

// import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(true)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

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
      {...(headerTheme ? { 'data-theme': headerTheme } : {})}
    >
      <div className="container relative flex items-center justify-between gap-4 py-4 md:gap-8 md:py-6">
        <Link aria-label="Coastline Realty home" className="text-[#073f4d]" href="/">
          {/* <Logo loading="eager" priority="high" /> */}
          <span className="block font-serif text-[1.7rem] leading-none tracking-[-0.03em] md:text-4xl">Coastline</span>
          <span className="block text-xs font-bold uppercase tracking-[0.24em] text-[#123f4b]/75 md:text-sm">Realty</span>
        </Link>
        <Suspense fallback={null}>
          <HeaderNav data={data} />
        </Suspense>
      </div>
    </header>
  )
}
