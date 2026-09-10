# Graph Report - demo-light-theme  (2026-09-10)

## Corpus Check
- 141 files · ~1,317,896 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 799 nodes · 1143 edges · 67 communities (49 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f976e88b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]

## God Nodes (most connected - your core abstractions)
1. `Lumenosis AI Landing Page Implementation Plan` - 38 edges
2. `cn()` - 24 edges
3. `isAdmin()` - 18 edges
4. `sql()` - 17 edges
5. `compilerOptions` - 16 edges
6. `Lumenosis AI — Real Estate Landing Page Design` - 16 edges
7. `demoRoomForToken()` - 15 edges
8. `verifyPlatformRequest()` - 13 edges
9. `Atlas Tools for War — Copy Intelligence for Lumenosis AI` - 13 edges
10. `Accessibility QA — Static Analysis Pass` - 13 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `approveDemoRoom()`  [INFERRED]
  app/api/admin/demos/[id]/approve/route.ts → lib/demo-admin-service.ts
- `POST()` --calls--> `sendDemoOutreach()`  [INFERRED]
  app/api/admin/demos/[id]/send/route.ts → lib/demo-admin-service.ts
- `POST()` --calls--> `tursoConfigured()`  [INFERRED]
  app/api/platform/demos/[id]/approve/route.ts → lib/turso.ts
- `POST()` --calls--> `tursoConfigured()`  [INFERRED]
  app/api/platform/demos/[id]/send/route.ts → lib/turso.ts
- `POST()` --calls--> `isAdmin()`  [INFERRED]
  app/api/admin/demos/[id]/approve/route.ts → lib/admin-auth.ts

## Import Cycles
- None detected.

## Communities (67 total, 18 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (58): POST(), POST(), DemoRoom, demoRooms, Demo, DemoAdminPage(), Input, Output (+50 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (38): siteStructuredData, AuroraBackground(), RotatingText(), ThemeToggle(), faq, FaqItem, teamMembers, D (+30 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (40): POST(), POST(), NO_STORE, GET(), NO_STORE, unauthorized(), approveDemoRoom(), ApproveResult (+32 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (35): StarButton(), StarButtonProps, cn(), Badge(), BadgeProps, badgeVariants, Button, ButtonProps (+27 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (38): Lumenosis AI Landing Page Implementation Plan, Open items requiring Martin input during build, Self-review notes, Task 10: Hero section, Task 11: TrustStrip section, Task 12: FounderVSL section, Task 13: ProblemAgitation section, Task 14: AgentPersonaCard + MeetTheTeam section (+30 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (34): 10.1 Flow, 10.2 Fillout setup checklist (Martin), 10.3 GHL setup checklist (Martin), 10.4 Optional webhook fallback, 10. Forms + booking integration, 11. Folder structure, 12. Build sequencing (high level — full plan in writing-plans phase), 13. Acceptance criteria (+26 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (23): BathIcon(), BedIcon(), DoorIcon(), IconProps, LensIcon(), PinIcon(), RouteIcon(), RuleIcon() (+15 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (32): dependencies, class-variance-authority, clsx, embla-carousel-auto-scroll, embla-carousel-react, @fillout/react, framer-motion, gsap (+24 more)

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (25): css, formatter, parser, files, ignoreUnknown, formatter, enabled, indentStyle (+17 more)

### Community 9 - "Community 9"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 10 - "Community 10"
Cohesion: 0.11
Nodes (18): aria-deep-dive.tsx, Branch: `feature/website-copy-refresh`, case-study-wall.tsx / content/case-studies.ts, Execution Rules, faq.tsx / content/faq.ts, final-cta.tsx, Hero Changes, Lumenosis Website Copy Refresh (+10 more)

### Community 11 - "Community 11"
Cohesion: 0.17
Nodes (11): AtIcon(), LetterIcon(), ReplyIcon(), SignalIcon(), metadata, channels, IrisLeadDesk(), channels (+3 more)

### Community 12 - "Community 12"
Cohesion: 0.14
Nodes (13): 10. CTA Copy, 11. Positioning vs. Competitors, 12. Specific Copy Lines to Use, 1. Headline Frameworks, 2. Hero Section Principles, 3. VSL / Video Section, 4. Awareness Level Copy, 5. Benefit Section Templates (+5 more)

### Community 13 - "Community 13"
Cohesion: 0.27
Nodes (10): compact(), DemoAssistantOverrides, demoVoiceOverrides(), SMALL, spokenAddress(), spokenCount(), spokenMoney(), spokenNumber() (+2 more)

### Community 14 - "Community 14"
Cohesion: 0.14
Nodes (13): Accessibility QA — Static Analysis Pass, ARIA Attributes Audit, Audit Method, Color Contrast (Gold-on-Cream Restriction), Files Inspected, Fixes Applied, Focus Ring Audit (standalone interactive elements), Form Accessibility (+5 more)

### Community 15 - "Community 15"
Cohesion: 0.21
Nodes (9): DemoRoomExperience(), EmailResult, money(), VoiceConfig, emailBodyHtml(), prefersReducedMotion(), runThemeTransition(), ThemeTransitionOptions (+1 more)

