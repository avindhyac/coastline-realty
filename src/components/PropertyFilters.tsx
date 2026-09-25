'use client'

import { useState } from 'react'
import type { PropertyMode } from '@/components/PropertyModeSelector'

type Option = { label: string; value: string }

type Props = {
  activeMode: PropertyMode
  cities: string[]
  filters: {
    city?: string
    type?: string
    beds?: string
    price?: string
    seaView?: string
    pool?: string
    furnished?: string
    nearBeach?: string
    q?: string
  }
}

const propertyTypes: Option[] = ['Villa', 'House', 'Apartment', 'Bare Land', 'Commercial', 'Agricultural', 'Warehouse', 'Mixed-Use'].map((value) => ({ label: value, value }))

const buyPrices: Option[] = [
  { label: 'Any price', value: '' },
  { label: 'Under LKR 50M', value: '0-50000000' },
  { label: 'LKR 50M – 100M', value: '50000000-100000000' },
  { label: 'LKR 100M – 200M', value: '100000000-200000000' },
  { label: 'LKR 200M+', value: '200000000-' },
]

const rentalPrices: Option[] = [
  { label: 'Any price', value: '' },
  { label: 'Under LKR 500K', value: '0-500000' },
  { label: 'LKR 500K – 1M', value: '500000-1000000' },
  { label: 'LKR 1M – 2M', value: '1000000-2000000' },
  { label: 'LKR 2M+', value: '2000000-' },
]

function Select({ label, name, value, options }: { label: string; name: string; value?: string; options: Option[] }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold uppercase tracking-[0.12em] text-[#073f4d]/80">{label}</span>
      <select className="min-h-12 w-full rounded-sm border border-[#123f4b]/20 bg-white px-4 text-base text-[#26383d]" defaultValue={value || ''} name={name}>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  )
}

function Checkbox({ label, name, checked }: { label: string; name: string; checked?: boolean }) {
  return (
    <label className="flex min-h-12 items-center gap-3 rounded-sm border border-[#123f4b]/15 bg-white px-4 text-base font-semibold text-[#26383d]">
      <input className="h-5 w-5 accent-[#073f4d]" defaultChecked={checked} name={name} type="checkbox" value="true" />
      {label}
    </label>
  )
}

export function PropertyFilters({ activeMode, cities, filters }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const priceOptions = activeMode === 'buy' ? buyPrices : rentalPrices
  const activeFilterCount = [filters.city, filters.type, filters.beds, filters.price, filters.seaView, filters.pool, filters.furnished, filters.nearBeach].filter(Boolean).length

  return (
    <>
      <button
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#123f4b]/15 bg-white px-5 text-sm font-bold uppercase tracking-[0.14em] text-[#073f4d] shadow-[0_10px_28px_rgba(18,63,75,0.08)] transition hover:bg-[#fbfaf7] md:w-auto"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        Filters{activeFilterCount ? ` · ${activeFilterCount}` : ''}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-[#073f4d]/35 p-0 backdrop-blur-sm md:items-center md:p-6" role="dialog" aria-modal="true" aria-label="Property filters">
          <div className="max-h-[88vh] w-full overflow-auto rounded-t-3xl border border-[#123f4b]/10 bg-[#fbfaf7] shadow-[0_24px_90px_rgba(0,0,0,0.28)] md:max-w-3xl md:rounded-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#123f4b]/10 bg-[#fbfaf7]/95 px-5 py-4 backdrop-blur md:px-7">
              <div>
                <p className="text-2xl font-bold text-[#073f4d]">Filters</p>
                <p className="text-sm text-[#26383d]/65">Refine results when you need to.</p>
              </div>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#123f4b]/15 bg-white text-xl text-[#073f4d]" onClick={() => setIsOpen(false)} type="button" aria-label="Close filters">×</button>
            </div>

            <form className="p-5 md:p-7" method="GET" action="/properties">
              <input name="mode" type="hidden" value={activeMode} />
              {filters.q ? <input name="q" type="hidden" value={filters.q} /> : null}

              <div className="grid gap-4 md:grid-cols-2">
                <Select label="Location" name="city" value={filters.city} options={[{ label: 'All locations', value: '' }, ...cities.map((city) => ({ label: city, value: city }))]} />
                <Select label="Property Type" name="type" value={filters.type} options={[{ label: 'All property types', value: '' }, ...propertyTypes]} />
                <Select label="Price Range" name="price" value={filters.price} options={priceOptions} />
                <Select label="Bedrooms" name="beds" value={filters.beds} options={[{ label: 'Any bedrooms', value: '' }, { label: '1+ bedrooms', value: '1' }, { label: '2+ bedrooms', value: '2' }, { label: '3+ bedrooms', value: '3' }, { label: '4+ bedrooms', value: '4' }, { label: '5+ bedrooms', value: '5' }]} />
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#073f4d]/80">More options</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Checkbox label="Sea View" name="seaView" checked={filters.seaView === 'true'} />
                  <Checkbox label="Swimming Pool" name="pool" checked={filters.pool === 'true'} />
                  <Checkbox label="Furnished" name="furnished" checked={filters.furnished === 'true'} />
                  <Checkbox label="Near Beach" name="nearBeach" checked={filters.nearBeach === 'true'} />
                </div>
              </div>

              <div className="sticky bottom-0 -mx-5 mt-7 flex gap-3 border-t border-[#123f4b]/10 bg-[#fbfaf7]/95 p-5 backdrop-blur md:-mx-7 md:px-7">
                <a className="flex min-h-12 flex-1 items-center justify-center rounded-full border border-[#123f4b]/20 bg-white px-5 text-sm font-bold uppercase tracking-[0.14em] text-[#073f4d]" href={`/properties?mode=${activeMode}${filters.q ? `&q=${encodeURIComponent(filters.q)}` : ''}`}>Clear</a>
                <button className="min-h-12 flex-[1.4] rounded-full bg-[#073f4d] px-5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_30px_rgba(7,63,77,0.22)] transition hover:bg-[#0b5264]" type="submit">Show Properties</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}
