import type { Metadata } from 'next'

import { siteImages } from '@/constants/siteImages'

export const metadata: Metadata = {
  title: 'About | Coastline Realty',
  description: 'Learn more about Coastline Realty, a boutique Sri Lankan property advisory for coastal homes, villas, land, rentals, and leases.',
}

export default function AboutPage() {
  return (
    <main className="bg-[#f8f6f0] text-[#26383d]">
      <section className="relative isolate overflow-hidden border-b border-[#123f4b]/10 bg-[#073f4d] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-55"
          style={{ backgroundImage: `url(${siteImages.aerial})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,63,77,0.94)_0%,rgba(7,63,77,0.72)_48%,rgba(7,63,77,0.25)_100%),linear-gradient(0deg,rgba(7,63,77,0.82)_0%,rgba(7,63,77,0.08)_58%)]" />

        <div className="container relative grid min-h-[34rem] items-end gap-10 pb-16 pt-28 md:min-h-[38rem] md:grid-cols-[minmax(0,1fr)_24rem] md:pb-20 md:pt-32 lg:min-h-[42rem]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/72">About Coastline Realty</p>
            <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[0.92] tracking-[-0.06em] text-balance md:text-7xl lg:text-8xl">
              Local guidance for considered property decisions.
            </h1>
          </div>

          <div className="border-l border-white/20 pl-6 md:mb-2">
            <p className="text-lg leading-8 text-white/82">
              A boutique Sri Lankan property advisory focused on distinctive homes, villas, land, rentals, and lease opportunities.
            </p>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-white/68">
              Full about page coming soon
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
