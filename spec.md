# Day Journey Portfolio

## Current State

A cinematic scroll-based storytelling portfolio with:
- Photographic sky crossfade system (4 sky layers at z:0)
- Atmospheric overlay + vignette
- Stars, Landscape (hills → skyline), Celestial layers
- WalkingSilhouette with phase-accurate shadows and CTA turn
- 5 content sections: MorningSection, DaySection, EveningSection, NightSection, CTASection, Footer
- index.css with design tokens, reveal-card system, glass-card/glass-card-dark, walk animations, eyebrow-pill, etc.
- Reveal animation via IntersectionObserver + `is-visible` class
- Framer Motion in MorningSection only

## Requested Changes (Diff)

### Add
- **AuthoritySection** — new component added between EveningSection and NightSection in App.tsx
  - Headline: "Why Brands Trust My Work"
  - 4 trust points: Business-first thinking, Conversion-focused architecture, Structured execution, Long-term scalability
  - Night-phase dark glass style (glass-card-dark), minimal, professional
  - Scroll-reveal with staggered IntersectionObserver

- **Micro-interaction CSS**: button lift on hover (`translateY(-2px)`), card `scale(1.02)` on hover, soft animated underline on links, refined `.glow-btn` to remove aggressive animation

- **Star twinkle refinement**: slightly slower, more subtle twinkle keyframe

### Modify
- **Color system (index.css + all components)**:
  - Primary Dark: `#0B132B`, Secondary Dark: `#1C2541`, Accent Blue: `#3A86FF`, Soft Blue: `#4F8CC9`
  - Heading: `#F5F7FA`, Paragraph: `#B8C1EC`, Border: `rgba(255,255,255,0.08)`
  - Remove purple-heavy gradient text (night headline & CTA headline) — replace with clean blue-only gradient or solid accent
  - Reduce saturation: atmos overlay evening amber `#B44F1E` → `#A0471A` (less neon), project card accent colors muted
  - Night/CTA section text: `#B8C1EC` for body, `#F5F7FA` for headings

- **CTASection** (premium footer redesign):
  - Background: `#0B132B` with very soft layered gradient
  - Form container: glass style `rgba(255,255,255,0.03)`, border `rgba(255,255,255,0.08)`, rounded 12px
  - Headline: "Let's Build Something That Performs." (no line break gradient — solid `#F5F7FA`)
  - Subtext: "Have a project in mind? Let's create a solution that drives measurable growth."
  - Button: `#3A86FF` background, white text, subtle hover glow (no aggressive float-glow animation)
  - Center alignment, improved spacing, remove `cta-gradient-shift` animation (replace with static deep navy)

- **Scroll pacing** (DaySection, EveningSection, NightSection):
  - DaySection: headline uses `reveal-card` IntersectionObserver; paragraph fades in with 300ms delay after headline; skill cards stagger 150ms each (already partially done, refine delays)
  - EveningSection: projects load sequentially with 80ms × index stagger (already done, verify)
  - NightSection: headline reveal 300ms delay (already done), card stagger 150ms each (already done) — verify paragraph also staggers separately

- **Visual depth (LandscapeLayer)**:
  - Add a mid-distance blur layer (very light, `filter: blur(1px)`) on hills background layer
  - Ensure hills have a subtle bottom ground plane (foreground strip)
  - Slight parallax: background hill layer moves at 0.3× scroll speed, foreground at 0.5× (via CSS transform in the fixed layer)

- **Glass card borders** in NightSection and CTASection form: update to `rgba(255,255,255,0.08)` subtle borders matching new palette

- **Mobile**: section `min-height` on DaySection and EveningSection reduced from `100vh` to `auto` with `paddingTop/Bottom` enough to breathe; NightSection `min-height: 100vh` stays; CTASection `min-height` to `auto`; MorningSection stays `100vh`

- **Link underline animation**: links get `text-decoration: underline`, `text-underline-offset: 3px`, `text-decoration-color: transparent` by default, transitioning to accent on hover

- **Smooth scroll**: `html { scroll-behavior: smooth; }` already set — ensure no conflicting styles

### Remove
- Aggressive `.glow-btn` float-glow keyframe animation (replace with static box-shadow + hover glow only)
- Purple in gradient text for night/CTA headlines (remove `#B89AFF`, `#C47AFF` stops)
- `cta-gradient-shift` animation on CTASection — replace with static `#0B132B` background

## Implementation Plan

1. **index.css** — Update color tokens, refine `.glass-card-dark` borders, update `.glow-btn` to static + hover-only, add `.btn-lift` micro-interaction, add `.link-underline` animation utility, update `twinkle` keyframe to be more subtle, remove `cta-gradient-shift` from usage, add parallax CSS for landscape depth hint

2. **AuthoritySection.tsx** — Create new component with 4 trust point cards, dark glass style, scroll-reveal, professional minimal tone, dark navy background matching night phase

3. **App.tsx** — Import and render `<AuthoritySection />` between `<EveningSection />` and `<NightSection />`

4. **CTASection.tsx** — Redesign: static `#0B132B` bg, glass form wrapper (`rgba(255,255,255,0.03)`, border `rgba(255,255,255,0.08)`, 12px radius), updated headline/subtext copy, button refined to solid `#3A86FF` with subtle hover-only glow, improved spacing/centering

5. **NightSection.tsx** — Update body text to `#B8C1EC`, headings to `#F5F7FA`, remove purple from gradient headline, ensure stagger reveal works correctly

6. **DaySection.tsx** — Add reveal-card to section heading block with IntersectionObserver; paragraph staggers 300ms after headline; section `minHeight: 'auto'` on mobile via CSS

7. **EveningSection.tsx** — Update card text colors to match new night-adjacent palette (muted accent colors), update card backgrounds to use `rgba(255,255,255,0.08)` border; section `minHeight: 'auto'`

8. **MorningSection.tsx** — Minor: ensure eyebrow/subtitle colors are unchanged (warm tones preserved for morning phase)

9. **LandscapeLayer.tsx** — Add subtle parallax offset to background hill layer; add thin foreground ground strip
