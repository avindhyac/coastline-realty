import type { Metadata } from 'next'
import type { Where } from 'payload'

import { PropertyCard } from '@/components/PropertyCard'
import { PropertyFilters } from '@/components/PropertyFilters'
import { PropertyModeSelector, type PropertyMode } from '@/components/PropertyModeSelector'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'Properties | Coastline Realty',
  description: 'Explore Coastline Realty listings across Sri Lanka, from south coast villas to land and rental opportunities.',
}

const modeMap: Record<PropertyMode, 'Sale' | 'Rent' | 'Lease'> = {
  buy: 'Sale',
  rent: 'Rent',
  lease: 'Lease',
}

const modeCopy: Record<PropertyMode, { eyebrow: string; title: string; intro: string }> = {
  buy: {
    eyebrow: 'Buy property',
    title: 'Homes, villas and land for sale.',
    intro: 'Browse distinctive Sri Lankan properties available to purchase, from coastal homes to horizon land.',
  },
  rent: {
    eyebrow: 'Rent property',
    title: 'Selected rentals with a sense of place.',
    intro: 'Discover rental homes and villas selected for location, comfort and coastal living.',
  },
  lease: {
    eyebrow: 'Lease property',
    title: 'Lease opportunities across Sri Lanka.',
    intro: 'Explore long-view lease opportunities for private living, commercial use, or investment.',
  },
}

type PropertySearchParams = {
  mode?: string
  city?: string
  type?: string
  beds?: string
  price?: string
  seaView?: string
  pool?: string
  furnished?: string
  nearBeach?: string
}

type Args = {
  searchParams?: Promise<PropertySearchParams>
}

const parseMode = (value?: string): PropertyMode => {
  if (value === 'rent' || value === 'lease') return value
  return 'buy'
}

const parsePriceRange = (value?: string) => {
  if (!value) return null
  const [min, max] = value.split('-')
  return {
    min: min ? Number(min) : null,
    max: max ? Number(max) : null,
  }
}

export default async function PropertiesPage({ searchParams }: Args) {
  const params = await searchParams
  const activeMode = parseMode(params?.mode)
  const priceRange = parsePriceRange(params?.price)
  const payload = await getPayload({ config: configPromise })
  const filters: Where[] = [
    {
      listingStatus: {
        in: ['Active', 'Under Offer'],
      },
    },
    {
      listingType: {
        equals: modeMap[activeMode],
      },
    },
    ...(params?.city ? [{ city: { equals: params.city } }] : []),
    ...(params?.type ? [{ propertyType: { equals: params.type } }] : []),
    ...(params?.beds ? [{ bedrooms: { greater_than_equal: Number(params.beds) } }] : []),
    ...(priceRange?.min !== null && priceRange?.min !== undefined ? [{ listedPriceTotal: { greater_than_equal: priceRange.min } }] : []),
    ...(priceRange?.max !== null && priceRange?.max !== undefined ? [{ listedPriceTotal: { less_than_equal: priceRange.max } }] : []),
    ...(params?.seaView === 'true' ? [{ seaView: { equals: true } }] : []),
    ...(params?.pool === 'true' ? [{ pool: { equals: true } }] : []),
    ...(params?.furnished === 'true' ? [{ furnishedStatus: { equals: 'Furnished' } }] : []),
    ...(params?.nearBeach === 'true' ? [{ distanceToBeachM: { less_than_equal: 500 } }] : []),
  ]

  const [properties, modeProperties] = await Promise.all([
    payload.find({
    collection: 'properties',
    depth: 1,
    draft: false,
    limit: 60,
    overrideAccess: false,
    pagination: false,
    sort: '-featured,-createdAt',
    where: {
      and: filters,
    },
  }),
    payload.find({
      collection: 'properties',
      depth: 0,
      draft: false,
      limit: 200,
      overrideAccess: false,
      pagination: false,
      select: {
        city: true,
      },
      where: {
        and: [
          { listingStatus: { in: ['Active', 'Under Offer'] } },
          { listingType: { equals: modeMap[activeMode] } },
        ],
      },
    }),
  ])

  const cities = Array.from(new Set(modeProperties.docs.map((property) => property.city).filter(Boolean))).sort()

  return (
    <main className="bg-[#f8f6f0] text-[#26383d]">
      <section className="border-b border-[#123f4b]/10 bg-[#fbfaf7] py-20 lg:py-28">
        <div className="container">
          <p className="text-base font-semibold text-[#123f4b]/80">{modeCopy[activeMode].eyebrow}</p>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.58fr] lg:items-end">
            <h1 className="max-w-5xl font-serif text-6xl leading-[0.95] tracking-[-0.06em] text-[#073f4d] md:text-7xl">{modeCopy[activeMode].title}</h1>
            <p className="max-w-xl text-xl leading-9 text-[#26383d]/82">{modeCopy[activeMode].intro}</p>
          </div>
          <div className="mt-12 max-w-5xl">
            <PropertyModeSelector activeMode={activeMode} />
          </div>
        </div>
      </section>

      <section className="container py-16 lg:py-24">
        <div className="mb-10">
          <PropertyFilters activeMode={activeMode} cities={cities} filters={params || {}} />
        </div>

        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-[#123f4b]/15 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-base font-semibold text-[#123f4b]/80">Available {activeMode} listings</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] text-[#073f4d] md:text-5xl">{properties.docs.length} curated {properties.docs.length === 1 ? 'property' : 'properties'}</h2>
          </div>
          <p className="max-w-md text-base leading-7 text-[#26383d]/78">A refined portfolio of coastal homes, villas, land and investment opportunities across Sri Lanka.</p>
        </div>

        {properties.docs.length > 0 ? (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {properties.docs.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="border border-[#123f4b]/10 bg-white/55 p-10 text-[#26383d]/70">
            No properties match these filters yet. Try clearing filters or choosing a different property mode.
          </div>
        )}
      </section>
    </main>
  )
}
