---
name: Academic Mastery
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf3'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d5e3fc'
  on-surface: '#0d1c2e'
  on-surface-variant: '#444651'
  inverse-surface: '#233144'
  inverse-on-surface: '#eaf1ff'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#4e45d5'
  on-secondary: '#ffffff'
  secondary-container: '#6860ef'
  on-secondary-container: '#fffbff'
  tertiary: '#003120'
  on-tertiary: '#ffffff'
  tertiary-container: '#004a32'
  on-tertiary-container: '#4ac08f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#e3dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#100069'
  on-secondary-fixed-variant: '#372abf'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#f8f9ff'
  on-background: '#0d1c2e'
  surface-variant: '#d5e3fc'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 3rem
    fontWeight: '700'
    lineHeight: 3.5rem
    letterSpacing: -0.025em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.625rem
  title-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '600'
    lineHeight: 1.5rem
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.875rem
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  label-lg:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.025em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-sm: 1rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

### Personality & Emotional Stance
The design system projects scholarly rigor, institutional authority, and motivational clarity. Built for ambitious university candidates and educators navigating high-stakes testing, the tone balances analytical precision with reassuring approachability. It replaces exam-induced anxiety with structured, transparent progress tracking.

### Design Movement: Modern Academic Functionalism
The visual language merges Modern SaaS discipline with classical academic cues:
- **Structural Clarity:** Deliberate whitespace, crisp bounding containers, and explicit typographic hierarchy to manage dense exam modules, band score metrics, and diagnostic breakdowns.
- **Purposeful Color Coding:** Information architecture relies on cognitive anchoring—deep institutional navy commands authority, while precise emerald and indigo signals indicate performance mastery and diagnostic velocity.
- **Calibrated Approachability:** Subtly softened geometries (8px baseline radii) and open-aperture display letterforms balance formal academic demands with fatigue-free daily study sessions.

## Colors

### Palette Architecture
The palette is engineered for high legibility, strict WCAG AAA/AA compliance, and intuitive pedagogical feedback loops in a clean, daylight-optimized presentation.

- **Primary (`#1E3A8A` - Deep Oxford Navy):** Anchors primary actions, institutional branding, headers, and critical test interface frames. Communicates trust, testing standard alignment, and structural stability.
- **Secondary (`#4338CA` - Scholarly Indigo):** Drives dynamic learning states, interactive drill-downs, active diagnostic pathways, and highlighted score projections.
- **Tertiary (`#059669` - Academic Emerald):** Exclusively reserved for success states, completed competencies, band score goals achieved, and positive progress vectors.
- **Neutral (`#475569` - Slate):** Regulates structural framing, secondary metrics, question stems, and dense analytical reading passages without inducing visual fatigue.

### Contextual Pedagogical Tokens
- **Mastered (`#059669` / Surface: `#ECFDF5`):** Complete test skill acquisition, Band 7.5–9.0 performance.
- **In Progress (`#4338CA` / Surface: `#EEF2FF`):** Active test module drills, progressing bands.
- **Needs Attention (`#D97706` / Surface: `#FFFBEB`):** Systemic error patterns detected in specific question archetypes (e.g., True/False/Not Given).
- **Insufficient Data (`#64748B` / Surface: `#F1F5F9`):** Diagnostic volume below reliable predictive threshold.
- **Error / Band Penalty (`#DC2626` / Surface: `#FEF2F2`):** Time limit expirations and critical diagnostic flaws.
- **Canvas & Surface Architecture:**
  - Base Canvas: `#F8FAFC` (Slate 50)
  - Surface Card: `#FFFFFF` (Pure White)
  - Surface Subdued: `#F1F5F9` (Slate 100)
  - Border Subdued: `#E2E8F0` (Slate 200)
  - Border Strong: `#CBD5E1` (Slate 300)

## Typography

### Structural Pairings
- **Headlines (Plus Jakarta Sans):** Modern geometric grotesk with humanist underpinnings. Conveys high academic competence in dash boards, section intros, and diagnostic score displays without the sterile coldness of strict neo-grotesques.
- **Body & Data (Inter):** Maximum legibility under timed examination constraints. Neutral, highly uniform metrics allow students to parse long academic reading passages, listening audio transcripts, and dense grammatical correction feedback effortlessly.

### Typographic Hierarchy Rules
- Long-form IELTS reading passages are set exclusively using `body-lg` or `body-md` with elevated line heights (1.625–1.875x) to maintain sustained reading focus and prevent eye tracking fatigue.
- Metrics, Band Scores, and Key Performance Indicators utilize `Plus Jakarta Sans` semi-bold and bold numerals for rapid scannability in analytical dashboards.
- Status badges and metadata tags utilize uppercase `label-sm` with widened tracking (+0.04em) to ensure immediate identification at glance speed.

## Layout & Spacing

### Layout Philosophy: 12-Column Structured Diagnostic Grid
The interface enforces a responsive, fluid-grid architecture bounded inside a strict 1440px maximum display canvas. The screen splits into explicit pedagogical working areas:

- **Desktop (1024px+):** 12-column grid, 32px (`margin-lg`) margin, 24px (`gutter`) gutter. Allows clean side-by-side splits for Mock Exam modes (Passage on Left, Interactive Question Sheet on Right) and split analytics dashboards.
- **Tablet (768px – 1023px):** 8-column grid, 24px (`margin`) margin, 16px (`gutter-sm`) gutter. Modules collapse contextual drill-down sidebars into responsive bottom-sheets or tabbed states.
- **Mobile (Under 768px):** 4-column grid, 16px (`margin-sm`) margin, 16px (`gutter-sm`) gutter. Exam modules enter a distraction-free, sequential question funnel.

