# Homepage Redesign Design

## Goal

Redesign the homepage for `geminiwatermarkremover` to prioritize immediate tool usage while improving perceived quality, trust, and visual clarity.

The redesign should:

- push the upload action above the fold
- keep the site feeling like a focused utility, not a generic SaaS template
- reduce first-screen SEO copy density
- preserve the current browser-local processing workflow
- make the post-upload preview feel like a purposeful image workspace

## Current Context

The current homepage already has the required functional pieces:

- local file upload
- drag and drop
- automatic processing
- before/after comparison
- download action
- FAQ and SEO content

The main problem is presentation, not capability. The page currently reads as several separate blocks:

- a small minimal hero
- a white tool card below it
- long-form content sections after that

This creates weak visual hierarchy for a utility-first landing page. The user sees the tool, but the page does not immediately communicate why this tool is more trustworthy or more specialized than a generic image editor.

## Design Direction

Chosen direction: `B` from the brainstormed options, adapted to be closer to the provided reference.

This means:

- a dark, conversion-first first screen
- left-side value proof
- right-side upload action
- strong orange/yellow CTA accents
- compact trust signals in the hero
- restrained but sharper product styling

The page should feel like a serious image tool with immediate utility, not like a content marketing page.

## In Scope

- redesign homepage layout and visual system
- restructure hero, upload module, and preview area into a single cohesive first-screen experience
- rewrite first-screen content hierarchy and microcopy
- restyle lower sections for better scanning and continuity
- keep the existing React/Vite single-page architecture
- keep current upload/processing/download functionality

## Out of Scope

- changes to watermark removal algorithm behavior
- changes to the underlying processing engine or Web Worker setup
- new backend or API work
- introducing a component library or CSS framework
- changing the FAQ dataset or SEO prose substantially beyond layout and small copy edits

## Information Architecture

### Section Order

The homepage should be structured in this order:

1. header / compact navigation
2. hero + proof + upload module
3. integrated preview workspace
4. core value explanation
5. three-step usage flow
6. FAQ
7. deep SEO article
8. footer

### Why This Order

The top of the page should drive action first, trust second, and long-form explanation later.

The current page places instructional and SEO-heavy content too close to the top relative to the conversion objective. In the redesign, the first scroll should still support action:

- users should understand the tool instantly
- users should see why it is trustworthy
- users should know where to click

Long-form SEO content remains important, but should not compete with the tool for first-screen attention.

## Hero and First-Screen Layout

### Layout

The first screen should become a unified dark-surface composition made of two main columns on desktop:

- left: title, short value statement, trust indicators
- right: upload panel as the dominant interactive object

Below or partially integrated with that composition, the preview workspace should feel visually connected to the hero rather than appearing as a separate white application card.

On mobile:

- stack in this order: title/value, trust indicators, upload panel, preview
- keep upload action visible without excessive intro copy

### Hero Copy Strategy

The main headline should be shorter and more direct than the current SEO-styled headline.

Guidelines:

- avoid stuffing the full keyword phrase into every visible line
- keep the headline action-oriented and easy to parse
- move secondary keyword coverage to the subheadline and lower sections

The supporting copy should explain:

- this is for Gemini watermark cleanup
- it runs locally
- no signup or cloud upload is required

### Trust Signals

Use a small row or compact stack of proof signals near the hero copy. They should be short enough to scan in under one second.

Recommended signal types:

- runs locally
- no signup
- sharper than AI fill

These signals are not decorative badges; they exist to remove hesitation before upload.

## Upload Module

### Role

The upload module is the primary CTA and should visually dominate the right column.

It should feel closer to the provided reference:

- large drop area
- obvious call-to-action button
- strong warm gradient accent
- minimal visual clutter

### Behavior

Existing behavior remains:

- click to browse
- drag and drop
- selected file display
- processing status
- reset / reprocess controls

### Changes

The interaction design should be simplified:

- primary button remains visually dominant
- secondary controls should appear lower priority
- status text should be cleaner and grouped with the upload state
- file metadata should remain available but feel less like a debug panel

The upload block should visually answer:

- what file types are accepted
- that processing is local
- that the interaction starts here

## Preview Workspace

