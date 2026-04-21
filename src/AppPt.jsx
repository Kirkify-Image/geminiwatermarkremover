import { startTransition, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createWatermarkEngine, removeWatermarkFromImage } from '@pilio/gemini-watermark-remover/browser'

const seoProseBlocks = [
  `Se você está procurando um <strong>remover marca d'água gemini</strong> confiável, está no lugar certo. Esta ferramenta gratuita funciona inteiramente no seu navegador, então cada pixel da sua imagem permanece no seu dispositivo. Sem cadastro, sem fila de upload, sem assinatura. Basta soltar o arquivo e o <strong>remover marca d'água gemini</strong> começa a funcionar instantaneamente.`,
  `A demanda para remover a marca d'água de imagens do Gemini cresceu junto com a adoção do Google Gemini como ferramenta de imagem com IA. Designers, profissionais de marketing e pesquisadores exportam visuais do Gemini com frequência e depois precisam de uma versão limpa para apresentações, sites e relatórios. Um <strong>remover marca d'água gemini</strong> dedicado é a forma mais rápida de chegar a esse resultado sem enviar arquivos para um servidor remoto fora do seu controle.`,
  `Entender por que uma ferramenta especializada supera um apagador genérico começa pela própria marca d'água. A sobreposição do Gemini é composta sobre a imagem com uma opacidade conhecida usando mistura alfa. O Reverse Alpha Blending, algoritmo central deste <strong>remover marca d'água gemini</strong>, inverte matematicamente essa composição. Em vez de adivinhar o que existe sob a marca, ele resolve diretamente a equação de mistura e recupera os pixels originais com alta fidelidade. Por isso, os resultados de um verdadeiro <strong>remover marca d'água gemini</strong> parecem mais nítidos e naturais do que saídas de uma ferramenta genérica de preenchimento com IA.`,
  `Quando você limpa sua imagem do Gemini com este mecanismo baseado em navegador, todo o processamento permanece dentro de um Web Worker na sua máquina local. O servidor nunca vê sua imagem. Esse compromisso com a privacidade é o motivo pelo qual tantos usuários escolhem este <strong>remover marca d'água gemini</strong> para trabalhos de clientes, capturas de produtos ainda não lançados e outros materiais sensíveis.`,
  `O processamento no lado do cliente também torna esta ferramenta mais rápida do que alternativas dependentes de servidor na maioria dos dispositivos modernos. O navegador decodifica a imagem, executa a detecção, aplica o Reverse Alpha Blending por meio de um pipeline em canvas e retorna um PNG pronto para download, tudo sem ida e volta para a nuvem. Em uma exportação padrão do Gemini, todo o processo normalmente termina em menos de dois segundos em um notebook intermediário.`,
  `O método por trás desta ferramenta importa tanto quanto o resultado. Este <strong>remover marca d'água gemini</strong> é construído sobre um motor open source, o que significa que a lógica de restauração pode ser inspecionada publicamente. Essa transparência é rara. A maioria das ferramentas que afirma remover a sobreposição do Gemini funciona como uma caixa-preta. Aqui, qualquer pessoa pode ler o código, entender o algoritmo e verificar que nenhum dado sai do dispositivo.`,
  `Para usuários que querem saber como remover a marca d'água do Gemini com precisão: sempre que possível, comece com a exportação original do Gemini. Capturas de tela recomprimidas ou arquivos recortados perdem os dados alfa de que o algoritmo precisa, o que limita a precisão com que a ferramenta consegue remover a marca d'água da sua imagem do Gemini. As exportações originais fornecem a melhor matéria-prima para o motor trabalhar.`,
  `Este <strong>remover marca d'água gemini</strong> gera uma saída em PNG com resolução total, preservando exatamente cada pixel fora da região da marca d'água. A área reparada usa o resultado do Reverse Alpha Blending em vez de inpainting com IA, o que significa que não há texturas inventadas nem bordas borradas nas áreas adjacentes à marca. Se você comparar o antes e o depois com o controle desta página, a transição entre a área limpa e a intocada deve parecer contínua em exportações originais bem formadas.`,
  `Em resumo: um <strong>remover marca d'água gemini</strong> desenvolvido especificamente para essa tarefa é muito diferente de um editor genérico. Ele foi projetado para a sobreposição específica que o Gemini aplica, processa arquivos localmente para preservar a privacidade, usa um método de restauração matematicamente fundamentado e entrega um download limpo sem taxas nem contas obrigatórias. Se seu objetivo é remover a marca d'água da sua imagem do Gemini com precisão e manter seus arquivos privados, esta é a ferramenta certa.`,
]

