import type { Metadata } from 'next'
import Image from 'next/image'
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
        description="Distinctive homes, villas, and land. Thoughtfully selected, with local guidance at every step."
        secondaryHref="/contact"
        secondaryLabel="Speak with an Advisor"
      />

      <section
        className="relative z-10 flex min-h-[calc((100svh-4.75rem)*0.25)] flex-col justify-center bg-[#fbfaf7] md:block md:min-h-0 md:-mt-12 md:bg-transparent md:px-8"
        aria-label="Explore property listings"
      >
        <div className="bg-[#fbfaf7] md:mx-auto md:max-w-3xl md:overflow-hidden md:border md:border-[#073f4d]/15 md:shadow-[0_20px_55px_rgba(7,63,77,0.18)]">
          <div className="px-5 pb-2 pt-5 text-[#073f4d] md:bg-[#073f4d] md:px-10 md:py-7 md:text-center md:text-white">
            <h2 className="font-serif text-[1.65rem] leading-tight tracking-[-0.04em] md:text-4xl">
              Explore properties
            </h2>
          </div>
          <div className="px-5 pb-5 pt-3 md:p-6">
            <PropertyModeSelector appearance="light" />
          </div>
        </div>
      </section>

      <section className="container grid gap-9 py-12 md:py-16 lg:grid-cols-[0.72fr_1fr] lg:py-20">
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
            <Image
              alt="Sri Lankan palm beach from Unsplash"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
              src={siteImages.beach}
              unoptimized
            />
          </div>
          <div className="grid gap-5">
            <div className="relative min-h-[210px] overflow-hidden bg-[#d9d4ca] sm:min-h-[250px]">
              <Image
                alt="Aerial Sri Lankan coastline from Unsplash"
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                src={siteImages.aerial}
                unoptimized
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
              <Image
                alt="Train crossing a forest bridge in Sri Lanka from Unsplash"
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                src={siteImages.train}
                unoptimized
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
              <h2 className="font-serif text-5xl tracking-[-0.055em] md:text-6xl">
                Curated Properties
              </h2>
            </div>
            <Link className="c-button c-button--refined c-button--light" href="/properties">
              Browse Listings
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
            <Image
              alt="Brown wooden table and chairs"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              src={siteImages.dining}
              unoptimized
            />
            <div className="absolute inset-0 bg-[#073f4d]/20" />
            <Link
              className="c-button c-button--refined c-button--light relative"
              href="/properties"
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
