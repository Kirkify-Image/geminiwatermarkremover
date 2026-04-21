import { startTransition, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createWatermarkEngine, removeWatermarkFromImage } from '@pilio/gemini-watermark-remover/browser'

const seoProseBlocks = [
  `Si estás buscando una forma fiable de <strong>quitar marca de agua gemini</strong>, esta es la herramienta adecuada. Es gratis, funciona por completo en tu navegador y mantiene cada píxel de tu imagen en tu propio dispositivo. Sin registro, sin colas de subida y sin suscripciones. Suelta el archivo y el proceso para <strong>quitar marca de agua gemini</strong> empieza al instante.`,
  `La necesidad de <strong>quitar marca de agua gemini</strong> ha crecido junto con el uso de Google Gemini como generador de imágenes con IA. Diseñadores, equipos de marketing e investigadores exportan imágenes desde Gemini y luego necesitan una versión limpia para presentaciones, webs y documentos. Una herramienta específica para <strong>quitar marca de agua gemini</strong> es la forma más rápida de lograrlo sin depender de un servidor externo.`,
  `La diferencia entre una herramienta especializada y un borrador genérico empieza en la propia marca de agua. La superposición de Gemini se aplica sobre la imagen con una opacidad conocida mediante alpha blending. Reverse Alpha Blending, el motor central de esta herramienta para <strong>quitar marca de agua gemini</strong>, invierte matemáticamente esa composición. En lugar de inventar lo que hay debajo de la marca, resuelve la ecuación y recupera los píxeles originales con alta fidelidad. Por eso, una solución real para <strong>quitar marca de agua gemini</strong> ofrece resultados más nítidos que un relleno genérico con IA.`,
  `Cuando limpias una imagen de Gemini con este motor en el navegador, todo el flujo se ejecuta dentro de un Web Worker local. El servidor nunca ve tu archivo. Ese enfoque privado es una de las razones por las que tantos usuarios eligen esta herramienta para <strong>quitar marca de agua gemini</strong> en material sensible, creatividades de clientes o capturas de producto aún no publicadas.`,
  `El procesamiento local también suele ser más rápido que las opciones que dependen de la nube. El navegador decodifica la imagen, detecta la superposición, aplica Reverse Alpha Blending en el canvas y devuelve un PNG descargable, todo sin ida y vuelta al servidor. En una exportación estándar de Gemini, <strong>quitar marca de agua gemini</strong> normalmente tarda menos de dos segundos en un portátil de gama media.`,
  `El método importa tanto como el resultado. Esta herramienta para <strong>quitar marca de agua gemini</strong> está construida sobre un motor open source, así que su lógica de restauración puede auditarse públicamente. Esa transparencia no es habitual. Muchas soluciones que prometen eliminar la superposición de Gemini funcionan como cajas negras. Aquí puedes revisar el código, entender el algoritmo y confirmar que ningún dato sale del dispositivo.`,
  `Si quieres saber cómo <strong>quitar marca de agua gemini</strong> con la máxima precisión, empieza siempre que puedas con la exportación original de Gemini. Las capturas de pantalla, los recortes o las imágenes recomprimidas pierden información alfa, y eso reduce la capacidad del algoritmo para eliminar la marca de agua con precisión. La imagen original le da al motor la mejor base posible.`,
  `Esta herramienta para <strong>quitar marca de agua gemini</strong> genera una salida PNG a resolución completa, manteniendo intactos todos los píxeles fuera del área reparada. La zona restaurada utiliza Reverse Alpha Blending en vez de inpainting con IA, así que no aparecen texturas inventadas ni bordes emborronados alrededor de la marca. Si comparas el antes y el después con el control deslizante de esta página, la transición debería verse limpia en exportaciones originales bien conservadas.`,
  `En resumen: una solución creada específicamente para <strong>quitar marca de agua gemini</strong> es muy distinta a un editor genérico. Está diseñada para la superposición concreta que aplica Gemini, procesa archivos de forma local para proteger la privacidad, utiliza una restauración matemática y ofrece un resultado limpio sin pagos ni cuentas obligatorias. Si buscas <strong>quitar marca de agua gemini</strong> con precisión, rapidez y sin pérdida de calidad, esta es la herramienta que necesitas.`,
]

