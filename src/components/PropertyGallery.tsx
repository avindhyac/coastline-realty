'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

type GalleryImage =
  | { type: 'url'; src: string; alt: string }
  | { type: 'media'; media: MediaType; alt: string }

type Props = {
  images: GalleryImage[]
  title: string
}

function GalleryVisual({ image, priority = false, fit = 'cover' }: { image: GalleryImage; priority?: boolean; fit?: 'cover' | 'contain' }) {
  const objectClass = fit === 'contain' ? 'object-contain' : 'object-cover'
  if (image.type === 'url') return <img alt={image.alt} className={`h-full w-full ${objectClass}`} src={image.src} />
  return <Media fill priority={priority} imgClassName={objectClass} resource={image.media} />
}

export function PropertyGallery({ images, title }: Props) {
  const gallery = useMemo(() => images.length ? images : [{ type: 'url' as const, src: '', alt: title }], [images, title])
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)

  const count = gallery.length
  const goTo = (index: number) => setActive((index + count) % count)
  const interactTo = (index: number) => {
    setHasInteracted(true)
    goTo(index)
  }
  const next = () => interactTo(active + 1)
  const previous = () => interactTo(active - 1)

  useEffect(() => {
    if (isPaused || hasInteracted || lightboxOpen || count < 2) return
    const timer = window.setInterval(() => setActive((value) => (value + 1) % count), 4500)
    return () => window.clearInterval(timer)
  }, [count, hasInteracted, isPaused, lightboxOpen])

  useEffect(() => {
    if (!lightboxOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false)
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') previous()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  const onTouchEnd = (clientX: number) => {
    if (touchStart === null) return
    const delta = touchStart - clientX
    if (Math.abs(delta) > 48) delta > 0 ? next() : previous()
    setTouchStart(null)
  }

  return (
    <>
      <section id="gallery" className="container py-4 md:py-6">
        <div className="grid gap-3 overflow-hidden md:grid-cols-[minmax(0,1fr)_18rem] lg:grid-cols-[minmax(0,1fr)_20rem]" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <div
            className="group relative aspect-[4/3] overflow-hidden bg-[#d9d4ca] md:aspect-[16/9]"
            onTouchStart={(event) => setTouchStart(event.changedTouches[0]?.clientX ?? null)}
            onTouchEnd={(event) => onTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
          >
            {gallery.map((image, index) => (
              <div className={["absolute inset-0 transition duration-700", index === active ? 'opacity-100 scale-100 group-hover:scale-[1.015]' : 'opacity-0 scale-100'].join(' ')} key={`${image.alt}-${index}`}>
                {image.type === 'url' && !image.src ? <div className="flex h-full items-center justify-center">Image coming soon</div> : <GalleryVisual image={image} priority={index === 0} />}
              </div>
            ))}

            {count > 1 ? (
              <>
                <button aria-label="Previous image" className="absolute left-5 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-2xl text-white opacity-0 backdrop-blur transition hover:bg-black/50 group-hover:opacity-100 md:flex" onClick={previous} type="button">‹</button>
                <button aria-label="Next image" className="absolute right-5 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-2xl text-white opacity-0 backdrop-blur transition hover:bg-black/50 group-hover:opacity-100 md:flex" onClick={next} type="button">›</button>
              </>
            ) : null}

            <button className="absolute inset-0 z-10 cursor-zoom-in" onClick={() => setLightboxOpen(true)} type="button" aria-label="Open photo gallery" />
            <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 flex items-center justify-start gap-3 md:inset-x-5 md:bottom-5">
              <span className="rounded-full border border-white/25 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur md:rounded-none md:px-5 md:py-3">{active + 1} / {count}</span>
            </div>
          </div>

          <div className="hidden h-full grid-rows-2 gap-3 md:grid md:max-w-[18rem] lg:max-w-[20rem]">
            {gallery.slice(1, 3).map((image, index) => {
              const imageIndex = index + 1
              return (
                <button className={["relative min-h-0 w-full overflow-hidden bg-[#d9d4ca] transition duration-500 hover:scale-[1.01] hover:brightness-105", active === imageIndex ? 'ring-4 ring-[#073f4d]' : ''].join(' ')} key={`${image.alt}-thumb-${index}`} onClick={() => interactTo(imageIndex)} type="button">
                  <GalleryVisual image={image} />
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {lightboxOpen ? (
        <div className="fixed inset-0 z-[90] bg-black/92 text-white" role="dialog" aria-modal="true" aria-label={`${title} photo gallery`}>
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 md:p-6">
            <span className="text-sm font-bold uppercase tracking-[0.16em]">{active + 1} / {count}</span>
            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl backdrop-blur hover:bg-white/20" onClick={() => setLightboxOpen(false)} type="button" aria-label="Close gallery">×</button>
          </div>
          <div
            className="flex h-full items-center justify-center p-4 pt-16 md:px-12 md:pb-32 md:pt-20"
            onTouchStart={(event) => setTouchStart(event.changedTouches[0]?.clientX ?? null)}
            onTouchEnd={(event) => onTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
          >
            <div className="relative h-full max-h-[78vh] w-full max-w-6xl md:max-h-[68vh]">
              <GalleryVisual image={gallery[active]} fit="contain" />
            </div>
          </div>
          {count > 1 ? (
            <>
              <button aria-label="Previous image" className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl backdrop-blur hover:bg-white/20" onClick={previous} type="button">‹</button>
              <button aria-label="Next image" className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl backdrop-blur hover:bg-white/20" onClick={next} type="button">›</button>
              <div className="absolute inset-x-0 bottom-0 hidden border-t border-white/10 bg-black/35 px-6 py-4 backdrop-blur md:block">
                <div className="mx-auto flex max-w-5xl gap-3 overflow-x-auto">
                  {gallery.map((image, index) => (
                    <button className={["relative h-20 w-32 shrink-0 overflow-hidden bg-white/10 transition hover:brightness-110", active === index ? 'ring-2 ring-white' : 'opacity-70'].join(' ')} key={`${image.alt}-film-${index}`} onClick={() => interactTo(index)} type="button">
                      <GalleryVisual image={image} />
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  )
}

export type { GalleryImage }
