# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage into a dark, conversion-first tool landing page while preserving the existing local watermark-removal workflow.

**Architecture:** Keep the app as a single React page, but reorganize `src/App.jsx` so the hero, upload module, and preview read as one unified first-screen experience. Replace the current light design system in `src/style.css` with a darker visual language, stronger CTA hierarchy, and tighter supporting sections below the fold.

**Tech Stack:** React 19, Vite 8, plain CSS, `@pilio/gemini-watermark-remover`

---

## File Structure

- Modify: `src/App.jsx`
  Responsibility: reorganize homepage section order, rewrite first-screen copy, simplify upload/preview hierarchy, and keep all existing tool interactions intact.
- Modify: `src/style.css`
  Responsibility: replace the current light visual system with the new dark layout, responsive behavior, hero/upload styling, preview workspace styling, and lower-section styles.
- Verify: `package.json`
  Responsibility: use existing `npm run build` script for regression verification. No new runtime dependency should be introduced.

### Task 1: Restructure the page shell and section order

**Files:**
- Modify: `src/App.jsx`
- Test: browser rendering via `npm run dev`

- [ ] **Step 1: Write the failing structural expectation as a checklist**

```jsx
// Expected JSX order after this task:
// <header />
// <main>
//   <section className="hero-shell" />
//   <section className="workspace-section" />
//   <section className="content-section" id="why-it-works" />
//   <section className="content-section" id="how-to-remove" />
//   <section className="content-section" id="faq" />
//   <section className="content-section" id="seo-article" />
// </main>
```

- [ ] **Step 2: Run the build to capture the current baseline**

Run: `npm run build`
Expected: PASS. Keep this as the pre-change baseline so any later failure is caused by the redesign work.

- [ ] **Step 3: Rewrite the top-level JSX structure in `src/App.jsx`**

```jsx
<header>
  <nav className="topbar" aria-label="Primary">
    <a className="brand" href="#top">
      <span className="brand-mark" aria-hidden="true">✦</span>
      Gemini Watermark Remover
    </a>
    <div className="top-links">
      <a href="#how-to-remove">How it works</a>
      <a href="#faq">FAQ</a>
    </div>
  </nav>
</header>

<main id="main-content">
  <section className="hero-shell" aria-labelledby="hero-h1">
    {/* hero proof column + upload panel */}
  </section>

  <section className="workspace-section" aria-labelledby="preview-h2">
    {/* compare workspace */}
  </section>

  <section className="content-section" id="why-it-works" aria-labelledby="features-h2">
    {/* feature cards */}
  </section>

  <section className="content-section" id="how-to-remove" aria-labelledby="steps-h2">
    {/* compact 3-step flow */}
  </section>

  <section className="content-section" id="faq" aria-labelledby="faq-h2">
    {/* existing faq map */}
  </section>

  <section className="content-section seo-section" id="seo-article" aria-labelledby="seo-h2">
    {/* existing long-form SEO prose */}
  </section>
</main>
```

- [ ] **Step 4: Keep all current event handlers and refs wired through the new structure**

```jsx
<input
  id={fileInputId}
  ref={inputRef}
  type="file"
  accept="image/*"
  className="sr-only"
  onChange={handleFileChange}
/>

<div className={`dropzone${dragActive ? ' is-active' : ''}`}
  role="button"
  tabIndex={0}
  onClick={() => inputRef.current?.click()}
  onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? inputRef.current?.click() : undefined}
  onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
  onDragLeave={() => setDragActive(false)}
  onDrop={handleDrop}
>
```

- [ ] **Step 5: Run the build after the JSX reordering**

Run: `npm run build`
Expected: PASS. The app may still look visually broken until CSS is rewritten, but the bundle must compile.

- [ ] **Step 6: Commit the structural rewrite**

```bash
git add src/App.jsx
git commit -m "refactor: reorganize homepage structure"
```

### Task 2: Rewrite the first-screen copy and hero content

**Files:**
- Modify: `src/App.jsx`
- Test: browser rendering via `npm run dev`

- [ ] **Step 1: Replace the current hero headline and subcopy with short conversion-first copy**

```jsx
<div className="hero-copy">
  <span className="eyebrow">Free local Gemini cleanup</span>
  <h1 id="hero-h1">Remove Gemini Watermarks In Seconds</h1>
  <p className="hero-sub">
    Clean Gemini exports directly in your browser. No signup, no cloud upload,
    no generic AI fill.
  </p>
</div>
```

- [ ] **Step 2: Add compact trust signals beside the hero copy**

```jsx
<div className="hero-signals" aria-label="Trust signals">
  <span className="signal-pill">Runs locally</span>
  <span className="signal-pill">No signup</span>
  <span className="signal-pill">Sharper than AI fill</span>
</div>
```

