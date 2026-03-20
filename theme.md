You are a senior frontend engineer. Build a production-quality landing page and docs Site for a web app - Agent Socket.
Stack: single React component (JSX). Default export. All styles as inline JavaScript objects. Only import from: react, recharts, lucide-react, @/components/ui/*, d3, lodash. No localStorage. No external CSS files. Renders at full viewport.
Platform: Web App — Interactive single-page interface, responsive 375px–1440px+. Use React state for view switching (no external router). Simulate async operations with mocked promises and temporary state updates. Use astro and bun. Do not use npm.

## Content
Build the following elements. How they are arranged, spaced, and styled is defined by the design system below — not by conventional patterns for this project type.

Landing Page: Build a single page landing page with a top nav and the logo on the upper left. The right side has a docs link.

Build a documentation site with these sections:

**Layout**: Three-column on desktop — Left sidebar (navigation tree), Center content (documentation), Right sidebar (on-page TOC). Responsive: tablet collapses right sidebar, mobile collapses both to hamburger drawer.

**Left sidebar**: Collapsible navigation tree — section headers (bold), sub-items (indent, normal weight). Expand/collapse chevrons. Current page highlighted with accent left border. Search shortcut hint (Cmd+K). Version switcher dropdown at top.

**Search modal** (Cmd+K trigger): Centered overlay with backdrop blur. Search input with magnifier icon. Live results: page title, section, text preview snippet with highlighted matches. Keyboard navigation (arrow keys + enter). Recent searches. No results state.

**Content area**: Page title (h1), breadcrumb trail, "Last updated" timestamp. Body text: paragraphs, headings (h2-h4) with hover anchor links. Ordered and unordered lists. Inline code (mono background pill). Links (primary color, underlined).

**Code blocks**: Syntax highlighted (dark background), language label badge, copy button (shows "Copied!" briefly), line numbers (toggleable). Tabbed examples: show same concept in multiple languages/frameworks. Code block title/filename.

**Callout boxes**: Tip (green left border, lightbulb icon), Warning (amber border, alert icon), Note (blue border, info icon), Danger (red border, error icon). Each with icon, title, body text.

**Right TOC**: Sticky sidebar tracking current section. Section links highlight on scroll. "On this page" header. Indent for h3 under h2.

**Footer navigation**: Previous / Next page links with page titles. "Edit this page on GitHub" link. "Was this helpful?" feedback buttons (thumbs up/down).

Anchor links smooth-scroll. Code copy shows brief success state. TOC highlights transition smoothly. Sidebar sections animate open/closed.


# Design System Specification

The design system below is the single source of truth. It overrides any assumptions about what a 'Documentation Site' typically looks like. Apply these tokens exactly — colors, spacing, radius, elevation, motion — even if they contradict conventional patterns for this project type.

Use only the tokens defined below within each category. Do not introduce new values. If a token cannot be applied under stack constraints, skip it rather than approximating.

## Design DNA (read this first)

- Preset: Glassmorphism — all tokens below derive from this aesthetic. Maintain its visual identity.
- Layout: Contained layout — max-width 1280px, 12-column grid. Gutter 24px, margin 32px.
- Spacing: Generous spacing — lots of breathing room, editorial feel. Base unit 32px, baseline grid 8px.
- Surfaces: Moderately rounded (16px) — friendly but structured. Bordered (1px at 8% opacity) — explicit structure. Layered elevation — shadow for depth hierarchy.
- Motion: Relaxed motion — smooth, cinematic transitions.
- Color: Primary #6366F1 + Accent #06B6D4 — vibrant, saturated palette. on #111110 background.
- Type: DM Sans (single font system).

This combination defines the visual personality. Every token below serves this DNA. Prioritize tokens that reinforce these characteristics.

## 1. Color Tokens

### Primary: #6366F1 — hsl(239, 84%, 67%)
Shades (darker): primary-100: #000144, primary-200: #010388, primary-300: #0609c7, primary-400: #1f23f2
Base: primary-500: #6366F1
Tints (lighter): primary-600: #8b8dec, primary-700: #aeafeb, primary-800: #cdcdee, primary-900: #e8e8f4
Text on primary: #06060e (primary), #27285e (secondary)

### Secondary: #8B5CF6 — hsl(258, 90%, 66%)
Shades (darker): secondary-100: #140043, secondary-200: #280087, secondary-300: #3d00ca, secondary-400: #5914f9
Base: secondary-500: #8B5CF6
Tints (lighter): secondary-600: #a484ef, secondary-700: #bda9ed, secondary-800: #d5caee, secondary-900: #ebe7f5
Text on secondary: #110b1e (primary), #392665 (secondary)

### Accent: #06B6D4 — hsl(189, 94%, 43%)
Shades (darker): accent-100: #00252c, accent-200: #004b58, accent-300: #007084, accent-400: #0095af
Base: accent-500: #06B6D4
Tints (lighter): accent-600: #2dcde9, accent-700: #6dd1e3, accent-800: #a5dbe5, accent-900: #d6eaee
Text on accent: #01282f (primary), #035d6c (secondary)

### Background & Surfaces
- Background: #111110
- surface-1: #4f4f47 | surface-2: #8d8d81 | surface-3: #c6c6c0 (progressively lighter shades)
- Border: rgba(255,255,255,0.08)
- Text primary: #eeeee8, secondary: #bbbbb4, tertiary: #88887e, disabled: #55554e

### Semantic Colors
- Success: #22C55E | Warning: #F59E0B | Error: #EF4444 | Info: #3B82F6

### Interactive State Colors (derived from primary)
- Primary hover: #3f42ee
- Primary active: #1e21eb
- Ghost hover bg: rgba(99, 102, 241, 0.08)
- Disabled opacity: 0.4 (applied to all disabled interactive elements — buttons, inputs, selects)

### Focus Indicator Strategy
- Buttons/links/cards: outline: 2px solid #06B6D4, offset 2px. No transition.
- Inputs: border 1px solid #6366F1 + box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2). Transition: 180ms.
- Never remove focus without replacement. Never combine outline + box-shadow on same element.

### Overlay & Effects
- Backdrop overlay: rgba(0,0,0, 0.6)
- Uniform overlay (cover cards): rgba(0,0,0, 0.35)
- Backdrop blur: blur(4px)
- Scrim gradient: linear-gradient(transparent, rgba(0,0,0, 0.6))

## 2. Typography

### Heading Font: DM Sans
- Family: 'DM Sans', 'Helvetica Neue', Arial, sans-serif
- Load: inject via <style> tag: @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap')
- Weights available: 400, 500, 600, 700
- Use for: page titles, section headers, hero text, display numbers, card headings

### Body Font: DM Sans
- Family: 'DM Sans', 'Helvetica Neue', Arial, sans-serif
- Load: inject via <style> tag: @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap')
- Weights available: 400, 500, 600, 700
- Use for: paragraphs, UI labels, buttons, inputs, captions, navigation, metadata

### Pairing Strategy
DM Sans + DM Sans (both sans) — cohesion through same category. Differentiate via weight: heading at 600-700 for titles, body at 400 for text.

### Type Scale — Major Third (ratio 1.25)
Apply these exact values. Define as CSS custom properties or design tokens:

**Caption** → font-family: DM Sans | font-size: 12px | font-weight: 400 | line-height: 24px (1.4 → snapped to 8px grid) | letter-spacing: 0.01em
**Body** → font-family: DM Sans | font-size: 16px | font-weight: 400 | line-height: 32px (1.6 → snapped to 8px grid) | letter-spacing: 0em
**Subhead** → font-family: DM Sans | font-size: 20px | font-weight: 500 | line-height: 32px (1.35 → snapped to 8px grid) | letter-spacing: 0em
**Title** → font-family: DM Sans | font-size: 24px | font-weight: 600 | line-height: 32px (1.2 → snapped to 8px grid) | letter-spacing: -0.01em
**Headline** → font-family: DM Sans | font-size: 32px | font-weight: 700 | line-height: 40px (1.2 → snapped to 8px grid) | letter-spacing: -0.015em
**Display** → font-family: DM Sans | font-size: 40px | font-weight: 700 | line-height: 48px (1.2 → snapped to 8px grid) | letter-spacing: -0.02em

### Iconography — Lucide
- Library: Lucide (1,500+ icons) by Community (Feather fork)
- Styles: Outline · adjustable stroke
- Grid: 24px · 2px rounded strokes — clean, modern, widely adopted
- Style: Outlined, stroke-width 2px, linecap round
- License: ISC · lucide.dev
- Implementation: import icons by PascalCase name from lucide-react. Example: import { Search, Home, Heart, User, Settings, Menu, X, ArrowRight, Check, Plus, Trash2, Eye, Bell, Mail, ChevronDown, Filter, Star, Bookmark, Share2, ExternalLink } from lucide-react. Render as JSX component with size prop, e.g. size 20.

## 3. Surfaces & Depth

### Border Radius
- Base (md): 16px
- Scale: xs 4px · sm 8px · md 16px · lg 24px · xl 32px · full 9999px
- Component mapping:
  - Buttons: sm (8px)
  - Inputs / Selects: sm (8px)
  - Cards: md (16px)
  - Modals / Dialogs: lg (24px)
  - Tooltips / Popovers: xs (4px)
  - Badges / Tags: full (9999px)
  - Chips: full (9999px)
  - Avatars: full (9999px)
  - Switches / Toggles: full (9999px)
  - Inner elements: subtract parent padding (e.g. card inner radius = md − card padding)

### Elevation (Box Shadow)
- **Low** (cards, inputs, list items): box-shadow: 0 0px 1px 0px rgba(0,0,0,0.047),0 1px 3px 0px rgba(0,0,0,0.035)
- **Mid** (dropdowns, tooltips, popovers): box-shadow: 0 1px 3px 0px rgba(0,0,0,0.08),0 2px 8px 0px rgba(0,0,0,0.06)
- **High** (modals, dialogs, drawers): box-shadow: 0 2px 7px 0px rgba(0,0,0,0.119),0 4px 18px 0px rgba(0,0,0,0.089)
- Hover lift: transition from Low → Mid (cards gain depth on hover)
- Active press: reduce current level to 60% of its values
- Focus indicators use outline or box-shadow as defined in Focus Indicator Strategy (§1). These are accessibility markers, NOT decorative elevation — always permitted regardless of flat/shadow setting.

### Borders
- Width: 1px | Style: solid
- Color (dark): rgba(255,255,255,0.08) | Color (light): rgba(255,255,255,0.08)
- Component mapping:
  - Cards / Panels: 1px solid, 8% opacity
  - Inputs (default): 1px solid, 8% opacity
  - Inputs (focus): border color changes to primary + focus ring as defined in Focus Indicator Strategy (§1)
  - Outlined / secondary buttons: 1px solid, 8% opacity
- Dividers (section breaks): 1px solid, 4% opacity — lighter than component borders
- Separators (within components): 1px solid, 8% opacity
- Border opacity scale (all formally defined tokens):
  - Base: 0.08 (8%) — default state
  - Divider: 0.04 (4%) — section breaks, lighter than components
  - Hover: 0.12 (12%) — interactive hover state
  - Focus: 0.16 (16%) — interactive focus state
- Pre-computed border color tokens (dark theme — use these directly in code):
  - border-base: rgba(255,255,255,0.08)
  - border-divider: rgba(255,255,255,0.04)
  - border-hover: rgba(255,255,255,0.12)
  - border-focus: rgba(255,255,255,0.16)
- Interactive: on hover use border-hover, on focus use border-focus from the tokens above.

### Card Anatomy
- Outer radius: 16px
- Card padding: 24px
- Inner radius: 0px — formula: outer(16) − padding(24) = inner(0). Always apply this relationship.
- Content gap: 16px between elements
- Text inset: additional 4px uniform padding around content zones (all sides). Total text padding from card edge: 28px. Use when aggressive radius needs extra breathing room for text.
- Image aspect-ratio: 16/9 — use CSS aspect-ratio property directly, not padding hacks
- Image fit: object-fit: cover (crop to fill, no empty space)
- Content alignment: text-align left, flex items align-items flex-start
- Vertical content alignment: center (vertically centered)
- Actions: aligned left
- CTA button radius: 9999px (pill)

#### Card Layouts (4 active: Top image, Inset, Text only, List item):
- Top image: image flush to top/side edges, no padding. overflow:hidden clips to outer radius. Content padded below. Standard blog/product card.
- Inset: 24px padding throughout. Image inside gets border-radius 0px. Consistent negative space between image and card corners. Refined, contained look.
- Text only: no image. 24px padding. Title, body text, optional action row. Use for content summaries, announcements, simple info blocks.
- List item: compact horizontal row. Small thumbnail (32–40px, inner radius), title + subtitle stacked, chevron or action on right. Reduced vertical padding (60% of card padding). Stack multiple with 4.8px gap. Use for search results, notification lists, file browsers.

#### Contextual Card Mapping (Documentation Site):
The following cards should be understood in context — they are not generic containers but specific UI patterns for this webapp:

- **Top image** → tutorial card — illustration or screenshot on top, tutorial title and difficulty below
- **Inset** → documentation card — contained example or code preview with consistent padding
- **Text only** → content block — the primary documentation unit. Headings, paragraphs, inline code
- **List item** → navigation item — doc pages, API endpoints, changelog entries in compact rows

#### Composition Guidance:
- Rich palette: 4 card types. Establish clear hierarchy — designate 1-2 types as the dominant grid pattern, others for specialized sections. Never mix all 4 types in a single view.

#### Absence Analysis:
- No dedicated CTA or pricing cards. Conversion actions should be inline — buttons within content cards, sticky nav CTAs, or section-level call-to-actions rather than standalone card-based prompts.

#### Pattern Recognition:
- Visual-first: image cards dominate. Prioritize large, high-quality imagery. Text should support images, not compete.

## 4. Layout & Spacing

### Grid: 12 columns, 24px gutter, 32px margin
- CSS: display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px
- Rows: content-driven (auto) — row heights determined by content, vertical spacing controlled by gap and margin tokens.
- Container: max-width 1280px, margin 0 auto, padding 0 32px
- Responsive breakpoints:
  - xs (base): 1 columns, 8px gutter, 16px margin
  - sm (≥640px): 2 columns, 12px gutter, 24px margin
  - md (≥768px): 6 columns, 24px gutter, 32px margin
  - lg (≥1024px): 8 columns, 24px gutter, 32px margin
  - xl (≥1280px): 12 columns, 24px gutter, 32px margin
  - 2xl (≥1536px): 12 columns, 24px gutter, 32px margin
- Content area: 1216px max
- Sidebar pattern: content occupies ~8/12 cols, sidebar ~4/12 cols on lg+

### Spacing (density: spacious, base: 32px)
Scale: 4xs:4px | 3xs:8px | 2xs:12px | xs:16px | sm:24px | md:32px | lg:48px | xl:64px | 2xl:96px | 3xl:128px | 4xl:192px
Baseline grid: 8px — all line-heights (computed px), paddings, margins, and gaps must be multiples of 8px. This creates consistent vertical rhythm across the entire UI.
Use only these values for layout margin, padding, and gap. Values in Component Sizing (heights, internal padding) and Focus Dimension Tokens are declared independently in their respective sections.

### Component Sizing
- Button height: 64px (sm: 48px, lg: 80px)
- Input height: 64px, horizontal padding 19px
- Icon: 16px sm, 20px default, 24px lg
- Avatar: 32px sm, 40px md, 48px lg
- Touch target minimum: 44×44px
- Modal max-width: 480px

## 5. Motion (Playful)

### Timing Tokens
| Role | Duration | Easing |
|------|----------|--------|
| Micro (hover, focus, press) | 180ms | ease |
| Base (dropdown, tooltip, toggle) | 350ms | cubic-bezier(0,0,.2,1) |
| Medium (modal, drawer, panel) | 500ms | cubic-bezier(0,0,.2,1) |
| Large (page, hero, onboarding) | 800ms | cubic-bezier(0,0,.2,1) |

### Easing by Intent
- Enter: cubic-bezier(0,0,.2,1) | Exit: cubic-bezier(.4,0,1,1) | Move: ease | Micro: ease

### Exit Durations (pre-computed: enter × 0.6)
- Press: 108ms | Dropdown exit: 210ms | Modal exit: 300ms | Toast exit: 175ms

### Transitions (apply these exactly)
- Hover: all 180ms ease
- Press: scale(0.97) 108ms ease
- Dropdown: translateY(-4px→0) + opacity 350ms enter / 210ms exit
- Modal: scale(0.92→1) + translateY(8px→0) 500ms enter / 300ms exit
- Page enter: translateY(12px→0) + opacity 800ms, children stagger 50ms
- Scroll reveal: IntersectionObserver, translateY(20px→0) + opacity, once
- Card hover: translateY(-1px) + shadow lift. Card active: scale(0.99)

### Stagger: 50ms per child, pattern: cascade
- @media (prefers-reduced-motion: reduce): disable all animation

### Implementation Note
- Inline style objects for ALL styling. <style> tag ONLY for @import, @keyframes, @media.
- Stagger via transitionDelay: `${index * 50}ms`

## 6. Visual Direction

**Glassmorphism**: Frosted glass panels with blur effect over gradient or image backgrounds. Semi-transparent card surfaces. Subtle thin borders at low opacity. Layered depth through transparency, not shadow.

## 7. Component Specifications

### Buttons
**Primary button**
- background: #6366F1
- color: #06060e
- border-radius: 8px
- height: 64px
- padding: 0 32px
- font-weight: 500
- border: none

**Secondary button**
- background: transparent
- color: #6366F1
- border: 1px solid #6366F1

**Ghost button**
- background: transparent
- border: none
- color: #6366F1

**Button states**
- Hover: background #3f42ee, transition 180ms ease
- Active: background #1e21eb, transform scale(0.98)
- Disabled: opacity 0.4, pointer-events none
- Focus: outline 2px solid #06B6D4, outline-offset 2px
- Ghost hover: background rgba(99, 102, 241, 0.08)

### Cards
**Default state**
- background: #1a1a19
- border-radius: 16px
- padding: 24px
- box-shadow: 0 0px 1px 0px rgba(0,0,0,0.047),0 1px 3px 0px rgba(0,0,0,0.035)

**Hover state**
- box-shadow: 0 1px 3px 0px rgba(0,0,0,0.08),0 2px 8px 0px rgba(0,0,0,0.06)
- transform: translateY(-1px)
- transition: all 180ms ease

**Active state**
- transform: scale(0.99)

### Inputs
**Default state**
- height: 64px
- border-radius: 8px
- padding: 0 19px
- background: transparent
- border: 1px solid rgba(255,255,255,0.08)

**Focus state**
- border: 1px solid #6366F1
- box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2)

**Error state**
- border: 1px solid #EF4444

**Disabled state**
- background: #222221
- opacity: 0.4

### Modals
**Backdrop**
- background: rgba(0,0,0,0.6), backdrop-filter: blur(4px)

**Panel**
- background: #1a1a19
- border-radius: 24px
- box-shadow: 0 2px 7px 0px rgba(0,0,0,0.119),0 4px 18px 0px rgba(0,0,0,0.089)
- max-width: 480px
- padding: 48px

### Dropdowns / Popovers
- background: #222221
- border-radius: 4px
- box-shadow: 0 1px 3px 0px rgba(0,0,0,0.08),0 2px 8px 0px rgba(0,0,0,0.06)
- border: 1px solid rgba(255,255,255,0.08)
- offset: 13px from trigger
- enter animation: scale(0.95) → scale(1), opacity 0 → 1, duration 350ms, easing cubic-bezier(0,0,.2,1)

### Tooltips
- background: #2a2a28
- border-radius: 4px
- padding: 8px 16px
- font-size: 12px
- enter animation: fade, duration 180ms, easing ease

### Toast / Snackbar
- position: fixed, bottom-right, 32px from edges
- background: #222221
- border-radius: 8px
- box-shadow: 0 1px 3px 0px rgba(0,0,0,0.08),0 2px 8px 0px rgba(0,0,0,0.06)
- auto-dismiss: 5s
- enter: slide-up + fade, duration 350ms, easing cubic-bezier(0,0,.2,1)
- exit: fade, duration 175ms, easing cubic-bezier(.4,0,1,1)
- stack: up to 3 visible, gap 16px

## 8. Accessibility

- WCAG AA contrast (4.5:1 body, 3:1 large). Focus: outline #06B6D4 2px for buttons/links, box-shadow ring for inputs. Keyboard: Tab + Enter/Space. ARIA labels on icon buttons, aria-expanded on toggles, aria-live on dynamic content. Color never sole indicator.

## 9. Implementation: Claude

- Single React component, default export. All styles inline. Import only: react, recharts, lucide-react, d3, lodash, shadcn/ui. React hooks for state. No localStorage. Use recharts for all chart visualizations; use d3 only for custom calculations or layouts that recharts cannot handle.

# Output Requirements

1. The design system above is law. Apply every token exactly as specified — do not default to conventional patterns for this project type.
2. Implement all interactive states (hover, focus, active, disabled) on every interactive element
3. Responsive: handle 375px, 768px, 1024px, 1440px. Prefer @media queries injected via <style> tag. Use useEffect resize listener only for conditional rendering logic.
4. Smooth transitions on all state changes using the specified easing
5. Use realistic placeholder data — no 'lorem ipsum'
6. The result must look like a polished production app, not a prototype
