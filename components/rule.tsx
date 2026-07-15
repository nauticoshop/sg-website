/**
 * Short accent rule under section headlines — the single recurring
 * accent device used sitewide to mark a section start. Pass the color
 * (bg-gold-deep on light, bg-gold on ink, bg-ink on gold) and any
 * spacing/alignment (mt-6, mx-auto) via className.
 */
export function Rule({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`block w-14 h-[3px] ${className}`} />;
}