### Goal

The preview must feel like part of the product experience, not a passive card below it.

### Design

The before/after compare area should look like an image workspace:

- darker framing
- stronger contrast around the compare window
- clearer divider and overlay states
- better empty state
- clearer relationship between preview and download

### Behavior

Keep:

- existing before/after slider
- processing overlay
- download button
- auto-scroll into view after processing

Improve:

- empty-state messaging
- toolbar hierarchy
- file summary presentation
- perceived continuity between upload and result

## Lower Sections

### Core Value Section

Keep the feature content, but present it in a tighter, more visual grid with less “explainer block” feeling.

This section should answer:

- why this tool is different from generic editors
- why local processing matters
- why the result quality is better

### Three-Step Flow

The current how-to content is useful but verbose.

Replace the top-level presentation with a compact three-step flow:

1. upload original Gemini export
2. process locally in browser
3. compare and download clean PNG

Any longer explanatory note can remain below in smaller supporting text.

### FAQ

Keep the existing FAQ data structure and disclosure interaction.
Restyle for consistency with the new visual system and improved scanability.

### SEO Article

Keep the long-form SEO prose, but move it below FAQ so it supports search intent without diluting top-of-page conversion.

The article should remain indexable and readable, but its styling should be quieter than the hero and product sections.

## Visual System

### Tone

The visual tone should be:

- dark
- precise
- utility-first
- slightly premium

It should not feel:

- generic SaaS
- overly glossy
- playful
- dependent on trendy purple gradients

### Palette

Use:

- dark neutral base
- warm orange/yellow accent for CTA and highlight moments
- restrained cool gray for secondary surfaces
- white / off-white text

Accent color should be used strategically on:

- headline emphasis
- CTA button
- status highlights
- selective decorative glow

### Texture and Depth

Add subtle atmosphere:

- soft glow or radial warm light in the hero
- light grain or layered translucency if inexpensive to implement
- controlled borders and shadow separation

These should support hierarchy, not become decoration for decoration’s sake.

### Typography

Use a more distinctive but still performant type direction than the current generic style.

Requirements:

- display typography should feel sharper and more intentional
- body typography should remain highly readable
- spacing and scale should emphasize a strong first-screen hierarchy

If a new web font is introduced, it must be justified by visible impact and reasonable loading cost.

## Responsive Behavior

### Desktop

- hero uses two columns
- upload block remains above the fold
- preview feels connected to hero/tool area

### Tablet

- columns may narrow before stacking
- trust signals can wrap cleanly
- upload remains early and dominant

### Mobile

- hero copy must stay short
- upload CTA must remain obvious without scrolling through dense text
- compare slider and toolbar must remain touch-friendly

## Accessibility

Preserve and improve:

- keyboard-accessible upload interaction
- status updates via `aria-live`
- adequate color contrast in dark mode visuals
- readable focus states
- semantic sectioning and labels

Do not trade accessibility away for style.

## Implementation Plan Shape

The code changes should likely fall into these groups:

1. restructure top-level JSX layout in `src/App.jsx`
2. reduce and rewrite first-screen copy
3. reorder content sections
4. rebuild the CSS system in `src/style.css`
5. verify responsive layout and processing flow

No additional framework should be introduced unless a concrete blocker appears.

## Risks and Mitigations

### Risk: SEO regression from reducing visible keyword density

Mitigation:

- keep keyword coverage in subheadline, section headings, FAQ, and long-form article
- avoid removing indexable content, only change hierarchy

### Risk: Dark redesign reduces readability

Mitigation:

- use strong contrast and restrained accent usage
- keep supporting text short and avoid large low-contrast paragraphs in the hero

### Risk: Visual redesign breaks tool clarity on mobile

Mitigation:

- design mobile stacking deliberately
- keep upload CTA and supported formats visible early
- test slider and button spacing at narrow widths

## Acceptance Criteria

The redesign is successful if:

- the homepage immediately communicates the tool’s purpose and CTA
- upload is the clearest action on first view
- the page feels materially more polished and intentional than the current version
- preview and download experience feel like part of a focused product workflow
- FAQ and SEO content remain present but no longer compete with first-screen conversion
- all current core tool interactions still work
