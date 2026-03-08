# Ashutosh Tripathi – Developer Portfolio

## Current State

The project currently contains a cinematic scroll-based storytelling portfolio (Morning → Day → Evening → Night concept) with a walking silhouette character, sky crossfade layers, and content sections (MorningSection, DaySection, EveningSection, NightSection, AuthoritySection, CTASection, Footer).

## Requested Changes (Diff)

### Add

- Multi-page React Router navigation with 5 routes: Home, About, Skills, Projects, Contact
- Fixed top navigation bar with smooth scroll and mobile hamburger menu
- Home page: hero with profile image, name, title, intro text, CTA buttons ("View Projects" / "Contact Me"), featured projects preview, skills preview
- About page: personal intro, education section, career goals, experience timeline, developer journey
- Skills page: animated skill cards with progress bars for HTML, CSS, JavaScript, React, Node.js, MongoDB, Git, REST APIs
- Projects page: card grid with project screenshot, title, description, tech stack tags, GitHub + Live Demo buttons, hover animations
- Contact page: contact form (Name, Email, Message), email/GitHub/LinkedIn links, social icons
- Footer with copyright and social links
- Profile image asset (generated)
- Project placeholder images (generated)
- Dark theme color system: Background #0f172a, Primary #2563eb, Text #f8fafc, Accent #38bdf8
- Smooth scroll behavior and fade-in animations on scroll

### Modify

- Replace App.tsx entirely — remove cinematic scroll logic and replace with React Router multi-page layout
- Replace index.css — remove old scroll-based styles, apply new dark developer theme tokens
- All existing component files will be replaced with new page components

### Remove

- All existing cinematic components: MorningSection, DaySection, EveningSection, NightSection, AuthoritySection, CTASection, WalkingSilhouette, CelestialLayer, LandscapeLayer, StarsLayer
- Sky background images (no longer needed)
- Scroll progress logic and phase computation

## Implementation Plan

1. Generate profile avatar and project cover images
2. Update index.css with new dark developer theme tokens (CSS custom properties, font imports, base resets)
3. Rewrite App.tsx to use React Router with a NavBar, routes for all 5 pages, and a Footer
4. Create NavBar component with fixed positioning, logo/name, desktop nav links, mobile hamburger drawer
5. Create HomePage with: HeroSection, FeaturedProjects, SkillsPreview
6. Create AboutPage with: PersonalIntro, EducationSection, ExperienceTimeline, DeveloperJourney
7. Create SkillsPage with animated skill cards/progress bars
8. Create ProjectsPage with card grid (screenshot, title, description, tech tags, GitHub/Demo buttons)
9. Create ContactPage with contact form and social links
10. Create shared Footer component
11. Validate and deploy
