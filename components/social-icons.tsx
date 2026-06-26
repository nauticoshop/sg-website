import { site } from "@/lib/site";

/**
 * Footer social icon row — premium monoline glyphs at 18px.
 *
 * Six platforms wired through site.social. Each link opens in a new
 * tab, gets a proper aria-label for screen readers, and inherits
 * color from the parent so the footer's hover treatment carries
 * through. Strokes are 1.5px for an editorial / Hermès-grade
 * weight rather than the heavier filled-glyph look most icon packs
 * ship with.
 */
export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-5 ${className}`}>
      <SocialLink href={site.social.instagram} label="Instagram">
        <InstagramIcon />
      </SocialLink>
      <SocialLink href={site.social.linkedin} label="LinkedIn">
        <LinkedInIcon />
      </SocialLink>
      <SocialLink href={site.social.facebook} label="Facebook">
        <FacebookIcon />
      </SocialLink>
      <SocialLink href={site.social.youtube} label="YouTube">
        <YouTubeIcon />
      </SocialLink>
      <SocialLink href={site.social.tiktok} label="TikTok">
        <TikTokIcon />
      </SocialLink>
      <SocialLink href={site.social.vimeo} label="Vimeo">
        <VimeoIcon />
      </SocialLink>
    </ul>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="block text-canvas/50 hover:text-gold transition-colors duration-300"
      >
        {children}
      </a>
    </li>
  );
}

/* ----------------------------- Icons ----------------------------- */

const ICON_PROPS = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function InstagramIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function VimeoIcon() {
  // No universal monoline glyph for Vimeo — using a stylized "V"
  // monogram that matches the editorial weight of the other icons
  // and clearly reads as Vimeo's wordmark identity.
  return (
    <svg {...ICON_PROPS}>
      <path d="M4 6l8 13 8-13" />
    </svg>
  );
}
