# Leo's Haustechnik – Website

One-Pager für die **Leo's Haustechnik GmbH** (Buchrain LU): Heiz- und Kühldeckensegel, Feinverteilung Heizung & Kälte.

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS 4 · react-router · lucide-react
**Hosting:** Netlify (inkl. Netlify Forms für das Kontaktformular)

## Entwicklung

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Typecheck + Build + Prerendering von /, /impressum, /datenschutz nach dist/
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
- [x] E-Mail-Adresse `info@leos-haustechnik.ch` (steht in der Kunden-Vorlage)
- [ ] **Partnerschaft Durrer Technik AG** darf auf der Website genannt werden?
- [ ] Leistungsumfang „Dichtheitsprüfung & Übergabe“ (Druckprobe, Spülen, Füllen?) korrekt?
- [ ] Schlauchtyp beim Segelanschluss (z. B. sauerstoffdiffusionsdicht) – dann im Text ergänzen
- [ ] Argumente „effizient mit Wärmepumpe“ / „geringe Bauhöhe, auch Sanierung“ für ihre Projekte zutreffend?
- [x] Einsatzgebiet: ganze Deutschschweiz (laut Kunden-Vorlage)
- [ ] Gründungsjahr: Handelsregister sagt 2019, Kunden-Vorlage „seit 2020 selbstständig“ – Website zeigt 2019
- [ ] Foto einer Gipskühldecke (aktuell Illustration) und Leistungsumfang dort bestätigen
- [ ] Referenzen: Freigabe zur Namensnennung (PJZ, ETH Octavo, KSSG, HSG, The Circle …)
- [ ] Teamfotos von Leonard Andreic & Leonardo Mistrafovic (aktuell Initialen)
- [ ] Nutzungsrechte an den Baustellenfotos & dem Video
- [ ] Netlify: Formular-Benachrichtigung an die richtige E-Mail einrichten (Site settings → Forms → Notifications)
- [ ] Domain `leos-haustechnik.ch` (Hostpoint) auf Netlify zeigen lassen – MX-Records für Mail **nicht** verändern

## Deployment (Netlify)

`netlify.toml` ist vorkonfiguriert (Build, Node 22, Cache- & Security-Header).
Die drei Seiten werden beim Build vorgerendert (`src/entry-server.tsx` + `scripts/prerender.mjs`) und im Browser hydratisiert;
unbekannte URLs liefern `dist/404.html` mit Status 404 und `noindex`.
Das Kontaktformular wird über das versteckte `<form name="kontakt">` in `index.html` von Netlify Forms erkannt.
