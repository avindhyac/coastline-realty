import type { Metadata } from 'next'
import Link from 'next/link'

import { HomeParallaxHero } from '@/components/HomeParallaxHero'
import { siteImages } from '@/constants/siteImages'
import { PropertyCard } from '@/components/PropertyCard'
import { PropertyModeSelector } from '@/components/PropertyModeSelector'
import { UrbanPropertiesShowcase } from '@/components/UrbanPropertiesShowcase'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'Coastline Realty | Sri Lankan Coastal Property',
  description:
    'A boutique real estate agency for distinctive homes, villas, land, and coastal investments across Sri Lanka.',
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
      and: [{ featured: { equals: true } }, { listingStatus: { equals: 'Active' } }],
    },
  })

  return (
    <main className="bg-[#f8f6f0] text-[#26383d]">
      <HomeParallaxHero
        description="Start with one clear route: buy, rent, or lease distinctive homes, villas, and land with local guidance."
        secondaryHref="/contact"
        secondaryLabel="Speak with an Advisor"
      />

      <section className="container relative z-10 mt-5 md:-mt-8">
        <PropertyModeSelector />
      </section>

      <section className="container grid gap-9 py-14 md:py-20 lg:grid-cols-[0.72fr_1fr] lg:py-28">
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <p className="text-base font-semibold text-[#123f4b]/80">Private real estate advisory</p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.045em] text-[#073f4d] md:mt-5 md:text-6xl">
            Clear guidance for high-value property decisions.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-[#26383d]/82 md:mt-7 md:text-xl md:leading-9">
            We help clients understand location, title, value, viewings, and negotiation before
            making a move in Sri Lanka.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="relative min-h-[330px] overflow-hidden bg-[#d9d4ca] sm:mt-20 sm:min-h-[520px]">
            <img
              alt="Sri Lankan palm beach from Unsplash"
              className="h-full w-full object-cover"
              src={siteImages.beach}
            />
          </div>
          <div className="grid gap-5">
            <div className="relative min-h-[210px] overflow-hidden bg-[#d9d4ca] sm:min-h-[250px]">
              <img
                alt="Aerial Sri Lankan coastline from Unsplash"
                className="h-full w-full object-cover"
                src={siteImages.aerial}
              />
            </div>
            <div className="border border-[#123f4b]/10 bg-white/55 p-6 shadow-[0_18px_60px_rgba(18,63,75,0.06)] md:p-8">
              <p className="font-serif text-3xl leading-tight text-[#073f4d] md:text-4xl">
                Verified listings. Private viewings. Local expertise.
              </p>
              <p className="mt-4 text-base leading-8 text-[#26383d]/80 md:mt-5">
                Each property is presented with practical details, clear location context, and
                direct ways to speak with our team.
              </p>
            </div>
            <div className="relative min-h-[210px] overflow-hidden bg-[#d9d4ca] sm:min-h-[250px]">
              <img
                alt="Train crossing a forest bridge in Sri Lanka from Unsplash"
                className="h-full w-full object-cover"
                src={siteImages.train}
              />
            </div>
          </div>
        </div>
      </section>

      <UrbanPropertiesShowcase />

      <section id="featured-properties" className="bg-[#073f4d] py-20 text-white lg:py-28">
        <div className="container">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="font-serif text-5xl uppercase tracking-[-0.055em] md:text-6xl">
                CURATED PROPERTIES
              </h2>
            </div>
            <Link className="c-button c-button--gooey c-button--light" href="/properties">
              <span className="c-button__label">View All Properties</span>
              <span className="c-button__blobs" aria-hidden="true"><span /><span /><span /></span>
            </Link>
          </div>

          {properties.docs.length > 0 ? (
            <div className="grid gap-7 lg:grid-cols-3">
              {properties.docs.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="border border-white/15 bg-white/5 p-10 text-white/75">
              Featured properties will appear here once listings are published in Payload CMS.
            </div>
          )}
        </div>
      </section>

      <section className="container py-20 lg:py-28">
        <div className="grid overflow-hidden border border-[#123f4b]/10 bg-[#fbfaf7] shadow-[0_18px_70px_rgba(18,63,75,0.08)] lg:grid-cols-[1fr_0.72fr]">
          <div className="p-8 md:p-12 lg:p-16">
            <p className="text-base font-semibold text-[#123f4b]/80">Begin the search</p>
            <h2 className="mt-5 max-w-2xl font-serif text-5xl leading-[0.98] tracking-[-0.055em] text-[#073f4d]">
              Tell us the shoreline, town, or feeling you are looking for.
            </h2>
          </div>
          <div className="relative flex min-h-[320px] items-end overflow-hidden bg-[#d9d4ca] p-8 text-[#073f4d] md:p-12">
            <img
              alt="Brown wooden table and chairs"
              className="absolute inset-0 h-full w-full object-cover"
              src={siteImages.dining}
            />
            <div className="absolute inset-0 bg-[#073f4d]/20" />
            <Link className="c-button c-button--gooey c-button--light relative" href="/properties">
              <span className="c-button__label">Browse Listings</span>
              <span className="c-button__blobs" aria-hidden="true"><span /><span /><span /></span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
