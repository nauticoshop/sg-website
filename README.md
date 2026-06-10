# Surroundings Group — surroundingsgroup.com

Marketing site for Surroundings Group, the creative partner behind the
world's premium brands. Next.js 16 (App Router) + React 19 +
Tailwind CSS v4, deployed on Vercel.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build — must pass before pushing
npm run lint
```

Pushing to `main` auto-deploys to production via Vercel.

## Adding content (portfolio, case studies, team, careers…)

**Read [CONTENT-GUIDE.md](./CONTENT-GUIDE.md)** — step-by-step recipes
for every content type, written for non-developers too.

## Architecture in one minute

- **`lib/`** — all content as typed data files (single sources of
  truth): `site.ts` (nav/contact/hero video), `services.ts`,
  `verticals.ts`, `work.ts` (portfolio), `featured-work.ts` (journal),
  `team.ts`, `locations.ts` (map), `clients.ts`, `testimonials.ts`
- **`app/`** — routes; dynamic pages (`services/[slug]`,
  `verticals/[slug]`, `work/[slug]`, `journal/[slug]`) render from the
  `lib/` data and are statically generated at build time
- **`components/`** — presentational components matching the site's
  editorial design system (ink/canvas/gold palette, DM Sans + Castoro)
- **`public/images/`** — web-optimized assets only (`work/` portfolio,
  `team/`, `verticals/`, `brand/`)

Old WordPress URLs are 301-redirected in `next.config.ts`.

## Environment variables (Vercel)

| Var | Purpose |
|---|---|
| `RESEND_API_KEY` | Contact form email delivery |
| `CONTACT_TO_EMAIL` | Where form submissions go |
| `CONTACT_FROM_EMAIL` | Sender address (Resend-verified domain) |

The site runs without them locally; only the contact form needs them.

## Analytics

Google Tag Manager (`GTM-5S62THWD`) is installed in `app/layout.tsx`
via `@next/third-parties`. Configure tags/triggers in the GTM dashboard.
