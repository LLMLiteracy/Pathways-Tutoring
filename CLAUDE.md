# Website Build Kit — instructions for Claude Code

This folder is a self-contained kit for building a small business website in one sitting. You (Claude Code) are reading this automatically because it's named `CLAUDE.md` — the user hasn't necessarily told you anything yet beyond opening this folder and saying something like "let's get started."

## What's in this folder

- `Getting_Started_Guide.docx` — the human's own walkthrough of the whole process. It's for their reference, not instructions to you, but skimming it will tell you exactly what they expect to happen next.
- A **Website Build SOP** document (blank template, or already filled in) — the business brief: what the site is for, what pages it needs, branding, backend requirements, everything.
- `website-build-spec.skill` — install this skill if it isn't already active in your session. It contains the full method for turning the SOP into a build specification, including a setup/accounts check, how to run the interview if the SOP isn't filled in yet, and exact build-order instructions.
- Possibly a `build-spec.md` — if this exists, the SOP has already been turned into a build spec and you can skip straight to building.

## Your job, in order

1. **Say what you found.** Look at what's actually in the folder and tell the user plainly — SOP filled in or blank, skill active or not, build spec already present or not. Don't assume; check.
2. **If there's no build spec yet**, follow the `website-build-spec` skill: confirm the toolkit is ready (Netlify/GitHub/Supabase/SMTP/Stripe/domain accounts, and whether Supabase is connected to you), then — if the SOP isn't filled in — interview the user through it section by section, then turn the completed brief into a full build specification. Save it as `build-spec.md` in this folder so there's a record of it.
3. **If a build spec already exists**, read it and confirm with the user what's in it before writing any code — better to catch a misunderstanding now than after building the wrong thing.
4. **Build in four milestones, in this order, and don't ask permission before starting Milestone 1** — the spec is already agreed, so once the setup check is done, get straight to work.

   - **Milestone 1 — Frontend.** Every page, with the design standards from the spec applied, using placeholder/mock data.
   - **Milestone 2 — Auth flow.** Login for whoever needs it, per the brief (usually just the admin).
   - **Milestone 3 — Backend.** Supabase tables, RLS policies, and wiring real data into the frontend in place of the placeholders. This is the milestone where a live Supabase connection actually matters — see "Connecting Supabase" below if it isn't set up yet.
   - **Milestone 4 — Payments** *(only if the brief calls for it — skip entirely otherwise)*. Integrate the payment provider (e.g. Stripe), then run payment processing tests using the provider's test mode (test cards, a failed payment, a refund) before anything touches a real payment.

5. **At the end of each milestone, before starting the next one, always do two things:**

   - **Show your work.** A clear bullet-point summary of what was actually built in that milestone — which files were created, edited, or deleted — so the user can see concretely what happened rather than taking it on faith.
   - **Preview and confirm.** Briefly explain the plan for the next milestone and ask if they're ready before starting it — don't launch into Milestone 2 right after finishing Milestone 1 without a pause.

   Separately from these milestone check-ins, if a specific decision mid-build is risky or genuinely ambiguous — a database change that could affect existing data, an instruction readable two ways, anything destructive — pause right there too, even outside a milestone boundary: state what you understood, say plainly if something seems like a bad idea, and ask before proceeding. Routine, clearly-specified work doesn't need this — save it for real judgment calls, or it stops meaning anything.

6. **Once everything's approved**, help them push the code to GitHub and connect the repository to Netlify so the site goes live.

## Connecting Supabase, if it isn't already

Milestone 3 needs a live Supabase connection. If `/mcp` shows Supabase isn't connected yet, walk the user through it rather than assuming they know how:

1. Tell them to open a terminal in this project folder.
2. Have them run: `claude mcp add --transport http supabase https://mcp.supabase.com/mcp`
   This registers Supabase's hosted MCP server over HTTP with OAuth — prefer this over the older approach of a `.mcp.json` file with a raw `SUPABASE_ACCESS_TOKEN` in it. A personal access token grants broad, account-wide access and has to be protected like a root password; the OAuth route only grants access through a browser login, scoped and revocable, which is meaningfully safer for someone doing this for the first time on camera or otherwise.
3. Back in Claude Code, run `/mcp` to check the connection status.
4. If it still shows unauthenticated, tell Claude Code "authenticate with Supabase MCP" — this opens a browser window for them to log in and approve access, and the connection completes automatically once they do.
5. Confirm it's connected before continuing Milestone 3 — create a table or read project settings as a quick sanity check.

If the user already has a `.mcp.json` file with an access token in it from something else, that will still work, but flag that it should be in `.gitignore` immediately if it isn't already — that token should never end up in a public repository.

Ask questions as structured multiple-choice where you can (clear lettered options, plus room for the user's own answer) rather than open-ended prompts — it's faster for a non-technical user to respond to a menu than a blank question, and it keeps momentum through what might be their first time doing any of this.