const faqItems = [
  {
    question: "Como remover a marca d'água do Gemini sem perder qualidade de imagem?",
    answer: "A forma mais segura de remover a marca d'água do Gemini sem perda de qualidade é usar uma ferramenta baseada em Reverse Alpha Blending em vez de inpainting com IA. O inpainting com IA gera novos pixels para preencher a região da marca d'água, o que pode introduzir borrões, mudanças de cor ou diferenças de textura, especialmente perto de bordas finas. O Reverse Alpha Blending funciona de outra forma: ele inverte a fórmula original de composição para recuperar os valores exatos de pixel que existiam antes da aplicação da marca d'água. O resultado é reconstruído matematicamente, não adivinhado. Para obter o melhor resultado, sempre comece com o arquivo original exportado pelo Gemini. Capturas de tela recomprimidas ou versões recortadas perdem os dados do canal alfa de que o algoritmo depende, reduzindo a precisão da reconstrução.",
    open: true,
  },
  {
    question: "Este remover marca d'água gemini é totalmente gratuito?",
    answer: "Sim. Este remover marca d'água gemini não tem assinatura, limite de teste nem cadastro obrigatório. O processamento roda inteiramente no seu navegador, sem custo.",
  },
  {
    question: "Posso remover a marca d'água do Gemini sem enviar arquivos de imagem?",
    answer: "Sim. O motor roda dentro de um Web Worker no seu navegador. Para limpar suas imagens do Gemini com privacidade, essa arquitetura local é a principal vantagem: seus arquivos nunca saem do seu dispositivo.",
  },
  {
    question: "Esta ferramenta funciona na sobreposição em forma de estrela do Gemini?",
    answer: "Sim. Este remover marca d'água gemini foi feito especificamente para a marca no estilo estrela aplicada às exportações geradas por IA. Ele funciona melhor com exportações originais que preservam todos os dados de composição alfa.",
  },
  {
    question: "O que é Reverse Alpha Blending e por que esta ferramenta o utiliza?",
    answer: "Reverse Alpha Blending é uma inversão algébrica da fórmula padrão de composição alfa. Quando a marca d'água do Gemini é aplicada a uma imagem com uma opacidade conhecida, este remover marca d'água gemini resolve a equação ao contrário para reconstruir os pixels originais, sem inventar textura como fazem ferramentas generativas com IA.",
  },
  {
    question: "Quais formatos de arquivo são suportados?",
    answer: "Esta ferramenta aceita arquivos PNG, JPEG e WebP. Para obter os melhores resultados, use a exportação original do Gemini em vez de uma captura de tela ou uma cópia recomprimida.",
  },
  {
    question: "Por que esta ferramenta funciona melhor com exportações originais?",
    answer: "Quando você processa uma exportação original do Gemini, os dados do canal alfa permanecem intactos. Recompressão ou capturas de tela degradam esses dados, o que limita a precisão com que o algoritmo consegue resolver a equação de mistura e recuperar os pixels subjacentes.",
  },
  {
    question: "É seguro remover a marca d'água que usuários do Gemini encontram em materiais de clientes?",
    answer: "Sim. Como esta ferramenta processa os arquivos localmente, remover uma marca d'água de materiais de clientes com este remover marca d'água gemini é seguro do ponto de vista de privacidade de dados. Nenhuma imagem é enviada a qualquer servidor.",
  },
  {
    question: "Como este removedor do logo do Gemini se compara ao Photoshop ou a um editor genérico com IA?",
    answer: "Um editor genérico usa preenchimento sensível ao conteúdo ou inpainting com IA, o que gera novos pixels e pode introduzir borrões ou texturas inconsistentes. Este removedor do logo do Gemini usa Reverse Alpha Blending, que reconstrói em vez de inventar, produzindo bordas mais limpas e cores mais fiéis na área reparada.",
  },
  {
    question: "O que devo fazer se o remover marca d'água gemini mostrar \"Sem alterações\"?",
    answer: "Um resultado \"Sem alterações\" normalmente significa que o arquivo enviado não contém o padrão de sobreposição esperado do Gemini. Tente enviar o arquivo PNG ou JPEG original exportado diretamente do Gemini em vez de uma captura de tela. Se a marca d'água estiver em uma posição fora do padrão ou tiver sido parcialmente editada, o remover marca d'água gemini pode não detectá-la automaticamente.",
  },
  {
    question: "Esta ferramenta funciona em navegadores móveis?",
    answer: "Sim. O motor de processamento é um pipeline puro de JavaScript com canvas e roda em navegadores móveis modernos, como Safari no iOS e Chrome no Android. O processamento pode ser um pouco mais lento em dispositivos de entrada.",
  },
  {
    question: "Onde posso encontrar o código-fonte deste remover marca d'água gemini?",
    answer: "Este remover marca d'água gemini é construído sobre a biblioteca open source @pilio/gemini-watermark-remover, disponibilizada publicamente sob uma licença compatível com MIT. Como o processamento acontece no lado do cliente, o algoritmo completo também fica visível nas DevTools do navegador.",
  },
]

