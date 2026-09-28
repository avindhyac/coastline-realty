'use client'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import Link from 'next/link'

import { FormBlock } from '@/blocks/Form/Component'

export function PropertyInquiry({ form }: { form?: FormType | null }) {
  if (!form) {
    return (
      <Link className="c-button c-button--gooey w-full" href="/contact">
        <span className="c-button__label">Send inquiry</span>
        <span className="c-button__blobs" aria-hidden="true"><span /><span /><span /></span>
      </Link>
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