### Community 16 - "Community 16"
Cohesion: 0.21
Nodes (7): GhlCalendar(), GlowCard(), GlowCardProps, glowColorMap, CalendarCTA(), plans, TwoWaysIn()

### Community 17 - "Community 17"
Cohesion: 0.15
Nodes (12): Files to update:, Lumenosis Polish Sprint Implementation Plan, Rule:, Self-review, Task 1: Restore cream light mode + transparent dark sections in globals.css, Task 2: Make ALL section bgs transparent in dark mode, Task 3: Replace star-button with exact React Bits source, Task 4: Topbar — "Book a Demo", pill on scroll, no magnet on nav CTA, show logo (+4 more)

### Community 18 - "Community 18"
Cohesion: 0.15
Nodes (12): Audit Method, Files Inspected, Findings, Flex layouts, Grid layouts (mobile-first), Hero mid-right callout, Known Limitations, Reduced-motion (+4 more)

### Community 19 - "Community 19"
Cohesion: 0.17
Nodes (11): aliases, components, utils, baseColor, components, css, rsc, $schema (+3 more)

### Community 20 - "Community 20"
Cohesion: 0.18
Nodes (10): API Notes, Commands, Conventions, Git Signals, Notes, Overview, Project Instructions, Project Structure (+2 more)

### Community 21 - "Community 21"
Cohesion: 0.22
Nodes (7): dmMono, dmSans, metadata, playfair, viewport, AnalyticsProvider(), ThemeProvider()

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (10): API Notes, Commands, Conventions, Git Signals, Notes, Overview, Project Instructions, Project Structure (+2 more)

### Community 23 - "Community 23"
Cohesion: 0.18
Nodes (11): devDependencies, @biomejs/biome, @playwright/test, tailwindcss, @tailwindcss/postcss, tw-animate-css, @types/node, @types/pg (+3 more)

### Community 24 - "Community 24"
Cohesion: 0.22
Nodes (5): Answers, InboxAudit(), initialAnswers, steps, metadata

### Community 25 - "Community 25"
Cohesion: 0.28
Nodes (5): Reveal(), RevealProps, RevealVariant, timeline, TimelineWeek

### Community 26 - "Community 26"
Cohesion: 0.22
Nodes (8): Agent, Brand Positioning, Color, Components, Hard rules, Layout, Lumenosis Design System, Typography

### Community 27 - "Community 27"
Cohesion: 0.22
Nodes (8): Applied fix: color contrast (`--color-gold-italic`), Core Web Vitals, Findings + fixes, Known limitations, Lighthouse QA, Not fixed: image-size-responsive (image-size-responsive audit), Not fixed: LCP 4.0–4.3s (Performance 82–88), Scores

### Community 28 - "Community 28"
Cohesion: 0.25
Nodes (7): Aurora gradient stops, Color palette, Dark mode is default, Logo, Lumenosis AI — Brand Kit, Tagline rule, Usage rules

### Community 29 - "Community 29"
Cohesion: 0.32
Nodes (5): isAllowedListingImage(), listingImageHosts, nextConfig, projectRoot, withMDX

### Community 30 - "Community 30"
Cohesion: 0.32
Nodes (6): formatResponseTarget(), leaks, Stat, StatItem(), stats, useProgress()

### Community 31 - "Community 31"
Cohesion: 0.25
Nodes (7): Acceptable use, Compliance, Contact, Disputes, Limitation of liability, Services, Termination

### Community 32 - "Community 32"
Cohesion: 0.33
Nodes (4): caseStudies, CaseStudy, CaseStudyCard, categoryLabels

### Community 33 - "Community 33"
Cohesion: 0.48
Nodes (6): createMauticContact(), Lead, leadFrom(), POST(), slug(), value()

### Community 34 - "Community 34"
Cohesion: 0.29
Nodes (6): Architecture, Contracts, Motion system, The story (section beats), Timing + easing tokens, Verifying changes

### Community 35 - "Community 35"
Cohesion: 0.29
Nodes (7): scripts, build, dev, format, lint, start, test

### Community 36 - "Community 36"
Cohesion: 0.29
Nodes (6): Contact, How long we keep it, Subprocessors, What we collect, Why we collect it, Your rights

### Community 37 - "Community 37"
Cohesion: 0.67
Nodes (5): demo_rooms, engagement_events, listings, outreach_drafts, prospects

### Community 39 - "Community 39"
Cohesion: 0.50
Nodes (3): Mautic automation, OCI host, Website environment

### Community 40 - "Community 40"
Cohesion: 0.50
Nodes (3): name, private, version

### Community 41 - "Community 41"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **416 isolated node(s):** `metadata`, `Demo`, `Input`, `Listing`, `senderNames` (+411 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ThemeToggle()` connect `Community 1` to `Community 15`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `cn()` connect `Community 3` to `Community 1`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `DemoRoom` connect `Community 0` to `Community 13`, `Community 15`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `isAdmin()` (e.g. with `POST()` and `POST()`) actually correct?**
  _`isAdmin()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `metadata`, `Demo`, `Input` to the rest of the system?**
  _416 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06296296296296296 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05792349726775956 - nodes in this community are weakly interconnected._