const faqItems = [
  {
    question: '¿Cómo quitar la marca de agua de Gemini sin perder calidad?',
    answer: 'La forma más segura de quitar la marca de agua de Gemini sin pérdida de calidad es usar una herramienta basada en Reverse Alpha Blending en lugar de inpainting con IA. El inpainting con IA genera píxeles nuevos para rellenar la zona de la marca de agua, lo que puede introducir desenfoque, cambios de color o texturas inconsistentes, sobre todo en bordes finos. Reverse Alpha Blending invierte la fórmula de composición original para recuperar los valores exactos de los píxeles que existían antes de aplicar la marca. El resultado se reconstruye matemáticamente, no se inventa. Para conseguir la máxima precisión, parte siempre del archivo original exportado por Gemini.',
    open: true,
  },
  {
    question: '¿Esta herramienta para quitar marca de agua gemini es totalmente gratis?',
    answer: 'Sí. Esta herramienta para quitar marca de agua gemini no tiene suscripciones, límites de prueba ni registro obligatorio. Todo el procesamiento se ejecuta en tu navegador sin coste.',
  },
  {
    question: '¿Puedo quitar la marca de agua de Gemini sin subir imágenes?',
    answer: 'Sí. El motor se ejecuta dentro de un Web Worker en tu navegador. Esa arquitectura local es la clave para eliminar la marca de agua con privacidad: tus archivos nunca salen de tu dispositivo.',
  },
  {
    question: '¿Funciona con la superposición en forma de estrella de Gemini?',
    answer: 'Sí. Esta herramienta para quitar marca de agua gemini está diseñada específicamente para la marca en forma de estrella que aparece en las exportaciones generadas con IA de Gemini. Funciona mejor con los archivos originales, donde la composición alfa se conserva intacta.',
  },
  {
    question: '¿Qué es Reverse Alpha Blending y por qué se usa aquí?',
    answer: 'Reverse Alpha Blending es una inversión algebraica de la fórmula estándar de composición alfa. Cuando la marca de agua de Gemini se aplica sobre una imagen con una opacidad conocida, esta herramienta para quitar marca de agua gemini resuelve la ecuación al revés para reconstruir los píxeles originales sin inventar textura, como sí ocurre con muchas herramientas generativas de IA.',
  },
  {
    question: '¿Qué formatos de archivo son compatibles?',
    answer: 'La herramienta acepta PNG, JPEG y WebP. Para obtener el mejor resultado, usa la exportación original de Gemini y evita capturas de pantalla o copias recomprimidas.',
  },
  {
    question: '¿Por qué funciona mejor con exportaciones originales?',
    answer: 'Cuando trabajas con una exportación original de Gemini, la información del canal alfa se mantiene intacta. Si la imagen se recomprime o se captura mediante screenshot, esos datos se degradan y el algoritmo pierde precisión al reconstruir los píxeles ocultos.',
  },
  {
    question: '¿Es seguro usar esta herramienta en imágenes de clientes?',
    answer: 'Sí. Como todo se procesa localmente, usar esta herramienta para quitar marca de agua gemini en materiales de clientes es seguro desde el punto de vista de la privacidad. Ninguna imagen se envía a un servidor externo.',
  },
  {
    question: '¿Cómo se compara con Photoshop o con un editor genérico con IA?',
    answer: 'Un editor genérico suele usar relleno según contenido o inpainting con IA, lo que genera píxeles nuevos y puede producir desenfoques o texturas poco coherentes. Esta herramienta para quitar marca de agua gemini utiliza Reverse Alpha Blending para reconstruir en lugar de inventar, por lo que mantiene bordes más limpios y colores más fieles.',
  },
  {
    question: '¿Qué debo hacer si la herramienta muestra "Sin cambios"?',
    answer: 'Un resultado de "Sin cambios" normalmente significa que el archivo subido no contiene el patrón esperado de la superposición de Gemini. Prueba con el PNG o JPEG original exportado directamente desde Gemini. Si la marca de agua está fuera de la posición habitual o ha sido editada parcialmente, puede que la detección automática no la reconozca.',
  },
  {
    question: '¿Funciona en navegadores móviles?',
    answer: 'Sí. El motor es un pipeline de JavaScript con canvas y funciona en navegadores móviles modernos, como Safari en iOS y Chrome en Android. En dispositivos modestos, el procesamiento puede tardar un poco más.',
  },
  {
    question: '¿Dónde puedo ver el código fuente de esta herramienta?',
    answer: 'Esta herramienta para quitar marca de agua gemini se basa en la librería open source @pilio/gemini-watermark-remover, publicada con una licencia compatible con MIT. Como el procesamiento ocurre en el cliente, el algoritmo también puede inspeccionarse desde las DevTools del navegador.',
  },
]

