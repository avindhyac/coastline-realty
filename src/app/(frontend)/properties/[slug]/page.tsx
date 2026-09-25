import type { Metadata } from 'next'
import type { Property, Media as MediaType } from '@/payload-types'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { Media } from '@/components/Media'
import { PropertyInquiry } from '@/components/PropertyInquiry'
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

const StatIcon = ({ type }: { type: 'bed' | 'bath' | 'land' | 'type' }) => {
  const common = 'h-5 w-5 stroke-current'

  if (type === 'bed') {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24" strokeWidth="1.8">
        <path d="M4 11V6.8C4 5.8 4.8 5 5.8 5h4.4C11.2 5 12 5.8 12 6.8V11" />
        <path d="M12 11V7.8c0-1 .8-1.8 1.8-1.8h4.4c1 0 1.8.8 1.8 1.8V11" />
        <path d="M3 19v-6.2c0-1 .8-1.8 1.8-1.8h14.4c1 0 1.8.8 1.8 1.8V19" />
        <path d="M3 16h18M5 19v-2M19 19v-2" />
      </svg>
    )
  }

  if (type === 'bath') {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24" strokeWidth="1.8">
        <path d="M5 11V6.5A3.5 3.5 0 0 1 8.5 3H10" />
        <path d="M8 7h5" />
        <path d="M4 11h17v2.5a5.5 5.5 0 0 1-5.5 5.5h-6A5.5 5.5 0 0 1 4 13.5V11Z" />
        <path d="M8 21l1-2M16 21l-1-2" />
      </svg>
    )
  }

  if (type === 'land') {
    return (
      <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24" strokeWidth="1.8">
        <path d="m4 17 5-10 4 7 2-4 5 7" />
        <path d="M3 19h18" />
        <path d="M5 17h14" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" className={common} fill="none" viewBox="0 0 24 24" strokeWidth="1.8">
      <path d="M4 5h16v14H4z" />
      <path d="M8 9h8M8 13h5" />
    </svg>
  )
}

const StatDetail = ({ icon, label, value }: { icon: 'bed' | 'bath' | 'land' | 'type'; label: string; value?: string | number | null }) => (
  <div className="flex items-center gap-3 border-b border-r border-[#123f4b]/10 p-4 last:border-r-0 sm:border-b-0">
    <dt className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#073f4d]/8 text-[#073f4d]" aria-label={label} title={label}>
      <StatIcon type={icon} />
    </dt>
    <dd className="min-w-0 font-serif text-xl leading-tight text-[#073f4d]">{value || value === 0 ? value : '—'}</dd>
  </div>
)

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const properties = await payload.find({ collection: 'properties', draft: false, limit: 1000, overrideAccess: false, pagination: false, select: { slug: true } })
  return properties.docs.filter((property) => property.slug).map(({ slug }) => ({ slug }))
}

