'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { useScroll, useSpring, useTransform, motion } from 'framer-motion'

const TOTAL_FRAMES = 192
const LAST_FRAME = TOTAL_FRAMES - 1 // 191

function padIndex(i: number): string {
  return String(i).padStart(3, '0')
}

function buildFrameSrc(i: number): string {
  return `/gt3-frames/frame_${padIndex(i)}.jpg`
}

interface NarrativeBeat {
  start: number
  end: number
  title: string
  subtitle: string
  align: 'center' | 'left' | 'right'
  titleSize: string
  showCta?: boolean
}

const BEATS: NarrativeBeat[] = [
  {
    start: 0.0,
    end: 0.20,
    title: 'IL SUONO CHE ASPETTAVI.',
    subtitle: 'Il raduno esclusivo per chi guida una 911 GT3.',
    align: 'center',
    titleSize: 'text-6xl md:text-8xl lg:text-9xl',
  },
  {
    start: 0.25,
    end: 0.45,
    title: 'PISTA. STRADA. LEGGENDA.',
    subtitle: 'Percorsi selezionati. Scenari mozzafiato. Solo GT3.',
    align: 'left',
    titleSize: 'text-5xl md:text-7xl lg:text-8xl',
  },
  {
    start: 0.5,
    end: 0.7,
    title: 'LA TUA TRIBÙ.',
    subtitle: 'Appassionati, piloti, collezionisti. Uniti dal boxer sei cilindri.',
    align: 'right',
    titleSize: 'text-5xl md:text-7xl lg:text-8xl',
  },
  {
    start: 0.75,
    end: 0.95,
    title: 'SEI DENTRO?',
    subtitle: 'FLAT6 MEET 2025 — Posti limitati. Iscriviti ora.',
    align: 'center',
    titleSize: 'text-6xl md:text-8xl lg:text-9xl',
    showCta: true,
  },
]

