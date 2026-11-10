// Zentrale Inhalte & Firmendaten. Alles, was mit TODO markiert ist, muss vom Kunden bestätigt werden.
import type { ImageName } from '../components/Picture'

export const company = {
  name: "Leo's Haustechnik GmbH",
  shortName: "Leo's Haustechnik",
  street: 'Kirchbreiteweg 16',
  zip: '6033',
  city: 'Buchrain',
  canton: 'LU',
  uid: 'CHE-460.320.947',
  register: 'Handelsregister des Kantons Luzern',
  founded: 2019,
  people: [
    { name: 'Leonard Andreic', role: 'Gesellschafter · Vorsitzender der Geschäftsführung' },
    { name: 'Leonardo Mistrafovic', role: 'Gesellschafter · Geschäftsführer' },
  ],
  // TODO: E-Mail-Adresse bestätigen (Domain leos-haustechnik.ch hat Hostpoint-Mail, Adresse nicht verifiziert)
  email: 'info@leos-haustechnik.ch' as string | null,
  // TODO: Telefonnummer vom Kunden einholen. Solange null, wird keine Nummer angezeigt.
  phone: null as string | null,
  // TODO: Partnerschaft & Namensnennung mit Durrer Technik AG bestätigen lassen
  partner: { name: 'Durrer Technik AG', place: 'Adligenswil', url: 'https://www.durrer-technik.ch/' } as
    | { name: string; place: string; url: string }
    | null,
  url: 'https://leos-haustechnik.ch',
}

export const phoneHref = company.phone ? `tel:${company.phone.replace(/[^+\d]/g, '')}` : null

export const nav = [
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'prinzip', label: 'Prinzip' },
  { id: 'projekte', label: 'Projekte' },
  { id: 'ablauf', label: 'Ablauf' },
  { id: 'ueber-uns', label: 'Über uns' },
] as const

export type Service = {
  id: string
  no: string
  title: string
  kicker: string
  text: string
  points: string[]
  image: ImageName
  alt: string
  tone: 'cold' | 'warm' | 'neutral'
}

export const services: Service[] = [
  {
    id: 'deckensegel',
    no: '01',
    title: 'Heiz- & Kühldeckensegel',
    kicker: 'Montage',
    text: 'Wir hängen Deckensegel millimetergenau ab, für Büros, Labore, Schulen und Werkhallen. Ein Segel heizt im Winter und kühlt im Sommer, ohne Luftzug und ohne Lärm.',
    points: [
      'Abhängung an Ketten, Seilen oder Gewindestangen',
      'Exaktes Nivellieren und Ausrichten ganzer Segelreihen',
      'Abstimmung mit Deckenbau, Elektro und Lüftung',
    ],
    image: 'buero-deckensegel',
    alt: 'Grossraumbüro mit Reihen weisser Heiz- und Kühldeckensegel unter der Betondecke',
    tone: 'cold',
  },
  {
    id: 'feinverteilung',
    no: '02',
    title: 'Feinverteilung Heizung & Kälte',
    kicker: 'Leitungsbau',
    text: 'Von der Steigzone bis zum einzelnen Segel: Wir bauen das Leitungsnetz, das Wärme und Kälte genau dorthin bringt, wo sie gebraucht werden. Sauber verpresst und sauber geführt.',
    points: [
      'Verteil- und Anschlussleitungen in Pressfitting-Technik',
      'Abzweige mit Kugelhähnen und Absperrungen',
      'Leitungsführung durch Holz- und Betondecken',
    ],
    image: 'feinverteilung-steigzone',
    alt: 'Steigzone mit Vor- und Rücklaufleitungen, Kugelhähnen und Regelventil unter einer Holzbalkendecke',
    tone: 'warm',
  },
  {
    id: 'anschluss',
    no: '03',
    title: 'Segelanschluss & Ventilgruppen',
    kicker: 'Anschluss',
    text: 'Jedes Segel wird mit sauerstoffdiffusionsdichten Flexschläuchen angeschlossen. Ventilgruppen mit Stellantrieben machen das System bereit für die Gebäudeautomation.',
    points: [
      'Flexanschlüsse für jedes Segel',
      'Ventilgruppen mit motorischen Stellantrieben',
      'Dichtheitsprüfung und saubere Übergabe', // TODO: Umfang (Druckprobe/Spülen/Füllen) bestätigen
    ],
    image: 'feinverteilung-flexanschluss',
    alt: 'Pressfitting-T-Stücke mit Kugelhähnen und geflochtenen Flexschläuchen, die zu den Deckensegeln führen',
    tone: 'neutral',
  },
]

export type GalleryItem = {
  image: ImageName
  title: string
  caption: string
  span?: 'tall' | 'wide' | 'big'
}

export const gallery: GalleryItem[] = [
  {
    image: 'werkhalle-untersicht',
    title: 'Werkhalle',
    caption: 'Segel, Kabeltrassen, Lüftung und Licht greifen ineinander',
    span: 'tall',
  },
  {
    image: 'deckensegel-grau',
    title: 'Lamellensegel',
    caption: 'Graue Segel unter Holzwolle-Akustikplatten',
    span: 'wide',
  },
  {
    image: 'deckensegel-anschluss',
    title: 'Segelstoss',
    caption: 'Flexible Verbindung zwischen zwei Segeln',
    span: 'tall',
  },
  {
    image: 'werkhalle-deckensegel',
    title: 'Labor & Werkstatt',
    caption: 'Segelfelder zwischen durchgehenden Lichtbändern',
    span: 'wide',
  },
  {
    image: 'deckensegel-grau-geruest',
    title: 'Montage',
    caption: 'Segelmontage vom Gerüst aus',
    span: 'tall',
  },
  {
    image: 'feinverteilung-flexanschluss',
    title: 'Feinverteilung',
    caption: 'Pressfitting-T-Stücke, Kugelhähne, Flexschläuche',
    span: 'tall',
  },
  {
    image: 'buero-montage',
    title: 'Vor der Segelmontage',
    caption: 'Abhängungen und Leuchten sind gesetzt',
    span: 'tall',
  },
  {
    image: 'feinverteilung-steigzone',
    title: 'Steigzone',
    caption: 'Absperrungen und Regelventil mit Stellantrieb',
    span: 'tall',
  },
]

export const process = [
  {
    no: '01',
    title: 'Anfrage & Unterlagen',
    text: 'Sie senden uns Pläne, Ausschreibung oder Leistungsverzeichnis. Offene Punkte klären wir direkt mit Planung und Bauleitung.',
  },
  {
    no: '02',
    title: 'Offerte',
    text: 'Sie erhalten eine klare Offerte: Leistungsumfang, Material, Montage und Termine, ohne Überraschungen.',
  },
  {
    no: '03',
    title: 'Montage',
    text: 'Unser Team baut Feinverteilung und Segel termingerecht ein und stimmt sich laufend mit den anderen Gewerken ab.',
  },
  {
    no: '04',
    title: 'Prüfung & Übergabe',
    text: 'Dichtheitsprüfung, Kontrolle aller Anschlüsse und eine saubere Baustelle. Erst dann übergeben wir.',
  },
]

export const values = [
  { title: 'Präzision', text: 'Saubere Pressungen, gerade Leitungen, Segel in einer Flucht.' },
  { title: 'Termintreue', text: 'Wir planen mit dem Bauprogramm, nicht dagegen.' },
  { title: 'Alles aus einer Hand', text: 'Segel, Feinverteilung und Anschluss aus einem Team.' },
  { title: 'Saubere Baustelle', text: 'Wir hinterlassen den Arbeitsplatz so, wie wir ihn uns wünschen.' },
]
