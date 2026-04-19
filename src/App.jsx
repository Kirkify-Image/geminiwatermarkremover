import { startTransition, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createWatermarkEngine, removeWatermarkFromImage } from '@pilio/gemini-watermark-remover/browser'

const seoProseBlocks = [
  `If you are searching for a reliable <strong>gemini watermark remover</strong>, you have landed in the right place. This free tool runs entirely inside your browser, so every pixel of your image stays on your device. No sign-up wall, no upload queue, no subscription. Just drop your file and the <strong>gemini watermark remover</strong> starts working instantly.`,
  `The demand to strip the watermark from your Gemini image has grown steadily alongside Google Gemini's adoption as an AI image tool. Designers, marketers, and researchers routinely export visuals from Gemini and then need a clean version for their decks, websites, and reports. A dedicated <strong>gemini watermark remover</strong> is the fastest way to reach that goal without sending files to a remote server you don't control.`,
  `Understanding why a specialized tool outperforms a generic eraser starts with the watermark itself. The Gemini overlay is composited onto the image at a known opacity using an alpha blend operation. Reverse Alpha Blending — the core algorithm in this <strong>gemini watermark remover</strong> — inverts that compositing step mathematically. Instead of guessing what lies beneath the mark, it solves the blend equation directly and recovers the original pixel values with high fidelity. This is why results from a true <strong>gemini watermark remover</strong> look sharper and more natural than outputs from a general-purpose AI fill tool.`,
  `When you clean your Gemini image using this browser-based engine, the entire processing pipeline stays inside a Web Worker on your local machine. The server never sees your image. That commitment to privacy is why so many users choose this <strong>gemini watermark remover</strong> for client work, unreleased product screenshots, and other sensitive visuals.`,
  `Client-side processing also makes this tool faster than server-dependent alternatives for most modern devices. The browser decodes the image, runs the detection pass, applies Reverse Alpha Blending through a canvas pipeline, and returns a downloadable PNG — all without a round-trip to the cloud. For a standard Gemini export, the whole job typically completes in under two seconds on a mid-range laptop.`,
  `The method behind this tool matters just as much as the outcome. This <strong>gemini watermark remover</strong> is built on an open-source engine, meaning the restoration logic is publicly inspectable. That transparency is rare. Most tools that claim to remove the Gemini overlay are opaque black boxes. Here, anyone can read the code, understand the algorithm, and verify that no data leaves the device.`,
  `For users who want to know how to remove the Gemini watermark cleanly: start with the original Gemini export whenever possible. Recompressed screenshots or cropped derivatives lose the alpha data the algorithm needs, which limits how precisely the tool can strip the watermark from your Gemini image. Original exports give the engine the best raw material to work with.`,
  `This <strong>gemini watermark remover</strong> produces a full-resolution output in PNG format, preserving every pixel outside the watermark region exactly as it was in the original. The repaired zone uses the Reverse Alpha Blending result rather than AI inpainting, which means there is no hallucinated texture or smeared edge in areas adjacent to the mark. If you compare the before and after using the slider on this page, the boundary between cleaned and untouched regions should appear seamless on well-formed original exports.`,
  `In summary: a purpose-built <strong>gemini watermark remover</strong> is meaningfully different from a generic editor. It is designed around the specific overlay Gemini produces, processes files locally for privacy, uses a mathematically grounded restoration method, and delivers a clean download without fees or forced accounts. If your goal is to strip the watermark from your Gemini image accurately and keep your files private, this is the tool to use.`,
]

