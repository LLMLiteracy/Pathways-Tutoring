# Build Specification — Pathways Tutoring

Generated from the completed Website Build SOP. Hand this whole document to Claude Code as the first message in a fresh session (the `CLAUDE.md` in this kit already tells it what to do with it).

## Project Overview

**Pathways Tutoring** is an online, 1-on-1 tutoring service for university students who need help passing exams and completing coursework. Sessions are booked directly on the site — no account needed for students, fast response times, certified tutors. Tone: warm and encouraging, but sharp and no-nonsense — supportive without fluff.

Target audience: university students who want to pass their exams and coursework.

## Design Standards

- **Quality bar:** the result must be professional, distinctive, and production-worthy — not a generic template or placeholder-looking layout.
- **Style reference:** modern SaaS-level polish, in the style of Stripe or Linear, warmed up with the path-and-lamplight motif from the logo used as accents throughout (icons, section dividers, background details) — not full illustrations on every page.
- **Styling approach:** Tailwind CSS.
- **Tech stack:** React + TypeScript + Vite, React Router for pages, Tailwind CSS for styling.
- **Colors:**
  - Primary: deep navy `#0F1B3D`
  - Secondary/accent: warm gold/sand `#D4B673`
  - Use navy as the dominant background/text color and gold sparingly as an accent (CTAs, highlights, icon fills) — not evenly split.
- **Typography:** a clean, professional sans-serif that suits a navy/gold palette (e.g. Inter or similar) — pick one and apply it consistently via Tailwind config.
- **Logo:** use [assets/pathways-tutoring-logo.png](assets/pathways-tutoring-logo.png) — a navy circle mark with a winding gold path leading to a lit lamppost. Use it in the header/nav and footer. Derive a simplified favicon from it.
- **Imagery:** mostly illustration/graphic elements matching the logo's path-and-lamplight motif (icons, dividers, background shapes). Where a real photo helps build trust (e.g. a tutor headshot placeholder on the About page), link directly to a real photo from Pexels or Unsplash using a URL you're confident exists — do not generate placeholder gray boxes or broken image links, and do not download/bundle images locally.
- **Avoid:** generic corporate stock photography (laptop-and-coffee shots, forced handshakes, stock "business people smiling" photos) — anything that undercuts the credible, no-fluff feel.

## Pages & Content

### Landing / Home
Sections, in order:
1. **Hero** — Headline: "Certified Tutors. Fast Support. Real Results." Subheadline: "Pass your exams. Ace your coursework." Primary CTA button: "Book a Session" (links to the Book a Session page). Include an illustrated path-and-lamplight graphic echoing the logo.
2. **Key selling points** — a 4-item grid/row: Certified tutors · Fast response time · 1-on-1 personalized sessions · Straightforward, no-fluff support.
3. **Social proof / testimonials** — use realistic placeholder testimonials (clearly written as believable student quotes) with a code comment noting these are placeholders to be swapped for real ones before launch.
4. **Services preview** — short teaser of the three services (see Services page) linking through to Services.
5. **Call-to-action band** — repeat the "Book a Session" CTA before the footer.
6. **Footer** — links to Services, Contact, About, FAQ, plus social links (placeholder icons, no live URLs yet).

### About
- Short bio section for the tutor(s) — use a clearly-marked placeholder bio (credentials/experience TBD, to be written by the owner before launch).
- A "credentials" callout area (certified tutor, relevant degree) — placeholder text.
- One real-photo placeholder for a tutor headshot, sourced from Unsplash/Pexels (professional, warm, not generic stock).

### Services
Three services, shown as cards:
| Service | Price |
|---|---|
| 1-on-1 Tutoring Session (55 minutes) | $45/session |
| Coursework / Assessment Review | $50/session |
| Proofreading | $35/session |

Mark pricing as placeholder in a subtle note ("pricing to be confirmed before launch") since the brief flagged it as provisional. No categories or variants needed — flat list of three.

### Book a Session (core action page)
A booking form, no login required, with fields:
- Student name
- Email
- Phone
- Subject (dropdown, populated from the `services` table)
- Preferred date
- Preferred time
- Notes (optional, free text)

On submit: show an on-screen confirmation message, and trigger a confirmation email to the student (see Backend — Notifications). In Milestone 1 (frontend only), submission can just show the confirmation UI against mock data; real persistence and email come in Milestone 3.

Include a short cancellation/reschedule policy note near the form — placeholder text, flagged as TBD to finalize before launch.

### Contact
- Simple form: name, email, message.
- Display: business email (placeholder — new Pathways Tutoring inbox, address TBD until Brevo sender is set up) and phone (TBD, show as "coming soon" or omit gracefully).
- No map (online-only business).
- Social links: placeholder icons, no live URLs yet.

### FAQ
Starter questions (accordion layout):
- How do sessions work?
- What subjects do you cover?
- How do I cancel or reschedule?
- How fast will I get a response?

Write reasonable placeholder answers consistent with the brand tone — supportive, direct, no fluff.

### Login (admin)
- Single email/password login form for the business owner/tutor.
- No public sign-up — this is admin-only auth, not a customer account system.

