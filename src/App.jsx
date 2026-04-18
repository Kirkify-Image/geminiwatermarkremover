import { startTransition, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createWatermarkEngine, removeWatermarkFromImage } from '@pilio/gemini-watermark-remover/browser'

/* ===== SEO DATA ===== */

const seoProseBlocks = [
  `If you are searching for a reliable <strong>gemini watermark remover</strong>, you have landed in the right place. This free tool runs entirely inside your browser, so every pixel of your image stays on your device. No sign-up wall, no upload queue, no subscription. Just drop your file and the <strong>gemini watermark remover</strong> starts working instantly.`,

  `The demand to <strong>remove gemini watermark</strong> has grown steadily alongside Google Gemini's adoption as an AI image tool. Designers, marketers, and researchers routinely export visuals from Gemini and then need a clean version for their decks, websites, and reports. A dedicated <strong>gemini watermark remover online</strong> is the fastest way to reach that goal without sending files to a remote server you don't control.`,

  `Understanding why a specialized tool outperforms a generic eraser starts with the watermark itself. The Gemini overlay is composited onto the image at a known opacity using an alpha blend operation. Reverse Alpha Blending — the core algorithm in this <strong>gemini watermark remover</strong> — inverts that compositing step mathematically. Instead of guessing what lies beneath the mark, it solves the blend equation directly and recovers the original pixel values with high fidelity. This is why results from a true <strong>gemini watermark remover</strong> look sharper and more natural than outputs from a general-purpose AI fill tool.`,

  `When you <strong>remove gemini watermark from image</strong> assets using this browser-based engine, the entire processing pipeline stays inside a Web Worker on your local machine. The server never sees your image. That commitment to privacy is why so many users choose this <strong>gemini watermark remover online</strong> for client work, unreleased product screenshots, and other sensitive visuals.`,

  `Many people arrive here after searching variations like <strong>gemini logo remover</strong>, <strong>remove gemini logo</strong>, or <strong>remove watermark gemini</strong>. All of those intents point to the same need: stripping the visible Gemini star-style mark cleanly, without damaging the surrounding image. This <strong>gemini watermark remover</strong> handles that exact scenario by targeting the specific compositing pattern Gemini uses rather than applying a broad content-aware fill that can blur fine detail.`,

  `Client-side processing also makes this <strong>gemini watermark remover online</strong> faster than server-dependent alternatives for most modern devices. The browser decodes the image, runs the detection pass, applies Reverse Alpha Blending through a canvas pipeline, and returns a downloadable PNG — all without a round-trip to the cloud. For a standard Gemini export, the whole job typically completes in under two seconds on a mid-range laptop.`,

  `The phrase <strong>gemini remove watermark</strong> describes the action precisely, but the method behind it matters just as much as the outcome. This <strong>gemini watermark remover</strong> is built on an open-source engine, meaning the restoration logic is publicly inspectable. That transparency is rare. Most tools that claim to <strong>remove watermark gemini</strong> users encounter are opaque black boxes. Here, anyone can read the code, understand the algorithm, and verify that no data leaves the device.`,

  `For users who want the step-by-step answer to <strong>how to remove gemini watermark</strong> images cleanly: start with the original Gemini export whenever possible. Recompressed screenshots or cropped derivatives lose the alpha data the algorithm needs, which limits how precisely the tool can <strong>gemini watermark remove</strong> the overlay. Original exports give the engine the best raw material to work with.`,

  `This <strong>gemini watermark remover</strong> produces a full-resolution output in PNG format, preserving every pixel outside the watermark region exactly as it was in the original. The repaired zone uses the Reverse Alpha Blending result rather than AI inpainting, which means there is no hallucinated texture or smeared edge in areas adjacent to the mark. If you compare the before and after using the slider on this page, the boundary between cleaned and untouched regions should appear seamless on well-formed original exports.`,

  `In summary: a purpose-built <strong>gemini watermark remover online</strong> is meaningfully different from a generic editor. It is designed around the specific overlay Gemini produces, processes files locally for privacy, uses a mathematically grounded restoration method, and delivers a clean download without fees or forced accounts. If your goal is to <strong>remove gemini watermark</strong> results accurately and keep your files private, this is the tool to use.`,
]

