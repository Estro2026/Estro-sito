# ESTRO — UI & Motion Rules for all remaining pages

## Purpose
Use this file as the **single implementation brief** for all remaining ESTRO pages.

Canonical references:
- **Homepage:** `/index.html`
- **Social Media Management:** `/servizi/social-media-management.html`

These two pages are the visual/motion source of truth.
Before editing another page, inspect their **current local implementation** and reuse the same classes, helpers, timings, easing, scroll logic and responsive behavior wherever the same pattern exists.

> If the local working tree differs from older Git history or older generic templates, the **current homepage + current Social Media Management page win**.

---

## 1. Non-negotiable rules

- Preserve existing **copy, URLs, SEO, forms, section order and business logic**.
- Preserve the current page structure unless a specific task explicitly requires otherwise.
- Do not redesign each service page independently.
- Do not invent new motion patterns when an equivalent already exists in Homepage or Social Media Management.
- Reuse current components/classes/helpers before creating new CSS or JS.
- Avoid duplicate CSS/JS.
- Keep the ESTRO visual identity consistent across all pages.
- Use existing assets from the repository.
- Do not introduce external assets or libraries unless already required by the project.

---

## 2. Design system

Use the existing CSS tokens. Do not hardcode close-but-different colors.

```css
--primary: #DB005A;
--black: #000000;
--white: #FFFFFF;

--font-primary: 'VanguardCF', 'Impact', 'Arial Black', sans-serif;
--font-secondary: 'Poppins', 'Roboto', 'Helvetica Neue', Arial, sans-serif;

--max-w: 1440px;
--gutter: clamp(1.5rem, 5vw, 5rem);

--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);
```

### Typography
- Vanguard = hero titles, large section titles, major statements.
- Poppins/Roboto = body, UI, menu, CTA, forms, supporting copy.
- Preserve intentional line breaks.
- **Never split a word internally.**
- If a required line does not fit, first adjust column width/grid/max-width/padding; do not arbitrarily shrink the typography.

---

# 3. Motion reference map

Use this mapping on every remaining page.

| Element/pattern | Canonical reference |
|---|---|
| Hero text entrance on page load | Social Media Management hero / current Homepage hero behavior |
| Large section-title reveal | Current `ABOUT` background/title + equivalent main title reveals on Homepage |
| Editorial heading reveal | `TIPS & TRICKS` on Homepage |
| Standard heading/body reveal | Current Homepage Services/About + Social Media Management |
| Light ↔ dark section transition | Social Media Management |
| Compact service-section transitions | Social Media Management service blocks |
| Clients/brands heading + logo motion | Current Homepage/Social Media Management clients section |
| Final CTA/contact transition | Homepage contact/footer or Social Media Management final CTA/footer, matching the page structure |
| Header light/dark behavior | Homepage + Social Media Management current implementation |

Do not approximate these patterns. **Find the existing implementation and reuse it.**

---

# 4. Hero rules

For service pages:

- Keep each page's existing hero structure/content.
- On initial page load, hero content must reveal progressively, using the same language already approved.
- Left/text content must not simply appear already visible.
- Use a restrained sequence such as:
  1. eyebrow/kicker
  2. title
  3. body/supporting text
  4. CTA/form
- Do not require user scroll to reveal the main hero content.
- Final positions must remain unchanged after animation.
- Avoid aggressive scale/zoom.

---

# 5. Title reveal rules

All equivalent **major section headings** across the site must use one coherent motion language.

Examples:
- `SERVIZI`
- `ABOUT`
- `ALCUNI AMICI SODDISFATTI CHE CI HANNO DATO FIDUCIA`
- `CASE STUDIES`
- equivalent titles on other service pages

### Rule
Reuse the existing title reveal from the canonical pages:
- same mask/clip behavior
- same direction
- same translate distance
- same opacity behavior
- same easing
- same scrub logic
- same reverse behavior

### Scroll direction
All scroll-driven title reveals must be reversible:

```text
scroll down → reveal forward
stop        → animation stops with scroll
scroll up   → same reveal in reverse
```

Do not create separate `scrollDown` and `scrollUp` animations.

### Editorial titles
If a heading corresponds visually to Homepage `TIPS & TRICKS`, reuse **that exact reveal** rather than creating a third title system.

---

# 6. Body text / supporting content reveal

Use the same reveal language already implemented in the reference pages.

- Body, labels, CTA and secondary content should follow the heading with a controlled stagger.
- Do not make every element animate differently.
- Prefer:
  - `opacity`
  - `transform`
  - existing mask/clip patterns
