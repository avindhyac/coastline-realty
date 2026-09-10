import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'properties',
  'forms',
  'form-submissions',
  'search',
]

const globals: GlobalSlug[] = ['header', 'footer']

const categories = ['Technology', 'News', 'Finance', 'Design', 'Software', 'Engineering']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/3.x/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const [demoAuthor, image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Demo Author',
        email: 'demo-author@example.com',
        password: 'password',
      },
    }),
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),
    categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category,
        },
      }),
    ),
  ])

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  payload.logger.info(`— Seeding sample properties...`)

  const propertyImages = [imageHomeDoc, image1Doc, image2Doc, image3Doc]
  const sampleProperties = [
    {
      title: 'Ocean View Estate',
      listingType: 'Sale',
      propertyType: 'Villa',
      listingStatus: 'Active',
      subType: 'Where luxury meets the endless blue.',
      featured: true,
      description:
        'Perched close to the shoreline with sweeping ocean views, this refined villa blends indoor-outdoor living, generous entertaining spaces, and tropical privacy.',
      address: 'Palm Ridge Road, Weligama',
      city: 'Weligama',
      district: 'Matara',
      province: 'Southern Province',
      googleMapsLink: 'https://maps.google.com/?q=Weligama,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Weligama,Sri+Lanka&output=embed',
      extentPerches: 28.5,
      bedrooms: 4,
      bathrooms: 4.5,
      seaView: true,
      pool: true,
      distanceToBeachM: 120,
      furnishedStatus: 'Furnished',
      listedPriceTotal: 185000000,
      titleType: 'Freehold',
    },
    {
      title: 'Ahangama Palm House',
      listingType: 'Sale',
      propertyType: 'House',
      listingStatus: 'Active',
      subType: 'A quiet tropical home minutes from the surf.',
      featured: true,
      description:
        'A characterful coastal home with lush garden edges, shaded terraces, and easy access to Ahangama cafes, surf breaks, and village life.',
      address: 'Temple Lane, Ahangama',
      city: 'Ahangama',
      district: 'Galle',
      province: 'Southern Province',
      googleMapsLink: 'https://maps.google.com/?q=Ahangama,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Ahangama,Sri+Lanka&output=embed',
      extentPerches: 18,
      bedrooms: 3,
      bathrooms: 3,
      seaView: false,
      pool: true,
      distanceToBeachM: 450,
      furnishedStatus: 'Partially Furnished',
      listedPriceTotal: 94000000,
      titleType: 'Freehold',
    },
    {
      title: 'Koggala Lakefront Land',
      listingType: 'Sale',
      propertyType: 'Bare Land',
      listingStatus: 'Active',
      subType: 'A rare lake-edge development parcel.',
      featured: false,
      description:
        'Generous lake-facing land with mature greenery, tranquil water views, and strong potential for a private villa or boutique retreat.',
      address: 'Lake Road, Koggala',
      city: 'Koggala',
      district: 'Galle',
      province: 'Southern Province',
      googleMapsLink: 'https://maps.google.com/?q=Koggala,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Koggala,Sri+Lanka&output=embed',
      extentPerches: 62,
      seaView: false,
      pool: false,
      distanceToBeachM: 900,
      listedPriceTotal: 122000000,
      titleType: 'Freehold',
    },
    {
      title: 'Galle Fort Courtyard Residence',
      listingType: 'Rent',
      propertyType: 'House',
      listingStatus: 'Active',
      subType: 'Heritage texture with contemporary comfort.',
      featured: true,
      description:
        'A beautifully composed rental residence with internal courtyard, calm interiors, and walkable access to Galle Fort restaurants and galleries.',
      address: 'Church Street, Galle Fort',
      city: 'Galle',
      district: 'Galle',
      province: 'Southern Province',
      googleMapsLink: 'https://maps.google.com/?q=Galle+Fort,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Galle+Fort,Sri+Lanka&output=embed',
      extentPerches: 9,
      bedrooms: 3,
      bathrooms: 3,
      seaView: false,
      pool: false,
      distanceToBeachM: 300,
      furnishedStatus: 'Furnished',
      listedPriceTotal: 850000,
      titleType: 'Freehold',
    },
    {
      title: 'Mirissa Beach Villa Rental',
      listingType: 'Rent',
      propertyType: 'Villa',
      listingStatus: 'Active',
      subType: 'A relaxed beachside stay with pool and garden.',
      featured: true,
      description:
        'Designed for effortless holidays and longer stays, this villa offers open living, a private pool, and quick access to Mirissa bay.',
      address: 'Beach Road, Mirissa',
      city: 'Mirissa',
      district: 'Matara',
      province: 'Southern Province',
      googleMapsLink: 'https://maps.google.com/?q=Mirissa,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Mirissa,Sri+Lanka&output=embed',
      extentPerches: 20,
      bedrooms: 5,
      bathrooms: 5,
      seaView: true,
      pool: true,
      distanceToBeachM: 80,
      furnishedStatus: 'Furnished',
      listedPriceTotal: 1200000,
      titleType: 'Freehold',
    },
    {
      title: 'Colombo Garden Apartment',
      listingType: 'Rent',
      propertyType: 'Apartment',
      listingStatus: 'Active',
      subType: 'City convenience with a calm residential feel.',
      featured: false,
      description:
        'A polished apartment rental close to Colombo amenities, with leafy outlooks, secure parking, and practical everyday comfort.',
      address: 'Park Road, Colombo 05',
      city: 'Colombo',
      district: 'Colombo',
      province: 'Western Province',
      googleMapsLink: 'https://maps.google.com/?q=Colombo+05,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Colombo+05,Sri+Lanka&output=embed',
      extentPerches: 0,
      bedrooms: 2,
      bathrooms: 2,
      seaView: false,
      pool: false,
      furnishedStatus: 'Furnished',
      listedPriceTotal: 420000,
      titleType: 'Freehold',
    },
    {
      title: 'Unawatuna Long Lease Villa',
      listingType: 'Lease',
      propertyType: 'Villa',
      listingStatus: 'Active',
      subType: 'Long-stay coastal living near Unawatuna.',
      featured: true,
      description:
        'A private villa offered for lease with generous bedrooms, tropical landscaping, and easy access to Unawatuna and Galle.',
      address: 'Yaddehimulla Road, Unawatuna',
      city: 'Unawatuna',
      district: 'Galle',
      province: 'Southern Province',
      googleMapsLink: 'https://maps.google.com/?q=Unawatuna,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Unawatuna,Sri+Lanka&output=embed',
      extentPerches: 24,
      bedrooms: 4,
      bathrooms: 4,
      seaView: false,
      pool: true,
      distanceToBeachM: 650,
      furnishedStatus: 'Furnished',
      listedPriceTotal: 1500000,
      titleType: 'Leasehold',
    },
    {
      title: 'Hiriketiya Commercial Lease',
      listingType: 'Lease',
      propertyType: 'Commercial',
      listingStatus: 'Active',
      subType: 'A high-visibility coastal commercial opportunity.',
      featured: false,
      description:
        'A compact commercial lease opportunity close to Hiriketiya, suited to cafe, studio, retail, or hospitality concepts.',
      address: 'Main Road, Hiriketiya',
      city: 'Hiriketiya',
      district: 'Matara',
      province: 'Southern Province',
      googleMapsLink: 'https://maps.google.com/?q=Hiriketiya,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Hiriketiya,Sri+Lanka&output=embed',
      extentPerches: 12,
      bathrooms: 2,
      seaView: false,
      pool: false,
      distanceToBeachM: 250,
      furnishedStatus: 'Unfurnished',
      listedPriceTotal: 650000,
      titleType: 'Leasehold',
    },
    {
      title: 'Tangalle Cliffside Villa',
      listingType: 'Sale',
      propertyType: 'Villa',
      listingStatus: 'Active',
      subType: 'A private headland villa with dramatic ocean outlooks.',
      featured: true,
      description:
        'Set above the coastline near Tangalle, this substantial villa offers wide sea views, expansive terraces, staff accommodation potential, and strong privacy for family living or hospitality use.',
      address: 'Cliff Road, Tangalle',
      city: 'Tangalle',
      district: 'Hambantota',
      province: 'Southern Province',
      googleMapsLink: 'https://maps.google.com/?q=Tangalle,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Tangalle,Sri+Lanka&output=embed',
      extentPerches: 36,
      bedrooms: 5,
      bathrooms: 5,
      seaView: true,
      pool: true,
      distanceToBeachM: 180,
      furnishedStatus: 'Furnished',
      listedPriceTotal: 245000000,
      titleType: 'Freehold',
    },
    {
      title: 'Galle Hill Country Residence',
      listingType: 'Sale',
      propertyType: 'House',
      listingStatus: 'Active',
      subType: 'Elevated family living within easy reach of Galle.',
      featured: false,
      description:
        'A calm hillside residence with garden space, cross breezes, and practical access to Galle, beaches, schools, and daily services.',
      address: 'Hill Crest Lane, Galle',
      city: 'Galle',
      district: 'Galle',
      province: 'Southern Province',
      googleMapsLink: 'https://maps.google.com/?q=Galle,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Galle,Sri+Lanka&output=embed',
      extentPerches: 22,
      bedrooms: 4,
      bathrooms: 3,
      seaView: false,
      pool: false,
      distanceToBeachM: 2200,
      furnishedStatus: 'Partially Furnished',
      listedPriceTotal: 76000000,
      titleType: 'Freehold',
    },
    {
      title: 'Dikwella Beach Access Plot',
      listingType: 'Sale',
      propertyType: 'Bare Land',
      listingStatus: 'Active',
      subType: 'A manageable coastal parcel near Hiriketiya and Dikwella.',
      featured: false,
      description:
        'A well-positioned land parcel with convenient road access and proximity to two popular southern beaches, suitable for a private residence or small rental villa.',
      address: 'Beach Access Road, Dikwella',
      city: 'Dikwella',
      district: 'Matara',
      province: 'Southern Province',
      googleMapsLink: 'https://maps.google.com/?q=Dikwella,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Dikwella,Sri+Lanka&output=embed',
      extentPerches: 31,
      seaView: false,
      pool: false,
      distanceToBeachM: 220,
      listedPriceTotal: 58000000,
      titleType: 'Freehold',
    },
    {
      title: 'Thalpe Family Villa Rental',
      listingType: 'Rent',
      propertyType: 'Villa',
      listingStatus: 'Active',
      subType: 'A refined furnished villa for comfortable coastal stays.',
      featured: true,
      description:
        'Located close to Thalpe beach, this spacious furnished villa includes a pool, generous bedrooms, covered outdoor dining, and easy access to Galle and Ahangama.',
      address: 'Matara Road, Thalpe',
      city: 'Thalpe',
      district: 'Galle',
      province: 'Southern Province',
      googleMapsLink: 'https://maps.google.com/?q=Thalpe,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Thalpe,Sri+Lanka&output=embed',
      extentPerches: 26,
      bedrooms: 4,
      bathrooms: 4,
      seaView: false,
      pool: true,
      distanceToBeachM: 180,
      furnishedStatus: 'Furnished',
      listedPriceTotal: 980000,
      titleType: 'Freehold',
    },
    {
      title: 'Kandy Lake View Apartment',
      listingType: 'Rent',
      propertyType: 'Apartment',
      listingStatus: 'Active',
      subType: 'A comfortable city rental with hill-country views.',
      featured: false,
      description:
        'A well-kept apartment rental in Kandy with secure access, pleasant views, and convenient proximity to the lake, shops, and schools.',
      address: 'Lake Round, Kandy',
      city: 'Kandy',
      district: 'Kandy',
      province: 'Central Province',
      googleMapsLink: 'https://maps.google.com/?q=Kandy,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Kandy,Sri+Lanka&output=embed',
      extentPerches: 0,
      bedrooms: 3,
      bathrooms: 2,
      seaView: false,
      pool: false,
      furnishedStatus: 'Furnished',
      listedPriceTotal: 360000,
      titleType: 'Freehold',
    },
    {
      title: 'Nuwara Eliya Bungalow Rental',
      listingType: 'Rent',
      propertyType: 'House',
      listingStatus: 'Active',
      subType: 'A cool-climate retreat for extended stays.',
      featured: false,
      description:
        'A character bungalow with garden frontage, fireplaces, and generous bedrooms, ideal for families or clients seeking a longer hill-country stay.',
      address: 'Upper Lake Road, Nuwara Eliya',
      city: 'Nuwara Eliya',
      district: 'Nuwara Eliya',
      province: 'Central Province',
      googleMapsLink: 'https://maps.google.com/?q=Nuwara+Eliya,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Nuwara+Eliya,Sri+Lanka&output=embed',
      extentPerches: 34,
      bedrooms: 4,
      bathrooms: 3,
      seaView: false,
      pool: false,
      furnishedStatus: 'Furnished',
      listedPriceTotal: 520000,
      titleType: 'Freehold',
    },
    {
      title: 'Ahangama Boutique Hotel Lease',
      listingType: 'Lease',
      propertyType: 'Commercial',
      listingStatus: 'Active',
      subType: 'A hospitality-ready coastal lease opportunity.',
      featured: true,
      description:
        'A boutique-scale property positioned for hospitality operations, with guest rooms, pool potential, and strong access to Ahangama surf, dining, and transport links.',
      address: 'Station Road, Ahangama',
      city: 'Ahangama',
      district: 'Galle',
      province: 'Southern Province',
      googleMapsLink: 'https://maps.google.com/?q=Ahangama,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Ahangama,Sri+Lanka&output=embed',
      extentPerches: 30,
      bedrooms: 8,
      bathrooms: 8,
      seaView: false,
      pool: true,
      distanceToBeachM: 500,
      furnishedStatus: 'Partially Furnished',
      listedPriceTotal: 2200000,
      titleType: 'Leasehold',
    },
    {
      title: 'Ella Viewpoint Lease Land',
      listingType: 'Lease',
      propertyType: 'Bare Land',
      listingStatus: 'Active',
      subType: 'A hill-country lease parcel with panoramic outlooks.',
      featured: false,
      description:
        'A scenic leasehold land opportunity near Ella, suitable for a small retreat, wellness concept, or carefully designed view-led accommodation.',
      address: 'Viewpoint Road, Ella',
      city: 'Ella',
      district: 'Badulla',
      province: 'Uva Province',
      googleMapsLink: 'https://maps.google.com/?q=Ella,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Ella,Sri+Lanka&output=embed',
      extentPerches: 52,
      seaView: false,
      pool: false,
      listedPriceTotal: 920000,
      titleType: 'Leasehold',
    },
    {
      title: 'Negombo Waterside Commercial Lease',
      listingType: 'Lease',
      propertyType: 'Commercial',
      listingStatus: 'Active',
      subType: 'A practical waterside premises close to the airport corridor.',
      featured: false,
      description:
        'A flexible commercial lease opportunity in Negombo with useful road access, waterside context, and suitability for retail, office, or hospitality concepts.',
      address: 'Canal Road, Negombo',
      city: 'Negombo',
      district: 'Gampaha',
      province: 'Western Province',
      googleMapsLink: 'https://maps.google.com/?q=Negombo,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Negombo,Sri+Lanka&output=embed',
      extentPerches: 18,
      bathrooms: 3,
      seaView: false,
      pool: false,
      furnishedStatus: 'Unfurnished',
      listedPriceTotal: 740000,
      titleType: 'Leasehold',
    },
    {
      title: 'Bentota Riverside Lease Land',
      listingType: 'Lease',
      propertyType: 'Bare Land',
      listingStatus: 'Active',
      subType: 'A riverside parcel for a considered hospitality idea.',
      featured: false,
      description:
        'Riverside lease land with lush mature trees, water frontage, and strong potential for a small retreat or wellness-led concept.',
      address: 'River Bend Road, Bentota',
      city: 'Bentota',
      district: 'Galle',
      province: 'Southern Province',
      googleMapsLink: 'https://maps.google.com/?q=Bentota,Sri+Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps?q=Bentota,Sri+Lanka&output=embed',
      extentPerches: 44,
      seaView: false,
      pool: false,
      listedPriceTotal: 780000,
      titleType: 'Leasehold',
    },
  ] as const

  for (const [index, property] of sampleProperties.entries()) {
    await payload.create({
      collection: 'properties',
      depth: 0,
      draft: false,
      context: {
        disableRevalidate: true,
      },
      data: {
        ...property,
        slug: property.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        featuredImage: propertyImages[index % propertyImages.length].id,
        gallery: propertyImages.filter((_, imageIndex) => imageIndex !== index % propertyImages.length).map((image) => image.id),
        dateListed: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
    })
  }

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding pages...`)

  const [_, contactPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: home({ heroImage: imageHomeDoc, metaImage: image2Doc }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({ contactForm: contactForm }),
    }),
  ])

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Posts',
              url: '/posts',
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Admin',
              url: '/admin',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Source Code',
              newTab: true,
              url: 'https://github.com/payloadcms/payload/tree/3.x/templates/website',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Payload',
              newTab: true,
              url: 'https://payloadcms.com/',
            },
          },
        ],
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