const faqItems = [
  {
    question: 'How to remove Gemini watermark without losing image quality?',
    answer: 'The safest way to remove Gemini watermark without quality loss is to use a tool built on Reverse Alpha Blending rather than AI inpainting. AI inpainting generates new pixels to fill the watermark region, which can introduce blurring, color shifts, or texture mismatches — especially near fine edges. Reverse Alpha Blending works differently: it inverts the original compositing formula to recover the exact pixel values that existed before the watermark was applied. The result is mathematically reconstructed, not guessed. For best results, always start from the original Gemini export file. Recompressed screenshots or cropped derivatives lose the alpha channel data the algorithm depends on, which reduces reconstruction accuracy.',
    open: true,
  },
  {
    question: 'Is this gemini watermark remover completely free?',
    answer: 'Yes. This gemini watermark remover has no subscription, no trial limit, and no forced sign-up. Processing runs entirely in your browser at no cost.',
  },
  {
    question: 'Can I remove the Gemini watermark without uploading image files?',
    answer: 'Yes. The engine runs inside a Web Worker in your browser. To clean your Gemini images privately, this local-only architecture is the key advantage — your files never leave your device.',
  },
  {
    question: 'Does this tool work on the Gemini star overlay?',
    answer: 'Yes. This gemini watermark remover specifically targets the Gemini star-style mark applied to AI-generated exports. It is most effective on original exports with the full alpha compositing data intact.',
  },
  {
    question: 'What is Reverse Alpha Blending and why does this tool use it?',
    answer: 'Reverse Alpha Blending is an algebraic inversion of the standard alpha compositing formula. When the Gemini watermark is blended onto an image at a known opacity, this gemini watermark remover solves the blend equation backwards to reconstruct the original pixel values — without inventing texture the way generative AI tools do.',
  },
  {
    question: 'What file formats are supported?',
    answer: 'This tool accepts PNG, JPEG, and WebP files. For the best results, use the original Gemini export rather than a screenshot or recompressed copy.',
  },
  {
    question: 'Why does this work better on original exports?',
    answer: 'When you clean an original Gemini export, the alpha channel data is intact. Recompression or screenshotting degrades that data, which limits how accurately the algorithm can solve the blend equation and recover the underlying pixels.',
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
    question: 'Does this tool work on mobile browsers?',
    answer: 'Yes. The processing engine is a pure JavaScript canvas pipeline and runs in modern mobile browsers on iOS Safari and Android Chrome. Processing may be slightly slower on lower-end devices.',
  },
  {
    question: 'Where can I find the source code for this gemini watermark remover?',
    answer: 'This gemini watermark remover is built on the open-source @pilio/gemini-watermark-remover library, which is publicly available under an MIT-compatible license. The client-side processing means the full algorithm is also visible in the browser\'s DevTools.',
  },
]

const features = [
  {
    title: 'Reverse Alpha Blending',
    copy: 'Built for Gemini exports, the engine restores the marked pixels mathematically instead of painting over them with a generated guess.',
  },
  {
    title: 'Local Browser Execution',
    copy: 'Every cleanup job runs in a Web Worker on your device. No uploads, no server logs, and no privacy tradeoff.',
  },
  {
    title: 'Free & Open Source',
    copy: 'Use the tool without limits, paywalls, or signups. The engine is inspectable, not a black box.',
  },
  {
    title: 'Purpose-Built Workflow',
    copy: 'The page is optimized for a single job: drop a Gemini export, preview the cleanup, and download a clean PNG quickly.',
  },
]

const steps = [
  {
    num: '1',
    title: 'Upload the original export',
    copy: 'Use the PNG, JPG, or WebP file downloaded directly from Gemini for the cleanest reconstruction.',
  },
  {
    num: '2',
    title: 'Process locally in your browser',
    copy: 'Reverse Alpha Blending runs on-device, so your image never has to leave the browser.',
  },
  {
    num: '3',
    title: 'Compare and download',
    copy: 'Inspect the before/after slider, then save the cleaned PNG when the result looks right.',
  },
]

const trustSignals = ['Runs locally', 'No signup', 'Sharper than AI fill']