- [ ] **Step 3: Replace the old badge-heavy minimal hero block entirely**

```jsx
<div className="hero-proof">
  <div className="proof-card">
    <strong>Built for Gemini exports</strong>
    <p>
      Reverse Alpha Blending restores the watermark area mathematically instead
      of painting over it with generated pixels.
    </p>
  </div>
</div>
```

- [ ] **Step 4: Verify the new copy stays short on mobile**

Run: `npm run dev`
Expected: On a narrow viewport, the hero shows the headline, subcopy, and trust pills without forcing the upload module far below the fold.

- [ ] **Step 5: Commit the hero-copy rewrite**

```bash
git add src/App.jsx
git commit -m "feat: rewrite homepage hero copy"
```

### Task 3: Rebuild the upload module and preview workspace hierarchy

**Files:**
- Modify: `src/App.jsx`
- Test: browser rendering via `npm run dev`

- [ ] **Step 1: Make the upload panel the dominant right-column object**

```jsx
<div className="upload-panel">
  <div className={`dropzone${dragActive ? ' is-active' : ''}`}>
    <div className="dropzone-icon" aria-hidden="true">+</div>
    <strong className="dropzone-title">Upload Image</strong>
    <span className="dropzone-sub">
      Drop PNG, JPG, or WebP exported from Gemini
    </span>
    <span className="dropzone-note">Local processing only</span>
    {hasSelection && <span className="drop-caption">{selectedFile?.name}</span>}
  </div>

  <div className="tool-buttons">
    <button className="button button-primary button-full" type="button">
      Choose Image
    </button>
    <button className="button button-secondary button-full" type="button">
      {isProcessing ? 'Processing…' : 'Reprocess'}
    </button>
  </div>
</div>
```

- [ ] **Step 2: Move preview into its own workspace section directly below the hero**

```jsx
<section className="workspace-section" aria-labelledby="preview-h2" ref={previewRef}>
  <div className="workspace-header">
    <div className="workspace-copy">
      <span className={`status-pill status-pill-${status.state}`}>{processState}</span>
      <h2 id="preview-h2">Before / After Workspace</h2>
      <p>
        {selectedFile
          ? `${formatBytes(selectedFile.size)} · processed locally in your browser`
          : 'Upload a Gemini export to preview the cleanup result.'}
      </p>
    </div>
    {hasResult ? (
      <a className="button button-primary" href={afterUrl} download={outputName}>
        Download clean PNG
      </a>
    ) : (
      <button className="button button-primary" type="button" disabled>
        Download clean PNG
      </button>
    )}
  </div>
</section>
```

- [ ] **Step 3: Preserve the current compare slider, overlay, and empty state, but tighten the copy**

```jsx
<div className={`compare-frame${hasSelection ? '' : ' empty'}`}>
  <div className="compare-grid">
    <div className="compare-pane before-pane">
      {beforeUrl && <img src={beforeUrl} alt="Original Gemini image before watermark removal" />}
      <span className="pane-label">Before</span>
    </div>
    <div className="compare-pane after-pane" style={sliderMask}>
      {afterUrl && <img src={afterUrl} alt="Gemini image after watermark removed" />}
      <span className="pane-label">After</span>
    </div>
    <div className="compare-divider" style={sliderDivider} aria-hidden="true" />
  </div>

  <div className="compare-empty">
    <strong>Upload to preview the cleanup</strong>
    <span>Original Gemini exports give the cleanest result.</span>
  </div>
</div>
```

- [ ] **Step 4: Manually test the main workflow end-to-end**

Run: `npm run dev`
Expected:
- clicking the upload panel opens the file picker
- drag-and-drop still works
- processing still runs automatically after file selection
- the preview still scrolls into view
- slider and download still work after processing

- [ ] **Step 5: Commit the upload/workspace rewrite**

```bash
git add src/App.jsx
git commit -m "feat: rebuild upload and preview workspace"
```

### Task 4: Rewrite the lower sections for scannability and SEO containment

**Files:**
- Modify: `src/App.jsx`
- Test: browser rendering via `npm run dev`

- [ ] **Step 1: Convert the long “How to Remove” list into a compact 3-step flow**

```jsx
const steps = [
  {
    num: '1',
    title: 'Upload the original export',
    copy: 'Use the PNG, JPG, or WebP file downloaded directly from Gemini for the cleanest reconstruction.',
  },
  {
    num: '2',
    title: 'Process locally in your browser',
    copy: 'The cleanup runs on-device with Reverse Alpha Blending. Nothing is uploaded to a server.',
  },
  {
    num: '3',
    title: 'Compare and download',
    copy: 'Inspect the before/after slider, then download the cleaned PNG when the result looks right.',
  },
]
```

