type PropertyMode = 'buy' | 'rent' | 'lease'

const modes: Array<{ mode: PropertyMode; label: string; href: string; description: string }> = [
  {
    mode: 'buy',
    label: 'Buy a Property',
    href: '/properties?mode=buy',
    description: 'Homes, villas, and land for sale across Sri Lanka.',
  },
  {
    mode: 'rent',
    label: 'Rent a Property',
    href: '/properties?mode=rent',
    description: 'Selected rentals for short and long-term coastal living.',
  },
  {
    mode: 'lease',
    label: 'Lease a Property',
    href: '/properties?mode=lease',
    description: 'Lease opportunities for private, commercial, or investment use.',
  },
]

export function PropertyModeSelector({ activeMode = 'buy' }: { activeMode?: PropertyMode }) {
  return (
    <div className="border border-[#123f4b]/15 bg-[#fbfaf7] p-3 shadow-[0_18px_70px_rgba(18,63,75,0.12)]">
      <p className="px-2 pb-3 text-base font-semibold text-[#073f4d]">What are you looking for?</p>
      <div className="grid gap-3 md:grid-cols-3">
        {modes.map((item) => {
          const isActive = item.mode === activeMode

          return (
            <a
              aria-current={isActive ? 'page' : undefined}
              className={[
                'group block p-6 transition duration-300 focus:outline-2 focus:outline-offset-2 focus:outline-[#073f4d]',
                isActive
                  ? 'bg-[#073f4d] text-white shadow-[0_14px_35px_rgba(7,63,77,0.22)]'
                  : 'bg-white/45 text-[#073f4d] hover:bg-white',
              ].join(' ')}
              href={item.href}
              key={item.mode}
            >
              <span className="text-base font-bold">{item.label}</span>
              <span className={['mt-3 block text-base leading-7', isActive ? 'text-white/86' : 'text-[#26383d]/76'].join(' ')}>
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