const features = [
  {
    title: 'Reverse Alpha Blending',
    copy: 'Pensado para exportaciones de Gemini, el motor restaura matemáticamente los píxeles marcados en lugar de taparlos con una estimación generada.',
  },
  {
    title: 'Ejecución local en el navegador',
    copy: 'Cada limpieza se ejecuta dentro de un Web Worker en tu dispositivo. Sin subidas, sin logs de servidor y sin renunciar a la privacidad.',
  },
  {
    title: 'Gratis y open source',
    copy: 'Usa la herramienta sin límites, sin muros de pago y sin registro. El motor se puede inspeccionar; no es una caja negra.',
  },
  {
    title: 'Flujo diseñado para esta tarea',
    copy: 'La página está optimizada para un solo trabajo: subir una exportación de Gemini, revisar el resultado y descargar un PNG limpio en segundos.',
  },
]

const steps = [
  {
    num: '1',
    title: 'Sube la exportación original',
    copy: 'Usa el archivo PNG, JPG o WebP descargado directamente desde Gemini para conseguir la reconstrucción más limpia.',
  },
  {
    num: '2',
    title: 'Procesa localmente en tu navegador',
    copy: 'Reverse Alpha Blending se ejecuta en tu dispositivo, así que tu imagen no tiene que salir del navegador.',
  },
  {
    num: '3',
    title: 'Compara y descarga',
    copy: 'Revisa el comparador antes y después y descarga el PNG limpio cuando el resultado esté correcto.',
  },
]

const trustSignals = ['Se ejecuta en local', 'Sin registro', 'Más nítido que el relleno con IA']

const comparisonRows = [
  ['Limpieza específica para Gemini', 'Sí', 'Normalmente no'],
  ['Procesamiento 100% local en el navegador', 'Sí', 'A menudo no'],
  ['Reverse Alpha Blending', 'Sí', 'Rara vez'],
  ['Elimina el patrón del logo de Gemini', 'Sí', 'No específicamente'],
  ['Gratis y sin límites', 'Sí', 'A menudo con pago'],
]

const languageLinks = [
  { code: 'EN', href: '/', label: 'English' },
  { code: 'PT', href: '/pt/', label: 'Português' },
  { code: 'ES', href: '/es/', label: 'Español' },
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
      reject(new Error('No se pudo leer la imagen seleccionada. Prueba con otra exportación original de Gemini.'))
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
        reject(new Error('No se pudo exportar la imagen procesada.'))
      }, type, quality)
    })
  }
  throw new Error('La exportación de canvas no está disponible en este navegador.')
}

function getEngine() {
  if (!enginePromise) enginePromise = createWatermarkEngine()
  return enginePromise
}

