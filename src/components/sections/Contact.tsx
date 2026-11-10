import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, FileUp, Loader2, Mail, MapPin, Phone } from 'lucide-react'
import Reveal from '../Reveal'
import { company, phoneHref } from '../../data/site'

const projectTypes = ['Deckensegel', 'Feinverteilung', 'Komplettpaket', 'Anderes']
const MAX_FILE_MB = 7 // Netlify Forms: max. 8 MB pro Anfrage inkl. aller Felder

type Status = 'idle' | 'sending' | 'success' | 'error'

const field =
  'w-full rounded-2xl border border-white/10 bg-ink-950/60 px-4 py-3.5 text-white placeholder:text-steel-400 transition-colors focus:border-ice-300 focus:bg-ink-950 focus:outline-none'
const label = 'mb-2 block text-sm font-medium text-steel-200'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const fileRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (fileError) {
      fileRef.current?.focus()
      return
    }
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      if (import.meta.env.DEV) {
        await new Promise((r) => setTimeout(r, 900))
      } else {
        const res = await fetch('/', { method: 'POST', body: data })
        if (!res.ok) throw new Error(String(res.status))
      }
      setStatus('success')
      form.reset()
      setFileName(null)
    } catch {
      setStatus('error')
    }
  }

  const onFile = (file: File | undefined) => {
    setFileName(file?.name ?? null)
    setFileError(file && file.size > MAX_FILE_MB * 1024 * 1024 ? `Die Datei ist grösser als ${MAX_FILE_MB} MB.` : null)
  }

  return (
    <section id="kontakt" className="relative isolate overflow-hidden bg-ink-900 py-24 text-white sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
        <div className="absolute -top-48 -left-40 size-[40rem] rounded-full bg-ice-500/15 blur-[140px]" />
        <div className="absolute -right-40 -bottom-48 size-[40rem] rounded-full bg-heat-500/15 blur-[140px]" />
      </div>

      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-5">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-steel-300">
              <span aria-hidden className="bg-thermal inline-block h-px w-8" />
              Kontakt
            </p>
            <h2 className="font-display mt-5 text-[2.3rem] leading-[1.02] font-bold text-balance sm:text-5xl lg:text-[3.8rem]">
              Ihr nächstes Projekt? <span className="text-thermal">Reden wir darüber.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-steel-300 text-pretty">
              Senden Sie uns Pläne, Ausschreibung oder einfach eine kurze Beschreibung. Wir melden uns mit einer ersten
              Einschätzung und einer Offerte.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-12 space-y-3">
            {company.email && (
              <a
                href={`mailto:${company.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.07]"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-ice-200 text-ink-950">
                  <Mail className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="eyebrow block text-steel-400">E-Mail</span>
                  <span className="mt-0.5 block font-semibold">{company.email}</span>
                </span>
              </a>
            )}
            {phoneHref && (
              <a
                href={phoneHref}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.07]"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-heat-200 text-ink-950">
                  <Phone className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="eyebrow block text-steel-400">Telefon</span>
                  <span className="mt-0.5 block font-semibold">{company.phone}</span>
                </span>
              </a>
            )}
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-white">
                <MapPin className="size-5" aria-hidden />
              </span>
              <span>
                <span className="eyebrow block text-steel-400">Firmensitz</span>
                <span className="mt-0.5 block font-semibold">
                  {company.street}, {company.zip} {company.city} {company.canton}
                </span>
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80} className="min-w-0 lg:col-span-7">
          <div className="rounded-[28px] border border-white/10 bg-ink-850/80 p-6 shadow-2xl backdrop-blur sm:p-10">
            {status === 'success' ? (
              <div className="flex min-h-[28rem] flex-col items-start justify-center" role="status">
                <span className="grid size-14 place-items-center rounded-full bg-ice-200 text-ink-950">
                  <Check className="size-6" aria-hidden />
                </span>
                <h3 className="font-display mt-8 text-3xl font-bold">Vielen Dank!</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-steel-300">
                  Ihre Anfrage ist bei uns eingegangen. Wir prüfen Ihre Angaben und melden uns so rasch wie möglich bei
                  Ihnen.
                </p>
                <button type="button" onClick={() => setStatus('idle')} className="btn btn-ghost mt-10">
                  Weitere Anfrage senden
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                name="kontakt"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                encType="multipart/form-data"
                onSubmit={onSubmit}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2"
              >
                <input type="hidden" name="form-name" value="kontakt" />
                <p hidden>
                  <label>
                    Nicht ausfüllen: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <fieldset className="sm:col-span-2">
                  <legend className={label}>Worum geht es?</legend>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((t, i) => (
                      <label key={t} className="cursor-pointer">
                        <input type="radio" name="projektart" value={t} defaultChecked={i === 2} className="peer sr-only" />
                        <span className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-steel-200 transition-colors peer-checked:border-white peer-checked:bg-white peer-checked:text-ink-950 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ice-400 hover:border-white/40">
                          {t}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="f-name" className={label}>
                    Name <span className="text-heat-300">*</span>
                  </label>
                  <input id="f-name" name="name" required autoComplete="name" className={field} placeholder="Vor- und Nachname" />
                </div>
                <div>
                  <label htmlFor="f-firma" className={label}>
                    Firma
                  </label>
                  <input id="f-firma" name="firma" autoComplete="organization" className={field} placeholder="Optional" />
                </div>
                <div>
                  <label htmlFor="f-email" className={label}>
                    E-Mail <span className="text-heat-300">*</span>
                  </label>
                  <input
                    id="f-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={field}
                    placeholder="name@firma.ch"
                  />
                </div>
                <div>
                  <label htmlFor="f-tel" className={label}>
                    Telefon
                  </label>
                  <input id="f-tel" name="telefon" type="tel" autoComplete="tel" className={field} placeholder="Optional" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="f-ort" className={label}>
                    Projektort & Zeitraum
                  </label>
                  <input id="f-ort" name="ort" className={field} placeholder="z. B. Luzern, Montage ab Frühling" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="f-msg" className={label}>
                    Nachricht <span className="text-heat-300">*</span>
                  </label>
                  <textarea
                    id="f-msg"
                    name="nachricht"
                    required
                    rows={5}
                    className={`${field} resize-y`}
                    placeholder="Was sollen wir montieren? Ungefähre Anzahl Segel oder Fläche, Gebäudetyp …"
                  />
                </div>

                <div className="min-w-0 sm:col-span-2">
                  <input
                    ref={fileRef}
                    id="f-file"
                    name="plaene"
                    type="file"
                    accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png,.zip"
                    aria-describedby="f-file-hint"
                    aria-invalid={fileError ? true : undefined}
                    className="peer sr-only"
                    onChange={(e) => onFile(e.target.files?.[0])}
                  />
                  <label
                    htmlFor="f-file"
                    className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-white/20 p-4 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ice-400 hover:border-white/40 hover:bg-white/[0.03]"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10">
                      <FileUp className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0 text-sm">
                      <span className="block truncate font-medium text-white">{fileName ?? 'Pläne oder Ausschreibung anhängen'}</span>
                      <span id="f-file-hint" aria-live="polite" className={`block ${fileError ? 'text-heat-300' : 'text-steel-400'}`}>
                        {fileError ?? `Optional · PDF, DWG, DXF, Bild oder ZIP · max. ${MAX_FILE_MB} MB`}
                      </span>
                    </span>
                  </label>
                </div>

                <label className="flex items-start gap-3 text-sm leading-relaxed text-steel-300 sm:col-span-2">
                  <input type="checkbox" name="datenschutz" required className="mt-1 size-4 shrink-0 accent-ice-300" />
                  <span>
                    Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden. Mehr dazu in der{' '}
                    <Link to="/datenschutz" className="text-white underline underline-offset-4 hover:text-ice-200">
                      Datenschutzerklärung
                    </Link>
                    .
                  </span>
                </label>

                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-steel-400">* Pflichtfelder</p>
                  <button type="submit" disabled={status === 'sending'} className="btn btn-primary disabled:opacity-70">
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden /> Wird gesendet …
                      </>
                    ) : (
                      <>
                        Anfrage senden <ArrowUpRight className="size-4" aria-hidden />
                      </>
                    )}
                  </button>
                </div>

                {status === 'error' && (
                  <p role="alert" className="rounded-2xl border border-heat-400/40 bg-heat-500/10 p-4 text-sm text-heat-100 sm:col-span-2">
                    Das hat leider nicht geklappt. Bitte versuchen Sie es erneut
                    {company.email ? (
                      <>
                        {' '}
                        oder schreiben Sie direkt an{' '}
                        <a href={`mailto:${company.email}`} className="font-semibold underline">
                          {company.email}
                        </a>
                      </>
                    ) : null}
                    .
                  </p>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