### Rhythm & Component Packing
- **Dense Analytical Rhythm (`space-xs` to `space-sm`):** Micro-spacing applied inside exam status pills, band metric chips, and nested tabular cells.
- **Structural Card Interior (`space-md` to `space-lg`):** Standard padding for mock test prompt cards, essay evaluation feedback panels, and skill assessment blocks.
- **Section Architecture (`space-xl` and above):** Clean structural breathing room separating high-level skill sections (Reading, Listening, Writing, Speaking).

## Elevation & Depth

### Atmospheric Strategy: Surface Layering and Crisp Architectural Borders
To prevent visual distraction during intense cognitive problem-solving, this design system minimizes heavy drop shadows, relying instead on tonal elevation, crisp boundary borders, and subtle diffuse contact elevation.

- **Level 0 (Canvas Base):** `#F8FAFC`. The foundational backdrop for testing lobbies, dashboards, and deep review pages.
- **Level 1 (Structural Cards & Data Rows):** Pure white (`#FFFFFF`) surface framed with a 1px hairline border in Slate 200 (`#E2E8F0`). Zero ambient blur; hierarchy is achieved by contrast against the canvas.
- **Level 2 (Active Examination Prompts & Hover States):** Surface remains `#FFFFFF`, accompanied by an ultra-subtle tinted contact shadow:
  - `box-shadow: 0 4px 6px -1px rgba(30, 58, 138, 0.04), 0 2px 4px -2px rgba(30, 58, 138, 0.04);`
  - Border transitions to Slate 300 (`#CBD5E1`) or Scholarly Indigo (`#4338CA`) on focused interactive elements.
- **Level 3 (Diagnostic Flyouts, Floating Audio Players & Action Modals):** Distinct floating separation:
  - `box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04);`
  - Framed with `#E2E8F0` border to preserve academic structural sharpness.

## Shapes

### Corner Curvature Language
The system adopts a Level 2 (`0.5rem` / `8px` baseline) roundedness strategy. This curvature delivers contemporary ergonomic polish while retaining crisp geometric boundaries necessary for high-density academic and assessment tools:

- **Interactive Primary Elements (`0.5rem` / `8px`):** Standard buttons, text input fields, mock exam answer selection blocks, diagnostic score meters, and analytical table containers.
- **Cards & Diagnostic Containers (`1rem` / `16px`):** Skill module overviews, test analysis cards, essay feedback boxes, and teacher review panels.
- **Interactive Badges & Score Nodes (`9999px` / Full Pill):** Status indicators, CEFR/Band badges (e.g., "Band 7.5", "Mastered"), and timed question navigation indicators remain fully rounded to provide immediate shape-based contrast against rectangular text blocks.

## Components

### 1. Buttons
- **Primary Action (Exam Submission, Section Start):** Deep Oxford Navy background (`#1E3A8A`), white text, 8px border-radius, font weight 600. Active/hover state transitions to Indigo (`#4338CA`) with immediate 150ms ease.
- **Secondary (Practice Mode, Review Answer):** Surface Slate 100 (`#F1F5F9`), text Slate 800 (`#1E293B`), subtle border `#CBD5E1`.
- **Destructive/Reset:** Light red tint background (`#FEF2F2`), Crimson text (`#DC2626`), border `#FCA5A5`.

### 2. Status Badges & Skill Mastery Pills
- **Mastered:** Background `#ECFDF5`, text and icon `#059669`, border `#A7F3D0`. Denotes Band 7.5+.
- **In Progress:** Background `#EEF2FF`, text and icon `#4338CA`, border `#C7D2FE`. Indicates active practice module.
- **Needs Attention:** Background `#FFFBEB`, text and icon `#D97706`, border `#FDE68A`. Indicates persistent lexical/grammatical errors.
- **Insufficient Data:** Background `#F1F5F9`, text and icon `#64748B`, border `#E2E8F0`. Prompts adaptive diagnostic test.

### 3. Cards & Test Containers
- **Content Cards:** Flat pure white (`#FFFFFF`) with 16px radius, enclosed by a 1px border (`#E2E8F0`). Header actions (time remaining, section tag) cleanly separated by a hairline divider.
- **Interactive Test Prompt Cards:** Answer options use 8px corner radii, `#FFFFFF` surface, with a 1.5px border (`#E2E8F0`). Selected state shifts border to `#1E3A8A` (2px thickness) with a tinted background `#F0F4FF`.

### 4. Input Fields & Essay Response Canvas
- **Text Inputs:** `#FFFFFF` background, 8px border-radius, 1px border `#CBD5E1`. Focused state: 2px border `#1E3A8A` with zero glow/shadow bleed to preserve visual cleanliness.
- **IELTS Task 2 Writing Box:** Monospace or clean Sans-Serif font toggle, subtle word count indicator anchored at the bottom-right, dynamic margin guidelines reflecting official exam interfaces.

### 5. Checkboxes & Radio Selectors
- **Selection Units:** 20px uniform touch bounds, 4px radius for checkboxes, full circle for radios.
- **States:** Unchecked `#CBD5E1` border; selected state fills with `#1E3A8A` and crisp white checkmark/dot indicator. High contrast ensuring immediate legibility in speed-reading drills.

### 6. Analytical Data Tables
- **Table Headers:** Background `#F8FAFC`, uppercase `label-md` in Slate 600 (`#475569`), bottom border 1.5px Slate 300 (`#CBD5E1`).
- **Data Rows:** `#FFFFFF` alternating or single-tone with hairline Slate 200 dividers. Hover state shifts row to `#F8FAFC`. Numeric band outputs right-aligned with fixed tabular figures.

### 7. Audio Diagnostic Player (Listening Section)
- **Player Structure:** Slate 900 background or pure white docked pill with prominent waveform visualizer, scrub prevention lock (for authentic test simulation), volume slider, and track speed modifier.