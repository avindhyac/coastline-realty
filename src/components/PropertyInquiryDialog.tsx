'use client'

import { useState } from 'react'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { PropertyInquiry } from '@/components/PropertyInquiry'

type Props = {
  form: FormType | null
  propertyTitle: string
  shareUrl: string
}

export function PropertyInquiryDialog({ form, propertyTitle, shareUrl }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const shareHref = `mailto:?subject=${encodeURIComponent(propertyTitle)}&body=${encodeURIComponent(shareUrl)}`

  return (
    <>
      <aside id="inquiry" className="scroll-mt-28 rounded-sm border border-[#123f4b]/10 bg-[#fbfaf7] p-6 shadow-[0_18px_60px_rgba(18,63,75,0.08)] lg:row-span-2 lg:col-start-2 lg:row-start-1">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#123f4b]/70">Interested?</p>
        <h2 className="mt-3 text-3xl font-bold text-[#123f4b]">Enquire about this property</h2>
        <p className="mt-3 text-base leading-7 text-[#26383d]/80">Request viewing times, title details, pricing guidance, and next steps from the Coastline Realty team.</p>
        <div className="mt-6 grid gap-3">
          <button className="min-h-12 rounded-sm bg-gradient-to-r from-[#073f4d] to-[#0b5264] px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_14px_30px_rgba(7,63,77,0.24)] ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(7,63,77,0.34)]" onClick={() => setIsOpen(true)} type="button">Enquire Now</button>
          <a className="min-h-12 rounded-sm border border-[#123f4b]/20 bg-white px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-[#073f4d] transition hover:bg-[#f8f6f0]" href={shareHref}>Share Property</a>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#123f4b]/10 bg-[#fbfaf7]/96 p-3 shadow-[0_-14px_40px_rgba(18,63,75,0.16)] backdrop-blur md:hidden">
        <div className="container flex gap-3 px-0">
          <a className="flex min-h-12 flex-1 items-center justify-center rounded-sm border border-[#123f4b]/20 bg-white px-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#073f4d]" href={shareHref}>Share</a>
          <button className="flex min-h-12 flex-[1.7] items-center justify-center rounded-sm bg-gradient-to-r from-[#073f4d] to-[#0b5264] px-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_12px_26px_rgba(7,63,77,0.22)]" onClick={() => setIsOpen(true)} type="button">Enquire Now</button>
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#073f4d]/40 p-0 backdrop-blur-sm md:items-center md:p-6" role="dialog" aria-modal="true" aria-label={`Enquire about ${propertyTitle}`}>
          <div className="max-h-[90vh] w-full overflow-auto rounded-t-3xl border border-[#123f4b]/10 bg-[#fbfaf7] shadow-[0_24px_90px_rgba(0,0,0,0.28)] md:max-w-2xl md:rounded-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#123f4b]/10 bg-[#fbfaf7]/95 px-5 py-4 backdrop-blur md:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#123f4b]/65">Property enquiry</p>
                <h2 className="mt-1 text-2xl font-bold leading-tight text-[#073f4d]">{propertyTitle}</h2>
              </div>
              <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#123f4b]/15 bg-white text-xl text-[#073f4d]" onClick={() => setIsOpen(false)} type="button" aria-label="Close enquiry form">×</button>
            </div>
            <div className="p-5 md:p-7">
              <PropertyInquiry form={form} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
