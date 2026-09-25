import type { PropertyMode } from '@/components/PropertyModeSelector'

type Props = {
  activeMode: PropertyMode
  query?: string
}

export function PropertySearchBar({ activeMode, query }: Props) {
  return (
    <form className="relative" method="GET" action="/properties">
      <input name="mode" type="hidden" value={activeMode} />
      <label className="sr-only" htmlFor="property-search">Search properties</label>
      <div className="flex overflow-hidden rounded-full border border-[#123f4b]/15 bg-white shadow-[0_18px_55px_rgba(18,63,75,0.12)] ring-1 ring-white/80 transition focus-within:border-[#073f4d]/45 focus-within:shadow-[0_22px_70px_rgba(18,63,75,0.18)]">
        <div className="flex min-w-0 flex-1 items-center gap-3 px-4 md:px-6">
          <span aria-hidden="true" className="text-lg text-[#073f4d]/65">⌕</span>
          <input
            autoComplete="off"
            className="min-h-14 w-full bg-transparent text-base text-[#073f4d] outline-none placeholder:text-[#26383d]/45 md:min-h-16 md:text-lg"
            defaultValue={query || ''}
            id="property-search"
            name="q"
            placeholder="Search city, area, property type, keyword"
            type="search"
          />
        </div>
        <button className="m-1.5 hidden rounded-full bg-[#073f4d] px-7 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#0b5264] md:block" type="submit">
          Search
        </button>
        <button aria-label="Search" className="m-1.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#073f4d] text-lg text-white transition hover:bg-[#0b5264] md:hidden" type="submit">
          →
        </button>
      </div>
    </form>
  )
}