const faqItems = [
  {
    question: 'How to remove Gemini watermark without losing image quality?',
    answer: 'Use a dedicated gemini watermark remover that applies Reverse Alpha Blending. This approach inverts the original compositing step to recover the underlying pixels mathematically, which preserves fine detail much better than generic AI inpainting or content-aware fill.',
    open: true,
  },
  {
    question: 'Is this gemini watermark remover online completely free?',
    answer: 'Yes. This gemini watermark remover online has no subscription, no trial limit, and no forced sign-up. Processing runs entirely in your browser at no cost.',
  },
  {
    question: 'Can I remove Gemini watermark from image files without uploading them?',
    answer: 'Yes. The engine runs inside a Web Worker in your browser. To remove Gemini watermark from image files privately, this local-only architecture is the key advantage — your files never leave your device.',
  },
  {
    question: 'Does this gemini logo remover work on the Gemini star overlay?',
    answer: 'Yes. This gemini logo remover specifically targets the Gemini star-style mark applied to AI-generated exports. It is most effective on original exports with the full alpha compositing data intact.',
  },
  {
    question: 'What is Reverse Alpha Blending and why does this gemini watermark remover use it?',
    answer: 'Reverse Alpha Blending is an algebraic inversion of the standard alpha compositing formula. When the Gemini watermark is blended onto an image at a known opacity, this gemini watermark remover solves the blend equation backwards to reconstruct the original pixel values — without inventing texture the way generative AI tools do.',
  },
  {
    question: 'What file formats does this gemini watermark remove tool accept?',
    answer: 'The gemini watermark remove tool accepts PNG, JPEG, and WebP files. For the best results, use the original Gemini export rather than a screenshot or recompressed copy.',
  },
  {
    question: 'Why does gemini remove watermark work better on original exports?',
    answer: 'When you gemini remove watermark on an original export, the alpha channel data is intact. Recompression or screenshotting degrades that data, which limits how accurately the algorithm can solve the blend equation and recover the underlying pixels.',
  },
  {
    question: 'Is it safe to remove watermark gemini users find on client work?',
    answer: 'Yes. Since this tool processes files locally, removing a watermark from client visuals using this gemini watermark remover online is safe from a data-privacy standpoint. No image is transmitted to any server.',
  },
  {
    question: 'How does this gemini logo remover compare to using Photoshop or a generic AI editor?',
    answer: 'A generic editor uses content-aware fill or AI inpainting, which generates new pixels and can introduce blurring or mismatched texture. This gemini logo remover uses Reverse Alpha Blending, which reconstructs rather than invents — producing cleaner edges and more faithful colors in the repaired region.',
  },
  {
    question: 'What should I do if the gemini watermark remover shows "No Change"?',
    answer: 'A "No Change" result usually means the uploaded file does not contain the expected Gemini overlay pattern. Try uploading the original PNG or JPEG export directly from Gemini rather than a screenshot. If the watermark is in a non-standard position or has been partially edited, the gemini watermark remover may not detect it automatically.',
  },
  {
    question: 'Does this gemini watermark remove tool work on mobile browsers?',
    answer: 'Yes. The gemini watermark remove engine is a pure JavaScript canvas pipeline and runs in modern mobile browsers on iOS Safari and Android Chrome. Processing may be slightly slower on lower-end devices.',
  },
  {
    question: 'Where can I find the source code for this gemini watermark remover?',
    answer: 'This gemini watermark remover is built on the open-source @pilio/gemini-watermark-remover library, which is publicly available under an MIT-compatible license. The client-side processing means the full algorithm is also visible in the browser\'s DevTools.',
  },
]

const features = [
  {
    title: 'Reverse Alpha Blending',
    copy: 'This gemini watermark remover inverts the compositing math to reconstruct original pixels rather than painting over the mark with a generated guess.',
  },
  {
    title: 'Local Browser Execution',
    copy: 'Every remove gemini watermark job runs in a Web Worker on your device. Zero uploads, zero server logs — privacy by design.',
  },
  {
    title: 'Free & Open Source',
    copy: 'This gemini watermark remover online is free with no limits. The engine is open-source so you can inspect every step of the gemini watermark remove process.',
  },
  {
    title: 'Purpose-Built Algorithm',
    copy: 'Unlike generic editors, this gemini logo remover is designed specifically for the Gemini overlay pattern, so remove gemini logo results are sharper and more accurate.',
  },
]

