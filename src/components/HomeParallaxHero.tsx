'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { siteImages } from '@/constants/siteImages'

type HomeParallaxHeroProps = {
  description?: string
  eyebrow?: string
  imageUrl?: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  title?: string
  compactOnMobile?: boolean
}

export function HomeParallaxHero({
  description = 'Buy, rent, or lease distinctive homes, villas, and land with local guidance and private advisory.',
  eyebrow = 'Coastline Realty · Sri Lanka',
  imageUrl = siteImages.beach,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  title = 'Sri Lankan property, clearly curated.',
  compactOnMobile = false,
}: HomeParallaxHeroProps) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setOffset(window.scrollY * 0.22))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      className={`relative overflow-hidden bg-[#073f4d] text-white ${compactOnMobile ? 'min-h-[30rem] md:min-h-[calc(100vh-12rem)]' : 'min-h-[34rem] md:min-h-[calc(100vh-12rem)]'}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-16 h-[calc(100%+8rem)] bg-cover bg-center will-change-transform md:-top-24 md:h-[calc(100%+12rem)]"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: `translate3d(0, ${offset}px, 0) scale(1.06)`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,63,77,0.08)_0%,rgba(7,63,77,0.32)_38%,rgba(7,63,77,0.92)_100%)] md:bg-[linear-gradient(90deg,rgba(7,63,77,0.2),rgba(7,63,77,0.42)),linear-gradient(0deg,rgba(7,63,77,0.86),rgba(7,63,77,0.05)_52%,rgba(7,63,77,0.18))]" />
      <div
        className={`container relative flex items-center justify-start ${compactOnMobile ? 'min-h-[30rem] pb-16 pt-28 md:min-h-[calc(100vh-12rem)] md:justify-end md:py-16' : 'min-h-[34rem] pb-16 pt-28 md:min-h-[calc(100vh-12rem)] md:justify-end md:py-16'}`}
      >
        <div className="max-w-[34rem] text-left text-white md:max-w-3xl md:bg-[#fbfaf7]/92 md:p-10 md:text-[#073f4d] md:shadow-[0_24px_90px_rgba(0,0,0,0.22)] md:backdrop-blur">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-white/78 md:text-base md:font-semibold md:normal-case md:tracking-normal md:text-[#123f4b]/80">
            {eyebrow}
          </p>
          <h1 className="font-serif text-[3.4rem] leading-[0.9] tracking-[-0.065em] text-balance drop-shadow-[0_3px_18px_rgba(0,0,0,0.28)] md:text-7xl md:leading-[0.98] md:tracking-[-0.055em] md:drop-shadow-none">
            {title}
          </h1>
          <h2 className="mt-5 max-w-[31rem] text-lg leading-7 text-white/86 md:mt-6 md:max-w-2xl md:text-2xl md:leading-8 md:text-[#26383d]/86">
            {description}
          </h2>
          {primaryHref && primaryLabel ? (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row md:mt-8">
              <Link
                className="inline-flex items-center justify-center rounded-sm bg-white px-7 py-4 text-center text-sm font-extrabold uppercase tracking-[0.16em] text-[#073f4d] shadow-[0_16px_34px_rgba(0,0,0,0.24)] transition duration-300 md:hover:-translate-y-0.5 md:bg-gradient-to-r md:from-[#073f4d] md:to-[#0b5264] md:text-white md:shadow-[0_14px_30px_rgba(7,63,77,0.28)] md:ring-1 md:ring-white/20 md:hover:shadow-[0_18px_42px_rgba(7,63,77,0.36)]"
                href={primaryHref}
              >
                {primaryLabel}
              </Link>
            </div>
          ) : null}
          {secondaryHref && secondaryLabel ? (
            <p className="mt-5 text-sm font-semibold text-white/86 md:text-[#26383d]/75">
              Need guidance?{' '}
              <Link
                className="font-extrabold text-white underline decoration-white/35 underline-offset-4 transition md:hover:decoration-white md:text-[#073f4d] md:decoration-[#073f4d]/25 md:hover:decoration-[#073f4d]"
                href={secondaryHref}
              >
                {secondaryLabel} <span aria-hidden="true">→</span>
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