function BeatText({ beat, scrollYProgress }: { beat: NarrativeBeat; scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const { start, end } = beat
  const fadeIn = start + (end - start) * 0.1
  const fadeOut = end - (end - start) * 0.1

  const opacity = useTransform(
    scrollYProgress,
    [start, fadeIn, fadeOut, end],
    [0, 1, 1, 0]
  )
  const y = useTransform(
    scrollYProgress,
    [start, fadeIn, fadeOut, end],
    [20, 0, 0, -20]
  )

  const alignClass =
    beat.align === 'left'
      ? 'items-start text-left pl-8 md:pl-20 lg:pl-32'
      : beat.align === 'right'
      ? 'items-end text-right pr-8 md:pr-20 lg:pr-32'
      : 'items-center text-center'

  const handleCtaClick = () => {
    const el = document.querySelector('#iscrizione')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center gap-4 md:gap-6 ${alignClass} pointer-events-none`}
    >
      <div className={`flex flex-col gap-3 md:gap-4 ${beat.align === 'center' ? 'items-center' : beat.align === 'left' ? 'items-start' : 'items-end'}`}>
        <h1
          className={`${beat.titleSize} font-black tracking-tighter leading-none text-white/90 uppercase max-w-[90vw] md:max-w-3xl lg:max-w-4xl`}
          style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
        >
          {beat.title}
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-white/60 font-medium tracking-wide max-w-lg">
          {beat.subtitle}
        </p>
        {beat.showCta && (
          <button
            onClick={handleCtaClick}
            className="mt-2 pointer-events-auto inline-flex items-center gap-2 bg-[#E8001D] text-white font-semibold text-sm md:text-base tracking-widest uppercase px-8 py-4 rounded-full glow-red hover:scale-105 hover:shadow-[0_0_40px_rgba(232,0,29,0.6)] transition-all duration-300"
          >
            Iscriviti ora →
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default function GT3Canvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef<number>(0)
  const rafRef = useRef<number | null>(null)
  const isMountedRef = useRef(true)

  const [loadProgress, setLoadProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [loaderVisible, setLoaderVisible] = useState(true)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // ─── Draw frame on canvas ──────────────────────────────────────
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current
    const img = imagesRef.current[frameIndex]
    if (!canvas || !img || !img.complete) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const cssW = canvas.offsetWidth
    const cssH = canvas.offsetHeight

    // Sync canvas buffer to physical pixel size (never use ctx.scale — it only
    // persists until the next canvas.width assignment which resets the context)
    const physW = Math.round(cssW * dpr)
    const physH = Math.round(cssH * dpr)
    if (canvas.width !== physW || canvas.height !== physH) {
      canvas.width = physW
      canvas.height = physH
    }

    // Enable high-quality interpolation when upscaling
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    // "contain" scaling — all math in PHYSICAL pixels
    const imgAspect = img.naturalWidth / img.naturalHeight
    const canvasAspect = physW / physH
    let drawW: number, drawH: number, drawX: number, drawY: number

    if (imgAspect > canvasAspect) {
      drawW = physW
      drawH = physW / imgAspect
      drawX = 0
      drawY = (physH - drawH) / 2
    } else {
      drawH = physH
      drawW = physH * imgAspect
      drawX = (physW - drawW) / 2
      drawY = 0
    }

    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = '#0A0A0A'
    ctx.fillRect(0, 0, w, h)
    ctx.drawImage(img, drawX, drawY, drawW, drawH)
  }, [])

  // ─── Canvas resize handling ────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ro = new ResizeObserver(() => {
      if (!isMountedRef.current) return
      drawFrame(currentFrameRef.current)
    })
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [drawFrame])

  // ─── Preload all frames ────────────────────────────────────────
  useEffect(() => {
    isMountedRef.current = true
    let loaded = 0

    const images: HTMLImageElement[] = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image()
      img.src = buildFrameSrc(i)
      img.onload = () => {
        loaded++
        if (!isMountedRef.current) return
        const progress = loaded / TOTAL_FRAMES
        setLoadProgress(progress)
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true)
          // Draw first frame immediately
          drawFrame(0)
          // Fade out loader after short delay
          setTimeout(() => {
            if (isMountedRef.current) setLoaderVisible(false)
          }, 400)
        }
      }
      img.onerror = () => {
        loaded++
        if (!isMountedRef.current) return
        setLoadProgress(loaded / TOTAL_FRAMES)
        if (loaded === TOTAL_FRAMES) setIsLoaded(true)
      }
      return img
    })

    imagesRef.current = images

    return () => {
      isMountedRef.current = false
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      // Clear image references
      imagesRef.current.forEach((img) => {
        img.onload = null
        img.onerror = null
      })
      imagesRef.current = []
    }
  }, [drawFrame])

  // ─── Scroll → frame → draw ────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return

    const unsubscribe = smoothProgress.on('change', (latest) => {
      if (!isMountedRef.current) return
      const frameIndex = Math.min(
        LAST_FRAME,
        Math.max(0, Math.floor(latest * LAST_FRAME))
      )
      if (frameIndex === currentFrameRef.current) return
      currentFrameRef.current = frameIndex

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        drawFrame(frameIndex)
        rafRef.current = null
      })
    })

    return () => {
      unsubscribe()
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [isLoaded, smoothProgress, drawFrame])

  // ─── Scroll indicator opacity ──────────────────────────────────
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  return (
    <div ref={containerRef} className="canvas-section">
      <div className="canvas-sticky">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: '#0A0A0A' }}
          aria-hidden="true"
        />

        {/* Overlay texts */}
        {isLoaded && BEATS.map((beat, i) => (
          <BeatText key={i} beat={beat} scrollYProgress={scrollYProgress} />
        ))}

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-white/40 text-xs tracking-[0.3em] uppercase">
            Scorri per scoprire
          </span>
          <motion.svg
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </motion.svg>
        </motion.div>

        {/* Loading overlay */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: loaderVisible ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          onAnimationComplete={() => {
            if (!loaderVisible) {
              // allow pointer events through after fade
            }
          }}
          className={`absolute inset-0 bg-[#0A0A0A] flex flex-col items-center justify-center gap-8 ${
            !loaderVisible ? 'pointer-events-none' : ''
          }`}
        >
          {/* Spinner */}
          <div className="relative w-16 h-16">
            <svg
              className="absolute inset-0 w-full h-full animate-spin"
              viewBox="0 0 64 64"
              fill="none"
            >
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="3"
              />
              <path
                d="M32 4 A28 28 0 0 1 60 32"
                stroke="#E8001D"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Brand */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <span className="text-white/80 font-black tracking-widest uppercase text-xl">FLAT6</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8001D]" />
              <span className="text-white/80 font-black tracking-widest uppercase text-xl">MEET</span>
            </div>
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase">Caricamento in corso</p>
          </div>

          {/* Progress bar */}
          <div className="w-48 md:w-72 flex flex-col gap-2">
            <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#E8001D] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.round(loadProgress * 100)}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <span className="text-white/20 text-xs tracking-widest text-right font-mono">
              {Math.round(loadProgress * 100)}%
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