const features = [
  {
    title: 'Reverse Alpha Blending',
    copy: "Projetado para exportações do Gemini, o motor restaura matematicamente os pixels marcados em vez de cobri-los com uma estimativa gerada.",
  },
  {
    title: 'Execução local no navegador',
    copy: 'Cada limpeza roda em um Web Worker no seu dispositivo. Sem uploads, sem logs em servidor e sem abrir mão da privacidade.',
  },
  {
    title: 'Gratuito e open source',
    copy: 'Use a ferramenta sem limites, paywalls ou cadastro. O motor pode ser inspecionado, não é uma caixa-preta.',
  },
  {
    title: 'Fluxo criado para essa tarefa',
    copy: 'A página é otimizada para uma única ação: enviar uma exportação do Gemini, visualizar a limpeza e baixar rapidamente um PNG limpo.',
  },
]

const steps = [
  {
    num: '1',
    title: 'Envie a exportação original',
    copy: 'Use o arquivo PNG, JPG ou WebP baixado diretamente do Gemini para obter a reconstrução mais limpa.',
  },
  {
    num: '2',
    title: 'Processe localmente no navegador',
    copy: 'O Reverse Alpha Blending roda no dispositivo, então sua imagem nunca precisa sair do navegador.',
  },
  {
    num: '3',
    title: 'Compare e baixe',
    copy: 'Analise o comparador antes/depois e salve o PNG limpo quando o resultado estiver correto.',
  },
]

const trustSignals = ['Roda localmente', 'Sem cadastro', 'Mais nítido que preenchimento com IA']

const comparisonRows = [
  ['Limpeza específica para Gemini', 'Sim', 'Normalmente não'],
  ['Processamento 100% local no navegador', 'Sim', 'Muitas vezes não'],
  ['Reverse Alpha Blending', 'Sim', 'Raramente'],
  ['Remove o padrão do logo do Gemini', 'Sim', 'Não especificamente'],
  ['Grátis e sem limites', 'Sim', 'Muitas vezes com paywall'],
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
      reject(new Error("Não foi possível ler a imagem selecionada. Tente outra exportação original do Gemini."))
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
        reject(new Error('Falha ao exportar a imagem processada.'))
      }, type, quality)
    })
  }
  throw new Error('A exportação via canvas não está disponível neste navegador.')
}

