'use client'

import { useState } from 'react'

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
    <section className="border-y border-[#123f4b]/10 bg-[#fbfaf7] py-20 lg:py-28">
      <div className="container grid gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-center">
        <div>
          <p className="text-base font-semibold text-[#123f4b]/80">Urban portfolio</p>
          <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-[1] tracking-[-0.045em] text-[#073f4d] md:text-7xl">City properties with a sharper investment lens.</h2>
          <p className="mt-6 max-w-xl text-xl leading-9 text-[#26383d]/80">Beyond the coast, we help clients evaluate apartments, commercial spaces, and urban land in Sri Lanka’s most active city markets.</p>

          <div className="mt-8 grid gap-3">
            {urbanMarkets.map((market, index) => (
              <button
                className={[
                  'group flex items-center justify-between border p-5 text-left transition duration-300',
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
                  <span className="mt-1 block font-serif text-2xl">{market.name}</span>
                </span>
                <span className="text-2xl transition group-hover:translate-x-1">→</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[0.55fr_1fr]">
          <div className="grid gap-4 sm:pt-14">
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

          <article className="relative min-h-[520px] overflow-hidden bg-[#d9d4ca] shadow-[0_22px_70px_rgba(18,63,75,0.12)]">
            <img alt={active.title} className="absolute inset-0 h-full w-full object-cover transition duration-700" src={active.image} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#062f39]/88 via-[#062f39]/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/72">{active.name}</p>
              <h3 className="mt-3 max-w-lg font-serif text-4xl leading-none tracking-[-0.035em] md:text-5xl">{active.title}</h3>
              <p className="mt-4 max-w-lg text-base leading-7 text-white/82">{active.copy}</p>
              <a className="mt-6 inline-flex items-center justify-center rounded-sm bg-white px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#073f4d] shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#f0e8d8]" href={active.href}>Explore {active.name}</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
