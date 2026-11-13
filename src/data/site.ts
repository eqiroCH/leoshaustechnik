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
  register: 'Handelsregisteramt des Kantons Luzern',
  founded: 2019,
  people: [
    { name: 'Leonard Andreic', role: 'Gesellschafter · Vorsitzender der Geschäftsführung' },
    { name: 'Leonardo Mistrafovic', role: 'Gesellschafter · Geschäftsführer' },
  ],
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
  { id: 'referenzen', label: 'Referenzen' },
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
  /** Kleines eingeblendetes Zweitbild, z. B. der fertige Zustand */
  inset?: { image: ImageName; alt: string; label: string }
  tone: 'cold' | 'warm' | 'neutral'
}

export const services: Service[] = [
  {
    id: 'deckensegel',
    no: '01',
    title: 'Heiz- & Kühl\u00addecken\u00adsegel',
    kicker: 'Montage',
    text: 'Wir hängen Deckensegel präzise ab: in Büros, Spitälern, Hochschulen und Werkhallen. Ein Segel heizt im Winter und kühlt im Sommer, ohne Luftzug und ohne Lärm.',
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
    id: 'gipskuehldecken',
    no: '02',
    title: 'Gips\u00adkühl\u00addecken',
    kicker: 'Unsichtbar',
    text: 'Die Technik verschwindet in der Decke: Kühl- und Heizregister liegen über einer geschlossenen Gipsdecke. Das ergibt ein angenehmes Raumklima mit ruhigem, fugenlosem Deckenbild, im Büro ebenso wie in der exklusiven Eigentumswohnung.',
    points: [
      'Montage der Kühl- und Heizregister',
      'Anschluss an die Feinverteilung',
      'Abstimmung mit dem Trockenbau', // TODO: Leistungsumfang bei Gipskühldecken vom Kunden bestätigen
    ],
    image: 'gipskuehldecke-montage',
    alt: 'Gipskühldecke in Montage: Kühlregister und Steinwolle zwischen den Metallprofilen, darunter ein Raum mit drei Fenstern',
    inset: {
      image: 'gipskuehldecke-fertig',
      alt: 'Derselbe Raum fertig: geschlossene, weisse Gipsdecke mit Lichtbändern',
      label: 'Fertig',
    },
    tone: 'cold',
  },
  {
    id: 'feinverteilung',
    no: '03',
    title: 'Feinverteilung Heizung & Kälte',
    kicker: 'Leitungsbau',
    text: 'Von der Zentrale bis zum letzten Deckenelement: Wir bauen das Leitungsnetz, das Wärme und Kälte genau dorthin bringt, wo sie gebraucht werden. Fachgerecht verpresst, sauber geführt.',
    points: [
      'Verteil- und Anschlussleitungen in Pressfitting-Technik',
      'Anschluss jedes Segels über Flexschläuche', // TODO: Schlauchtyp (z. B. sauerstoffdiffusionsdicht) bestätigen
      'Ventilgruppen mit Stellantrieben, bereit für die Gebäudeautomation',
      'Dichtheitsprüfung und Übergabe', // TODO: Umfang (Druckprobe/Spülen/Füllen) bestätigen
    ],
    image: 'feinverteilung-flexanschluss',
    alt: 'Pressfitting-T-Stücke mit Kugelhähnen und geflochtenen Flexschläuchen, die zu den Deckensegeln führen',
    tone: 'warm',
  },
]

/** Weitere Leistungen (kompakte Karten unter den Hauptleistungen) */
export const moreServices = [
  {
    id: 'bodenheizung',
    title: 'Bodenheizung',
    text: 'Verlegung von Bodenheizungen, sauber und sorgfältig.',
    icon: 'serpentine' as const,
  },
  {
    id: 'heizung-kaelte',
    title: 'Heizung & Kälte',
    text: 'Ausführung und Service, vom Einfamilienhaus bis zur Industrie.',
    icon: 'thermo' as const,
  },
]

/** Kennzahlen (Angaben des Kunden) */
export const stats = [
  { value: '15+', label: 'Jahre Erfahrung in der HLK-Branche' },
  { value: '10+', label: 'Jahre spezialisiert auf Kühldecken' },
  { value: '30+', label: 'Referenzprojekte' },
]