export default function AppEs() {
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
    text: 'Sube una exportación de Gemini para empezar. Todo el procesamiento se mantiene local en tu navegador.',
    state: 'idle',
  })
  const [processState, setProcessState] = useState('En espera')

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
    setProcessState('En espera')
    updateStatus('Sube una exportación de Gemini para empezar. Todo el procesamiento se mantiene local en tu navegador.')
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
    setProcessState('Procesando')
    updateStatus('Procesando en local. Normalmente termina en unos segundos.', 'working')

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
        setProcessState('Completado')
        updateStatus('Listo. Compara el resultado y descarga el PNG limpio.', 'success')
        return
      }

      setProcessState('Sin cambios')
      updateStatus('No se confirmó ningún patrón de marca de agua de Gemini. Prueba con la exportación original.', 'warning')
    } catch (error) {
      if (processJobRef.current !== jobId) return
      console.error(error)
      setProcessState('Error')
      updateStatus(error?.message || 'El procesamiento falló. Prueba con otra exportación original de Gemini.', 'error')
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
      updateStatus('Selecciona un archivo de imagen PNG, JPG o WebP.', 'warning')
      return
    }

    setSelectedFile(file)
    resetResult()
    setProcessState('En cola')
    updateStatus('Imagen cargada. Iniciando la limpieza local…', 'working')
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
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>

      <div className="page-wrap">
        <header>
          <nav className="topbar" aria-label="Principal">
            <a className="brand" href="#top">
              <span className="brand-mark" aria-hidden="true">✦</span>
              Quitar Marca de Agua Gemini
            </a>
            <div className="topbar-actions">
              <div className="top-links">
                <a href="#how-to-remove">Cómo funciona</a>
                <a href="#faq">FAQ</a>
              </div>
              <div className="language-switcher" aria-label="Selector de idioma">
                <span className="language-label">Idioma</span>
                {languageLinks.map((item) => (
                  <a
                    key={item.code}
                    href={item.href}
                    hrefLang={item.code === 'PT' ? 'pt' : item.code === 'ES' ? 'es' : 'en'}
                    lang={item.code === 'PT' ? 'pt' : item.code === 'ES' ? 'es' : 'en'}
                    className={`language-link${item.code === 'ES' ? ' is-active' : ''}`}
                    aria-current={item.code === 'ES' ? 'page' : undefined}
                    title={item.label}
                  >
                    {item.code}
                  </a>
                ))}
              </div>
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
                <span className="eyebrow">Herramienta gratis y local para Gemini</span>
                <h1 id="hero-h1">La mejor herramienta para quitar marca de agua gemini</h1>
                <p className="hero-sub">
                  Quita la marca de agua de las exportaciones de Gemini directamente en tu navegador.
                  Sin registro, sin subir archivos a la nube y sin depender de un parche genérico con IA.
                </p>
              </div>

              <div className="hero-signals" aria-label="Señales de confianza">
                {trustSignals.map((signal) => (
                  <span key={signal} className="signal-pill">{signal}</span>
                ))}
              </div>

              <div className="proof-card">
                <div>
                  <span className="proof-label">Por qué se siente diferente</span>
                  <strong>Creada para exportaciones de Gemini, no para una limpieza genérica de imágenes.</strong>
                </div>
                <p>
                  Reverse Alpha Blending restaura el área marcada de forma matemática, así que los bordes conservan más definición
                  que con el relleno según contenido o el inpainting.
                </p>
              </div>
            </div>

            <div className="hero-panel upload-panel" aria-label="Herramienta para quitar marca de agua gemini">
              <div
                className={`dropzone${dragActive ? ' is-active' : ''}`}
                role="button"
                tabIndex={0}
                aria-label="Suelta un archivo de imagen o haz clic para buscar"
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
                <strong className="dropzone-title">Subir imagen</strong>
                <span className="dropzone-sub">Suelta un PNG, JPG o WebP exportado desde Gemini</span>
                <span className="dropzone-note">Procesamiento solo local. Sin subida al servidor.</span>
                {hasSelection && <span className="drop-caption">{selectedFile?.name}</span>}
              </div>

              <div className="tool-buttons">
                <button
                  className="button button-primary button-full"
                  type="button"
                  onClick={() => inputRef.current?.click()}
                >
                  Probar gratis
                </button>
                <button
                  className="button button-secondary button-full"
                  type="button"
                  disabled={!hasSelection || isProcessing}
                  onClick={handleProcess}
                >
                  {isProcessing ? 'Procesando…' : 'Quitar ahora'}
                </button>
                {hasSelection && (
                  <button
                    className="button button-tertiary button-full"
                    type="button"
                    onClick={clearSelection}
                  >
                    Restablecer
                  </button>
                )}
              </div>

              <p className="status-message" data-state={status.state} role="status" aria-live="polite">
                {status.text}
              </p>

              {hasSelection && (
                <dl className="file-meta">
                  <div>
                    <dt>Archivo</dt>
                    <dd>{selectedFile?.name || '-'}</dd>
                  </div>
                  <div>
                    <dt>Tamaño</dt>
                    <dd>{selectedFile ? formatBytes(selectedFile.size) : '-'}</dd>
                  </div>
                  <div>
                    <dt>Estado</dt>
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
                <h2 id="preview-h2">Espacio de trabajo antes / después</h2>
                <p>
                  {selectedFile
                    ? `${formatBytes(selectedFile.size)} · procesado localmente en tu navegador`
                    : 'Sube una exportación de Gemini para previsualizar el resultado.'}
                </p>
              </div>
              {hasResult ? (
                <a className="button button-primary workspace-download" href={afterUrl} download={outputName}>
                  Descargar PNG limpio
                </a>
              ) : (
                <button className="button button-primary workspace-download" type="button" disabled>
                  Descargar PNG limpio
                </button>
              )}
            </div>

            <div className={`compare-frame${hasSelection ? '' : ' empty'}`}>
              <h2 className="sr-only">Vista previa antes y después</h2>
              <div className="compare-grid">
                <div className="compare-pane before-pane">
                  {beforeUrl && (
                    <img
                      src={beforeUrl}
                      alt="Imagen original de Gemini antes de quitar la marca de agua"
                      width={dimensions.width}
                      height={dimensions.height}
                      loading="eager"
                      fetchPriority="high"
                    />
                  )}
                  <span className="pane-label">Antes</span>
                </div>
                <div className="compare-pane after-pane" style={sliderMask}>
                  {afterUrl && (
                    <img
                      src={afterUrl}
                      alt="Imagen de Gemini después de quitar la marca de agua"
                      width={dimensions.width}
                      height={dimensions.height}
                      loading="eager"
                    />
                  )}
                  <span className="pane-label">Después</span>
                </div>
                <div className="compare-divider" style={sliderDivider} aria-hidden="true" />
              </div>

              {isProcessing && (
                <div className="compare-overlay" aria-hidden="true">
                  <span className="status-pill status-pill-working">Limpieza local</span>
                  <strong>Quitando la marca de agua de Gemini…</strong>
                  <span>Reverse Alpha Blending está en marcha.</span>
                </div>
              )}

              <div className="compare-empty">
                <strong>Sube una imagen para previsualizar la limpieza</strong>
                <span>Las exportaciones originales de Gemini ofrecen el resultado más limpio.</span>
              </div>
            </div>

            <label className="slider-wrap" htmlFor="compare-slider">
              <span>Arrastra para comparar</span>
              <input
                id="compare-slider"
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(event) => setSliderValue(Number(event.target.value))}
                aria-valuetext={`${sliderValue}% de la imagen final visible`}
                disabled={!hasResult}
              />
            </label>
          </section>

          <section className="content-section" id="why-it-works" aria-labelledby="features-h2">
            <span className="section-label">Por qué funciona</span>
            <h2 id="features-h2">Una herramienta específica supera a un parche genérico con IA</h2>
            <p className="section-intro">
              La herramienta está ajustada a un solo patrón: la marca de agua de exportación de Gemini. Por eso el flujo es más rápido,
              más privado y más limpio que en un editor de imágenes genérico.
            </p>

            <div className="feature-grid">
              {features.map((feature) => (
                <article key={feature.title} className="feature-card">
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                </article>
              ))}
            </div>

            <div className="comparison-table" role="table" aria-label="Comparativa de quitar marca de agua gemini">
              <div className="table-row table-head" role="row">
                <span role="columnheader">Capacidad</span>
                <span role="columnheader">Esta herramienta</span>
                <span role="columnheader">Editor genérico</span>
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
            <span className="section-label">Cómo funciona</span>
            <h2 id="steps-h2">Tres pasos para quitar marca de agua gemini online</h2>
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
              Si el resultado muestra “Sin cambios”, lo habitual es que el archivo sea una captura de pantalla o una copia recomprimida,
              y no la exportación original de Gemini. Descarga de nuevo la imagen de origen y vuelve a intentarlo.
            </p>
          </section>

          <section className="content-section seo-section" id="seo-article" aria-labelledby="seo-h2">
            <span className="section-label">Análisis en profundidad</span>
            <h2 id="seo-h2">Por qué quitar marca de agua gemini con una herramienta dedicada da mejores resultados</h2>

            <div className="seo-prose">
              {seoProseBlocks.map((html, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: html }} />
              ))}

              <h3>¿Qué es Reverse Alpha Blending?</h3>
              <p>
                La composición estándar de imágenes usa la fórmula: <code>C_out = alpha × C_watermark + (1 − alpha) × C_original</code>.
                Cuando utilizas esta herramienta para <strong>quitar marca de agua gemini</strong>, el motor lee los parámetros conocidos
                de la superposición de Gemini, como posición, tamaño, opacidad y color, y resuelve la ecuación para <code>C_original</code>.
                Esa inversión algebraica es lo que permite obtener un resultado limpio que parece la imagen intacta, y no una reconstrucción artificial con IA.
              </p>

              <h3>Qué significa el procesamiento en local</h3>
              <p>
                El procesamiento en local significa que cada instrucción se ejecuta dentro de tu propia pestaña del navegador. Cuando usas
                esta herramienta para eliminar marca de agua online, el motor JavaScript decodifica el archivo en un buffer de canvas,
                ejecuta la detección y el proceso de mezcla, y exporta el resultado a PNG sin enviar nunca la imagen a un servidor remoto.
              </p>

              <h3>Buenas prácticas para un resultado sin pérdida de calidad</h3>
              <p>
                Para obtener el mejor resultado sin pérdida de calidad, usa siempre la exportación original de Gemini. Evita capturas de pantalla,
                recortes o reexportaciones de baja calidad, porque los artefactos de compresión interfieren con la matemática del blend.
                Si aún ves restos de la marca, vuelve a exportar la imagen desde Gemini en resolución completa antes de probar otra vez.
              </p>
            </div>
          </section>

          <section className="content-section" id="faq" aria-labelledby="faq-h2">
            <span className="section-label">FAQ</span>
            <h2 id="faq-h2">Preguntas frecuentes sobre cómo quitar la marca de agua de Gemini</h2>
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
          <p>© {new Date().getFullYear()} gemini-watermarkremover.org — gratis, local y open source. Ningún dato sale de tu dispositivo.</p>
          <div className="site-footer-badges">
            <a
              className="site-footer-badge"
              href="https://showmebest.ai"
              target="_blank"
              rel="noreferrer"
              aria-label="Destacado en ShowMeBestAI"
            >
              <img
                src="https://showmebest.ai/badge/feature-badge-dark.webp"
                alt="Destacado en ShowMeBestAI"
                width="220"
                height="60"
              />
            </a>
            <a
              className="site-footer-badge"
              href="https://toolfame.com/item/gemini-watermark-remover-gemini-watermarkremoverorg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Destacado en toolfame.com"
            >
              <img
                src="https://toolfame.com/badge-light.svg"
                alt="Destacado en toolfame.com"
                width="173"
                height="54"
              />
            </a>
            <a
              className="site-footer-badge"
              href="https://fazier.com/launches/gemini-watermarkremover.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Destacado en Fazier"
            >
              <img
                src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=dark"
                alt="Insignia de Fazier"
                width="120"
                height="40"
              />
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