const steps = [
  {
    num: '1',
    title: 'Drop or select your image',
    copy: 'Upload the original Gemini export (PNG, JPG, or WebP). To remove Gemini watermark from image files cleanly, always use the original export rather than a screenshot.',
  },
  {
    num: '2',
    title: 'Browser processes locally',
    copy: 'The gemini watermark remover online engine applies Reverse Alpha Blending entirely in your browser. No upload required — your file stays private.',
  },
  {
    num: '3',
    title: 'Preview and download',
    copy: 'Use the before/after slider to check the repair, then download the cleaned PNG. The gemini watermark remove is complete — no account needed.',
  },
]

/* ===== UTILS ===== */

const EMPTY_DIMENSIONS = { width: 1200, height: 900 }
let enginePromise

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return '-'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function createImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.decoding = 'async'
    const objectUrl = URL.createObjectURL(file)
    image.onload = () => resolve({ image, objectUrl })
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Unable to read the selected image. Try another original Gemini export.'))
    }
    image.src = objectUrl
  })
}

function canvasToBlob(canvas, type = 'image/png', quality = 0.96) {
  if (typeof canvas?.convertToBlob === 'function') return canvas.convertToBlob({ type, quality })
  if (typeof canvas?.toBlob === 'function') {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) { resolve(blob); return }
        reject(new Error('Failed to export the processed image.'))
      }, type, quality)
    })
  }
  throw new Error('Canvas export is unavailable in this browser.')
}

function getEngine() {
  if (!enginePromise) enginePromise = createWatermarkEngine()
  return enginePromise
}

/* ===== COMPONENT ===== */

