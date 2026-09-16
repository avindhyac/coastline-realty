import type { Metadata } from 'next'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { FormBlock } from '@/blocks/Form/Component'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const metadata: Metadata = {
  title: 'Contact | Coastline Realty',
  description: 'Contact Coastline Realty to begin your Sri Lanka property search or enquire about a listing.',
}

export default async function ContactPage() {
  const contactForm = await queryContactForm()

  return (
    <main className="bg-[#f8f6f0] text-[#26383d]">
      <section className="border-b border-[#123f4b]/10 bg-[#fbfaf7] py-20 lg:py-28">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div>
            <p className="text-base font-semibold text-[#123f4b]/80">Contact Coastline Realty</p>
            <h1 className="mt-6 max-w-5xl font-serif text-6xl leading-[0.95] tracking-[-0.06em] text-[#073f4d] md:text-7xl">
              Tell us what kind of place you are looking for.
            </h1>
          </div>
          <p className="max-w-xl text-xl leading-9 text-[#26383d]/82">
            Share the shoreline, town, budget, or lifestyle you have in mind. Our team will connect you with the right Sri Lankan property options.
          </p>
        </div>
      </section>

      <section className="container py-16 lg:py-24">
        <div className="grid overflow-hidden border border-[#123f4b]/10 bg-[#fbfaf7] shadow-[0_18px_70px_rgba(18,63,75,0.08)] lg:grid-cols-[0.7fr_1fr]">
          <div className="flex flex-col justify-between bg-[#073f4d] p-8 text-white md:p-12 lg:p-14">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">Start a conversation</p>
              <h2 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.04em] md:text-5xl">We will help refine the search.</h2>
              <p className="mt-6 text-base leading-8 text-white/78">For property enquiries, viewings, valuations, and general questions, send a note and we will respond as soon as possible.</p>
            </div>
            <div className="mt-10 space-y-3 text-sm text-white/82">
              <p>South coast villas, land, rentals and lease opportunities</p>
              <p className="font-semibold text-white">Coastline Realty Sri Lanka</p>
            </div>
          </div>

          <div className="p-6 md:p-10 lg:p-14">
            {contactForm ? (
              <FormBlock
                containerClassName="w-full max-w-none px-0"
                enableIntro={false}
                form={contactForm}
                formShellClassName="border-0 p-0 lg:p-0 [&_input]:h-12 [&_input]:rounded-none [&_input]:border-[#123f4b]/20 [&_input]:bg-white [&_label]:mb-2 [&_label]:block [&_label]:text-xs [&_label]:font-bold [&_label]:uppercase [&_label]:tracking-[0.16em] [&_label]:text-[#123f4b] [&_textarea]:min-h-32 [&_textarea]:rounded-none [&_textarea]:border-[#123f4b]/20 [&_textarea]:bg-white"
              />
            ) : (
              <div className="border border-[#123f4b]/10 bg-white/70 p-8 text-[#26383d]/75">
                Contact form is being configured. Please check back shortly.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

const queryContactForm = cache(async (): Promise<FormType | null> => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'forms',
    depth: 1,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      title: {
        equals: 'Contact Form',
      },
    },
  })

  return (result.docs?.[0] as unknown as FormType) || null
})
