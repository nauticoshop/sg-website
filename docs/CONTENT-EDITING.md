# Content Editing Brief — Surroundings Group website

This document is for a junior dev or content editor who needs to update
copy, add journal entries, swap images, or make other day-to-day content
changes on the site **without needing to touch any layout or React code.**

If you're comfortable editing a TypeScript object, you can do all of this.
Most updates are 1-2 line edits to a single file.

---

## 0. Setup (5 minutes, one time)

You have two ways to edit:

### Option A — GitHub web UI (easiest, no install)
Edit files directly at https://github.com/Nauticoshop/sg-website. Click any
file → pencil icon → make changes → "Commit changes" → done. Vercel auto-deploys.

### Option B — Local with VS Code
```bash
git clone https://github.com/Nauticoshop/sg-website.git
cd sg-website
npm install
npm run dev      # local preview at http://localhost:3000
```
Edit files, run `git add . && git commit -m "..." && git push`. Vercel auto-deploys.

**Both options auto-deploy** when you push to the `main` branch. Within ~60
seconds your change is live at surroundingsgroup.com.

---

## 1. Where everything lives

The site has two kinds of files:

- **Data files** (`lib/*.ts`) — Where 95% of content edits happen. These
  are plain objects describing services, verticals, journal entries,
  team members, etc.
- **Component files** (`components/*.tsx`, `app/*.tsx`) — The layout/design
  code. **Don't touch these unless you know React.**

### Most-edited data files

| File | Controls |
|---|---|
| `lib/site.ts` | Phone, email, address, social links, brand tagline, nav menu |
| `lib/services.ts` | All 6 services (Studio, Social, Digital, Growth, Experiences, Intelligence) |
| `lib/verticals.ts` | All 8 industry verticals (Marine, Real Estate, etc.) |
| `lib/featured-work.ts` | Journal entries (case studies, BTS, client updates, studio news) |
| `lib/testimonials.ts` | Outcome cards on the homepage |
| `lib/team.ts` | Team page bios |
| `lib/clients.ts` | Client logos |

If you don't see what you need above, search the codebase for a snippet of
the live copy. The file that contains it is the one to edit.

---

## 2. Common tasks (step by step)

### A — Update phone, email, or address site-wide
File: `lib/site.ts`

```ts
contact: {
  email: "interested@surroundingsgroup.com",   // ← change here
  phone: "813-869-0162",                       // ← or here
  address: "4600 W Cypress St. Suite 500",
  city: "Tampa, FL 33607",
},
```

These are referenced everywhere on the site, so editing once updates the
footer, contact page, discovery-call sidebar, all `tel:` and `mailto:` links,
and SEO metadata.

### B — Update copy on a vertical's detail page (e.g. Marine)
File: `lib/verticals.ts`

Find the object with `slug: "marine"`. The fields you can safely edit:

- `tagline` — short positioning shown on the homepage card
- `description` — slightly longer description
- `intro` — full positioning paragraph at the top of the detail page
- `audienceSegments[]` — the "Who we serve" grid
- `signaturePlays[]` — the "Signature work" rows
- `relatedServiceSlugs[]` — which services show in the capability strip

**Do not change**: `slug`, `href`, or `tier`. Those affect the URL structure
and homepage layout.

### C — Update copy on a service detail page
File: `lib/services.ts`

Find the service by `slug`. Editable fields:

- `tagline`, `description`, `intro`
- `capabilities[]` — what's-included list
- `sampleDeliverables[]` — concrete examples
- `bestForCopy` — the gold callout band on the detail page
- `processSteps[]` — the 4-step process specific to that service

### D — Add a new Journal entry (case study, BTS, client win, etc.)
File: `lib/featured-work.ts`

Add a new object to the `featuredProjects` array:

```ts
{
  slug: "your-entry-slug",          // URL-safe, kebab-case
  type: "case-study",               // case-study | bts | client-update | studio-news
  client: "Client Name",
  vertical: "Marine",               // must match a real vertical name
  headline: "One-line description of the entry.",
  tag: "Studio + Social",           // optional, shown as a small tag
  href: "/journal/your-entry-slug", // matches slug
  image: "/images/journal/your-entry.jpg",  // optional, see images below
  imageAlt: "Description of the photo",
},
```

That gives you a card on the homepage feed and a basic detail page.

To add a full **case study** with rich content, also include:

```ts
content: {
  lead: "Opening paragraph. The TL;DR of the engagement.",
  outcomes: [
    { value: "$7M+", label: "In client upsells driven by content" },
    { value: "4x", label: "Social engagement growth" },
    // 3-4 outcomes total
  ],
  sections: [
    {
      eyebrow: "01 / The opportunity",
      heading: "Section heading.",
      body: [
        "First paragraph of the section.",
        "Second paragraph of the section.",
      ],
    },
    // more sections...
  ],
  closer: "Optional takeaway statement shown at the bottom.",
},
```