const comparisonRows = [
  ['Gemini-specific cleanup', 'Yes', 'Usually no'],
  ['100% local browser processing', 'Yes', 'Often no'],
  ['Reverse Alpha Blending', 'Yes', 'Rarely'],
  ['Remove Gemini logo pattern', 'Yes', 'Not specifically'],
  ['Free with no limits', 'Yes', 'Often paywalled'],
]

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
        if (blob) {
          resolve(blob)
          return
        }
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
    text: 'Drop a Gemini export to start. Processing stays local in your browser.',
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

  function updateStatus(text, state = 'idle') {
    setStatus({ text, state })
  }

  function resetResult() {
    setAfterUrl((cur) => {
      if (cur) URL.revokeObjectURL(cur)
      return ''
    })
  }

  function clearSelection() {
    processJobRef.current += 1
    setSelectedFile(null)
    setDimensions(EMPTY_DIMENSIONS)
    setProcessState('Waiting')
    updateStatus('Drop a Gemini export to start. Processing stays local in your browser.')
    setBeforeUrl((cur) => {
      if (cur) URL.revokeObjectURL(cur)
      return ''
    })
    resetResult()
    if (inputRef.current) inputRef.current.value = ''
  }

  async function processFile(file) {
    if (!file) return
    const jobId = processJobRef.current + 1
    processJobRef.current = jobId
    setIsProcessing(true)
    setProcessState('Processing')
    updateStatus('Processing locally. This usually finishes in a moment.', 'working')

    try {
      const engine = await getEngine()
      const { image, objectUrl } = await createImageFromFile(file)
      if (processJobRef.current !== jobId) {
        URL.revokeObjectURL(objectUrl)
        return
      }

      setBeforeUrl((cur) => {
        if (cur) URL.revokeObjectURL(cur)
        return objectUrl
      })
      setDimensions({
        width: image.naturalWidth || EMPTY_DIMENSIONS.width,
        height: image.naturalHeight || EMPTY_DIMENSIONS.height,
      })

      const { canvas, meta } = await removeWatermarkFromImage(image, {
        engine,
        adaptiveMode: 'auto',
        maxPasses: 4,
      })
      if (processJobRef.current !== jobId) return

      const blob = await canvasToBlob(canvas)
      const nextUrl = URL.createObjectURL(blob)
      startTransition(() => {
        setAfterUrl((cur) => {
          if (cur) URL.revokeObjectURL(cur)
          return nextUrl
        })
      })
      setDimensions({ width: canvas.width || image.naturalWidth, height: canvas.height || image.naturalHeight })
      previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

      if (meta?.applied) {
        setProcessState('Completed')
        updateStatus('Done. Compare the result and download the clean PNG.', 'success')
        return
      }

      setProcessState('No Change')
      updateStatus('No Gemini watermark pattern was confirmed. Try the original Gemini export.', 'warning')
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
    if (!file) {
      clearSelection()
      return
    }
    if (!file.type.startsWith('image/')) {
      updateStatus('Select a PNG, JPG, or WebP image file.', 'warning')
      return
    }

    setSelectedFile(file)
    resetResult()
    setProcessState('Queued')
    updateStatus('Image loaded. Starting local cleanup…', 'working')
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
          <input
            id={fileInputId}
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFileChange}
          />

          <section className="hero-shell" aria-labelledby="hero-h1">
            <div className="hero-panel hero-panel-copy">
              <div className="hero-copy">
                <span className="eyebrow">Free local Gemini cleanup</span>
                <h1 id="hero-h1">Gemini Watermark Remover — Clean Gemini Exports In Seconds</h1>
                <p className="hero-sub">
                  Clean Gemini exports directly in your browser. No signup, no cloud upload,
                  and no generic AI fill standing between you and a usable image.
                </p>
              </div>

              <div className="hero-signals" aria-label="Trust signals">
                {trustSignals.map((signal) => (
                  <span key={signal} className="signal-pill">{signal}</span>
                ))}
              </div>

              <div className="proof-card">
                <div>
                  <span className="proof-label">Why this feels different</span>
                  <strong>Built for Gemini exports, not generic image cleanup.</strong>
                </div>
                <p>
                  Reverse Alpha Blending restores the marked area mathematically, so edges stay sharper
                  than they do with content-aware fill or inpainting.
                </p>
              </div>
            </div>

            <div className="hero-panel upload-panel" aria-label="Gemini watermark remover tool">
              <div
                className={`dropzone${dragActive ? ' is-active' : ''}`}
                role="button"
                tabIndex={0}
                aria-label="Drop an image file or click to browse"
                onClick={() => inputRef.current?.click()}
                onKeyDown={(event) => (
                  event.key === 'Enter' || event.key === ' ' ? inputRef.current?.click() : undefined
                )}
                onDragOver={(event) => {
                  event.preventDefault()
                  setDragActive(true)
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
              >
                <div className="dropzone-icon" aria-hidden="true">+</div>
                <strong className="dropzone-title">Upload Image</strong>
                <span className="dropzone-sub">Drop PNG, JPG, or WebP exported from Gemini</span>
                <span className="dropzone-note">Local processing only. No server upload.</span>
                {hasSelection && <span className="drop-caption">{selectedFile?.name}</span>}
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
                    className="button button-tertiary button-full"
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
                  <div>
                    <dt>File</dt>
                    <dd>{selectedFile?.name || '-'}</dd>
                  </div>
                  <div>
                    <dt>Size</dt>
                    <dd>{selectedFile ? formatBytes(selectedFile.size) : '-'}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{processState}</dd>
                  </div>
                </dl>
              )}
            </div>
          </section>

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
                <a className="button button-primary workspace-download" href={afterUrl} download={outputName}>
                  Download clean PNG
                </a>
              ) : (
                <button className="button button-primary workspace-download" type="button" disabled>
                  Download clean PNG
                </button>
              )}
            </div>

            <div className={`compare-frame${hasSelection ? '' : ' empty'}`}>
              <h2 className="sr-only">Before and After Preview</h2>
              <div className="compare-grid">
                <div className="compare-pane before-pane">
                  {beforeUrl && (
                    <img
                      src={beforeUrl}
                      alt="Original Gemini image before watermark removal"
                      width={dimensions.width}
                      height={dimensions.height}
                      loading="eager"
                      fetchPriority="high"
                    />
                  )}
                  <span className="pane-label">Before</span>
                </div>
                <div className="compare-pane after-pane" style={sliderMask}>
                  {afterUrl && (
                    <img
                      src={afterUrl}
                      alt="Gemini image after watermark removed"
                      width={dimensions.width}
                      height={dimensions.height}
                      loading="eager"
                    />
                  )}
                  <span className="pane-label">After</span>
                </div>
                <div className="compare-divider" style={sliderDivider} aria-hidden="true" />
              </div>

              {isProcessing && (
                <div className="compare-overlay" aria-hidden="true">
                  <span className="status-pill status-pill-working">Local Cleanup</span>
                  <strong>Removing the Gemini watermark…</strong>
                  <span>Reverse Alpha Blending is in progress.</span>
                </div>
              )}

              <div className="compare-empty">
                <strong>Upload to preview the cleanup</strong>
                <span>Original Gemini exports give the cleanest result.</span>
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
                onChange={(event) => setSliderValue(Number(event.target.value))}
                aria-valuetext={`${sliderValue}% after image revealed`}
                disabled={!hasResult}
              />
            </label>
          </section>

          <section className="content-section" id="why-it-works" aria-labelledby="features-h2">
            <span className="section-label">Why it works</span>
            <h2 id="features-h2">Purpose-built cleanup beats generic AI patching</h2>
            <p className="section-intro">
              The tool is tuned for a single pattern: Gemini's export watermark. That is why the workflow is faster,
              more private, and visibly cleaner than a generic image editor.
            </p>

            <div className="feature-grid">
              {features.map((feature) => (
                <article key={feature.title} className="feature-card">
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                </article>
              ))}
            </div>

            <div className="comparison-table" role="table" aria-label="Gemini watermark remover comparison">
              <div className="table-row table-head" role="row">
                <span role="columnheader">Capability</span>
                <span role="columnheader">This Tool</span>
                <span role="columnheader">Generic Editor</span>
              </div>
              {comparisonRows.map(([capability, tool, generic]) => (
                <div key={capability} className="table-row" role="row">
                  <span role="cell">{capability}</span>
                  <span role="cell" className="table-good">{tool}</span>
                  <span role="cell">{generic}</span>
                </div>
              ))}
            </div>
          </section>

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
            <p className="supporting-note">
              If the result shows “No Change”, the file is usually a screenshot or a recompressed copy rather than the
              original Gemini export. Re-download the source image and try again.
            </p>
          </section>

          <section className="content-section seo-section" id="seo-article" aria-labelledby="seo-h2">
            <span className="section-label">Deep Dive</span>
            <h2 id="seo-h2">Why a dedicated Gemini watermark remover beats generic tools</h2>

            <div className="seo-prose">
              {seoProseBlocks.map((html, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: html }} />
              ))}

              <h3>What is Reverse Alpha Blending?</h3>
              <p>
                Standard image compositing uses the formula: <code>C_out = alpha × C_watermark + (1 − alpha) × C_original</code>.
                When you use this <strong>gemini watermark remover</strong>, the engine reads the known parameters of the Gemini
                overlay — its position, size, opacity, and color — and solves the equation for <code>C_original</code>. That
                algebraic reversal is what makes the cleaned result look like the untouched image rather than an AI reconstruction.
              </p>

              <h3>Client-side processing explained</h3>
              <p>
                Client-side processing means every instruction runs inside your browser tab. When you use this tool to clean your
                Gemini image, the JavaScript engine decodes the file into a canvas buffer, runs the detection and blending pass,
                then exports the result back to PNG — all without sending the image to a remote server.
              </p>

              <h3>Best practices for clean results</h3>
              <p>
                To get the best results, always start from the raw Gemini export. Avoid screenshots, crops, or low-quality
                re-saves because compression artifacts interfere with the blending math. If the output still shows residual marks,
                re-export the image from Gemini at full resolution before trying again.
              </p>
            </div>
          </section>

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
