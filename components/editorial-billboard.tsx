import Image from "next/image";

/**
 * Full-bleed cinematic image strip — used as a visual breath between
 * sections (typically Hero → AboutSummary).
 *
 * Edge-to-edge, no max-width container. Ultra-wide aspect ratio (21:7
 * on desktop) reads as "magazine spread" rather than "another hero" —
 * deliberately different rhythm from the Hero video.
 *
 * Props:
 *   image     — /public path to the photo (recommended 2400×800 WebP)
 *   imageAlt  — accessibility text
 *   eyebrow   — small gold caption bottom-left (e.g., "STUDIO WORK")
 *   caption   — optional 1-line statement bottom-right
 *
 * If no `image` is passed, a dark placeholder renders so the layout is
 * preserved while the asset is being prepped.
 */

interface EditorialBillboardProps {
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  caption?: string;
}

export function EditorialBillboard({
  image,
  imageAlt,
  eyebrow = "STUDIO WORK",
  caption,
}: EditorialBillboardProps) {
  return (
    <section className="relative w-full bg-ink overflow-hidden">
      <div className="relative aspect-[16/9] md:aspect-[21/8] lg:aspect-[21/7]">
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? eyebrow}
            fill
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <span className="caption text-canvas/25 text-center">
              SIGNATURE IMAGE — DROP A PHOTO AT
              <br />
              /public/images/editorial/signature.webp
            </span>
          </div>
        )}

        {/* Bottom gradient for caption legibility */}
        {(eyebrow || caption) && (
          <div
            className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent pointer-events-none"
            aria-hidden
          />
        )}

        {/* Caption overlay */}
        {(eyebrow || caption) && (
          <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 py-6 lg:py-8 text-canvas">
            <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-6">
              <p className="caption text-gold">{eyebrow}</p>
              {caption && (
                <p className="text-sm lg:text-base text-canvas/85 leading-snug max-w-md sm:text-right">
                  {caption}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Subtle gold corner accent */}
        <div
          className="absolute top-0 left-0 w-24 h-px bg-gold/60"
          aria-hidden
        />
      </div>
    </section>
  );
}
