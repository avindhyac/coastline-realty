import Link from 'next/link'
import React from 'react'

const marketLinks = [
  { label: 'South Coast', href: '/properties?q=south%20coast' },
  { label: 'Colombo', href: '/properties?mode=buy&city=Colombo' },
  { label: 'Rajagiriya', href: '/properties?mode=buy&city=Rajagiriya' },
  { label: 'Nawala', href: '/properties?mode=buy&city=Nawala' },
]

const footerLinkClass =
  'text-sm font-semibold text-white/68 transition md:hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto overflow-hidden border-t border-[#b5844f]/25 bg-[#062f39] text-white">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d7b27a]/70 to-transparent" />
        <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#d7b27a]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-white/8 blur-3xl" />

        <div className="container relative py-14 md:py-18 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div className="max-w-2xl">
              <Link aria-label="Coastline Realty home" className="inline-block" href="/">
                <span className="block font-serif text-4xl leading-none tracking-[-0.04em] md:text-6xl">
                  Coastline
                </span>
                <span className="mt-1 block text-xs font-bold uppercase tracking-[0.28em] text-[#d7b27a] md:text-sm">
                  Realty
                </span>
              </Link>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link className="c-button c-button--refined c-button--light min-h-12" href="/contact">Start a Conversation</Link>
                <Link
                  className="inline-flex min-h-12 items-center justify-center border border-white/18 px-5 text-xs font-extrabold uppercase tracking-[0.16em] text-white/82 transition md:hover:border-white/36 md:hover:bg-white/8 md:hover:text-white"
                  href="/properties"
                >
                  Browse Listings
                </Link>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:pt-3">
              <div>
                <h2 className="font-sans text-xs font-extrabold uppercase tracking-[0.2em] text-[#d7b27a]">
                  Markets
                </h2>
                <nav aria-label="Property markets" className="mt-5 grid gap-3">
                  {marketLinks.map((item) => (
                    <Link className={footerLinkClass} href={item.href} key={item.href}>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div>
                <h2 className="font-sans text-xs font-extrabold uppercase tracking-[0.2em] text-[#d7b27a]">
                  Contact
                </h2>
                <div className="mt-5 space-y-4 text-sm leading-7 text-white/68">
                  <p>Coastal, urban, and investment property advisory across Sri Lanka.</p>
                  <Link className="inline-flex font-bold text-white underline decoration-white/25 underline-offset-4 transition md:hover:decoration-white" href="/contact">
                    Enquire with Coastline →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs font-semibold uppercase tracking-[0.16em] text-white/45 md:mt-16 md:flex-row md:items-center md:justify-between">
            <p>© {year} Coastline Realty. All rights reserved.</p>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
              <p>Sri Lanka real estate advisory</p>
              <Link
                className="text-white/30 underline decoration-white/10 underline-offset-4 transition md:hover:text-white/60 md:hover:decoration-white/30"
                href="/admin"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
