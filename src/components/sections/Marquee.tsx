const items = [
  'Heizdeckensegel',
  'Kühldeckensegel',
  'Gipskühldecken',
  'Feinverteilung',
  'Pressfitting',
  'Ventilgruppen',
  'Bodenheizung',
  'Holz-Hybridbau',
  'Ganze Deutschschweiz',
]

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li key={item} className="flex items-center">
          <span className="font-display px-7 text-xl font-semibold whitespace-nowrap text-white/85 sm:text-2xl">{item}</span>
          <span
            aria-hidden
            className={`size-2 rotate-45 rounded-[2px] ${i % 2 === 0 ? 'bg-ice-300' : 'bg-heat-300'}`}
          />
        </li>
      ))}
    </ul>
  )
}

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/[0.07] bg-ink-900 py-6">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Row />
        <Row hidden />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-900" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-900" />
    </div>
  )
}
