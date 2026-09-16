import type { Media } from '@/payload-types'

import { siteImages } from '@/constants/siteImages'

const propertyImagePool = [
  siteImages.beach,
  siteImages.aerial,
  siteImages.fishermen,
  siteImages.lagoon,
  siteImages.train,
  siteImages.spices,
]

export const isSeededPlaceholderMedia = (media: unknown): media is Media => {
  if (!media || typeof media !== 'object' || !('alt' in media)) return false

  const alt = String((media as { alt?: string | null }).alt || '').toLowerCase()
  return alt.includes('abstract') || alt.includes('metallic')
}

export const getPropertyDummyImages = (key?: string | number | null) => {
  const seed = String(key || '')
  const start = seed.split('').reduce((total, character) => total + character.charCodeAt(0), 0) % propertyImagePool.length

  return propertyImagePool.map((_, index) => propertyImagePool[(start + index) % propertyImagePool.length])
}
