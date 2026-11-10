// Generates responsive AVIF/WebP/JPEG variants + a manifest with blur placeholders.
// Usage: npm run images
import { readdir, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = path.resolve('assets-src/photos')
const OUT = path.resolve('public/images')
const MANIFEST = path.resolve('src/data/images.json')
const WIDTHS = [480, 800, 1200, 1800]
const SKIP = new Set(['logo-original.jpg', 'logo-neon.jpg', 'logo-rohre.jpg'])

await mkdir(OUT, { recursive: true })
await mkdir(path.dirname(MANIFEST), { recursive: true })

const manifest = {}
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f) && !SKIP.has(f))

for (const file of files) {
  const name = file.replace(/\.[^.]+$/, '')
  const input = sharp(path.join(SRC, file)).rotate()
  const { width, height } = await input.metadata()
  const widths = WIDTHS.filter((w) => w < width).concat(width > 1800 ? [] : [width])
  const uniq = [...new Set(widths)].sort((a, b) => a - b)

  for (const w of uniq) {
    const base = input.clone().resize({ width: w, withoutEnlargement: true })
    await base.clone().avif({ quality: 52, effort: 6 }).toFile(path.join(OUT, `${name}-${w}.avif`))
    await base.clone().webp({ quality: 74 }).toFile(path.join(OUT, `${name}-${w}.webp`))
    await base.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(OUT, `${name}-${w}.jpg`))
  }

  const blur = await input.clone().resize({ width: 20 }).webp({ quality: 40 }).toBuffer()
  manifest[name] = {
    width,
    height,
    widths: uniq,
    blur: `data:image/webp;base64,${blur.toString('base64')}`,
  }
  console.log(`✓ ${name} (${width}×${height}) → ${uniq.join(', ')}`)
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`Manifest: ${path.relative(process.cwd(), MANIFEST)}`)
