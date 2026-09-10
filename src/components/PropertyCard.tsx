import type { Property } from '@/payload-types'

import { Media } from '@/components/Media'

const formatPrice = (value?: number | null) => value ? `LKR ${Number(value).toLocaleString()}` : 'Price on request'

export function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="group overflow-hidden border border-[#123f4b]/10 bg-[#fbfaf7] shadow-[0_14px_45px_rgba(18,63,75,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(18,63,75,0.12)]">
      <a className="block" href={`/properties/${property.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#d9d4ca]">
          {property.featuredImage && typeof property.featuredImage === 'object' ? (
            <Media fill imgClassName="object-cover transition duration-700 group-hover:scale-105" resource={property.featuredImage} />
          ) : (
            <div className="flex h-full items-center justify-center p-8 text-center text-[#073f4d]">Image coming soon</div>
          )}
          <span className="absolute left-4 top-4 rounded bg-[#073f4d] px-4 py-2 text-sm font-bold text-white">For {property.listingType}</span>
        </div>
        <div className="p-6">
          <div className="mb-3 flex items-center justify-between gap-4 text-sm font-semibold text-[#123f4b]/80">
            <span>⌖ {property.city}</span><span>{property.propertyType}</span>
          </div>
          <h3 className="font-serif text-3xl leading-tight tracking-[-0.025em] text-[#073f4d]">{property.title}</h3>
          <div className="mt-5 grid grid-cols-3 gap-3 border-y border-[#123f4b]/10 py-4 text-sm text-[#26383d]/85">
            {property.bedrooms ? <span>{property.bedrooms} Beds</span> : <span>— Beds</span>}
            {property.bathrooms ? <span>{property.bathrooms} Baths</span> : <span>— Baths</span>}
            {property.extentPerches ? <span>{property.extentPerches} Perches</span> : <span>— Land</span>}
          </div>
          <p className="mt-5 font-serif text-2xl text-[#123f4b]">{formatPrice(property.listedPriceTotal)}</p>
          <span className="mt-5 inline-flex min-h-11 items-center justify-center bg-[#073f4d] px-5 py-3 text-sm font-bold text-white transition group-hover:bg-[#0b5264]">View Details</span>
        </div>
      </a>
    </article>
  )
}
