import Link from 'next/link'

type PropertyMode = 'buy' | 'rent' | 'lease'

const modes: Array<{
  mode: PropertyMode
  label: string
  shortLabel: string
  href: string
  description: string
}> = [
  {
    mode: 'buy',
    label: 'Buy a Property',
    shortLabel: 'Buy',
    href: '/properties?mode=buy',
    description: 'Homes, villas, and land for sale across Sri Lanka.',
  },
  {
    mode: 'rent',
    label: 'Rent a Property',
    shortLabel: 'Rent',
    href: '/properties?mode=rent',
    description: 'Selected rentals for short and long-term coastal living.',
  },
  {
    mode: 'lease',
    label: 'Lease a Property',
    shortLabel: 'Lease',
    href: '/properties?mode=lease',
    description: 'Lease opportunities for private, commercial, or investment use.',
  },
]

export function PropertyModeSelector({ activeMode }: { activeMode?: PropertyMode }) {
  return (
    <div className="border border-[#123f4b]/15 bg-[#fbfaf7] p-3 shadow-[0_12px_36px_rgba(18,63,75,0.08)] md:p-3 md:shadow-[0_18px_70px_rgba(18,63,75,0.12)]">
      <div className="px-1 pb-3 md:px-2 md:pb-4">
        <p className="font-serif text-2xl leading-none tracking-[-0.035em] text-[#073f4d] md:text-3xl">
          What are you looking to do?
        </p>
      </div>
      <div className="grid gap-2 md:grid-cols-3 md:gap-3">
        {modes.map((item) => {
          const isActive = item.mode === activeMode

          return (
            <Link
              aria-current={isActive ? 'page' : undefined}
              className={[
                'group block border px-5 py-4 text-left focus:outline-2 focus:outline-offset-2 focus:outline-[#073f4d] md:p-6',
                isActive
                  ? 'border-[#073f4d] bg-[#073f4d] text-white shadow-[0_8px_22px_rgba(7,63,77,0.18)] md:shadow-[0_14px_35px_rgba(7,63,77,0.22)]'
                  : 'gooey-card border-[#123f4b]/10 bg-white/60',
              ].join(' ')}
              href={item.href}
              key={item.mode}
            >
              <span className={isActive ? 'block' : 'gooey-card__content block'}>
                <span className="flex items-center justify-between gap-4">
                  <span className="text-lg font-bold md:text-base">{item.shortLabel}</span>
                  <span className="text-xl transition group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </span>
                <span className="mt-1 block text-sm font-semibold opacity-80 md:hidden">
                  {item.label}
                </span>
                <span
                  className={[
                    'mt-3 block text-sm leading-6 md:text-base md:leading-7',
                    isActive ? 'text-white/86' : 'text-current/76',
                  ].join(' ')}
                >
                  {item.description}
                </span>
              </span>
              {!isActive ? <span className="gooey-card__blobs" aria-hidden="true"><span /><span /><span /></span> : null}
            </Link>
          )
        })}
      </div>

    </div>
  )
}

export type { PropertyMode }