### Admin Dashboard
- Table of all bookings, newest first: student name, subject, date/time, status.
- Actions: mark a booking as **Confirmed**, **Completed**, or **Cancelled**.
- Accessible only when logged in as admin.

### Legal pages
- **Privacy Policy** — placeholder draft (standard small-business template language), clearly marked "review before publishing."
- **Terms of Service** — same treatment.
- No cookie consent banner needed for v1 (no analytics/tracking cookies yet).

### SEO / Meta
- Page title pattern: `[Page] | Pathways Tutoring — short description`.
- Meta description per page, written from the page's actual content.
- Target keywords to weave in naturally: university tutoring, exam prep tutor, coursework help, online tutoring for university students.
- Favicon derived from the logo.
- Social share image: reuse the logo/path graphic.

## Backend & Data (Supabase)

### Tables

**`services`**
| Column | Type | Notes |
|---|---|---|
| `id` | uuid, PK, default `gen_random_uuid()` | |
| `name` | text | e.g. "1-on-1 Tutoring Session" |
| `description` | text | |
| `price` | numeric | dollars |
| `duration_minutes` | integer | nullable, e.g. 55 |
| `created_at` | timestamptz, default `now()` | |

**`bookings`**
| Column | Type | Notes |
|---|---|---|
| `id` | uuid, PK, default `gen_random_uuid()` | |
| `student_name` | text, not null | |
| `email` | text, not null | |
| `phone` | text | |
| `subject` | text, not null | references a service name/id |
| `preferred_date` | date, not null | |
| `preferred_time` | time | |
| `notes` | text | |
| `status` | text, default `'pending'` | one of `pending`, `confirmed`, `completed`, `cancelled` |
| `created_at` | timestamptz, default `now()` | |

### Row Level Security (required on every table)
- `services`: public **read** access (anyone can view services to populate the dropdown/pricing page). No public write — only the admin (or a migration/seed) manages services.
- `bookings`: public **insert** only (anyone can submit a booking without logging in). Public **cannot** read, update, or delete bookings. Only the authenticated admin can select/update rows (mark status). Enforce via a policy checking `auth.role() = 'authenticated'` scoped to the single admin user, or a `is_admin` check — keep it simple since there's only one admin account.

### Auth
- Supabase built-in email/password auth for a single admin account (the business owner/tutor). No public sign-up flow. No custom auth system.

### Notifications
- On new booking insert: send (a) a confirmation email to the student and (b) an alert email to the admin.
- Send via Brevo's free SMTP relay, from a verified sender address (new Proton address, to be created/verified during setup).
- Implement this as a Supabase Edge Function triggered on insert (or called from the booking form after a successful insert) — never call Brevo directly from frontend code, so the API key stays server-side.

### Migration hygiene
- Every migration is additive — no bare `DROP`/`DELETE` that could destroy data.
- Name migrations descriptively (e.g. `create_services_table`, `create_bookings_table`, `add_rls_policies_bookings`).
- Start each migration file with a short plain-English comment summarizing what it does and why, before the SQL.

## Deployment

- **Version control:** GitHub.
- **Hosting:** Netlify (free tier), deployed from the GitHub repo.
- **Backend:** Supabase (already connected via MCP — project ref `hvfdwwxjqlgodmtljyga`).
- **Email:** Brevo free SMTP relay.
- **Domain:** free Netlify subdomain for now; custom domain can be added later.
- No payment provider needed (see below).

## Payments / Shop

Not needed. This is a booking-based service site with no online payment collection for v1 — **skip Milestone 4 entirely.**

## Build Order & Check-ins

1. Confirm what you've received from this spec and ask any remaining questions as structured multiple-choice where possible — then get straight to work on Milestone 1 without waiting for further permission (this spec is already agreed).
2. **Milestone 1 — Frontend.** All pages listed above, design standards applied, mock/placeholder data for services and bookings.
3. **Milestone 2 — Auth flow.** Single admin login via Supabase email/password.
4. **Milestone 3 — Backend.** Create `services` and `bookings` tables with RLS as specified, wire the booking form and admin dashboard to real data, set up the Brevo edge function for notification emails. This is where the live Supabase MCP connection matters (already connected).
5. **Skip Milestone 4** (no payments).
6. At the end of each milestone: summarize what was built (files created/edited/deleted) in clear bullet points, then explain the plan for the next milestone and wait for a go-ahead before starting it.
7. Pause separately, outside milestone boundaries, for any genuinely risky or ambiguous decision — anything that could affect existing data, or an instruction readable two ways — state what was understood, flag if something seems off, and ask before proceeding.

## Open items flagged during spec creation (judgment calls / TBDs to confirm before launch)

- Services pricing is placeholder ($45/$50/$35) — confirm real pricing before publishing.
- About page bio, credentials, business phone, business hours, and social links are all TBD placeholders per the brief — fine to launch with placeholders, just don't forget to fill them in.
- Cancellation/reschedule policy text is placeholder — needs real policy before launch.
- Admin RLS policy will be scoped to "the one authenticated user" for simplicity, since there's only a single admin account — flagging this as a reasonable simplification, not a security gap, given the single-admin scope described in the brief.