Look at the Nautical Network entry in the same file for a full reference.

### E — Swap or add an image
Images live in `/public/images/`. Drop the new file in the right subfolder:

| Subfolder | Use for |
|---|---|
| `/public/images/verticals/` | Vertical category card photos |
| `/public/images/journal/` | Journal entry hero images |
| `/public/images/team/` | Team headshots |
| `/public/images/clients/` | Client logos (SVG preferred) |
| `/public/images/editorial/` | Hero banner imagery |

Then reference the image in the data file as `/images/folder/filename.jpg`.

**Image specs:**
- Vertical cards: **1200 × 1500 portrait (4:5)**, JPG or WebP, under 400KB
- Journal entries: **1600 × 1200 landscape (4:3)**, JPG or WebP, under 500KB
- Team headshots: **800 × 1000 portrait (4:5)**, JPG, under 250KB
- Client logos: SVG ideal, PNG with transparency otherwise, under 30KB

**Naming**: kebab-case, descriptive. `marine-yacht-launch.jpg`, not
`IMG_4291.JPG`. Lowercase. No spaces.

### F — Update team page bios
File: `lib/team.ts`

Each team member is an object. Editable fields: `name`, `role`, `department`,
`bio`. Add or remove members as the team grows.

### G — Update the homepage Outcomes section
File: `lib/testimonials.ts` (yes, the file is named "testimonials" — that's
legacy. The actual section on the site is now called "Outcomes.")

Each card has: `vertical`, `value` (the big number), `label`, `client`.

---

## 3. Brand voice rules (apply to any new copy)

These are non-negotiable. Stick to them.

- **No em-dashes** (`—`). Use periods, commas, or restructure the sentence.
  Em-dashes are an AI tell and the brand voice avoids them entirely.
- **"premium" over "luxury"**. The brand prefers "premium markets" /
  "premium brands" in headers and body copy. ("Luxury" appears in
  vertical names where it's part of the category, like "Luxury Goods.")
- **No "senior practitioners / outsourced juniors" framing.** Don't
  describe the team that way.
- **Drop hard counts** when possible. "the categories we serve" is preferred
  over "eight verticals." Keeps flexibility.
- **Cross-vertical / owned-media framing where it fits.** The cross-vertical
  collaboration story (yacht in a real estate film, car at hospitality
  activation) is central to the brand.
- **Sentence-length variety.** Mix short fragments with longer flows.
  Robot-like perfect parallelism reads as AI.

---

## 4. Deploying

Every push to the `main` branch on GitHub auto-deploys to production at
surroundingsgroup.com. ~60 seconds from `git push` to live.

To preview a change before pushing to main:
- Push to any branch other than `main`. Vercel will build a preview URL
  (visible on the Vercel dashboard) so you can see your changes on a
  staging URL before merging to main.

To check on a deploy:
- Vercel dashboard → `sg-website` project → Deployments tab. Green check
  = live. Red x = something broke. Click into the deploy to see logs.

---

## 5. What NOT to touch

| Don't touch | Why |
|---|---|
| `next.config.ts` | Has the WordPress URL redirect map — easy to break |
| `app/layout.tsx` | Site-wide layout, fonts, metadata |
| `app/contact/actions.ts` | Email server logic (Resend) |
| `app/sitemap.ts` / `app/robots.ts` | SEO infrastructure |
| `app/opengraph-image.tsx` files | Social share card generators |
| `components/*.tsx` files | Layout components (unless you know React) |
| `.env.local` or env vars | Secrets — never commit these |
| Tailwind classes (`className="..."`) | Styling — break easily if changed |

If you need any of the above changed, file a ticket for a dev who knows
React/Next.js.

---

## 6. When in doubt

1. **Make a small change first.** Edit one word, push, check it's live. Build
   confidence with small wins before bigger edits.
2. **Use a preview branch** if it's a bigger change. Create a branch in
   GitHub (use the branch dropdown → type a new name → "create branch from
   main"). Vercel will build a preview URL.
3. **Vercel deploys can be rolled back.** If you push something that
   breaks the site, go to Vercel → Deployments → find the last good one →
   click "Promote to Production." Site is back in 5 seconds.

Anything destructive (deleting a file, changing a slug that's already public)
should go through a code review. Ask a dev.

---

*Last updated: site rebuild May 2026. Maintained alongside the codebase —
if you change the data shape, update this doc too.*
