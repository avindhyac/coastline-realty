import type { Metadata } from 'next'

import { HomeParallaxHero } from '@/components/HomeParallaxHero'
import { siteImages } from '@/constants/siteImages'
import { PropertyCard } from '@/components/PropertyCard'
import { PropertyModeSelector } from '@/components/PropertyModeSelector'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'Coastline Realty | Sri Lankan Coastal Property',
  description: 'A boutique real estate agency for distinctive homes, villas, land, and coastal investments across Sri Lanka.',
}

export default async function Home() {
  const payload = await getPayload({ config: configPromise })
  const properties = await payload.find({
    collection: 'properties',
    depth: 1,
    draft: false,
    limit: 3,
    overrideAccess: false,
    pagination: false,
    where: {
      and: [
        { featured: { equals: true } },
        { listingStatus: { equals: 'Active' } },
      ],
    },
  })

  return (
    <main className="bg-[#f8f6f0] text-[#26383d]">
      <HomeParallaxHero />

      <section className="container -mt-14 relative z-10">
        <PropertyModeSelector activeMode="buy" />
      </section>

      <section className="container grid gap-10 py-20 lg:grid-cols-[0.72fr_1fr] lg:py-28">
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <p className="text-base font-semibold text-[#123f4b]/80">Private real estate advisory</p>
          <h2 className="mt-5 font-serif text-5xl leading-[1] tracking-[-0.045em] text-[#073f4d] md:text-6xl">Clear guidance for high-value property decisions.</h2>
          <p className="mt-7 max-w-lg text-xl leading-9 text-[#26383d]/82">We help clients understand location, title, value, viewings, and negotiation before making a move in Sri Lanka.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="relative min-h-[520px] overflow-hidden bg-[#d9d4ca] sm:mt-20">
            <img alt="Sri Lankan palm beach from Unsplash" className="h-full w-full object-cover" src={siteImages.beach} />
          </div>
          <div className="grid gap-5">
            <div className="relative min-h-[250px] overflow-hidden bg-[#d9d4ca]"><img alt="Aerial Sri Lankan coastline from Unsplash" className="h-full w-full object-cover" src={siteImages.aerial} /></div>
            <div className="border border-[#123f4b]/10 bg-white/55 p-8 shadow-[0_18px_60px_rgba(18,63,75,0.06)]">
              <p className="font-serif text-4xl leading-tight text-[#073f4d]">Verified listings. Private viewings. Local expertise.</p>
              <p className="mt-5 text-base leading-8 text-[#26383d]/80">Each property is presented with practical details, clear location context, and direct ways to speak with our team.</p>
            </div>
            <div className="relative min-h-[250px] overflow-hidden bg-[#d9d4ca]"><img alt="Train crossing a forest bridge in Sri Lanka from Unsplash" className="h-full w-full object-cover" src={siteImages.train} /></div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#123f4b]/10 bg-[#fbfaf7] py-20 lg:py-28">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="text-base font-semibold text-[#123f4b]/80">A simpler way to search</p>
            <h2 className="mt-5 max-w-4xl font-serif text-5xl leading-[1] tracking-[-0.045em] text-[#073f4d] md:text-7xl">Find the right property with confidence.</h2>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-[#26383d]/80">Browse by buy, rent, or lease, then contact us directly for availability, viewings, and local advice.</p>
          </div>
          <div className="relative min-h-[420px] overflow-hidden bg-[#d9d4ca]">
            <img alt="Stilt fishermen on the Sri Lankan coast from Unsplash" className="absolute inset-0 h-full w-full object-cover" src={siteImages.fishermen} />
          </div>
        </div>
      </section>

      <section id="featured-properties" className="bg-[#073f4d] py-20 text-white lg:py-28">
        <div className="container">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-base font-semibold text-white/82">Featured properties</p>
              <h2 className="mt-4 font-serif text-5xl tracking-[-0.055em] md:text-6xl">Current coastal listings</h2>
            </div>
            <a className="inline-flex items-center justify-center rounded-sm bg-white px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#073f4d] shadow-[0_16px_36px_rgba(0,0,0,0.18)] ring-1 ring-white/40 transition duration-300 hover:-translate-y-0.5 hover:bg-[#f0e8d8] hover:shadow-[0_20px_48px_rgba(0,0,0,0.24)]" href="/properties">View All Properties</a>
          </div>

          {properties.docs.length > 0 ? (
            <div className="grid gap-7 lg:grid-cols-3">
              {properties.docs.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="border border-white/15 bg-white/5 p-10 text-white/75">Featured properties will appear here once listings are published in Payload CMS.</div>
          )}
        </div>
      </section>

      <section className="container py-20 lg:py-28">
        <div className="grid overflow-hidden border border-[#123f4b]/10 bg-[#fbfaf7] shadow-[0_18px_70px_rgba(18,63,75,0.08)] lg:grid-cols-[1fr_0.72fr]">
          <div className="p-8 md:p-12 lg:p-16">
            <p className="text-base font-semibold text-[#123f4b]/80">Begin the search</p>
            <h2 className="mt-5 max-w-2xl font-serif text-5xl leading-[0.98] tracking-[-0.055em] text-[#073f4d]">Tell us the shoreline, town, or feeling you are looking for.</h2>
          </div>
          <div className="relative flex min-h-[320px] items-end overflow-hidden bg-[#d9d4ca] p-8 text-[#073f4d] md:p-12">
            <img alt="Brown wooden table and chairs" className="absolute inset-0 h-full w-full object-cover" src={siteImages.dining} />
            <div className="absolute inset-0 bg-[#073f4d]/20" />
            <a className="relative inline-flex items-center justify-center rounded-sm border border-white/30 bg-gradient-to-r from-[#073f4d] to-[#0b5264] px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_16px_36px_rgba(0,0,0,0.28)] ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(0,0,0,0.34)]" href="/contact">Contact Us</a>
          </div>
        </div>
      </section>
    </main>
  )
}
