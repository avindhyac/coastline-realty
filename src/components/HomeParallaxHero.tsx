'use client'

import { useEffect, useState } from 'react'

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
  primaryHref = '/properties',
  primaryLabel = 'View Properties',
  secondaryHref = '/contact',
  secondaryLabel = 'Speak with an Advisor',
  title = 'Sri Lankan coastal property, clearly curated.',
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
    <section className={`relative overflow-hidden bg-[#073f4d] text-white ${compactOnMobile ? 'min-h-[24rem] md:min-h-[calc(100vh-5rem)]' : 'min-h-[calc(100vh-5rem)]'}`}> 
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-24 h-[calc(100%+12rem)] bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: `translate3d(0, ${offset}px, 0) scale(1.06)`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,63,77,0.2),rgba(7,63,77,0.42)),linear-gradient(0deg,rgba(7,63,77,0.86),rgba(7,63,77,0.05)_52%,rgba(7,63,77,0.18))]" />
      <div className={`container relative flex items-end justify-end ${compactOnMobile ? 'min-h-[24rem] py-8 md:min-h-[calc(100vh-5rem)] md:py-20' : 'min-h-[calc(100vh-5rem)] py-12 md:py-20'}`}>
        <div className="max-w-3xl bg-[#fbfaf7]/92 p-7 text-left text-[#073f4d] shadow-[0_24px_90px_rgba(0,0,0,0.22)] backdrop-blur md:p-10">
          <p className="mb-4 text-base font-semibold text-[#123f4b]/80">{eyebrow}</p>
          <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.055em] md:text-7xl">{title}</h1>
          <h2 className="mt-6 max-w-2xl text-xl leading-8 text-[#26383d]/86 md:text-2xl">{description}</h2>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="inline-flex items-center justify-center rounded-sm bg-gradient-to-r from-[#073f4d] to-[#0b5264] px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_14px_30px_rgba(7,63,77,0.28)] ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(7,63,77,0.36)]" href={primaryHref}>{primaryLabel}</a>
            {secondaryHref && secondaryLabel ? <a className="inline-flex items-center justify-center rounded-sm border border-[#073f4d]/25 bg-white/45 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-[#073f4d] shadow-[0_10px_24px_rgba(18,63,75,0.08)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white" href={secondaryHref}>{secondaryLabel}</a> : null}
          </div>
        </div>
      </div>
    </section>
  )
}
