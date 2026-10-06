import type { Metadata } from 'next'

import { siteImages } from '@/constants/siteImages'

export const metadata: Metadata = {
  title: 'Services | Coastline Realty',
  description:
    'Real estate brokering, deal advisory, legal support, and property management services for property decisions in Sri Lanka.',
}

const services = [
  {
    eyebrow: 'Brokering',
    title: 'Real Estate Brokering',
    description:
      'We find the right person on the other side of your deal: a qualified buyer, a serious tenant, or the right property for you to buy or lease. This is the core of what we do.',
    points: [
      'Property listed and marketed to our buyer and tenant network.',
      'Every viewing and inquiry handled on your behalf.',
      'Negotiation carried through to a signed agreement.',
    ],
  },
  {
    eyebrow: "Coastline's Specialty",
    title: 'Deal Advisory',
    featured: true,
    description:
      'Most brokering firms only work to place a deal. Before you sell, sign a lease, or accept an offer, we tell you whether that is even the right move for your situation, holding costs, inflation, and currency appreciation included.',
    points: [
      'Sell versus hold and lease, and buy versus hold, compared across a range of scenarios, not one guess.',
      "Holding costs and Sri Lanka's real inflation and currency trends built into the numbers, not just today's asking price.",
      'Break-even figures: the price or growth rate at which one option overtakes another.',
      'Assumptions checked against independent data, not just our own estimate.',
      'A short written report you keep, with a plain bottom-line recommendation for your specific situation.',
    ],
    note: 'A decision service built to help you choose the right move before the transaction begins.',
  },
  {
    eyebrow: 'Legal',
    title: 'Legal Support',
    description:
      'We connect you with legal assistance for title checks and contract review at the point in the process where you need it, so ownership questions and paperwork are handled properly before anything is signed.',
    points: [
      'Access to legal review of title and contract terms.',
      'Guidance on what to check before you sign.',
      'Coordinated timing, so legal steps do not stall your deal.',
    ],
  },
  {
    eyebrow: 'Management',
    title: 'Property Management',
    description:
      'For owners who are not on-site, we help keep the property cared for, occupied, and commercially sensible. The aim is simple: fewer surprises, better upkeep, and a clearer view of how the asset is performing.',
    points: [
      'Tenant communication, viewing coordination, and practical day-to-day follow-up handled on your behalf.',
      'Regular checks on condition, maintenance needs, and service provider work.',
      'Rent, occupancy, and holding-cost considerations reviewed so the property remains aligned with your wider plan.',
    ],
  },
]

export default function ServicesPage() {
  const featuredService = services.find((service) => 'featured' in service)
  const supportingServices = services.filter((service) => !('featured' in service))

  return (
    <main className="bg-[#f8f6f0] text-[#26383d]">
      <section className="relative isolate overflow-hidden border-b border-[#123f4b]/10 bg-[#f4f1e9] text-white md:text-[#073f4d]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center md:bg-[center_42%]"
          style={{ backgroundImage: `url(${siteImages.aerial})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.22)_42%,rgba(0,0,0,0.68)_100%)] md:hidden" />

        <div className="container relative flex min-h-[32rem] items-end pb-14 pt-32 md:min-h-[36rem] md:items-center md:justify-end md:py-16 lg:min-h-[40rem]">
          <div className="max-w-[36rem] md:max-w-3xl md:bg-[#fbfaf7]/94 md:p-10 md:shadow-[0_24px_90px_rgba(0,0,0,0.22)] md:backdrop-blur">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/78 md:text-base md:font-semibold md:normal-case md:tracking-normal md:text-[#123f4b]/80">Coastline Realty services</p>
            <h1 className="mt-5 font-serif text-[3.2rem] leading-[0.92] tracking-[-0.06em] text-balance drop-shadow-[0_3px_18px_rgba(0,0,0,0.28)] md:text-7xl md:leading-[0.98] md:tracking-[-0.055em] md:drop-shadow-none">
              Property decisions need more than a listing.
            </h1>
            <p className="mt-5 max-w-[32rem] text-lg leading-7 text-white/86 md:mt-6 md:max-w-2xl md:text-2xl md:leading-8 md:text-[#26383d]/86">
              Coastline combines brokering, advisory, legal coordination, and property management so each deal is approached with the full decision in mind.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-20 md:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b5844f]">What we do</p>
          <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-0.04em] text-[#123f4b] md:text-6xl">
            Four services, one practical path through the property process.
          </h2>
        </div>

        {featuredService ? (
          <article className="relative mt-12 overflow-hidden border border-[#b5844f]/45 bg-[#073f4d] p-7 text-white shadow-[0_30px_90px_rgba(7,63,77,0.24)] md:p-10 lg:p-12">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#b5844f]/10 blur-3xl md:h-72 md:w-72" />
            <div className="absolute -bottom-24 left-1/2 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(22rem,1fr)] lg:items-start lg:gap-10">
              <div>
                <span className="inline-flex rounded-full bg-[#b5844f] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_12px_30px_rgba(181,132,79,0.28)]">
                  {featuredService.eyebrow}
                </span>
                <h3 className="mt-5 font-serif text-4xl leading-none tracking-[-0.05em] text-white md:text-6xl">
                  {featuredService.title}
                </h3>
                <p className="mt-6 text-lg leading-8 text-white/82 md:text-xl md:leading-9">
                  {featuredService.description}
                </p>
                {'note' in featuredService ? (
                  <p className="mt-8 border-l-2 border-[#b5844f] pl-5 text-base font-semibold leading-7 text-white">
                    {featuredService.note}
                  </p>
                ) : null}
              </div>

              <ul className="space-y-4 border-t border-white/12 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                {featuredService.points.map((point) => (
                  <li className="flex gap-3 text-sm leading-7 text-white/84 md:text-base" key={point}>
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#b5844f]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ) : null}

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {supportingServices.map((service) => (
            <article
              className="border border-[#123f4b]/12 bg-white/72 p-7 shadow-[0_22px_70px_rgba(18,63,75,0.08)] md:p-8"
              key={service.title}
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b5844f]">{service.eyebrow}</p>
                <h3 className="mt-3 font-serif text-3xl leading-none tracking-[-0.04em] text-[#123f4b]">
                  {service.title}
                </h3>
              </div>

              <p className="mt-6 text-base leading-8 text-[#26383d]/82">{service.description}</p>

              <ul className="mt-7 space-y-4">
                {service.points.map((point) => (
                  <li className="flex gap-3 text-sm leading-7 text-[#26383d]/86" key={point}>
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#b5844f]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
