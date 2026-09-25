type PropertyMode = 'buy' | 'rent' | 'lease'

const modes: Array<{ mode: PropertyMode; label: string; shortLabel: string; href: string; description: string }> = [
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

export function PropertyModeSelector({ activeMode = 'buy' }: { activeMode?: PropertyMode }) {
  return (
    <div className="border border-[#123f4b]/15 bg-[#fbfaf7] p-2 shadow-[0_12px_36px_rgba(18,63,75,0.08)] md:p-3 md:shadow-[0_18px_70px_rgba(18,63,75,0.12)]">
      <p className="px-1 pb-2 text-sm font-bold uppercase tracking-[0.14em] text-[#073f4d] md:px-2 md:pb-3 md:text-base md:normal-case md:tracking-normal">What are you looking for?</p>
      <div className="grid grid-cols-3 gap-1 rounded-full border border-[#123f4b]/10 bg-white/65 p-1 md:gap-3 md:rounded-none md:border-0 md:bg-transparent md:p-0">
        {modes.map((item) => {
          const isActive = item.mode === activeMode

          return (
            <a
              aria-current={isActive ? 'page' : undefined}
              className={[
                'group block rounded-full px-3 py-3 text-center transition duration-300 focus:outline-2 focus:outline-offset-2 focus:outline-[#073f4d] md:rounded-none md:p-6 md:text-left',
                isActive
                  ? 'bg-[#073f4d] text-white shadow-[0_8px_22px_rgba(7,63,77,0.18)] md:shadow-[0_14px_35px_rgba(7,63,77,0.22)]'
                  : 'text-[#073f4d] hover:bg-white md:bg-white/45',
              ].join(' ')}
              href={item.href}
              key={item.mode}
            >
              <span className="text-sm font-bold md:hidden">{item.shortLabel}</span>
              <span className="hidden text-base font-bold md:inline">{item.label}</span>
              <span className={['mt-3 hidden text-base leading-7 md:block', isActive ? 'text-white/86' : 'text-[#26383d]/76'].join(' ')}>
                {item.description}
              </span>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export type { PropertyMode }
