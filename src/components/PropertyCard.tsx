import type { Property } from '@/payload-types'

import { Media } from '@/components/Media'
import { PropertyPrice } from '@/components/PropertyPrice'
import { getPropertyDummyImages, isSeededPlaceholderMedia } from '@/utilities/propertyDummyImages'

export function PropertyCard({ property, priority = false }: { property: Property; priority?: boolean }) {
  const dummyImage = isSeededPlaceholderMedia(property.featuredImage) ? getPropertyDummyImages(property.slug || property.id)[0] : null

  return (
    <article className="group h-full overflow-hidden border border-[#123f4b]/10 bg-[#fbfaf7] shadow-[0_14px_45px_rgba(18,63,75,0.06)] transition duration-300 md:hover:-translate-y-1 md:hover:shadow-[0_22px_70px_rgba(18,63,75,0.12)]">
      <a className="flex h-full flex-col" href={`/properties/${property.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#d9d4ca]">
          {dummyImage ? (
            <img alt={property.title} className="h-full w-full object-cover transition duration-700 md:group-hover:scale-105" decoding="async" fetchPriority={priority ? 'high' : 'auto'} loading={priority ? 'eager' : 'lazy'} src={dummyImage} />
          ) : property.featuredImage && typeof property.featuredImage === 'object' ? (
            <Media fill imgClassName="object-cover transition duration-700 md:group-hover:scale-105" loading={priority ? 'eager' : 'lazy'} priority={priority} resource={property.featuredImage} size="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1279px) calc((100vw - 5rem - 1.75rem) / 2), 27rem" />
          ) : (
            <div className="flex h-full items-center justify-center p-8 text-center text-[#073f4d]">Image coming soon</div>
          )}
          <span className="absolute left-4 top-4 rounded bg-[#073f4d] px-4 py-2 text-sm font-bold text-white">For {property.listingType}</span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center justify-between gap-4 text-sm font-semibold text-[#123f4b]/80">
            <span>⌖ {property.city}</span><span>{property.propertyType}</span>
          </div>
          <h3 className="text-2xl font-bold leading-tight tracking-[-0.025em] text-[#073f4d]">{property.title}</h3>
          <div className="mt-5 grid grid-cols-3 gap-3 border-y border-[#123f4b]/10 py-4 text-sm text-[#26383d]/85">
            {property.bedrooms ? <span>{property.bedrooms} Beds</span> : <span>— Beds</span>}
            {property.bathrooms ? <span>{property.bathrooms} Baths</span> : <span>— Baths</span>}
            {property.extentPerches ? <span>{property.extentPerches} Perches</span> : <span>— Land</span>}
          </div>
          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
            <PropertyPrice className="min-w-0 text-2xl font-extrabold leading-none text-[#123f4b]" value={property.listedPriceTotal} />
            <span className="shrink-0 text-sm font-extrabold uppercase tracking-[0.14em] text-[#073f4d] underline decoration-[#073f4d]/20 underline-offset-8 transition md:group-hover:decoration-[#073f4d]">
              View <span aria-hidden="true" className="inline-block transition md:group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </a>
    </article>
  )
}