- Avoid excessive blur and heavy filters.
- Keep text readable during the entire transition.
- Preserve natural reading order.

Recommended hierarchy:

```text
section heading
→ supporting heading/subtitle
→ body
→ list/details
→ CTA
→ visual if applicable
```

---

# 7. Alternating light/dark service sections

This is a **core rule for the remaining service pages**.

Many service pages contain alternating light, dark and/or fuchsia sections.
Use **Social Media Management as the canonical reference** for how these transitions behave.

## Compact sections
On pages where sections are more compact than full viewport:

- Do not force them to `100vh`.
- Keep their existing content height.
- Begin the transition when the **incoming section becomes the protagonist around the center of the viewport**.
- Practical reference: incoming section `top` near `50%` viewport, adjusted only if necessary for the real layout.

### Transition behavior

When moving from Section A to Section B:

```text
Section A normal
↓
Section B approaches center viewport
↓
Section A progressively fades/transitions toward Section B's actual background
↓
Section B content reveals
↓
Section B becomes visually dominant
```

If B is dark:
```text
light → progressively darker → exact dark background of B
```

If B is light:
```text
dark → progressively lighter → exact light background of B
```

If B is fuchsia:
```text
previous background → exact ESTRO fuchsia (#DB005A)
```

### Important
- Use the **actual background token/value of the next section**.
- Never use an arbitrary intermediate dark or "similar" color.
- No visible seam between adjacent sections.
- Transition must reverse correctly on scroll-up.

---

# 8. Full-viewport / sticky sections

Do **not** make every page full viewport by default.

Use full-viewport/sticky behavior only where the new page contains a section structurally equivalent to the approved Homepage/About/Services patterns.

When applicable:

- visual active area = approximately one viewport
- the section may remain visually stable while internal animation progresses
- reuse the same technical pattern already working in the reference page
- do not create a new pinning system

Avoid:
- multiple overlapping pins
- full-page scroll hijacking
- `scroll-snap`
- forced `scrollTo()`
- wheel interception
- artificial pauses

One section must release before the next sticky/pinned section takes control.

---

# 9. Scroll behavior and performance

**Fluidity is higher priority than decorative motion.**

### Required
- One coherent scroll architecture.
- Reuse the current project scroll system.
- Scroll must remain controllable at all times.
- Animations follow scroll; scroll must not fight animations.
- Scroll-up must be as stable as scroll-down.

### Avoid
- duplicate scroll managers
- duplicate `requestAnimationFrame` loops controlling the same property
- several overlapping ScrollTriggers for one transition when one master progress can do it
- refreshing layout continuously while scrolling
- animating `width`, `height`, `margin`, `padding`, `top`, `left` frame-by-frame when transform can do the job
- heavy animated blur
- layout shifts caused by late-loading media

### Prefer
```css
transform
opacity
clip-path /* only where already used and performant */
```

For horizontal movement:
```css
transform: translate3d(...);
```

For growing bands:
```css
transform: scaleX(...);
transform-origin: left center;
```

---

# 10. Header / menu color behavior

The menu must always maintain contrast with the **background actually visible behind the header**.

### Dark background
- menu label/text = white
- menu icon = white

### Light background
- menu label/text = dark/black
- menu icon = dark/black

### Critical rule
Do **not** determine the menu theme only from:
- section ID
- active section
- a basic IntersectionObserver state

This fails during background transitions.

The header theme must follow the **same transition progress that changes the visible background**.

Example:

```text
dark section → fade toward white
              ↓
header changes to dark foreground as soon as the background under it becomes light enough
```

and vice versa.

Menu text and icon must share the same foreground source:
```css
color: var(--header-foreground);
```

SVG icon:
```css
stroke: currentColor;
/* or fill: currentColor when appropriate */
```

Use a short color transition only to avoid flashing.

The current Homepage/Social Media Management header implementation is the reference. Fix/reuse it globally rather than adding page-specific header hacks.

---

# 11. Service content blocks

For service-detail sections equivalent to the Social Media Management blocks such as:
- editorial/storytelling
- identity
- content
- community
- marketing
- filters / secondary capabilities

apply the same system:

- preserve the existing two-column or alternating layout
- preserve actual page copy
- preserve image/visual position
- apply the same section-entry reveal
- apply the same background fade into the next section
- reverse naturally on scroll-up
- never add a random fuchsia gradient if the reference section does not have one

If an image/placeholder exists in the page structure, keep it.
Do not remove visual placeholders to simplify animation.

---

# 12. Images and videos

