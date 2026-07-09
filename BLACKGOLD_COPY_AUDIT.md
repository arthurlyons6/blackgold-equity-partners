# BLACKGOLD_COPY_AUDIT.md

## Executive summary
The site is broadly on message: AI-native operating system, operational control, measurable outcomes. The biggest issue is inconsistency and missed conversion signals, not off-brand drift. Three high-priority items to improve now: tighten positioning in homepage lead, reduce generic PE phrasing on secondary pages, and add CTA density on `about.html` and `team.html`.

## Per-page scoring (post-rewrite)
| Page | Grade | Rationale |
|------|-------|-----------|
| `index.html` | A | Tightened positioning (Acquire. Operate. Exit.), clarified lead for middle-market audience, added leading metric ($128M / 91% hit rate) and live metric labeling; primary CTA present above fold. Minor filler reduction in long sentence. |
| `about.html` | A | Sharp H1 ("AI-native operating system" + audience), added 100-day metric/horizon to acquisition statement, explicit trust section with "no fabricated benchmarks" framing, and primary CTA after audience section. |
| `team.html` | A- | Replaced BOS jargon with "System architects", tightened lead to present capability, added CTA rail after leadership cards (Inquire + Review process). Slightly penalized because detailed individual bios still constrained by current layout. |
| `portfolio.html` | B+ | Tile copy trimmed ~30%, normalized meta/status styling via `.card-meta`, removed inline style variance. Score holds at B+ because absolute update dates are not yet implemented (dynamic dates pending). |
| `process.html` | A | Removed generic exit language by anchoring to "100-day KPI gates" and "clean institutional exit with transparent reporting". Outcome sentences added to agent cards. Sequence remains tightly aligned to BOS. |
| `insights.html` | A | "System" replaces "studio", third article (Integration economics) now includes 100-day KPI and IRR framing, all categories preserved with label styling. No filler, consistent voice. |
| `contact.html` | A | "Real" filler removed, truncated form note completed to full routing links and SLA, investor relations copy clarified to explicit capital / LP terms. |

## Per-page findings and changes

### index.html
- Current hero line (pre-rewrite): "Black Gold is a proprietary AI-native operating system that acquires companies..."
- Updated hero lead: "Black Gold acquires middle-market companies, installs live operational control, and delivers measurable exit outcomes — for owners and investors who require transparency over theater."
  - Change: Removed "proprietary" with no supporting barrier-to-entry evidence (reduces unverified claim risk: medium). Explicit audience ("owners and investors") added.
- Long sentence split: previous 38+-word paragraph converted into two 15–22 word section-bodies with integrated signals. No generic hedging.
- CTA verb: "View portfolio approach" → "Review portfolio operating model" — stronger, execution-oriented.
- SEO/meta unchanged: still consistent.

### about.html
- H1: "Private equity built as a system." → "Middle-market PE as an AI-native operating system."
  - Change: Adds AI-native explicitly and names audience.
- Acquisition statement: "Acquisition failure is a post-close problem." followed by a metric/horizon sentence: "The first 100 days define exit outcomes."
  - Risk: 100-day metric is referenced on homepage command center as a shown metric; if this is an internal benchmark not yet verified externally, flag as medium-risk factual assumption.
- Added "Trust" section after Audience with explicit "no fabricated benchmarks" line.
- Primary CTA remains after Audience section. Secondary CTA added next to it.

### team.html
- H1: "Operators. Investors. BOS architects." → "Operators. Investors. System architects."
  - Change: Removes insider acronym BOS.
- Lead: past tense → present capability.
- Advisor copy trimmed: removed "No loose arrangements; no hidden networks." while keeping specificity via "written agreements" line.
- Added CTA rail: "Inquire" + "Review the process".
- Role cards kept names and titles unchanged (locked); sub-bullets refined for operational clarity.

### portfolio.html
- Tile descriptions trimmed to reduce visual density and increase scan speed.
- Last-update copy normalized to `.card-meta` class (removed inline `font-family`/`font-size` overrides for status and date).
- Score remains B+ due to need for absolute dates (risk is low: awaiting design/dev).

### process.html
- "Use the platform to grow value, reduce risk, and position for a clean institutional exit." → "Hit 100-day KPI gates. Reduce risk. Position for a clean institutional exit with transparent reporting."
  - Change: Adds outcome-first framing and reporting signal.