/** Referenzen (Auswahl, Angaben des Kunden) */
export const references = [
  { name: 'Polizei- und Justizzentrum', place: 'Zürich' },
  { name: 'ETH Octavo', place: 'Zürich' },
  { name: 'Kantonsspital St. Gallen', place: 'St. Gallen' },
  { name: 'Pilatus, Neubau Schwarzhorn', place: 'Nidwalden' },
  { name: 'HSG', place: 'St. Gallen' },
  { name: 'Bucherer', place: 'Luzern' },
  { name: 'The Circle', place: 'Zürich Flughafen' },
  { name: 'Helvetia Tower', place: 'Pratteln' },
  { name: 'Ernst & Young, Baloise Park', place: 'Basel' },
  { name: 'Läderach Schoggierlebnis', place: 'Glarus' },
  { name: 'Berufsfachschule', place: 'Winterthur' },
  { name: 'Floating Garden', place: 'Zug' },
]

export type GalleryCategory = 'segel' | 'gips' | 'leitung'

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: 'segel', label: 'Deckensegel' },
  { id: 'gips', label: 'Gipskühldecken' },
  { id: 'leitung', label: 'Feinverteilung' },
]

export type GalleryItem = {
  /** Bild bzw. Vorschaubild (bei Videos) */
  image: ImageName
  title: string
  caption: string
  category: GalleryCategory
  video?: { src: string; duration: string }
}

