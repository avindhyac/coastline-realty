'use client'

import { useState } from 'react'
import Link from 'next/link'

const urbanMarkets = [
  {
    name: 'Colombo',
    title: 'High-rise apartments and commercial addresses',
    copy: 'City homes, offices, mixed-use buildings, and investment units close to business districts, schools, dining, and transport.',
    href: '/properties?mode=buy&city=Colombo',
    image: 'https://images.unsplash.com/photo-1587213811864-46e59f6873b1?auto=format&fit=crop&w=1400&q=80',
  },
  {
    name: 'Rajagiriya',
    title: 'Connected city living with easier daily access',
    copy: 'Apartments and town properties for buyers who want Colombo access with a more residential rhythm.',
    href: '/properties?mode=buy&city=Rajagiriya',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
  },
  {
    name: 'Nawala',
    title: 'Residential pockets for modern family living',
    copy: 'Homes, apartments, and land in established urban neighbourhoods with strong rental and resale appeal.',
    href: '/properties?mode=buy&city=Nawala',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=80',
  },
]

export function UrbanPropertiesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = urbanMarkets[activeIndex]

  return (
    <section className="border-y border-[#123f4b]/10 bg-[#fbfaf7] py-14 md:py-20 lg:py-28">
      <div className="container grid gap-9 lg:grid-cols-[0.82fr_1fr] lg:items-center">
        <div>
          <p className="text-base font-semibold text-[#123f4b]/80">Urban portfolio</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.02] tracking-[-0.045em] text-[#073f4d] md:mt-5 md:text-7xl md:leading-[1]">City properties with a sharper investment lens.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#26383d]/80 md:mt-6 md:text-xl md:leading-9">Beyond the coast, we help clients evaluate apartments, commercial spaces, and urban land in Sri Lanka’s most active city markets.</p>

          <div className="mt-7 grid gap-3 md:mt-8">
            {urbanMarkets.map((market, index) => (
              <button
                className={[
                  'group flex items-center justify-between border p-4 text-left transition duration-300 md:p-5',
                  activeIndex === index
                    ? 'border-[#073f4d] bg-[#073f4d] text-white shadow-[0_18px_46px_rgba(7,63,77,0.18)]'
                    : 'border-[#123f4b]/10 bg-white/55 text-[#073f4d] hover:-translate-y-0.5 hover:border-[#123f4b]/25 hover:bg-white',
                ].join(' ')}
                key={market.name}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                type="button"
              >
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.18em] opacity-70">0{index + 1}</span>
                  <span className="mt-1 block font-serif text-xl md:text-2xl">{market.name}</span>
                </span>
                <span className="text-2xl transition group-hover:translate-x-1">→</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[0.55fr_1fr]">
          <div className="hidden gap-4 sm:grid sm:pt-14">
            {urbanMarkets.map((market, index) => (
              <button
                aria-label={`Show ${market.name}`}
                className={[
                  'relative min-h-[150px] overflow-hidden border transition duration-300',
                  activeIndex === index ? 'border-[#073f4d] opacity-100' : 'border-transparent opacity-65 hover:opacity-100',
                ].join(' ')}
                key={market.name}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <img alt={`${market.name} city property`} className="absolute inset-0 h-full w-full object-cover" src={market.image} />
                <span className="absolute inset-0 bg-[#073f4d]/20" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#073f4d]">{market.name}</span>
              </button>
            ))}
          </div>

          <article className="relative min-h-[430px] overflow-hidden bg-[#d9d4ca] shadow-[0_22px_70px_rgba(18,63,75,0.12)] sm:min-h-[520px]">
            <img alt={active.title} className="absolute inset-0 h-full w-full object-cover transition duration-700" src={active.image} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#062f39]/88 via-[#062f39]/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/72">{active.name}</p>
              <h3 className="mt-3 max-w-lg font-serif text-3xl leading-none tracking-[-0.035em] md:text-5xl">{active.title}</h3>
              <p className="mt-4 max-w-lg text-base leading-7 text-white/82">{active.copy}</p>
              <Link className="c-button c-button--gooey c-button--light mt-6" href={active.href}>
                <span className="c-button__label">Explore {active.name}</span>
                <span className="c-button__blobs" aria-hidden="true"><span /><span /><span /></span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