- [ ] **Step 2: Render the steps as cards instead of a long ordered list**

```jsx
<section className="content-section" id="how-to-remove" aria-labelledby="steps-h2">
  <span className="section-label">How it works</span>
  <h2 id="steps-h2">Three steps from upload to clean output</h2>
  <div className="step-grid">
    {steps.map((step) => (
      <article key={step.num} className="step-card">
        <span className="step-num">{step.num}</span>
        <h3>{step.title}</h3>
        <p>{step.copy}</p>
      </article>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Keep FAQ before the long-form SEO article**

```jsx
<section className="content-section" id="faq" aria-labelledby="faq-h2">
  {/* existing details/summary rendering */}
</section>

<section className="content-section seo-section" id="seo-article" aria-labelledby="seo-h2">
  {/* existing seoProseBlocks rendering */}
</section>
```

- [ ] **Step 4: Keep the `features` and `faqItems` data structures intact unless a copy tweak is needed**

```jsx
{features.map((f) => (
  <article key={f.title} className="feature-card">
    <h3>{f.title}</h3>
    <p>{f.copy}</p>
  </article>
))}
```

- [ ] **Step 5: Run the build after the content reordering**

Run: `npm run build`
Expected: PASS, with FAQ and SEO still present in the compiled output.

- [ ] **Step 6: Commit the lower-section rewrite**

```bash
git add src/App.jsx
git commit -m "feat: tighten homepage supporting sections"
```

### Task 5: Replace the CSS system and verify responsive behavior

**Files:**
- Modify: `src/style.css`
- Test: `npm run build`, browser checks in `npm run dev`

- [ ] **Step 1: Replace the existing root tokens with a dark utility-first palette**

```css
:root {
  --bg: #0b0b0c;
  --bg-soft: #131316;
  --panel: rgba(255, 255, 255, 0.04);
  --panel-strong: #17171b;
  --border: rgba(255, 255, 255, 0.1);
  --text: #f4f1ea;
  --text-soft: #b7b0a4;
  --accent: #ffb347;
  --accent-strong: #ff6b3d;
  --success: #72d39a;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --shadow-lg: 0 30px 80px rgba(0, 0, 0, 0.38);
}
```

- [ ] **Step 2: Add the new hero, upload, and workspace layout rules**

```css
.hero-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 460px);
  gap: 28px;
  align-items: stretch;
  padding: 32px;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  background:
    radial-gradient(circle at top left, rgba(255, 179, 71, 0.18), transparent 30%),
    linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
  box-shadow: var(--shadow-lg);
}

.upload-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 22px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.workspace-section {
  margin-top: 24px;
  padding: 24px;
  border-radius: var(--radius-xl);
  background: var(--panel-strong);
  border: 1px solid var(--border);
}
```

- [ ] **Step 3: Rewrite the button, dropzone, and compare styles around the new hierarchy**

```css
.button-primary {
  color: #141414;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
}

.dropzone {
  min-height: 260px;
  border: 1px dashed rgba(255, 255, 255, 0.22);
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
}

.compare-frame {
  background: #0f1013;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
}
```

- [ ] **Step 4: Add mobile breakpoints that keep the upload CTA visible early**

```css
@media (max-width: 900px) {
  .hero-shell {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .page-wrap {
    padding: 0 16px 64px;
  }

  .hero-shell,
  .workspace-section,
  .content-section {
    padding: 18px;
  }

  .tool-buttons {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Verify the redesign in both build and browser**

Run: `npm run build`
Expected: PASS.

Run: `npm run dev`
Expected:
- desktop shows hero left / upload right
- mobile stacks cleanly without giant text blocks
- contrast stays readable
- upload, compare, and FAQ remain usable

- [ ] **Step 6: Commit the visual system rewrite**

```bash
git add src/style.css src/App.jsx
git commit -m "feat: redesign homepage visual system"
```

## Self-Review

### Spec coverage

- conversion-first first screen: covered by Tasks 1-3
- dark visual system and stronger CTA hierarchy: covered by Task 5
- integrated preview workspace: covered by Task 3
- compact supporting sections and reordered FAQ/SEO: covered by Task 4
- preserved tool logic and interactions: covered by Tasks 1 and 3

### Placeholder scan

No `TODO`, `TBD`, or “implement later” placeholders remain. Each task names the exact file and the expected commands.

### Type consistency

The plan preserves the current React state names and handlers:

- `dragActive`
- `selectedFile`
- `isProcessing`
- `status`
- `processState`
- `handleFileChange`
- `handleDrop`
- `handleProcess`

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-19-homepage-redesign.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
