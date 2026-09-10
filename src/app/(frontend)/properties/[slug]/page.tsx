import type { Metadata } from 'next'
import type { Property, Media as MediaType } from '@/payload-types'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { Media } from '@/components/Media'
import { PropertyInquiry } from '@/components/PropertyInquiry'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { getPayload } from 'payload'

const formatPrice = (value?: number | null) => (value ? `LKR ${Number(value).toLocaleString()}` : 'Price on request')
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
    <div className="grid grid-cols-2 gap-4 text-sm">
      <dt className="text-[#26383d]/70">{label}</dt>
      <dd className="font-medium text-[#123f4b]">{value}</dd>
    </div>
  ) : null

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
  const location = [property.city, property.district, property.province].filter(Boolean).join(', ')
  const secondary = gallery.slice(1, 4)

  return (
    <main className="bg-[#f8f6f0] text-[#26383d]">
      <section className="border-b border-[#123f4b]/10 bg-[#fbfaf7]">
        <div className="container py-5 text-xs text-[#26383d]/70">
          <a href="/" className="hover:text-[#073f4d]">Home</a> <span className="mx-2">›</span>
          <a href="/properties" className="hover:text-[#073f4d]">Properties</a> <span className="mx-2">›</span>
          <span className="text-[#123f4b]">{property.title}</span>
        </div>
      </section>

      <section className="container grid gap-8 py-8 lg:grid-cols-[1fr_0.43fr] lg:py-12">
        <div className="grid gap-3 md:grid-cols-[1fr_0.38fr]">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#d9d4ca] md:aspect-auto md:min-h-[520px]">
            {isMedia(property.featuredImage) ? <Media fill priority imgClassName="object-cover" resource={property.featuredImage} /> : <div className="flex h-full items-center justify-center">Image coming soon</div>}
            <span className="absolute left-5 top-5 rounded bg-[#073f4d] px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">For {property.listingType}</span>
            <span className="absolute bottom-5 left-5 border border-white/30 bg-black/35 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur">View gallery&nbsp;&nbsp; 1 / {Math.max(gallery.length, 1)}</span>
          </div>
          <div className="hidden gap-3 md:grid">
            {secondary.map((image) => <div className="relative overflow-hidden bg-[#d9d4ca]" key={image.id}><Media fill imgClassName="object-cover" resource={image} /></div>)}
          </div>
        </div>

        <aside className="lg:pl-5">
          <a href="/properties" className="text-xs font-bold uppercase tracking-[0.2em] text-[#123f4b]">← Back to properties</a>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#123f4b]/75">⌖ {location || property.address}</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight tracking-[-0.035em] text-[#073f4d] md:text-6xl">{property.title}</h1>
          <p className="mt-4 text-xl leading-8 text-[#26383d]/84">{property.subType || `A curated ${property.propertyType.toLowerCase()} in ${property.city}.`}</p>
          <p className="mt-7 font-serif text-4xl text-[#123f4b]">{formatPrice(property.listedPriceTotal)}</p>
          <div className="mt-7 grid grid-cols-2 gap-4 border-b border-t border-[#123f4b]/15 py-5 text-sm sm:grid-cols-4">
            <Detail label="Bedrooms" value={property.bedrooms} /><Detail label="Bathrooms" value={property.bathrooms} /><Detail label="Land" value={property.extentPerches ? `${property.extentPerches} Perches` : null} /><Detail label="View" value={property.seaView ? 'Ocean' : property.propertyType} />
          </div>
          <p className="mt-6 text-lg leading-8 text-[#26383d]/84">{property.description || 'More details for this listing will be added by the Coastline Realty team.'}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row"><a className="bg-[#073f4d] px-7 py-4 text-center text-base font-bold text-white hover:bg-[#0b5264]" href="#inquiry">Schedule a Viewing</a><a className="border border-[#123f4b]/30 px-7 py-4 text-center text-base font-bold text-[#123f4b] hover:bg-white" href={`/contact?property=${property.slug || property.id}`}>Send Inquiry</a></div>
        </aside>
      </section>

      <section className="container pb-10">
        <h2 className="font-serif text-2xl text-[#123f4b]">Property Highlights</h2>
        <div className="mt-5 grid gap-5 border-b border-[#123f4b]/10 pb-7 sm:grid-cols-2 lg:grid-cols-5">
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

        <aside id="inquiry" className="rounded-sm border border-[#123f4b]/10 bg-white/70 p-6 shadow-[0_18px_60px_rgba(18,63,75,0.08)] lg:row-span-2 lg:col-start-2 lg:row-start-1">
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
  const result = await payload.find({ collection: 'forms', depth: 1, limit: 1, overrideAccess: false, pagination: false, sort: '-createdAt' })
  return (result.docs?.[0] as unknown as FormType) || null
})
