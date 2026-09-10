'use client'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { FormBlock } from '@/blocks/Form/Component'

export function PropertyInquiry({ form }: { form?: FormType | null }) {
  if (!form) {
    return (
      <a className="block w-full bg-[#073f4d] px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#0b5264]" href="/contact">
        Send inquiry
      </a>
    )
  }

  return (
    <div className="property-inquiry-form -mx-4 -my-4 lg:-mx-6 lg:-my-6">
      <FormBlock enableIntro={false} form={form} />
    </div>
  )
}
