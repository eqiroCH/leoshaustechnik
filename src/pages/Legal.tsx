import type { ReactNode } from 'react'
import { company } from '../data/site'
import { useSeo } from '../seo'

function LegalLayout({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  useSeo(path)

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 pt-36 pb-16 text-white sm:pt-44 sm:pb-20">
        <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
        <div className="container-x relative">
          <p className="eyebrow flex items-center gap-3 text-steel-300">
            <span aria-hidden className="bg-thermal inline-block h-px w-8" />
            Rechtliches
          </p>
          <h1 className="font-display mt-5 text-4xl font-bold sm:text-6xl">{title}</h1>
        </div>
      </section>
      <section className="bg-concrete-50 py-16 sm:py-24">
        <div className="container-x">
          <div className="max-w-3xl space-y-10 text-[1.02rem] leading-relaxed text-ink-700 [&_a]:font-medium [&_a]:text-ink-950 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:font-display [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink-950 [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </section>
    </>
  )
}

const Address = () => (
  <p>
    {company.name}
    <br />
    {company.street}
    <br />
    {company.zip} {company.city} {company.canton}
    <br />
    Schweiz
    {company.email && (
      <>
        <br />
        E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a>
      </>
    )}
    {company.phone && (
      <>
        <br />
        Telefon: {company.phone}
      </>
    )}
  </p>
)

export function Impressum() {
  return (
    <LegalLayout title="Impressum" path="/impressum">
      <div>
        <h2>Kontaktadresse</h2>
        <Address />
      </div>
      <div>
        <h2>Vertretungsberechtigte Personen</h2>
        <p>
          {company.people.map((p) => (
            <span key={p.name} className="block">
              {p.name}, {p.role.replace(' · ', ', ')}
            </span>
          ))}
        </p>
      </div>
      <div>
        <h2>Handelsregistereintrag</h2>
        <p>
          Eingetragener Firmenname: {company.name}
          <br />
          Rechtsform: Gesellschaft mit beschränkter Haftung (GmbH)
          <br />
          Registerbehörde: {company.register}
          <br />
          Handelsregister-Nummer: CH-100.4.808.687-0
          <br />
          Unternehmens-Identifikationsnummer (UID): {company.uid}
        </p>
      </div>
      <div>
        <h2>Haftungsausschluss</h2>
        <p>
          Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
          Aktualität der Inhalte übernehmen wir jedoch keine Gewähr. Haftungsansprüche gegen {company.name} wegen
          Schäden materieller oder immaterieller Art, die aus dem Zugriff auf, der Nutzung oder Nichtnutzung der
          veröffentlichten Informationen entstanden sind, werden ausgeschlossen.
        </p>
      </div>
      <div>
        <h2>Haftung für Links</h2>
        <p>
          Verweise und Links auf Websites Dritter liegen ausserhalb unseres Verantwortungsbereichs. Der Zugriff und die
          Nutzung solcher Websites erfolgen auf eigene Gefahr.
        </p>
      </div>
      <div>
        <h2>Urheberrechte</h2>
        <p>
          Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Videos und Logos auf dieser Website gehören
          ausschliesslich {company.name} oder den speziell genannten Rechteinhabern. Für die Reproduktion jeglicher
          Elemente ist die schriftliche Zustimmung der Rechteinhaber im Voraus einzuholen.
        </p>
      </div>
      <div>
        <h2>Konzept, Design & Umsetzung</h2>
        <p>
          <a href="https://eqiro.ch" target="_blank" rel="noopener">
            Eqiro
          </a>
        </p>
      </div>
    </LegalLayout>
  )
}

