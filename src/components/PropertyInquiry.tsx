'use client'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { FormBlock } from '@/blocks/Form/Component'

export function PropertyInquiry({ form }: { form?: FormType | null }) {
  if (!form) {
    return (
      <a className="block w-full rounded-sm bg-gradient-to-r from-[#073f4d] to-[#0b5264] px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-white shadow-[0_14px_30px_rgba(7,63,77,0.24)] ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(7,63,77,0.34)]" href="/contact">
        Send inquiry
      </a>
    )
  }

  return (
    <div className="property-inquiry-form">
      <FormBlock
        containerClassName="w-full max-w-none px-0"
        enableIntro={false}
        form={form}
        formShellClassName="border-0 p-0 lg:p-0 [&_input]:h-12 [&_input]:rounded-none [&_input]:border-[#123f4b]/20 [&_input]:bg-white/80 [&_label]:mb-2 [&_label]:block [&_label]:text-xs [&_label]:font-bold [&_label]:uppercase [&_label]:tracking-[0.16em] [&_label]:text-[#123f4b] [&_textarea]:min-h-28 [&_textarea]:rounded-none [&_textarea]:border-[#123f4b]/20 [&_textarea]:bg-white/80"
      />
    </div>
  )
}
