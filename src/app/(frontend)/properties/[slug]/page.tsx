import type { Metadata } from 'next'
import type { Property, Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { PropertyCard } from '@/components/PropertyCard'
import { PropertyGallery, type GalleryImage } from '@/components/PropertyGallery'
import { PropertyPrice } from '@/components/PropertyPrice'
import { getPropertyDummyImages, isSeededPlaceholderMedia } from '@/utilities/propertyDummyImages'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { getPayload } from 'payload'

const isMedia = (value: unknown): value is MediaType => typeof value === 'object' && value !== null && 'id' in value
const labelize = (value?: string | null) => value || '—'

type Args = { params: Promise<{ slug: string }> }

const Feature = ({ icon, title, text }: { icon: string; title: string; text?: string | null }) => (
  <div className="flex gap-3 border-r border-[#123f4b]/10 pr-5 last:border-r-0">
    <span className="text-2xl text-[#073f4d]">{icon}</span>
    <div>
      <p className="text-sm font-medium text-[#123f4b]">{title}</p>
      {text ? <p className="mt-1 text-xs leading-5 text-[#26383d]/70">{text}</p> : null}
    </div>
  </div>
)

const Detail = ({ label, value }: { label: string; value?: string | number | null }) =>
  value || value === 0 ? (
    <div className="text-sm">
      <dt className="text-[#26383d]/70">{label}</dt>
      <dd className="mt-1 font-medium leading-6 text-[#123f4b]">{value}</dd>
    </div>
  ) : null

const StatIcon = ({ type }: { type: 'bed' | 'bath' | 'land' }) => {
  const common = 'h-5 w-5 stroke-current'

  if (type === 'bed') {
    return <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24" strokeWidth="1.8"><path d="M4 11V6.8C4 5.8 4.8 5 5.8 5h4.4C11.2 5 12 5.8 12 6.8V11" /><path d="M12 11V7.8c0-1 .8-1.8 1.8-1.8h4.4c1 0 1.8.8 1.8 1.8V11" /><path d="M3 19v-6.2c0-1 .8-1.8 1.8-1.8h14.4c1 0 1.8.8 1.8 1.8V19" /><path d="M3 16h18M5 19v-2M19 19v-2" /></svg>
  }

  if (type === 'bath') {
    return <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24" strokeWidth="1.8"><path d="M5 11V6.5A3.5 3.5 0 0 1 8.5 3H10" /><path d="M8 7h5" /><path d="M4 11h17v2.5a5.5 5.5 0 0 1-5.5 5.5h-6A5.5 5.5 0 0 1 4 13.5V11Z" /><path d="M8 21l1-2M16 21l-1-2" /></svg>
  }

  return <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24" strokeWidth="1.8"><path d="m4 17 5-10 4 7 2-4 5 7" /><path d="M3 19h18" /><path d="M5 17h14" /></svg>
}

const StatDetail = ({ icon, label, value }: { icon: 'bed' | 'bath' | 'land'; label: string; value?: string | number | null }) => (
  <div className="flex items-center gap-3 border-r border-[#123f4b]/10 p-4 last:border-r-0">
    <dt className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#073f4d]/8 text-[#073f4d]" aria-label={label} title={label}>
      <StatIcon type={icon} />
    </dt>
    <dd className="min-w-0 text-xl font-bold leading-tight text-[#073f4d]">{value || value === 0 ? value : '—'}</dd>
  </div>
)

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const properties = await payload.find({ collection: 'properties', draft: false, limit: 1000, overrideAccess: false, pagination: false, select: { slug: true } })
  return properties.docs.filter((property) => property.slug).map(({ slug }) => ({ slug }))
}