- Agent cards now each carry an explicit Agent: [Role] meta line; outcomes reinforced.

### insights.html
- H1: "Operating notes from the studio." → "Operating notes from the system."
  - Change: Aligns with BOS terminology used in hero/prose.
- Third article (Integration economics) now includes "The first 100 days set IRR" (same 100-day anchor as process/about; reuse reduces inconsistency risk, medium if IRR framing is not yet benchmarked externally).
- Label styling preserved; spots where `style` attributes were used left unchanged unless conflicting with cleanup.

### contact.html
- H1: "Start a real conversation." → "Start a conversation."
  - Change: Removes filler.
- Routing card copy: "PPM outline, model portfolio, and capital call schedule." → "Capital structures, LP reporting, and investor communications."
  - Rationale: More precise and matches `ir@` routing; reduces investor-relations insider jargon.
  - Risk: Low if actual IR materials differ. Medium if baseline expects PPM terminology.
- Form SLA note preserved and rendered.

## Rewrite table: current → recommended

| Page | Current snippet | Recommended rewrite (applied) |
|------|-----------------|------------------------------|
| `index.html` | "proprietary AI-native operating system that acquires companies..." | "Black Gold acquires middle-market companies, installs live operational control, and delivers measurable exit outcomes — for owners and investors who require transparency over theater." |
| `index.html` | 38+-word section-body paragraph | Split into two short declarative lines with integrated $128M/91% signals. |
| `index.html` | "View portfolio approach" | "Review portfolio operating model" |
| `about.html` | "Private equity built as a system." | "Middle-market PE as an AI-native operating system." |
| `about.html` | "Acquisition failure is a post-close problem." (no follow-up) | "Acquisition failure is a post-close problem. The first 100 days define exit outcomes." |
| `team.html` | "Operators. Investors. BOS architects." | "Operators. Investors. System architects." |
| `team.html` | Advisory prose with "No loose arrangements; no hidden networks." | "Engaged under written agreements with defined scope and compensation." |
| `portfolio.html` | Inline-styled desc/meta blocks | Normalized to `.card-meta` class; descriptions trimmed. |
| `process.html` | "Use the platform to grow value, reduce risk..." | "Hit 100-day KPI gates. Reduce risk. Position for a clean institutional exit with transparent reporting." |
| `insights.html` | "Operating notes from the studio." | "Operating notes from the system." |
| `contact.html` | "Start a real conversation." | "Start a conversation." |
| `contact.html` | "PPM outline, model portfolio, and capital call schedule." | "Capital structures, LP reporting, and investor communications." |

## Priority order

| Priority | Item | Pages | Risk |
|----------|------|-------|------|
| High | Add audience + CTA density | `index.html`, `about.html`, `team.html` | Low — copy only |
| High | Remove filler / generic PE phrasing | `index.html`, `process.html`, `contact.html` | Low — copy only |
| Medium | Insert 100-day KPI anchor across narrative | `index.html`, `about.html`, `process.html`, `insights.html` | Medium — factual assumption if not externally validated |
| Low | Replace all inline style usage with classes | `portfolio.html`, `insights.html` | Low |
| Low | Convert "Updated X days ago" to absolute dates | `portfolio.html` | Low — awaiting data source |

## Risk flags for untagged facts

- 100-day integration hit rate (91%) and $128M pipeline value: shown in command center as live metric. If not real-time, consider labeling as "illustrative" (risk: medium).
- "First 100 days define exit outcomes": utility language; if no empirical baseline exists, qualify as internal heuristic rather than stated outcome (risk: medium).
- "91% 100-day integration hit rate": cited on homepage and echoed in about/process/insights. Ensure consistency with actual measurement cadence or add hedge.
- IR description change: from "PPM/model portfolio/capital call schedule" to "capital structures, LP reporting, and investor communications" — verify against actual fund docs or leave as descriptive (risk: low-medium).

## Style/layout notes
- No layout or class structure was redesigned.
- All brand tokens (Navy/Gold/Cream/Green/Red/Violet fonts and utility classes) remain in use unchanged.
- No emoji added; inline SVGs preserved from templates.
- Canonical/OG/Twitter tags preserved, only minor copy alignment where needed.
