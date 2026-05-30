import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { verticals } from "@/lib/verticals";
import { FooterWordmark } from "./footer-wordmark";

/**
 * Multi-column site footer — Markets-of-Tomorrow inspired.
 * Brand column + Services + Verticals + Company + Social + bottom legal bar.
 */
export function Footer() {
  return (
    <footer className="bg-ink text-canvas px-6 lg:px-12 pt-20 lg:pt-24 pb-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2 max-w-sm">
            <Link href="/" className="caption tracking-[0.18em] font-medium">
              {site.wordmark}
            </Link>
            <p className="font-sans font-extrabold text-lg lg:text-xl text-canvas/80 mt-6 leading-snug text-balance">
              An award-winning creative agency for premium markets.
            </p>
            <address className="not-italic text-sm text-canvas/60 mt-6 leading-relaxed space-y-1">
              <p>{site.contact.city}</p>
              <p>
                <a
                  href={`tel:${site.contact.phone.replace(/-/g, "")}`}
                  className="hover:text-gold transition-colors"
                >
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="hover:text-gold transition-colors"
                >
                  {site.contact.email}
                </a>
              </p>
            </address>
          </div>

          {/* Services column */}
          <FooterColumn title="Services">
            {services.map((s) => (
              <FooterLink key={s.slug} href={s.href}>
                {s.name}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Verticals column */}
          <FooterColumn title="Industries">
            {verticals.map((v) => (
              <FooterLink key={v.slug} href={v.href}>
                {v.name}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Company column */}
          <FooterColumn title="Company">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/about/team">Team</FooterLink>
            <FooterLink href="/about/nautical-network">Nautical Network</FooterLink>
            <FooterLink href="/journal">Journal</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterColumn>
        </div>

        {/* Oversized animated wordmark */}
        <FooterWordmark />

        {/* Bottom legal bar */}
        <div className="border-t border-canvas/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="caption text-canvas/40">
            © {new Date().getFullYear()} Surroundings Group · Built in {site.contact.city}
          </p>
          <ul className="flex items-center gap-6 caption text-canvas/40">
            <li>
              <Link href="/privacy" className="hover:text-canvas transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-canvas transition-colors">
                Terms
              </Link>
            </li>
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-canvas transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.social.vimeo}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-canvas transition-colors"
              >
                Vimeo
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="caption text-gold mb-5">{title}</h3>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-canvas/70 hover:text-gold transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
