import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { slugField } from 'payload'

const calculatePropertyFields: CollectionBeforeChangeHook = async ({ data, operation, req, originalDoc }) => {
  const extent = Number(data.extentPerches || originalDoc?.extentPerches || 0)
  const listedPrice = Number(data.listedPriceTotal || originalDoc?.listedPriceTotal || 0)
  const soldPrice = Number(data.soldPriceTotal || originalDoc?.soldPriceTotal || 0)
  const commissionRate = Number(data.commissionRatePct || originalDoc?.commissionRatePct || 0)

  if (operation === 'create' && !data.propertyId) {
    const { totalDocs } = await req.payload.count({ collection: 'properties', overrideAccess: true })
    data.propertySequence = totalDocs + 1
    data.propertyId = `CR-${new Date().getFullYear()}-${String(totalDocs + 1).padStart(4, '0')}`
  }

  if (extent > 0 && listedPrice > 0) data.pricePerPerchListed = listedPrice / extent
  if (extent > 0 && soldPrice > 0) data.pricePerPerchSold = soldPrice / extent
  if (listedPrice > 0 && soldPrice > 0) {
    data.negotiationMarginPct = ((listedPrice - soldPrice) / listedPrice) * 100
  }
  if (soldPrice > 0 && commissionRate > 0) data.commissionAmount = (soldPrice * commissionRate) / 100

  const listedDate = data.dateListed || originalDoc?.dateListed
  const exitDate = data.dateSoldWithdrawn || originalDoc?.dateSoldWithdrawn
  if (listedDate && exitDate) {
    const start = new Date(listedDate).getTime()
    const end = new Date(exitDate).getTime()
    data.daysOnMarket = Math.max(0, Math.ceil((end - start) / 86400000))
  }

  return data
}

export const Properties: CollectionConfig = {
  slug: 'properties',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['propertyId', 'title', 'listingType', 'propertyType', 'city', 'listingStatus'],
    group: 'Real Estate',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'properties',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'properties',
        req,
      }),
    useAsTitle: 'title',
  },
  defaultPopulate: {
    title: true,
    slug: true,
    propertyId: true,
    listingType: true,
    propertyType: true,
    listingStatus: true,
    city: true,
    listedPriceTotal: true,
    extentPerches: true,
    bedrooms: true,
    bathrooms: true,
    featuredImage: true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Listing',
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              type: 'row',
              fields: [
                { name: 'propertyId', type: 'text', admin: { readOnly: true, width: '50%' }, unique: true },
                { name: 'propertySequence', type: 'number', admin: { hidden: true, readOnly: true } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'listingType', type: 'select', options: ['Sale', 'Rent', 'Lease'], required: true, admin: { width: '33%' } },
                { name: 'propertyType', type: 'select', options: ['Bare Land', 'House', 'Villa', 'Apartment', 'Commercial', 'Agricultural', 'Warehouse', 'Mixed-Use'], required: true, admin: { width: '34%' } },
                { name: 'listingStatus', label: 'Status', type: 'select', defaultValue: 'Active', options: ['Active', 'Under Offer', 'Sold', 'Withdrawn', 'Expired'], required: true, admin: { width: '33%' } },
              ],
            },
            { name: 'subType', type: 'text' },
            { name: 'featured', type: 'checkbox', defaultValue: false },
            { name: 'description', type: 'textarea' },
          ],
        },
        {
          label: 'Location',
          fields: [
            { name: 'address', type: 'text', required: true },
            { name: 'city', type: 'text', required: true },
            {
              type: 'row',
              fields: [
                { name: 'gnDivision', type: 'text', admin: { width: '25%' } },
                { name: 'dsDivision', type: 'text', admin: { width: '25%' } },
                { name: 'district', type: 'text', admin: { width: '25%' } },
                { name: 'province', type: 'text', admin: { width: '25%' } },
              ],
            },
            { name: 'googleMapsLink', type: 'text' },
            {
              name: 'googleMapsEmbedUrl',
              label: 'Google Maps Embed URL',
              type: 'text',
              admin: {
                description:
                  'Paste the src URL from Google Maps > Share > Embed a map. Example: https://www.google.com/maps/embed?pb=...',
              },
            },
          ],
        },
        {
          label: 'Details & Media',
          fields: [
            { name: 'featuredImage', type: 'upload', relationTo: 'media' },
            { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
            {
              type: 'row',
              fields: [
                { name: 'extentPerches', type: 'number', required: true, min: 0, admin: { width: '25%' } },
                { name: 'bedrooms', type: 'number', min: 0, admin: { width: '25%' } },
                { name: 'bathrooms', type: 'number', min: 0, admin: { width: '25%' } },
                { name: 'frontageFt', type: 'number', min: 0, admin: { width: '25%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'seaView', type: 'checkbox', admin: { width: '25%' } },
                { name: 'pool', type: 'checkbox', admin: { width: '25%' } },
                { name: 'distanceToBeachM', type: 'number', min: 0, admin: { width: '25%' } },
                { name: 'furnishedStatus', type: 'select', options: ['Furnished', 'Unfurnished', 'Partially Furnished'], admin: { width: '25%' } },
              ],
            },
          ],
        },
        {
          label: 'Pricing & Internal',
          fields: [
            { name: 'listedPriceTotal', type: 'number', required: true, min: 0 },
            { name: 'pricePerPerchListed', type: 'number', admin: { readOnly: true } },
            { name: 'soldPriceTotal', type: 'number', min: 0 },
            { name: 'pricePerPerchSold', type: 'number', admin: { readOnly: true } },
            { name: 'negotiationMarginPct', type: 'number', admin: { readOnly: true } },
            { name: 'dateListed', type: 'date', required: true, defaultValue: () => new Date().toISOString() },
            { name: 'dateSoldWithdrawn', type: 'date' },
            { name: 'daysOnMarket', type: 'number', admin: { readOnly: true } },
            { name: 'listingAgentName', type: 'text' },
            { name: 'source', type: 'select', options: ['Owner-direct', 'Referral', 'Another Agency', 'Portal'] },
            { name: 'commissionRatePct', type: 'number', min: 0 },
            { name: 'commissionAmount', type: 'number', admin: { readOnly: true } },
            { name: 'internalNotes', type: 'textarea', admin: { position: 'sidebar' } },
          ],
        },
        {
          label: 'Legal',
          fields: [
            { name: 'titleType', type: 'select', options: ['Freehold', 'Leasehold'] },
            { name: 'deedLotNumber', type: 'text' },
            { name: 'surveyPlanNumber', type: 'text' },
            { name: 'governmentValuation', type: 'number', min: 0 },
          ],
        },
      ],
    },
    { name: 'publishedAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' }, position: 'sidebar' } },
    slugField(),
  ],
  hooks: {
    beforeChange: [calculatePropertyFields],
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
}
