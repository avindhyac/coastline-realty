'use client'

import { useEffect, useState } from 'react'

const heroImage = 'https://unsplash.com/photos/iduEaeBB_rQ/download?force=true&w=2400'

export function HomeParallaxHero() {
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
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[#073f4d] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-24 h-[calc(100%+12rem)] bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${heroImage})`,
          transform: `translate3d(0, ${offset}px, 0) scale(1.06)`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,63,77,0.2),rgba(7,63,77,0.42)),linear-gradient(0deg,rgba(7,63,77,0.86),rgba(7,63,77,0.05)_52%,rgba(7,63,77,0.18))]" />
      <div className="container relative flex min-h-[calc(100vh-5rem)] items-end justify-end py-12 md:py-20">
        <div className="max-w-3xl bg-[#fbfaf7]/92 p-7 text-left text-[#073f4d] shadow-[0_24px_90px_rgba(0,0,0,0.22)] backdrop-blur md:p-10">
          <p className="mb-4 text-base font-semibold text-[#123f4b]/80">Coastline Realty · Sri Lanka</p>
          <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.055em] md:text-7xl">Sri Lankan coastal property, clearly curated.</h1>
          <h2 className="mt-6 max-w-2xl text-xl leading-8 text-[#26383d]/86 md:text-2xl">Buy, rent, or lease distinctive homes, villas, and land with local guidance and private advisory.</h2>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="bg-[#073f4d] px-7 py-4 text-center text-base font-bold text-white transition hover:bg-[#0b5264]" href="#featured-properties">View Properties</a>
            <a className="border border-[#073f4d]/35 px-7 py-4 text-center text-base font-bold text-[#073f4d] transition hover:bg-white" href="/contact">Speak with an Advisor</a>
          </div>
        </div>
      </div>
    </section>
  )
}