export default async function PropertyDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const [property, inquiryForm] = await Promise.all([
    queryPropertyBySlug({ slug: decodeURIComponent(slug) }),
    queryInquiryForm(),
  ])

  if (!property) notFound()

  const gallery = [property.featuredImage, ...(property.gallery || [])].filter(isMedia)
  const dummyGallery = isSeededPlaceholderMedia(property.featuredImage) ? getPropertyDummyImages(property.slug || property.id) : null
  const location = [property.city, property.district, property.province].filter(Boolean).join(', ')
  const secondary = gallery.slice(1, 4)
  const secondaryDummyImages = dummyGallery?.slice(1, 4)

  return (
    <main className="bg-[#f8f6f0] text-[#26383d]">
      <section className="hidden border-b border-[#123f4b]/10 bg-[#fbfaf7] md:block">
        <div className="container py-5 text-xs text-[#26383d]/70">
          <Link href="/" className="hover:text-[#073f4d]">Home</Link> <span className="mx-2">›</span>
          <Link href="/properties" className="hover:text-[#073f4d]">Properties</Link> <span className="mx-2">›</span>
          <span className="text-[#123f4b]">{property.title}</span>
        </div>
      </section>

      <section className="container grid gap-8 py-8 lg:grid-cols-[0.92fr_0.62fr] lg:items-start lg:py-12 xl:grid-cols-[0.86fr_0.64fr]">
        <div className="grid gap-3 md:grid-cols-[1fr_0.24fr] lg:sticky lg:top-28">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#d9d4ca] md:aspect-[5/4] lg:aspect-[4/3]">
            {dummyGallery ? <img alt={property.title} className="h-full w-full object-cover" src={dummyGallery[0]} /> : isMedia(property.featuredImage) ? <Media fill priority imgClassName="object-cover" resource={property.featuredImage} /> : <div className="flex h-full items-center justify-center">Image coming soon</div>}
            <div className="absolute inset-x-4 top-4 flex items-center justify-between md:hidden">
              <Link aria-label="Back to properties" className="flex h-10 w-10 items-center justify-center rounded-full bg-black/35 text-xl text-white backdrop-blur" href="/properties">‹</Link>
              <a aria-label="Share property" className="flex h-10 w-10 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur" href={`mailto:?subject=${encodeURIComponent(property.title)}&body=${encodeURIComponent(`/properties/${property.slug || property.id}`)}`}>↗</a>
            </div>
            <span className="absolute left-5 top-5 hidden rounded bg-[#073f4d] px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white md:inline-flex">For {property.listingType}</span>
            <span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur md:bottom-5 md:left-5 md:rounded-none md:px-5 md:py-3">1 / {Math.max(dummyGallery?.length || gallery.length, 1)}</span>
          </div>
          <div className="hidden gap-3 md:grid lg:hidden xl:grid">
            {secondaryDummyImages ? secondaryDummyImages.map((image, index) => <div className="relative overflow-hidden bg-[#d9d4ca]" key={image}><img alt={`${property.title} gallery image ${index + 2}`} className="h-full w-full object-cover" src={image} /></div>) : secondary.map((image) => <div className="relative overflow-hidden bg-[#d9d4ca]" key={image.id}><Media fill imgClassName="object-cover" resource={image} /></div>)}
          </div>
        </div>

        <aside className="lg:pl-2 xl:pl-5">
          <Link href="/properties" className="hidden text-xs font-bold uppercase tracking-[0.2em] text-[#123f4b] md:inline-block">← Back to properties</Link>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#123f4b]/75">⌖ {location || property.address}</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.035em] text-[#073f4d] md:text-5xl xl:text-6xl">{property.title}</h1>
          <p className="mt-4 text-xl leading-8 text-[#26383d]/84">{property.subType || `A curated ${property.propertyType.toLowerCase()} in ${property.city}.`}</p>
          <PropertyPrice className="mt-7 font-serif text-4xl text-[#123f4b]" value={property.listedPriceTotal} />
          <dl className="mt-7 grid grid-cols-2 overflow-hidden sm:grid-cols-4">
            <StatDetail icon="bed" label="Bedrooms" value={property.bedrooms} />
            <StatDetail icon="bath" label="Bathrooms" value={property.bathrooms} />
            <StatDetail icon="land" label="Land extent" value={property.extentPerches ? `${property.extentPerches} Perches` : null} />
            <StatDetail icon="type" label="Property type" value={property.propertyType} />
          </dl>
          <p className="mt-6 text-lg leading-8 text-[#26383d]/84">{property.description || 'More details for this listing will be added by the Coastline Realty team.'}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row"><a className="inline-flex items-center justify-center rounded-sm bg-gradient-to-r from-[#073f4d] to-[#0b5264] px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_14px_30px_rgba(7,63,77,0.24)] ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(7,63,77,0.34)]" href="#inquiry">Schedule a Viewing</a><a className="inline-flex items-center justify-center rounded-sm border border-[#123f4b]/25 bg-white/45 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-[#123f4b] shadow-[0_10px_24px_rgba(18,63,75,0.08)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white" href="#inquiry">Request More Info</a></div>
        </aside>
      </section>

      <section className="container pb-10">
        <h2 className="font-serif text-2xl text-[#123f4b]">Property Highlights</h2>
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

      <section className="container grid gap-8 pb-20 lg:grid-cols-[1fr_0.42fr]">
        <div className="grid gap-8 rounded-sm border border-[#123f4b]/10 bg-white/55 p-7 shadow-[0_18px_60px_rgba(18,63,75,0.06)] md:grid-cols-3">
          <div><h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#123f4b]">Details</h3><dl className="space-y-4"><Detail label="Type" value={property.propertyType} /><Detail label="Status" value={property.listingStatus} /><Detail label="Title" value={property.titleType} /><Detail label="Extent" value={property.extentPerches ? `${property.extentPerches} Perches` : null} /></dl></div>
          <div><h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#123f4b]">Amenities</h3><dl className="space-y-4"><Detail label="Sea view" value={property.seaView ? 'Yes' : null} /><Detail label="Pool" value={property.pool ? 'Yes' : null} /><Detail label="Furnished" value={property.furnishedStatus} /><Detail label="Frontage" value={property.frontageFt ? `${property.frontageFt} ft` : null} /></dl></div>
          <div><h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#123f4b]">Location</h3><p className="text-sm leading-7 text-[#26383d]/75">{property.address}. {location}</p>{property.googleMapsLink ? <a className="mt-5 inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#073f4d] underline underline-offset-4" href={property.googleMapsLink} target="_blank" rel="noreferrer">View on map ↗</a> : null}</div>
        </div>

        {property.googleMapsEmbedUrl ? (
          <div className="overflow-hidden rounded-sm border border-[#123f4b]/10 bg-white/55 shadow-[0_18px_60px_rgba(18,63,75,0.06)] lg:col-start-1">
            <iframe
              allowFullScreen
              className="h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={property.googleMapsEmbedUrl}
              title={`${property.title} map location`}
            />
          </div>
        ) : null}

        <aside id="inquiry" className="rounded-sm border border-[#123f4b]/10 bg-[#fbfaf7] p-6 shadow-[0_18px_60px_rgba(18,63,75,0.08)] lg:row-span-2 lg:col-start-2 lg:row-start-1">
          <h2 className="font-serif text-3xl text-[#123f4b]">Interested in this property?</h2>
          <p className="mt-2 text-base leading-7 text-[#26383d]/80">Get in touch with our team for more details or to schedule a private viewing.</p>
          <div className="mt-5"><PropertyInquiry form={inquiryForm} /></div>
        </aside>
      </section>
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

const queryInquiryForm = cache(async (): Promise<FormType | null> => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'forms',
    depth: 1,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: { title: { equals: 'Contact Form' } },
  })
  return (result.docs?.[0] as unknown as FormType) || null
})