- Preserve aspect ratio.
- Do not use aggressive `scale()` simply to fill a container.
- Prefer correct container sizing and `object-position`.
- Important subjects must not be pushed outside the viewport.
- Avoid unnecessary cropping.
- Do not create horizontal overflow.
- Scroll-driven media must have one source of scroll progress and one update loop.
- If a video is scrubbed, do not bind large `currentTime` jumps directly to wheel events.

---

# 13. Clients / brands section

If a page contains:

`ALCUNI AMICI SODDISFATTI CHE CI HANNO DATO FIDUCIA`

use the current approved clients implementation as the reference.

Rules:
- same heading reveal language as the canonical large titles
- use the current updated logo assets already used by the reference page
- preserve the approved number of rows/layout for that page
- preserve the current approved scroll/marquee behavior
- do not revert to an older generic logo grid
- maintain logo proportions with `object-fit: contain`
- do not stretch or recolor brand logos

---

# 14. "Other services / magic" sections

If another page contains a cross-service block equivalent to:

`SAPPIAMO FARE UN SACCO DI ALTRE MAGIE`

reuse its current reveal/fade logic exactly.

This includes:
- entrance reveal
- exit fade
- background transition
- reverse behavior

Do not rebuild it as a new animation.

---

# 15. Final CTA / contact / footer transition

Match the final-section structure to the nearest canonical reference.

## If equivalent to Homepage Contact → Footer
Reuse the exact Homepage behavior.

## If equivalent to Social Media Management "Prendiamoci un caffè" → Footer
Reuse the exact Social Media Management behavior.

### Rules
- No visible hard seam before footer.
- Final section must transition to the **exact footer background**.
- Content fade and background fade must remain coordinated.
- Reverse correctly on scroll-up.
- Do not start the final fade too early if the reference keeps the CTA visible until near the bottom.
- Use the footer's actual CSS token/value, not a visually similar color.

---

# 16. Responsive rules

Desktop behavior is the primary motion reference, but all pages must remain stable on tablet/mobile.

### Never
- split a single word internally
- allow animations to create horizontal scrolling
- let fixed/sticky header cover critical content
- preserve desktop pinning if it becomes unstable on mobile

### Do
- preserve explicit editorial line breaks where required
- use `white-space: nowrap` only on intentional line groups/words
- adapt columns naturally
- reduce motion complexity where needed
- keep content reachable even on short-height viewports
- respect `prefers-reduced-motion`

---

# 17. Implementation workflow for every remaining page

Do this in order:

1. Open the target page.
2. Open current `/index.html`.
3. Open current `/servizi/social-media-management.html`.
4. Identify each target section's closest canonical equivalent.
5. Reuse the exact existing class/helper/timeline whenever possible.
6. Only create a new utility if the pattern is truly reusable and does not already exist.
7. Preserve the target page's copy, section order and media.
8. Test scroll down slowly.
9. Test scroll up slowly.
10. Test fast direction changes.
11. Test menu contrast during every light/dark/fuchsia transition.
12. Test 1920, 1440, 1366/1280 desktop widths, then tablet/mobile.
13. Remove duplicate/obsolete page-specific animation code.

---

# 18. Acceptance checklist

A page is complete only if:

- [ ] It clearly belongs to the same visual system as Homepage + Social Media Management.
- [ ] Hero content reveals correctly.
- [ ] Major titles use the approved reveal, not a new variant.
- [ ] Body/CTA reveals are coherent and restrained.
- [ ] Light/dark/fuchsia transitions use the next section's exact background.
- [ ] Compact service transitions begin when the incoming section is around viewport center.
- [ ] Scroll down is fluid.
- [ ] Scroll up is equally fluid and fully reversible.
- [ ] No snap, jump, lock or unexpected resistance.
- [ ] Header menu/icon always have correct contrast, including mid-transition.
- [ ] Images/video are not unnecessarily cropped or pushed off-screen.
- [ ] No words are broken internally.
- [ ] No unintended horizontal overflow.
- [ ] Final section/footer transition matches its canonical reference.
- [ ] Mobile keeps the same visual hierarchy without unstable sticky/pin behavior.
- [ ] No duplicate CSS/JS was introduced.

---

# 19. Claude Code output rule

When this file is supplied with a page task:

- **Do not explain the design decisions.**
- Inspect the two reference pages and implement directly.
- Make the smallest coherent diff.
- Prefer editing existing files/classes/helpers.
- Do not restate this brief.
- Do not create a report unless explicitly requested.
- At the end, report only:
  1. files changed
  2. short list of implemented behaviors
  3. any real blocker that could not be resolved

**Homepage and Social Media Management are the canonical reference for the rest of the site.**