export function Datenschutz() {
  return (
    <LegalLayout title="Datenschutz" path="/datenschutz">
      <div>
        <p>
          Mit dieser Datenschutzerklärung informieren wir darüber, welche Personendaten wir im Zusammenhang mit dieser
          Website bearbeiten. Massgebend ist das Schweizer Bundesgesetz über den Datenschutz (DSG).
        </p>
      </div>
      <div>
        <h2>1. Verantwortliche Stelle</h2>
        <Address />
      </div>
      <div>
        <h2>2. Hosting und Server-Logfiles</h2>
        <p>
          Diese Website wird bei Netlify, Inc. (San Francisco, USA) gehostet. Beim Aufruf der Website werden technisch
          notwendige Daten wie IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Referrer sowie Browser und
          Betriebssystem in Server-Logfiles erfasst. Diese Daten dienen ausschliesslich dem sicheren und stabilen Betrieb
          der Website und werden nicht mit anderen Daten zusammengeführt.
        </p>
        <p>
          Dabei können Daten in die USA übermittelt werden. Die Übermittlung erfolgt auf Grundlage geeigneter Garantien,
          insbesondere der Standardvertragsklauseln der Europäischen Kommission, die vom Eidgenössischen Datenschutz- und
          Öffentlichkeitsbeauftragten (EDÖB) anerkannt sind.
        </p>
      </div>
      <div>
        <h2>3. Kontaktformular und E-Mail</h2>
        <p>
          Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, bearbeiten wir die von Ihnen angegebenen
          Daten (z. B. Name, Firma, E-Mail-Adresse, Telefonnummer, Projektangaben und hochgeladene Dateien)
          ausschliesslich zur Bearbeitung Ihrer Anfrage und für allfällige Anschlussfragen. Formulareingaben werden über
          den Dienst Netlify Forms übermittelt und gespeichert und uns zusätzlich per E-Mail zugestellt. Unsere
          E-Mail-Postfächer werden von der Hostpoint AG (Rapperswil-Jona, Schweiz) betrieben.
        </p>
        <p>
          Anfragen im Formular-Dashboard löschen wir, sobald sie erledigt sind. Korrespondenz, die zu einem Auftrag
          führt, bewahren wir im Rahmen der gesetzlichen Aufbewahrungspflichten auf.
        </p>
        <p>
          Wir geben diese Daten nicht ohne Ihre Einwilligung an Dritte weiter und löschen sie, sobald sie für den Zweck
          nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
      </div>
      <div>
        <h2>4. Cookies, Tracking und Drittinhalte</h2>
        <p>
          Diese Website verwendet keine Cookies zu Analyse- oder Werbezwecken und setzt keine Tracking-Tools ein.
          Schriften, Bilder und Videos werden über unseren Hosting-Anbieter Netlify ausgeliefert. Es werden keine Inhalte von
          Drittanbietern wie Google Fonts, YouTube oder Google Maps eingebunden.
        </p>
      </div>
      <div>
        <h2>5. Datensicherheit</h2>
        <p>
          Wir treffen angemessene technische und organisatorische Massnahmen, um Ihre Daten zu schützen. Die
          Übertragung zwischen Ihrem Browser und unserem Server erfolgt verschlüsselt (TLS/HTTPS).
        </p>
      </div>
      <div>
        <h2>6. Ihre Rechte</h2>
        <p>Im Rahmen des anwendbaren Datenschutzrechts haben Sie insbesondere folgende Rechte:</p>
        <ul>
          <li>Auskunft über die zu Ihrer Person bearbeiteten Daten</li>
          <li>Berichtigung unrichtiger Daten</li>
          <li>Löschung oder Einschränkung der Bearbeitung</li>
          <li>Widerspruch gegen die Bearbeitung und Widerruf einer Einwilligung</li>
          <li>Herausgabe bzw. Übertragung Ihrer Daten</li>
        </ul>
        <p>
          Wenden Sie sich dazu an die oben genannte Adresse. Zudem haben Sie das Recht, sich beim Eidgenössischen
          Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) zu beschweren.
        </p>
      </div>
      <div>
        <h2>7. Änderungen</h2>
        <p>
          Wir können diese Datenschutzerklärung jederzeit anpassen. Es gilt die jeweils aktuelle, auf dieser Website
          publizierte Fassung.
        </p>
        <p className="text-sm text-steel-500">Stand: November 2026</p>
      </div>
    </LegalLayout>
  )
}
