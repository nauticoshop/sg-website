# Surroundings Group — Content & Editing Guide

How to add or change content on surroundingsgroup.com. Written for both
developers and content editors. No deep Next.js knowledge required —
nearly everything is editing structured lists in `lib/` data files.

> **The one rule:** run `npm run build` before you push. If the build
> passes, you cannot take the site down. If it fails, your change has a
> typo — read the error, fix, rebuild.

---

## One-time setup (10 minutes)

1. Get access to the GitHub repo (`nauticoshop/sg-website`)
2. Install [Node.js](https://nodejs.org) (LTS version)
3. Clone and run:

```bash
git clone https://github.com/nauticoshop/sg-website.git
cd sg-website
npm install
npm run dev        # site now at http://localhost:3000
```

Edit files, watch the browser update live. When happy:

```bash
npm run build      # MUST pass before you push
git add -A
git commit -m "Describe what you changed"
git push origin main
```

Pushing to `main` auto-deploys to production via Vercel (~2 minutes).
If you're less confident, push a branch and open a Pull Request instead —
Vercel gives every PR its own preview URL to check before merging.

**Shortcut:** if you have Claude Code, open it in this repo and describe
the change in plain English ("add a journal post about X, photos are in
my Downloads"). It knows this codebase. Still run the build before pushing.

---

## Where everything lives

| Content | File |
|---|---|
| Portfolio collections | `lib/work.ts` + images in `public/images/work/` |
| Journal posts / case studies | `lib/featured-work.ts` |
| Team members | `lib/team.ts` + photos in `public/images/team/` |
| Careers (roles, benefits, culture) | `app/careers/page.tsx` |
| Services copy | `lib/services.ts` |
| Verticals copy | `lib/verticals.ts` |
| Map pins (audience + project locations) | `lib/locations.ts` |
| Hero video, nav, phone, email, CTAs | `lib/site.ts` |
| Client outcome stats (homepage) | `components/featured-work.tsx` (top of file) |

---

## Recipe 1: Add a portfolio piece (work collection)

1. **Prep images.** Resize to max 1800px on the long edge, JPEG ~65–75
   quality. On a Mac, from the folder of full-res images:
   ```bash
   mkdir optimized
   for f in *.jpg; do sips -Z 1800 -s format jpeg -s formatOptions 65 "$f" --out "optimized/$f"; done
   ```
   Aim for ~300–600KB per file. **Never commit raw camera files.**

2. **Add the folder.** Create `public/images/work/<slug>/` (slug =
   lowercase-with-dashes, e.g. `my-windrose`) and copy the optimized
   images in, named `<slug>-01.jpg`, `<slug>-02.jpg`, …
   Image 01 is usually the cover — pick a strong landscape establishing shot.

3. **Add the data.** In `lib/work.ts`, copy an existing entry in
   `workCollections` and edit. Required per image: `src`, `alt`
   (describe the photo — used for accessibility and SEO), `width`,
   `height` (actual pixel dimensions; get them with `sips -g pixelWidth -g pixelHeight file.jpg`).
   Mark the cover image with `cover: true`.

4. The collection automatically appears on `/work` (with its vertical
   as a filter chip), gets its own page at `/work/<slug>`, and joins
   the sitemap. Nothing else to wire.

## Recipe 2: Add a journal post / case study

In `lib/featured-work.ts`, add an entry to `featuredProjects`:

- **Card only** (no detail page yet): fill `slug`, `type`
  (`case-study` | `bts` | `client-update` | `studio-news`), `client`,
  `vertical`, `headline`, `tag`, `href` (`/journal/<slug>`), and
  optionally `image` + `imageAlt` (drop the image in
  `public/images/work/`, optimized per Recipe 1).
- **Full case study**: also fill the `content` block — `lead`
  (the TL;DR paragraph), `outcomes` (3–4 stat cards: `value` + `label`),
  `sections` (eyebrow like `"01 / The opportunity"`, `heading`, `body`
  paragraphs), and a `closer`. Copy the `nautical-network` entry as a
  template — it's the reference implementation.

Posts appear on the homepage journal section and `/journal` automatically.

## Recipe 3: Update the careers page

Open `app/careers/page.tsx`. Plain-English arrays at the top:

- `benefits` — the six "why here" reasons
- `paths` — the five role categories (each has a `subject` line used to
  pre-fill the application email)
- `culturePillars` — the four culture blocks

To list actual open roles, replace the "Roles are being refreshed"
block near the bottom — ask a developer (or Claude) the first time.

## Recipe 4: Team changes

`lib/team.ts`. Add/remove/edit entries; order in the file = order on the
page. Headshots: 4:5 portrait orientation, max ~900px wide, dropped in
`public/images/team/`, referenced via the `photo` field. Delete the
photo file too when removing a person.

## Recipe 5: Swap the hero video

`lib/site.ts` → `hero.vimeoId`. If the Vimeo video is unlisted, also set
`vimeoHash` (the `h=` value in Vimeo's embed code); leave `""` for
public videos.

## Recipe 6: Add map pins

`lib/locations.ts` → `projectLocations`. Each pin: place name, a short
credit line (shows in the hover tooltip), `[longitude, latitude]`
(note: longitude FIRST), weight 1–2. Google "coordinates of <place>"
and flip the order Google gives you.

---

## Conventions (read once)

- **Voice:** confident, editorial, premium. No "we ship / what ships"
  phrasing. Avoid em-dash-heavy sentences and "X, Y, and Z" triad lists
  in intros. Read `lib/services.ts` intros to absorb the register.
- **Images:** optimized JPEGs only (see Recipe 1). The repo serves
  images through Next.js image optimization, but source files still
  need to be web-sized.
- **Alt text:** every image gets a real description, 8–15 words.
- **Don't touch** `app/`, `components/`, or config files for content
  changes — content lives in `lib/` and `public/images/`. If a change
  seems to require editing a component, loop in a developer.

## When something breaks

- `npm run build` fails → the error names the file and line. Usually a
  missing comma, quote, or bracket in a data file.
- Deployed but looks wrong → check the Vercel dashboard (project
  `sg-website`) for the deploy log, or revert: `git revert HEAD && git push`.
- Truly stuck → the site is plain Next.js + Tailwind; any web developer
  can work on it. There is no proprietary platform.

---

*Planned: a Sanity CMS dashboard (`/studio`) for journal, work, and team
content — at which point editors get a web UI with a Publish button and
Recipes 1, 2, and 4 stop requiring git at all. This guide covers the
current, code-based workflow until then.*
