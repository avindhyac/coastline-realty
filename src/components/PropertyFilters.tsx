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
  }
}

const propertyTypes: Option[] = [
  'Villa',
  'House',
  'Apartment',
  'Bare Land',
  'Commercial',
  'Agricultural',
  'Warehouse',
  'Mixed-Use',
].map((value) => ({ label: value, value }))

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
      <span className="mb-2 block text-base font-semibold text-[#073f4d]">{label}</span>
      <select className="min-h-12 w-full border border-[#123f4b]/20 bg-white px-4 text-base text-[#26383d]" defaultValue={value || ''} name={name}>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  )
}

function Checkbox({ label, name, checked }: { label: string; name: string; checked?: boolean }) {
  return (
    <label className="flex min-h-12 items-center gap-3 border border-[#123f4b]/15 bg-white px-4 text-base font-semibold text-[#26383d]">
      <input className="h-5 w-5 accent-[#073f4d]" defaultChecked={checked} name={name} type="checkbox" value="true" />
      {label}
    </label>
  )
}

export function PropertyFilters({ activeMode, cities, filters }: Props) {
  const priceOptions = activeMode === 'buy' ? buyPrices : rentalPrices

  return (
    <form className="border border-[#123f4b]/10 bg-[#fbfaf7] p-5 shadow-[0_18px_70px_rgba(18,63,75,0.08)]" method="GET">
      <input name="mode" type="hidden" value={activeMode} />
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-base font-semibold text-[#123f4b]/80">Refine your search</p>
          <h2 className="mt-1 font-serif text-3xl text-[#073f4d]">Find the right property faster</h2>
        </div>
        <a className="text-base font-bold text-[#073f4d] underline underline-offset-4" href={`/properties?mode=${activeMode}`}>Clear filters</a>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Select label="Location" name="city" value={filters.city} options={[{ label: 'All locations', value: '' }, ...cities.map((city) => ({ label: city, value: city }))]} />
        <Select label="Property Type" name="type" value={filters.type} options={[{ label: 'All property types', value: '' }, ...propertyTypes]} />
        <Select label="Bedrooms" name="beds" value={filters.beds} options={[{ label: 'Any bedrooms', value: '' }, { label: '1+ bedrooms', value: '1' }, { label: '2+ bedrooms', value: '2' }, { label: '3+ bedrooms', value: '3' }, { label: '4+ bedrooms', value: '4' }, { label: '5+ bedrooms', value: '5' }]} />
        <Select label="Price Range" name="price" value={filters.price} options={priceOptions} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Checkbox label="Sea View" name="seaView" checked={filters.seaView === 'true'} />
        <Checkbox label="Swimming Pool" name="pool" checked={filters.pool === 'true'} />
        <Checkbox label="Furnished" name="furnished" checked={filters.furnished === 'true'} />
        <Checkbox label="Near Beach" name="nearBeach" checked={filters.nearBeach === 'true'} />
      </div>

      <button className="mt-5 min-h-12 bg-[#073f4d] px-7 py-3 text-base font-bold text-white hover:bg-[#0b5264]" type="submit">Apply Filters</button>
    </form>
  )
}
