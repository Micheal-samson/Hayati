/**
 * Generate a transparent background cutout of Elizabeth for the hero layer.
 *
 * 1. @imgly/background-removal-node segments the person out of the mirror selfie
 * 2. sharp trims transparent edges, resizes to hero resolution, encodes webp + png
 *
 * Run: node scripts/make-cutout.mjs
 */
import { removeBackground } from '@imgly/background-removal-node'
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const SRC = 'public/elizabeth-source.jpg'
const OUT_DIR = 'public'

await mkdir(OUT_DIR, { recursive: true })

console.log('[cutout] loading', SRC)
const raw = await removeBackground(SRC, {
  debug: false,
  output: { format: 'image/png' },
})

console.log('[cutout] segmentation done, processing with sharp…')

// removeBackground resolves to a Blob in Node — convert to a Buffer for sharp
const blobBuffer = Buffer.from(await raw.arrayBuffer())

// Trim to the person's bounding box with a little breathing room, then resize
// to hero height (~2x display size on retina) and emit webp + png variants.
const base = sharp(blobBuffer)
  .trim({ threshold: 12 })
  .resize({ height: 1600, fit: 'inside', withoutEnlargement: false })

const png = await base.clone().png({ compressionLevel: 9 }).toFile(`${OUT_DIR}/elizabeth-cutout.png`)
const webp = await base.clone().webp({ quality: 90, alphaQuality: 95 }).toFile(`${OUT_DIR}/elizabeth-cutout.webp`)

console.log(`[cutout] png  ${png.width}x${png.height}  ${(png.size / 1024).toFixed(0)} KB`)
console.log(`[cutout] webp ${webp.width}x${webp.height}  ${(webp.size / 1024).toFixed(0)} KB`)
console.log('[cutout] done → public/elizabeth-cutout.{png,webp}')
