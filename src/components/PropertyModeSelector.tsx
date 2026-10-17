import Link from 'next/link'

type PropertyMode = 'buy' | 'rent' | 'lease'

const modes: Array<{ mode: PropertyMode; label: string; href: string }> = [
  { mode: 'buy', label: 'Buy', href: '/properties?mode=buy' },
  { mode: 'rent', label: 'Rent', href: '/properties?mode=rent' },
  { mode: 'lease', label: 'Lease', href: '/properties?mode=lease' },
]

export function PropertyModeSelector({ activeMode, appearance = 'dark' }: { activeMode?: PropertyMode; appearance?: 'dark' | 'light' }) {
  const isLight = appearance === 'light'

  return (
    <nav aria-label="Property listing type" className={isLight ? 'grid w-full grid-cols-3 border border-[#073f4d]/20 bg-white md:gap-4 md:border-0 md:bg-transparent' : 'mx-auto flex w-full max-w-md items-center justify-center gap-2 border-b border-white/30 sm:gap-6'}>
      {modes.map((item) => {
        const isActive = item.mode === activeMode

        return (
          <Link
            aria-current={isActive ? 'page' : undefined}
            className={isLight
              ? 'group flex min-h-14 items-center justify-center border-r border-[#073f4d]/15 px-2 py-3 text-sm text-[#073f4d] transition-[background-color,border-color,box-shadow] duration-200 last:border-r-0 hover:bg-[#eef4f2] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073f4d] motion-reduce:transition-none md:min-h-24 md:gap-4 md:border md:border-[#073f4d]/15 md:last:border-r md:bg-white md:text-lg md:hover:border-[#073f4d] md:hover:shadow-[0_8px_24px_rgba(7,63,77,0.10)]'
              : [
                  'relative inline-flex min-h-14 flex-1 items-center justify-center px-2 py-3 text-sm font-semibold uppercase tracking-[0.16em] transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:bg-white after:transition-transform after:duration-300 motion-reduce:transition-none motion-reduce:after:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base',
                  isActive ? 'text-white after:scale-x-100' : 'text-white/70 after:scale-x-0 hover:text-white hover:after:scale-x-100 focus-visible:after:scale-x-100',
                ].join(' ')}
            href={item.href}
            key={item.mode}
          >
            <span className="font-semibold uppercase tracking-[0.12em]">{item.label}</span>
            {isLight ? <span aria-hidden="true" className="hidden text-lg leading-none text-[#073f4d]/60 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none md:inline">→</span> : null}
          </Link>
        )
      })}
    </nav>
  )
}

export type { PropertyMode }
