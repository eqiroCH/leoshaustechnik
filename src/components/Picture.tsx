import manifest from '../data/images.json'

export type ImageName = keyof typeof manifest

type Props = {
  name: ImageName
  alt: string
  sizes?: string
  className?: string
  imgClassName?: string
  priority?: boolean
  blur?: boolean
  style?: React.CSSProperties
}

const srcSet = (name: string, widths: number[], ext: string) =>
  widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(', ')

export default function Picture({
  name,
  alt,
  sizes = '100vw',
  className,
  imgClassName,
  priority = false,
  blur = true,
  style,
}: Props) {
  const meta = manifest[name]
  const widths = meta.widths
  const fallback = `/images/${name}-${widths[Math.min(1, widths.length - 1)]}.jpg`

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet(name, widths, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(name, widths, 'webp')} sizes={sizes} />
      <img
        src={fallback}
        srcSet={srcSet(name, widths, 'jpg')}
        sizes={sizes}
        alt={alt}
        width={meta.width}
        height={meta.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClassName}
        style={
          blur
            ? {
                backgroundImage: `url(${meta.blur})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                ...style,
              }
            : style
        }
      />
    </picture>
  )
}
