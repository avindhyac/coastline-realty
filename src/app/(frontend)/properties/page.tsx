import type { Metadata } from 'next'
import type { Where } from 'payload'

import { siteImages } from '@/constants/siteImages'
import { PropertyCard } from '@/components/PropertyCard'
import { PropertyFilters } from '@/components/PropertyFilters'
import { PropertyModeSelector, type PropertyMode } from '@/components/PropertyModeSelector'
import { PropertySearchBar } from '@/components/PropertySearchBar'
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
  q?: string
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
  const searchQuery = params?.q?.trim()
  const payload = await getPayload({ config: configPromise })
  const searchFilter: Where | null = searchQuery ? {
    or: [
      { title: { like: searchQuery } },
      { city: { like: searchQuery } },
      { district: { like: searchQuery } },
      { province: { like: searchQuery } },
      { address: { like: searchQuery } },
      { propertyType: { like: searchQuery } },
      { subType: { like: searchQuery } },
      { description: { like: searchQuery } },
    ],
  } : null
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
    ...(searchFilter ? [searchFilter] : []),
  ]

  const [properties, modeProperties] = await Promise.all([
    payload.find({
    collection: 'properties',
    depth: 1,
    draft: false,
    limit: 60,
    overrideAccess: false,
    pagination: false,
    sort: '-featured,featuredSortOrder,-createdAt',
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
      <section className="relative flex min-h-[27rem] items-center overflow-hidden bg-[#073f4d] text-white md:min-h-[34rem]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${siteImages.aerial})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,63,77,0.84),rgba(7,63,77,0.56)),linear-gradient(0deg,rgba(7,63,77,0.62),rgba(7,63,77,0.18))]" />
        <div className="container relative py-10 text-center md:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/76 md:text-sm md:tracking-[0.22em]">Coastline Realty listings</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-[0.98] tracking-[-0.055em] md:mt-5 md:text-6xl lg:text-7xl">Find your place in Sri Lanka.</h1>
          <p className="mx-auto mt-4 hidden max-w-2xl text-xl leading-8 text-white/84 md:block">Search homes, villas, land, rentals and lease opportunities with local guidance.</p>
          <div className="mx-auto mt-6 max-w-4xl md:mt-9">
            <PropertySearchBar activeMode={activeMode} query={searchQuery} />
          </div>
          <div className="mx-auto mt-4 max-w-3xl md:mt-5">
            <PropertyModeSelector activeMode={activeMode} />
          </div>
        </div>
      </section>

      <section id="properties" className="container py-8 md:py-16 lg:py-24">
        <div className="mb-5 flex flex-col justify-between gap-3 border-b border-[#123f4b]/15 pb-5 md:mb-10 md:flex-row md:items-end md:pb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#123f4b]/80 md:text-base md:normal-case md:tracking-normal">Available {activeMode} listings</p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#073f4d] md:mt-3 md:text-5xl">{properties.docs.length} curated {properties.docs.length === 1 ? 'property' : 'properties'}</h2>
            {searchQuery ? <p className="mt-2 text-sm text-[#26383d]/70">Search results for “{searchQuery}” · <a className="font-bold text-[#073f4d] underline underline-offset-4" href={`/properties?mode=${activeMode}`}>Clear search</a></p> : null}
          </div>
          <p className="hidden max-w-md text-base leading-7 text-[#26383d]/78 md:block">A refined portfolio of coastal homes, villas, land and investment opportunities across Sri Lanka.</p>
        </div>

        <div className="mb-7 flex justify-end md:mb-10">
          <PropertyFilters activeMode={activeMode} cities={cities} filters={params || {}} />
        </div>

        {properties.docs.length > 0 ? (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {properties.docs.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="border border-[#123f4b]/10 bg-white/55 p-10 text-[#26383d]/70">
            No properties match your search yet. Try a different keyword, clear filters, or choose another property mode.
          </div>
        )}
      </section>
    </main>
  )
}