export default async function PropertyDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const property = await queryPropertyBySlug({ slug: decodeURIComponent(slug) })

  if (!property) notFound()

  const gallery = [property.featuredImage, ...(property.gallery || [])].filter(isMedia)
  const dummyGallery = isSeededPlaceholderMedia(property.featuredImage) ? getPropertyDummyImages(property.slug || property.id) : null
  const galleryImages: GalleryImage[] = dummyGallery
    ? dummyGallery.map((src, index) => ({ type: 'url', src, alt: `${property.title} gallery image ${index + 1}` }))
    : gallery.map((media, index) => ({ type: 'media', media, alt: `${property.title} gallery image ${index + 1}` }))
  const location = [property.city, property.district, property.province].filter(Boolean).join(', ')
  const similarProperties = await querySimilarProperties(property)

  return (
    <main className="bg-[#f8f6f0] pb-24 text-[#26383d] md:pb-0">
      <section className="hidden border-b border-[#123f4b]/10 bg-[#fbfaf7] md:block">
        <div className="container py-5 text-xs text-[#26383d]/70">
          <Link href="/" className="hover:text-[#073f4d]">Home</Link> <span className="mx-2">›</span>
          <Link href="/properties" className="hover:text-[#073f4d]">Properties</Link> <span className="mx-2">›</span>
          <span className="text-[#123f4b]">{property.title}</span>
        </div>
      </section>

      <PropertyGallery images={galleryImages} title={property.title} />

      <section className="container border-b border-[#123f4b]/10 pb-8 md:pb-10">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <PropertyPrice className="block text-5xl font-extrabold tracking-[-0.045em] text-[#073f4d] md:text-6xl" value={property.listedPriceTotal} />
            <dl className="mt-5 grid grid-cols-3 overflow-hidden border-y border-[#123f4b]/10">
              <StatDetail icon="bed" label="Bedrooms" value={property.bedrooms} />
              <StatDetail icon="bath" label="Bathrooms" value={property.bathrooms} />
              <StatDetail icon="land" label="Land extent" value={property.extentPerches ? `${property.extentPerches} Pchs` : null} />
            </dl>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.035em] text-[#073f4d] md:text-5xl">{property.title}</h1>
            <p className="mt-3 text-base font-semibold text-[#123f4b]/75">⌖ {location || property.address}</p>
          </div>

        </div>
      </section>

      <section className="container py-10">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-[#123f4b]">Overview</h2>
          <p className="mt-4 text-lg leading-8 text-[#26383d]/84">{property.description || 'More details for this listing will be added by the Coastline Realty team.'}</p>
        </div>
      </section>

      <section className="container pb-10">
        <h2 className="text-2xl font-bold text-[#123f4b]">Property Highlights</h2>
        <ul className="mt-5 space-y-3 border-b border-[#123f4b]/10 pb-7 text-sm leading-6 text-[#26383d]/82 md:hidden">
          <li className="flex gap-3"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#123f4b]/25 text-xs text-[#123f4b]">✓</span><span>{labelize(property.propertyType)} listed for {property.listingType.toLowerCase()}</span></li>
          {property.seaView ? <li className="flex gap-3"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#123f4b]/25 text-xs text-[#123f4b]">✓</span><span>Ocean views from the property</span></li> : null}
          {property.pool ? <li className="flex gap-3"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#123f4b]/25 text-xs text-[#123f4b]">✓</span><span>Private pool for resort-style living</span></li> : null}
          {property.distanceToBeachM ? <li className="flex gap-3"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#123f4b]/25 text-xs text-[#123f4b]">✓</span><span>{property.distanceToBeachM}m to the coast</span></li> : null}
          {property.furnishedStatus ? <li className="flex gap-3"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#123f4b]/25 text-xs text-[#123f4b]">✓</span><span>{property.furnishedStatus} property</span></li> : null}
        </ul>
        <div className="mt-5 hidden gap-5 border-b border-[#123f4b]/10 pb-7 md:grid md:grid-cols-2 lg:grid-cols-5">
          {property.pool ? <Feature icon="≋" title="Private pool" text="Resort-style coastal living" /> : null}
          {property.seaView ? <Feature icon="〰" title="Ocean view" text="Views toward the water" /> : null}
          <Feature icon="⌂" title={labelize(property.propertyType)} text={property.listingStatus} />
          {property.distanceToBeachM ? <Feature icon="☼" title="Beach access" text={`${property.distanceToBeachM}m to the coast`} /> : null}
          {property.furnishedStatus ? <Feature icon="◇" title={property.furnishedStatus} text="Furnishing status" /> : null}
        </div>
      </section>

      <section className="container grid gap-8 pb-20">
        <div className="rounded-sm border border-[#123f4b]/10 bg-white/55 p-7 shadow-[0_18px_60px_rgba(18,63,75,0.06)]">
          <h2 className="text-3xl font-bold text-[#123f4b]">Facts & features</h2>
          <div className="mt-7 grid gap-8 md:grid-cols-3">
            <div><h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#123f4b]">Property</h3><dl className="space-y-4"><Detail label="Type" value={property.propertyType} /><Detail label="Status" value={property.listingStatus} /><Detail label="Title" value={property.titleType} /><Detail label="Extent" value={property.extentPerches ? `${property.extentPerches} Perches` : null} /></dl></div>
            <div><h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#123f4b]">Interior & amenities</h3><dl className="space-y-4"><Detail label="Bedrooms" value={property.bedrooms} /><Detail label="Bathrooms" value={property.bathrooms} /><Detail label="Sea view" value={property.seaView ? 'Yes' : null} /><Detail label="Pool" value={property.pool ? 'Yes' : null} /><Detail label="Furnished" value={property.furnishedStatus} /><Detail label="Frontage" value={property.frontageFt ? `${property.frontageFt} ft` : null} /></dl></div>
            <div><h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#123f4b]">Location</h3><p className="text-sm leading-7 text-[#26383d]/75">{property.address}. {location}</p>{property.distanceToBeachM ? <p className="mt-4 text-sm font-medium text-[#123f4b]">{property.distanceToBeachM}m to the coast</p> : null}{property.googleMapsLink ? <a className="mt-5 inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#073f4d] underline underline-offset-4" href={property.googleMapsLink} target="_blank" rel="noreferrer">View on map ↗</a> : null}</div>
          </div>
        </div>

        {property.googleMapsEmbedUrl ? (
          <div>
            <h2 className="mb-5 text-3xl font-bold text-[#123f4b]">Location</h2>
            <div className="overflow-hidden rounded-sm border border-[#123f4b]/10 bg-white/55 shadow-[0_18px_60px_rgba(18,63,75,0.06)]">
              <iframe
                allowFullScreen
                className="h-[360px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={property.googleMapsEmbedUrl}
                title={`${property.title} map location`}
              />
            </div>
          </div>
        ) : null}
      </section>

      {similarProperties.length > 0 ? (
        <section className="container pb-20">
          <div className="mb-7 flex items-end justify-between gap-4 border-t border-[#123f4b]/10 pt-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#123f4b]/70">Keep browsing</p>
              <h2 className="mt-2 text-3xl font-bold text-[#123f4b]">Similar properties</h2>
            </div>
            <Link className="hidden text-sm font-bold uppercase tracking-[0.16em] text-[#073f4d] underline underline-offset-4 md:inline-block" href="/properties">View all</Link>
          </div>
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {similarProperties.map((similar) => <PropertyCard key={similar.id} property={similar} />)}
          </div>
        </section>
      ) : null}
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const property = await queryPropertyBySlug({ slug: decodeURIComponent(slug) })
  return { title: property ? `${property.title} | Coastline Realty` : 'Property | Coastline Realty', description: property?.description || 'Explore this Coastline Realty property listing.' }
}

const queryPropertyBySlug = cache(async ({ slug }: { slug: string }): Promise<Property | null> => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({ collection: 'properties', depth: 1, draft, limit: 1, overrideAccess: draft, pagination: false, where: { slug: { equals: slug } } })
  return result.docs?.[0] || null
})

const querySimilarProperties = cache(async (property: Property): Promise<Property[]> => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'properties',
    depth: 1,
    draft: false,
    limit: 3,
    overrideAccess: false,
    pagination: false,
    sort: '-featured,featuredSortOrder,-createdAt',
    where: {
      and: [
        { id: { not_equals: property.id } },
        { listingStatus: { in: ['Active', 'Under Offer'] } },
        { listingType: { equals: property.listingType } },
        {
          or: [
            ...(property.city ? [{ city: { equals: property.city } }] : []),
            ...(property.district ? [{ district: { equals: property.district } }] : []),
            ...(property.propertyType ? [{ propertyType: { equals: property.propertyType } }] : []),
          ],
        },
      ],
    },
  })

  return result.docs
})