// Reihenfolge = Reihenfolge in «Alle» (die ersten 12 sind sofort sichtbar)
export const gallery: GalleryItem[] = [
  { image: 'werkhalle-deckensegel', title: 'Labor & Werkstatt', caption: 'Segelfelder zwischen durchgehenden Lichtbändern', category: 'segel' },
  { image: 'gipskuehldecke-geruest', title: 'Registermontage', caption: 'Anschluss der Kühlregister vom Gerüst aus', category: 'gips' },
  { image: 'feinverteilung-flexanschluss', title: 'Feinverteilung', caption: 'Pressfitting-T-Stücke, Kugelhähne, Flexschläuche', category: 'leitung' },
  { image: 'gipskuehldecke-grossraum', title: 'Grossraum', caption: 'Akustik-Gipskühldecke, fertig montiert', category: 'gips' },
  { image: 'werkhalle-untersicht', title: 'Werkhalle', caption: 'Segel, Kabeltrassen, Lüftung und Licht greifen ineinander', category: 'segel' },
  {
    image: 'video-gips-rundgang',
    title: 'Rundgang Gipskühldecke',
    caption: 'Von den Registerpaketen bis zur fertigen Unterkonstruktion',
    category: 'gips',
    video: { src: '/media/gips-rundgang.mp4', duration: '2:22' },
  },
  { image: 'gipskuehldecke-register', title: 'Vor dem Schliessen', caption: 'Kühlregister und Steinwolle zwischen den Profilen', category: 'gips' },
  { image: 'deckensegel-grau', title: 'Lamellensegel', caption: 'Graue Segel unter Holzwolle-Akustikplatten', category: 'segel' },
  { image: 'gips-akustikplatten', title: 'Schliessen', caption: 'Akustik-Gipsplatten werden über den Registern montiert', category: 'gips' },
  { image: 'feinverteilung-steigzone', title: 'Steigzone', caption: 'Absperrungen und Regelventil mit Stellantrieb', category: 'leitung' },
  { image: 'gipskuehldecke-fertig-2', title: 'Geschlossen', caption: 'Fertige Gipskühldecke mit Lichtbändern', category: 'gips' },
  { image: 'buero-segel-parkett', title: 'Büro', caption: 'Lamellensegel über dem fertigen Parkett', category: 'segel' },
  // ab hier hinter «Alle anzeigen»
  {
    image: 'video-holzbau',
    title: 'Rundgang Holzbau',
    caption: 'Feinverteilung im Holz-Hybridbau, von der Steigzone bis an die Decke',
    category: 'leitung',
    video: { src: '/media/rundgang-holzbau.mp4', duration: '0:19' },
  },
  { image: 'kuehldecke-bleche-2', title: 'Kühldecke im Ausbau', caption: 'Grossflächige Deckenfelder vor dem Verkleiden', category: 'gips' },
  { image: 'deckensegel-anschluss', title: 'Segelstoss', caption: 'Flexible Verbindung zwischen zwei Segeln', category: 'segel' },
  { image: 'gips-register-6', title: 'Registerfelder', caption: 'Symmetrisch verlegte Register bis zur Fassade', category: 'gips' },
  {
    image: 'video-gips-register',
    title: 'Register im Überblick',
    caption: 'Kameraschwenk über die montierten Kühlregister',
    category: 'gips',
    video: { src: '/media/gips-register.mp4', duration: '0:29' },
  },
  { image: 'deckensegel-grau-geruest', title: 'Montage', caption: 'Segelmontage vom Gerüst aus', category: 'segel' },
  { image: 'gips-montage-2', title: 'Anschliessen', caption: 'Monteur beim Anschliessen der Register', category: 'gips' },
  { image: 'kuehldecke-bleche-1', title: 'Wärmeleitflächen', caption: 'Metallflächen zwischen den Tragprofilen', category: 'gips' },
  { image: 'buero-montage', title: 'Vor der Segelmontage', caption: 'Abhängungen und Leuchten sind gesetzt', category: 'segel' },
  { image: 'gips-grossraum-montage', title: 'Grossraum in Montage', caption: 'Register über die ganze Raumlänge', category: 'gips' },
  { image: 'buero-deckensegel', title: 'Grossraumbüro', caption: 'Reihen weisser Heiz- und Kühldeckensegel', category: 'segel' },
  { image: 'gips-register-2', title: 'Registerreihen', caption: 'Registerfelder Richtung Fensterfront', category: 'gips' },
  { image: 'kuehldecke-bleche-3', title: 'Deckenfelder', caption: 'Metallflächen kurz vor dem Schliessen', category: 'gips' },
  { image: 'gips-register-3', title: 'Anschlussleitungen', caption: 'Zuleitungen zu den einzelnen Registern', category: 'gips' },
  { image: 'gipskuehldecke-montage', title: 'Offen', caption: 'Register und Unterkonstruktion vor dem Verkleiden', category: 'gips' },
  { image: 'gipskuehldecke-fertig', title: 'Fertig', caption: 'Derselbe Raum mit geschlossener Gipsdecke', category: 'gips' },
  { image: 'gips-register-4', title: 'Registerfelder', caption: 'Register zwischen Profilen und Dämmung', category: 'gips' },
  { image: 'kuehldecke-bleche-4', title: 'Kühldecke im Ausbau', caption: 'Deckenfelder mit offenen Anschlussbereichen', category: 'gips' },
  { image: 'gips-register-5', title: 'Unterkonstruktion', caption: 'Register in der Metallunterkonstruktion', category: 'gips' },
  { image: 'gips-raum-plan', title: 'Nach Verlegeplan', caption: 'Montage nach Plan, Raum für Raum', category: 'gips' },
  { image: 'gips-register-7', title: 'Vorbereitete Anschlüsse', caption: 'Register mit Anschlussschläuchen', category: 'gips' },
  { image: 'kuehldecke-bleche-5', title: 'Randabschluss', caption: 'Kühldecke am Übergang zur Wand', category: 'gips' },
  { image: 'gips-register-8', title: 'Registerfelder', caption: 'Felder zwischen den Tragprofilen', category: 'gips' },
  { image: 'gips-grossraum-2', title: 'Grossraum', caption: 'Register über die ganze Länge des Raums', category: 'gips' },
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
    text: 'Dichtheitsprüfung, Kontrolle aller Anschlüsse und eine aufgeräumte Baustelle. Erst dann übergeben wir.',
  },
]

export const values = [
  { title: 'Direkte Ansprechpartner', text: 'Sie sprechen mit den Inhabern, vom Start bis zur Abnahme.' },
  { title: 'Termintreu', text: 'Wir planen mit dem Bauprogramm, nicht dagegen.' },
  { title: 'Sauber', text: 'Fachgerecht verpresst, sauber geführt, aufgeräumte Baustelle.' },
  { title: 'Lösungsorientiert', text: 'Wenn es auf der Baustelle eng wird, finden wir einen Weg.' },
]
