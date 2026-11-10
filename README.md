# Leo's Haustechnik – Website

One-Pager für die **Leo's Haustechnik GmbH** (Buchrain LU): Heiz- und Kühldeckensegel, Feinverteilung Heizung & Kälte.

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS 4 · react-router · lucide-react
**Hosting:** Netlify (inkl. Netlify Forms für das Kontaktformular)

## Entwicklung

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Typecheck + Produktions-Build nach dist/
npm run preview
```

## Bilder & Video

- Originale liegen in `assets-src/photos/` bzw. `assets-src/video/`.
- `npm run images` erzeugt daraus AVIF/WebP/JPEG in mehreren Breiten nach `public/images/` und schreibt `src/data/images.json` (Masse + Blur-Platzhalter).
- Neues Foto: Datei in `assets-src/photos/` legen → `npm run images` → im Code per `<Picture name="dateiname" … />` verwenden.

## Inhalte

Alle Firmendaten, Leistungen, Galerie- und Ablauf-Texte stehen zentral in `src/data/site.ts`.
Telefon und E-Mail werden nur angezeigt, wenn sie dort gesetzt sind.

## Offene Punkte (vom Kunden bestätigen lassen)

- [ ] **Telefonnummer** (aktuell `null` → wird nirgends angezeigt)
- [ ] **E-Mail-Adresse** `info@leos-haustechnik.ch` existiert? (Domain hat Hostpoint-Mail, Adresse nicht verifiziert)
- [ ] **Partnerschaft Durrer Technik AG** darf auf der Website genannt werden?
- [ ] Leistungsumfang „Dichtheitsprüfung & Übergabe“ (Druckprobe, Spülen, Füllen?) korrekt?
- [ ] Argumente „effizient mit Wärmepumpe“ / „geringe Bauhöhe, auch Sanierung“ für ihre Projekte zutreffend?
- [ ] Einsatzgebiet (Zentralschweiz? Zürich? ganze Deutschschweiz?)
- [ ] Teamfotos von Leonard Andreic & Leonardo Mistrafovic (aktuell Initialen)
- [ ] Referenzprojekte mit Namen/Ort, sofern erlaubt
- [ ] Nutzungsrechte an den Baustellenfotos & dem Video
- [ ] Netlify: Formular-Benachrichtigung an die richtige E-Mail einrichten (Site settings → Forms → Notifications)
- [ ] Domain `leos-haustechnik.ch` (Hostpoint) auf Netlify zeigen lassen – MX-Records für Mail **nicht** verändern

## Deployment (Netlify)

`netlify.toml` ist vorkonfiguriert (Build, SPA-Redirect, Cache- & Security-Header).
Das Kontaktformular wird über das versteckte `<form name="kontakt">` in `index.html` von Netlify Forms erkannt.