export default function App() {
  const fileInputId = useId()
  const inputRef = useRef(null)
  const previewRef = useRef(null)
  const processJobRef = useRef(0)

  const [selectedFile, setSelectedFile] = useState(null)
  const [beforeUrl, setBeforeUrl] = useState('')
  const [afterUrl, setAfterUrl] = useState('')
  const [dimensions, setDimensions] = useState(EMPTY_DIMENSIONS)
  const [sliderValue, setSliderValue] = useState(52)
  const [dragActive, setDragActive] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState({
    text: 'Drop a Gemini image to start. Processing runs locally in your browser.',
    state: 'idle',
  })
  const [processState, setProcessState] = useState('Waiting')

  const hasSelection = Boolean(selectedFile)
  const hasResult = Boolean(afterUrl)
  const sliderMask = useMemo(() => ({ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }), [sliderValue])
  const sliderDivider = useMemo(() => ({ left: `${sliderValue}%` }), [sliderValue])
  const outputName = useMemo(() => {
    if (!selectedFile) return 'gemini-watermark-removed.png'
    return `${selectedFile.name.replace(/\.[^.]+$/, '')}-clean.png`
  }, [selectedFile])

  useEffect(() => {
    return () => {
      if (beforeUrl) URL.revokeObjectURL(beforeUrl)
      if (afterUrl) URL.revokeObjectURL(afterUrl)
    }
  }, [afterUrl, beforeUrl])

  function updateStatus(text, state = 'idle') { setStatus({ text, state }) }

  function resetResult() {
    setAfterUrl((cur) => { if (cur) URL.revokeObjectURL(cur); return '' })
  }

  function clearSelection() {
    processJobRef.current += 1
    setSelectedFile(null)
    setDimensions(EMPTY_DIMENSIONS)
    setProcessState('Waiting')
    updateStatus('Drop a Gemini image to start. Processing runs locally in your browser.')
    setBeforeUrl((cur) => { if (cur) URL.revokeObjectURL(cur); return '' })
    resetResult()
  }

  async function processFile(file) {
    if (!file) return
    const jobId = processJobRef.current + 1
    processJobRef.current = jobId
    setIsProcessing(true)
    setProcessState('Processing')
    updateStatus('Processing locally… usually done in a moment.', 'working')

    try {
      const engine = await getEngine()
      const { image, objectUrl } = await createImageFromFile(file)
      if (processJobRef.current !== jobId) { URL.revokeObjectURL(objectUrl); return }

      setBeforeUrl((cur) => { if (cur) URL.revokeObjectURL(cur); return objectUrl })
      setDimensions({ width: image.naturalWidth || EMPTY_DIMENSIONS.width, height: image.naturalHeight || EMPTY_DIMENSIONS.height })

      const { canvas, meta } = await removeWatermarkFromImage(image, { engine, adaptiveMode: 'auto', maxPasses: 4 })
      if (processJobRef.current !== jobId) return

      const blob = await canvasToBlob(canvas)
      const nextUrl = URL.createObjectURL(blob)
      startTransition(() => { setAfterUrl((cur) => { if (cur) URL.revokeObjectURL(cur); return nextUrl }) })
      setDimensions({ width: canvas.width || image.naturalWidth, height: canvas.height || image.naturalHeight })
      previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })

      if (meta?.applied) {
        setProcessState('Completed')
        updateStatus('Done. Compare before/after and download your clean image.', 'success')
        return
      }
      setProcessState('No Change')
      updateStatus('No Gemini watermark pattern confirmed. Try an original Gemini export.', 'warning')
    } catch (error) {
      if (processJobRef.current !== jobId) return
      console.error(error)
      setProcessState('Error')
      updateStatus(error?.message || 'Processing failed. Try another original Gemini export.', 'error')
    } finally {
      if (processJobRef.current === jobId) setIsProcessing(false)
    }
  }

  function applySelectedFile(file) {
    if (!file) { clearSelection(); return }
    if (!file.type.startsWith('image/')) { updateStatus('Select a PNG, JPG, or WebP image file.', 'warning'); return }
    setSelectedFile(file)
    updateStatus('Image loaded. Starting local cleanup…', 'working')
    setBeforeUrl((cur) => { if (cur) URL.revokeObjectURL(cur); return URL.createObjectURL(file) })
    resetResult()
    setProcessState('Queued')
    void processFile(file)
  }

  function handleFileChange(event) {
    const [file] = event.target.files || []
    applySelectedFile(file || null)
  }

  function handleDrop(event) {
    event.preventDefault()
    setDragActive(false)
    const [file] = event.dataTransfer.files || []
    applySelectedFile(file || null)
  }

  function handleProcess() {
    if (!selectedFile || isProcessing) return
    void processFile(selectedFile)
  }

  return (
    <div>
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <div className="page-wrap">
        {/* TOPBAR */}
        <header>
          <nav className="topbar" aria-label="Primary">
            <a className="brand" href="#top">
              <span className="brand-mark" aria-hidden="true">✦</span>
              Gemini Watermark Remover
            </a>
            <div className="top-links">
              <a href="#how-it-works">How it works</a>
              <a href="#faq">FAQ</a>
            </div>
          </nav>
        </header>

        <main id="main-content">
          {/* HERO — MINIMAL, MAX 2 LINES */}
          <section className="hero-minimal" aria-labelledby="hero-h1">
            <div className="hero-badges">
              <span className="badge badge-green">✓ Free Forever</span>
              <span className="badge badge-blue">⚡ Instant Processing</span>
              <span className="badge">🔒 100% Local — No Upload</span>
            </div>
            <h1 id="hero-h1">Gemini Watermark Remover — Free, Instant, Private</h1>
            <p className="sub">Remove Gemini watermark from image files locally in your browser. No signup, no cloud, no limits.</p>
          </section>

          {/* TOOL CARD — ABOVE THE FOLD */}
          <section aria-label="Gemini watermark remover tool">
            <input
              id={fileInputId}
              ref={inputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFileChange}
            />

            <div className="tool-card">
              <div className="tool-inner">
                {/* LEFT — UPLOAD */}
                <div className="tool-left">
                  <div
                    className={`dropzone${dragActive ? ' is-active' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-label="Drop an image file or click to browse"
                    onClick={() => inputRef.current?.click()}
                    onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? inputRef.current?.click() : undefined}
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                  >
                    <div className="dropzone-icon" aria-hidden="true">🖼️</div>
                    <span className="dropzone-title">Drop Gemini image here</span>
                    <span className="dropzone-sub">or click to browse</span>
                    {hasSelection && (
                      <span className="drop-caption">{selectedFile?.name}</span>
                    )}
                  </div>

                  <div className="tool-buttons">
                    <button
                      className="button button-primary button-full"
                      type="button"
                      onClick={() => inputRef.current?.click()}
                    >
                      Choose Image
                    </button>
                    <button
                      className="button button-secondary button-full"
                      type="button"
                      disabled={!hasSelection || isProcessing}
                      onClick={handleProcess}
                    >
                      {isProcessing ? 'Processing…' : 'Reprocess'}
                    </button>
                    {hasSelection && (
                      <button
                        className="button button-secondary button-full"
                        type="button"
                        onClick={clearSelection}
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  <p className="status-message" data-state={status.state} role="status" aria-live="polite">
                    {status.text}
                  </p>

                  {hasSelection && (
                    <dl className="file-meta">
                      <div><dt>File</dt><dd>{selectedFile?.name || '-'}</dd></div>
                      <div><dt>Size</dt><dd>{selectedFile ? formatBytes(selectedFile.size) : '-'}</dd></div>
                      <div><dt>Status</dt><dd>{processState}</dd></div>
                    </dl>
                  )}
                </div>

                {/* RIGHT — PREVIEW */}
                <div className="tool-right" ref={previewRef}>
                  <div className="preview-toolbar">
                    <div className="preview-summary">
                      <span className={`status-pill status-pill-${status.state}`}>{processState}</span>
                      <div className="preview-copy">
                        <strong>{selectedFile ? selectedFile.name : 'Before / After Preview'}</strong>
                        <span>{selectedFile ? `${formatBytes(selectedFile.size)} · local browser processing` : 'Upload a Gemini export to preview the cleaned result.'}</span>
                      </div>
                    </div>
                    {hasResult ? (
                      <a className="button button-primary" href={afterUrl} download={outputName}>
                        ↓ Download
                      </a>
                    ) : (
                      <button className="button button-primary" type="button" disabled>
                        ↓ Download
                      </button>
                    )}
                  </div>

                  <div className={`compare-frame${hasSelection ? '' : ' empty'}`}>
                    <h2 className="sr-only">Before and After Preview</h2>
                    <div className="compare-grid">
                      <div className="compare-pane before-pane">
                        {beforeUrl && <img src={beforeUrl} alt="Original Gemini image before watermark removal" width={dimensions.width} height={dimensions.height} loading="eager" fetchPriority="high" />}
                        <span className="pane-label">Before</span>
                      </div>
                      <div className="compare-pane after-pane" style={sliderMask}>
                        {afterUrl && <img src={afterUrl} alt="Gemini image after watermark removed" width={dimensions.width} height={dimensions.height} loading="eager" />}
                        <span className="pane-label">After</span>
                      </div>
                      <div className="compare-divider" style={sliderDivider} aria-hidden="true" />
                    </div>

                    {isProcessing && (
                      <div className="compare-overlay" aria-hidden="true">
                        <span className="status-pill status-pill-working">Local Cleanup</span>
                        <strong>Removing Gemini watermark…</strong>
                        <span>Reverse Alpha Blending in progress.</span>
                      </div>
                    )}

                    <div className="compare-empty">
                      <strong>Before / After Preview</strong>
                      <span>Upload a Gemini export to test the watermark remover locally.</span>
                    </div>
                  </div>

                  <label className="slider-wrap" htmlFor="compare-slider">
                    <span>Drag to compare</span>
                    <input
                      id="compare-slider"
                      type="range"
                      min="0"
                      max="100"
                      value={sliderValue}
                      onChange={(e) => setSliderValue(Number(e.target.value))}
                      aria-valuetext={`${sliderValue}% after image revealed`}
                      disabled={!hasResult}
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="content-section" id="how-it-works" aria-labelledby="steps-h2">
            <span className="section-label">Workflow</span>
            <h2 id="steps-h2">How to remove Gemini watermark in 3 steps</h2>
            <div className="steps-grid">
              {steps.map((s) => (
                <article key={s.num} className="step-card">
                  <div className="step-num" aria-hidden="true">{s.num}</div>
                  <h3>{s.title}</h3>
                  <p>{s.copy}</p>
                </article>
              ))}
            </div>
          </section>

          {/* WHY IT WORKS */}
          <section className="content-section" aria-labelledby="features-h2">
            <span className="section-label">Why it works</span>
            <h2 id="features-h2">Gemini watermark remover vs generic AI cleanup</h2>
            <div className="feature-grid">
              {features.map((f) => (
                <article key={f.title} className="feature-card">
                  <h3>{f.title}</h3>
                  <p>{f.copy}</p>
                </article>
              ))}
            </div>

            {/* Comparison table */}
            <div className="comparison-table" role="table" aria-label="Gemini watermark remover comparison" style={{ marginTop: '32px' }}>
              <div className="table-row table-head" role="row">
                <span role="columnheader">Capability</span>
                <span role="columnheader">This Tool</span>
                <span role="columnheader">Generic Editor</span>
              </div>
              {[
                ['Gemini-specific cleanup', 'Yes', 'Usually no'],
                ['100% local browser processing', 'Yes', 'Often no'],
                ['Reverse Alpha Blending', 'Yes', 'Rarely'],
                ['Remove Gemini logo pattern', 'Yes', 'Not specifically'],
                ['Free with no limits', 'Yes', 'Often paywalled'],
              ].map(([cap, a, b]) => (
                <div key={cap} className="table-row" role="row">
                  <span role="cell">{cap}</span>
                  <span role="cell" style={{ color: 'var(--success)', fontWeight: 600 }}>{a}</span>
                  <span role="cell">{b}</span>
                </div>
              ))}
            </div>
          </section>

          {/* LONG-FORM SEO ARTICLE */}
          <section className="content-section" id="seo-article" aria-labelledby="seo-h2">
            <span className="section-label">Deep Dive</span>
            <h2 id="seo-h2">Why a dedicated Gemini watermark remover beats generic tools</h2>

            <div className="seo-article">
              <div className="seo-prose">
                {seoProseBlocks.map((html, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
                ))}

                <h3>What is Reverse Alpha Blending?</h3>
                <p>
                  Standard image compositing uses the formula: <code>C_out = alpha × C_watermark + (1 − alpha) × C_original</code>.
                  When you use this <strong>gemini watermark remover</strong>, the engine reads the known parameters of the Gemini overlay
                  — its position, size, opacity, and color — and solves the equation for <code>C_original</code>.
                  This algebraic reversal is what makes the <strong>gemini watermark remove</strong> result look like the untouched image
                  rather than an AI's reconstruction of it.
                </p>

                <h3>Client-side processing explained</h3>
                <p>
                  Client-side processing means every instruction runs inside your browser tab. When you <strong>remove watermark gemini</strong>
                  images with this tool, the JavaScript engine downloads a small Web Worker bundle (under 200 KB), decodes your image
                  into a canvas buffer, runs the detection and blending pass, then encodes the result back to PNG — all without touching
                  a remote server. This architecture is why the <strong>gemini watermark remover online</strong> can honestly claim
                  zero-upload privacy: there is no network request that carries your pixel data.
                </p>

                <h3>Best practices for clean results</h3>
                <p>
                  To get the most from this <strong>gemini watermark remover</strong>, always start from the raw Gemini export.
                  Avoid images that have been screenshotted, cropped, or re-saved at lower quality, because JPEG compression
                  introduces artifacts that interfere with the blending math. If the <strong>gemini remove watermark</strong> result
                  shows residual marks, try re-exporting the image directly from Gemini at full resolution before running it through
                  the tool again.
                </p>
              </div>

            </div>
          </section>

          {/* FAQ */}
          <section className="content-section" id="faq" aria-labelledby="faq-h2">
            <span className="section-label">FAQ</span>
            <h2 id="faq-h2">Frequently asked questions about Gemini watermark removal</h2>
            <div className="faq-list">
              {faqItems.map((item) => (
                <details key={item.question} open={item.open || false}>
                  <summary>
                    {item.question}
                    <span className="faq-arrow" aria-hidden="true">▾</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <p>© {new Date().getFullYear()} gemini-watermarkremover.org — Free, local, open-source. No data leaves your device.</p>
        </footer>
      </div>
    </div>
  )
}