function getEngine() {
  if (!enginePromise) enginePromise = createWatermarkEngine()
  return enginePromise
}

export default function AppPt() {
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
    text: 'Envie uma exportação do Gemini para começar. O processamento permanece local no seu navegador.',
    state: 'idle',
  })
  const [processState, setProcessState] = useState('Aguardando')

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
    setProcessState('Aguardando')
    updateStatus('Envie uma exportação do Gemini para começar. O processamento permanece local no seu navegador.')
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
    setProcessState('Processando')
    updateStatus('Processando localmente. Isso normalmente termina em instantes.', 'working')

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
        setProcessState('Concluído')
        updateStatus('Pronto. Compare o resultado e baixe o PNG limpo.', 'success')
        return
      }

      setProcessState('Sem alterações')
      updateStatus('Nenhum padrão de marca d\'água do Gemini foi confirmado. Tente a exportação original do Gemini.', 'warning')
    } catch (error) {
      if (processJobRef.current !== jobId) return
      console.error(error)
      setProcessState('Erro')
      updateStatus(error?.message || 'O processamento falhou. Tente outra exportação original do Gemini.', 'error')
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
      updateStatus('Selecione um arquivo de imagem PNG, JPG ou WebP.', 'warning')
      return
    }

    setSelectedFile(file)
    resetResult()
    setProcessState('Na fila')
    updateStatus('Imagem carregada. Iniciando a limpeza local…', 'working')
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
      <a className="skip-link" href="#main-content">Pular para o conteúdo principal</a>

      <div className="page-wrap">
        <header>
          <nav className="topbar" aria-label="Principal">
            <a className="brand" href="#top">
              <span className="brand-mark" aria-hidden="true">✦</span>
              Remover Marca d&apos;Água Gemini
            </a>
            <div className="topbar-actions">
              <div className="top-links">
                <a href="#how-to-remove">Como funciona</a>
                <a href="#faq">FAQ</a>
              </div>
              <div className="language-switcher" aria-label="Alternador de idioma">
                <span className="language-label">Idioma</span>
                {languageLinks.map((item) => (
                  <a
                    key={item.code}
                    href={item.href}
                    hrefLang={item.code === 'PT' ? 'pt' : item.code === 'ES' ? 'es' : 'en'}
                    lang={item.code === 'PT' ? 'pt' : item.code === 'ES' ? 'es' : 'en'}
                    className={`language-link${item.code === 'PT' ? ' is-active' : ''}`}
                    aria-current={item.code === 'PT' ? 'page' : undefined}
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
                <span className="eyebrow">Limpeza local gratuita para Gemini</span>
                <h1 id="hero-h1">Remover Marca d&apos;Água Gemini: limpe exportações do Gemini em segundos</h1>
                <p className="hero-sub">
                  Limpe exportações do Gemini diretamente no seu navegador. Sem cadastro, sem upload para a nuvem
                  e sem preenchimento genérico com IA entre você e uma imagem realmente utilizável.
                </p>
              </div>

              <div className="hero-signals" aria-label="Sinais de confiança">
                {trustSignals.map((signal) => (
                  <span key={signal} className="signal-pill">{signal}</span>
                ))}
              </div>

              <div className="proof-card">
                <div>
                  <span className="proof-label">Por que esta experiência é diferente</span>
                  <strong>Feito para exportações do Gemini, não para uma limpeza genérica de imagem.</strong>
                </div>
                <p>
                  O Reverse Alpha Blending restaura a área marcada matematicamente, então as bordas ficam mais nítidas
                  do que com preenchimento sensível ao conteúdo ou inpainting.
                </p>
              </div>
            </div>

            <div className="hero-panel upload-panel" aria-label="Ferramenta remover marca d'água gemini">
              <div
                className={`dropzone${dragActive ? ' is-active' : ''}`}
                role="button"
                tabIndex={0}
                aria-label="Solte um arquivo de imagem ou clique para procurar"
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
                <strong className="dropzone-title">Enviar imagem</strong>
                <span className="dropzone-sub">Solte um PNG, JPG ou WebP exportado do Gemini</span>
                <span className="dropzone-note">Processamento apenas local. Sem upload para servidor.</span>
                {hasSelection && <span className="drop-caption">{selectedFile?.name}</span>}
              </div>

              <div className="tool-buttons">
                <button
                  className="button button-primary button-full"
                  type="button"
                  onClick={() => inputRef.current?.click()}
                >
                  Escolher imagem
                </button>
                <button
                  className="button button-secondary button-full"
                  type="button"
                  disabled={!hasSelection || isProcessing}
                  onClick={handleProcess}
                >
                  {isProcessing ? 'Processando…' : 'Processar novamente'}
                </button>
                {hasSelection && (
                  <button
                    className="button button-tertiary button-full"
                    type="button"
                    onClick={clearSelection}
                  >
                    Redefinir
                  </button>
                )}
              </div>

              <p className="status-message" data-state={status.state} role="status" aria-live="polite">
                {status.text}
              </p>

              {hasSelection && (
                <dl className="file-meta">
                  <div>
                    <dt>Arquivo</dt>
                    <dd>{selectedFile?.name || '-'}</dd>
                  </div>
                  <div>
                    <dt>Tamanho</dt>
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
                <h2 id="preview-h2">Área de trabalho antes / depois</h2>
                <p>
                  {selectedFile
                    ? `${formatBytes(selectedFile.size)} · processado localmente no seu navegador`
                    : 'Envie uma exportação do Gemini para visualizar o resultado da limpeza.'}
                </p>
              </div>
              {hasResult ? (
                <a className="button button-primary workspace-download" href={afterUrl} download={outputName}>
                  Baixar PNG limpo
                </a>
              ) : (
                <button className="button button-primary workspace-download" type="button" disabled>
                  Baixar PNG limpo
                </button>
              )}
            </div>

            <div className={`compare-frame${hasSelection ? '' : ' empty'}`}>
              <h2 className="sr-only">Visualização antes e depois</h2>
              <div className="compare-grid">
                <div className="compare-pane before-pane">
                  {beforeUrl && (
                    <img
                      src={beforeUrl}
                      alt="Imagem original do Gemini antes da remoção da marca d'água"
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
                      alt="Imagem do Gemini após a remoção da marca d'água"
                      width={dimensions.width}
                      height={dimensions.height}
                      loading="eager"
                    />
                  )}
                  <span className="pane-label">Depois</span>
                </div>
                <div className="compare-divider" style={sliderDivider} aria-hidden="true" />
              </div>

              {isProcessing && (
                <div className="compare-overlay" aria-hidden="true">
                  <span className="status-pill status-pill-working">Limpeza local</span>
                  <strong>Removendo a marca d&apos;água do Gemini…</strong>
                  <span>O Reverse Alpha Blending está em execução.</span>
                </div>
              )}

              <div className="compare-empty">
                <strong>Envie uma imagem para visualizar a limpeza</strong>
                <span>As exportações originais do Gemini oferecem o resultado mais limpo.</span>
              </div>
            </div>

            <label className="slider-wrap" htmlFor="compare-slider">
              <span>Arraste para comparar</span>
              <input
                id="compare-slider"
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(event) => setSliderValue(Number(event.target.value))}
                aria-valuetext={`${sliderValue}% da imagem final revelada`}
                disabled={!hasResult}
              />
            </label>
          </section>

          <section className="content-section" id="why-it-works" aria-labelledby="features-h2">
            <span className="section-label">Por que funciona</span>
            <h2 id="features-h2">Uma limpeza específica supera correções genéricas com IA</h2>
            <p className="section-intro">
              A ferramenta é ajustada para um único padrão: a marca d&apos;água de exportação do Gemini. Por isso, o fluxo é mais rápido,
              mais privado e visivelmente mais limpo do que em um editor de imagem genérico.
            </p>

            <div className="feature-grid">
              {features.map((feature) => (
                <article key={feature.title} className="feature-card">
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                </article>
              ))}
            </div>

            <div className="comparison-table" role="table" aria-label="Comparação do remover marca d'água gemini">
              <div className="table-row table-head" role="row">
                <span role="columnheader">Capacidade</span>
                <span role="columnheader">Esta ferramenta</span>
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
            <span className="section-label">Como funciona</span>
            <h2 id="steps-h2">Três etapas do upload ao arquivo limpo</h2>
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
              Se o resultado mostrar “Sem alterações”, o arquivo geralmente é uma captura de tela ou uma cópia recomprimida, e não a
              exportação original do Gemini. Baixe novamente a imagem de origem e tente outra vez.
            </p>
          </section>

          <section className="content-section seo-section" id="seo-article" aria-labelledby="seo-h2">
            <span className="section-label">Análise detalhada</span>
            <h2 id="seo-h2">Por que um remover marca d&apos;água gemini dedicado supera ferramentas genéricas</h2>

            <div className="seo-prose">
              {seoProseBlocks.map((html, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: html }} />
              ))}

              <h3>O que é Reverse Alpha Blending?</h3>
              <p>
                A composição padrão de imagens usa a fórmula: <code>C_out = alpha × C_watermark + (1 − alpha) × C_original</code>.
                Quando você usa este <strong>remover marca d&apos;água gemini</strong>, o motor lê os parâmetros conhecidos da sobreposição
                do Gemini, como posição, tamanho, opacidade e cor, e resolve a equação para <code>C_original</code>. Essa reversão
                algébrica é o que faz o resultado limpo parecer a imagem intocada em vez de uma reconstrução por IA.
              </p>

              <h3>Como funciona o processamento no lado do cliente</h3>
              <p>
                Processamento no lado do cliente significa que toda instrução roda dentro da aba do seu navegador. Quando você usa esta
                ferramenta para limpar sua imagem do Gemini, o mecanismo JavaScript decodifica o arquivo em um buffer de canvas, executa
                a detecção e a mistura, e exporta o resultado de volta para PNG, tudo sem enviar a imagem para um servidor remoto.
              </p>

              <h3>Boas práticas para resultados limpos</h3>
              <p>
                Para obter os melhores resultados, sempre comece com a exportação bruta do Gemini. Evite capturas de tela, recortes ou
                regravações de baixa qualidade, porque artefatos de compressão interferem na matemática da mistura. Se a saída ainda
                mostrar marcas residuais, exporte novamente a imagem do Gemini em resolução total antes de tentar outra vez.
              </p>
            </div>
          </section>

          <section className="content-section" id="faq" aria-labelledby="faq-h2">
            <span className="section-label">FAQ</span>
            <h2 id="faq-h2">Perguntas frequentes sobre a remoção da marca d&apos;água do Gemini</h2>
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
          <p>© {new Date().getFullYear()} gemini-watermarkremover.org — gratuito, local e open source. Nenhum dado sai do seu dispositivo.</p>
          <div className="site-footer-badges">
            <a
              className="site-footer-badge"
              href="https://showmebest.ai"
              target="_blank"
              rel="noreferrer"
              aria-label="Destaque no ShowMeBestAI"
            >
              <img
                src="https://showmebest.ai/badge/feature-badge-dark.webp"
                alt="Destaque no ShowMeBestAI"
                width="220"
                height="60"
              />
            </a>
            <a
              className="site-footer-badge"
              href="https://toolfame.com/item/gemini-watermark-remover-gemini-watermarkremoverorg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Destaque em toolfame.com"
            >
              <img
                src="https://toolfame.com/badge-light.svg"
                alt="Destaque em toolfame.com"
                width="173"
                height="54"
              />
            </a>
            <a
              className="site-footer-badge"
              href="https://fazier.com/launches/gemini-watermarkremover.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Destaque no Fazier"
            >
              <img
                src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=dark"
                alt="Selo do Fazier"
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
