"use client"

import { ArrowRight, ArrowUpRight, CalendarCheck2, Newspaper, BarChart2, Search, TrendingUp, Target, Users, Lightbulb, Menu } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"
import { D, COMPETENCES } from "./ic-shared-data"

/* ── Brand tokens ──────────────────────────────────────────────────────── */
const IC = {
  blue:      "#24579B",   // IC Blue (36;87;155)
  blueDark:  "#376092",   // Blue, Akzent darker 25% (55;96;146)
  blueLight: "#8EB4E3",   // Dark blue, lighter 60% (142;180;227)
  blueXL:    "#DCE6F2",   // Blue, lighter 80% (220;230;242)
  gray80:    "#4D4D4D",   // Gray 80% (77;77;77)
  gray50:    "#7F7F7F",   // Black, lighter 50% (127;127;127)
  grayLight: "#C2C2C2",   // Gray Not Standard (194;194;194)
  white:     "#FFFFFF",
}

function LogoPairCarousel({ clients }: { clients: { name: string }[] }) {
  const [page, setPage] = useState(0)
  const [fading, setFading] = useState(false)
  const cardsPerPage = 4
  const pageCount = Math.max(1, Math.ceil(clients.length / cardsPerPage))

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setPage((p) => (p + 1) % pageCount)
        setFading(false)
      }, 600)
    }, 3200)
    return () => clearInterval(timer)
  }, [pageCount])

  const start = page * cardsPerPage
  const current = Array.from({ length: cardsPerPage }, (_, i) => clients[(start + i) % clients.length])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {current.map((c) => (
        <div key={c.name} className="flex items-center justify-center px-4 py-4"
          style={{ height: 68, background: IC.white, border: `1.5px solid ${IC.blueXL}` }}>
          <span
            className="text-[13px] sm:text-[14px] font-semibold leading-tight text-center"
            style={{
              color: IC.gray80,
              opacity: fading ? 0 : 1,
              transition: "opacity 0.5s ease",
            }}
          >
            {c.name}
          </span>
        </div>
      ))}
    </div>
  )
}

type FadeVariant = "up" | "left" | "right" | "scale"

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function getHidden(v: FadeVariant) {
  if (v === "left")  return "translateX(-22px)"
  if (v === "right") return "translateX(22px)"
  if (v === "scale") return "scale(0.96) translateY(14px)"
  return "translateY(26px)"
}

function Fade({
  children, className, style, delay = 0, variant = "up", duration = 0.75,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
  variant?: FadeVariant
  duration?: number
}) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : getHidden(variant),
      filter: visible ? "blur(0px)" : "blur(5px)",
      transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, filter ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      willChange: "opacity, transform, filter",
    }}>
      {children}
    </div>
  )
}

function Label({ light = false, style, children }: { light?: boolean; style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold tracking-[0.32em] uppercase mb-4"
       style={{ color: light ? IC.blueLight : IC.blue, ...style }}>
      {children}
    </p>
  )
}

function SH({ children, light = false, className }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <h2
      className={`font-bold tracking-tight leading-[1.08] ${className ?? ""}`}
      style={{
        fontSize: "clamp(31px,3.52vw,46px)",
        color: light ? IC.white : "#4D4D4D",
        letterSpacing: "-0.015em",
      }}
    >
      {children}
    </h2>
  )
}

function Rule({ light = false }: { light?: boolean }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className="w-7 h-[2px] mt-1 mb-8 origin-left"
      style={{
        background: light ? "rgba(255,255,255,0.28)" : IC.blue,
        transform: visible ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 0.65s cubic-bezier(0.22,1,0.36,1) 0.2s",
      }}
    />
  )
}

function useParallax(speed = 0.07) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const fn = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      setOffset((rect.top + rect.height / 2 - window.innerHeight / 2) * speed)
    }
    window.addEventListener("scroll", fn, { passive: true })
    fn()
    return () => window.removeEventListener("scroll", fn)
  }, [speed])
  return { ref, offset }
}

function WordReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.05em" }}>
      <span
        ref={ref}
        style={{
          display: "inline-block",
          transform: visible ? "translateY(0)" : "translateY(110%)",
          opacity: visible ? 1 : 0,
          transition: `transform 0.82s cubic-bezier(0.22,1,0.36,1) ${delay}s, opacity 0.5s ease ${delay}s`,
          willChange: "transform",
        }}
      >
        {children}
      </span>
    </span>
  )
}

function SplitFade({ text, baseDelay = 0, style, className }: {
  text: string; baseDelay?: number; style?: React.CSSProperties; className?: string
}) {
  return (
    <span className={className} style={{ display: "block", ...style }}>
      {text.split(" ").map((w, i, arr) => (
        <span key={i} style={{ display: "inline" }}>
          <WordReveal delay={baseDelay + i * 0.065}>{w}</WordReveal>
          {i < arr.length - 1 && " "}
        </span>
      ))}
    </span>
  )
}

function ParaTitle({ children, speed = 0.06, light = false, className }: {
  children: React.ReactNode; speed?: number; light?: boolean; className?: string
}) {
  const { ref, offset } = useParallax(speed)
  return (
    <div ref={ref} style={{ transform: `translateY(${offset}px)`, willChange: "transform" }}>
      <SH light={light} className={className}>{children}</SH>
    </div>
  )
}

export default function TemplateICBlueProfessionalLight() {
  const [scrolled,   setScrolled]   = useState(false)
  const [scrollY,    setScrollY]    = useState(0)
  const [winH,       setWinH]       = useState(900)
  const [winW,       setWinW]       = useState(1200)
  const [hovEdition, setHovEdition] = useState<number | null>(null)
  const [dot,        setDot]        = useState(0)
  const [heroReady,  setHeroReady]  = useState(false)
  const [referenceLogoPair, setReferenceLogoPair] = useState(0)
  const [referenceImageFading, setReferenceImageFading] = useState(false)
  const [referenceTextFading, setReferenceTextFading] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isSnappingRef = useRef(false)
  const winHRef = useRef(900)
  const winWRef = useRef(1200)
  const referenceCardsPerView = 2
  const referencePairCount = Math.max(1, Math.ceil(D.references.length / referenceCardsPerView))
  const referenceStart = referenceLogoPair * referenceCardsPerView
  const currentReferences = Array.from({ length: referenceCardsPerView }, (_, i) => D.references[(referenceStart + i) % D.references.length])

  useEffect(() => {
    winHRef.current = window.innerHeight
    winWRef.current = window.innerWidth
    setWinH(window.innerHeight)
    setWinW(window.innerWidth)
    const fn = () => {
      setScrolled(window.scrollY > 60)
      setScrollY(window.scrollY)

      // ── Auto-snap: if scroll stops mid-transition, complete it ──
      const h = winHRef.current
      const w = winWRef.current
      if (w < 1024 || isSnappingRef.current) return

      const sy = window.scrollY
      const ZONE_START = h * 0.02   // just past absolute top
      const ZONE_END   = h * 0.82   // past last transition (sectionLeftIn @ 78%)
      const MIDPOINT   = h * 0.40   // <40% → snap back to hero, ≥40% → snap to section 2

      if (sy > ZONE_START && sy < ZONE_END) {
        if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current)
        snapTimeoutRef.current = setTimeout(() => {
          const cur = window.scrollY
          if (cur > ZONE_START && cur < ZONE_END && !isSnappingRef.current) {
            isSnappingRef.current = true
            const target = cur < MIDPOINT ? 0 : Math.round(h * 0.86)
            window.scrollTo({ top: target, behavior: "smooth" })
            setTimeout(() => { isSnappingRef.current = false }, 1200)
          }
        }, 400)
      } else {
        if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current)
      }
    }
    const onResize = () => {
      winHRef.current = window.innerHeight
      winWRef.current = window.innerWidth
      setWinH(window.innerHeight)
      setWinW(window.innerWidth)
    }
    window.addEventListener("scroll", fn, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("scroll", fn)
      window.removeEventListener("resize", onResize)
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 180)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = []

    const runTransitionCycle = () => {
      setReferenceImageFading(true)
      timeouts.push(setTimeout(() => setReferenceTextFading(true), 130))
      timeouts.push(setTimeout(() => setReferenceLogoPair((p) => (p + 1) % referencePairCount), 430))
      timeouts.push(setTimeout(() => setReferenceImageFading(false), 520))
      timeouts.push(setTimeout(() => setReferenceTextFading(false), 690))
    }

    const timer = setInterval(runTransitionCycle, 3600)
    return () => {
      clearInterval(timer)
      timeouts.forEach(clearTimeout)
    }
  }, [referencePairCount])

  const onSliderScroll = useCallback(() => {
    if (!sliderRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    const idx = Math.round((scrollLeft / (scrollWidth - clientWidth)) * (COMPETENCES.length - 1))
    setDot(Math.min(Math.max(idx, 0), COMPETENCES.length - 1))
  }, [])

  const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)
  // hero content fades from scroll 0 → winH*0.60
  const heroOut = clamp01(scrollY / (winH * 0.60))
  // section 2 content fades in from scroll winH*0.35 → winH*0.85
  const sectionIn  = clamp01((scrollY - winH * 0.35) / (winH * 0.50))
  // independent lane transitions with sequence:
  // 1) indicators (hero right) out + contact-us (section right) in
  // 2) title/text (hero left) out + how-we-make (section left) in
  const heroRightOut = clamp01((scrollY - winH * 0.06) / (winH * 0.30))
  const sectionRightIn = clamp01((scrollY - winH * 0.20) / (winH * 0.30))
  const heroLeftOut = clamp01((scrollY - winH * 0.34) / (winH * 0.30))
  const sectionLeftIn = clamp01((scrollY - winH * 0.48) / (winH * 0.30))
  const isDesktop = winW >= 1024
  const sectionRightInEff = isDesktop ? sectionRightIn : 1
  const sectionLeftInEff = isDesktop ? sectionLeftIn : 1
  // keep old names as aliases for rest of component
  const heroBridgeProgress = heroOut
  const sectionLeadIn = sectionIn

  return (
    <div className="min-h-screen" style={{ background: IC.white, color: IC.gray80, overflowX: "clip" }}>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50%       { transform: translateY(7px); opacity: 1; }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50%      { transform: translate3d(0,-14px,0) scale(1.04); }
        }
        @keyframes panelDrift {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes linePulse {
          0%, 100% { opacity: 0.35; transform: scaleX(0.7); }
          50%      { opacity: 1; transform: scaleX(1); }
        }
        @keyframes heroLineGrow {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        @keyframes heroShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(32px); filter: blur(8px); }
          to   { opacity: 1; transform: translateY(0);   filter: blur(0px); }
        }
        @keyframes heroGridPulse {
          0%, 100% { opacity: 0.04; }
          50%       { opacity: 0.09; }
        }
        @keyframes heroSlash {
          from { clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%); }
          to   { clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0 100%); }
        }
        .ic-field {
          border-bottom: 1.5px solid rgba(36,87,155,0.18) !important;
          border-top: none !important; border-left: none !important; border-right: none !important;
          background: transparent !important;
          border-radius: 0 !important;
          transition: border-color 0.3s ease;
        }
        .ic-field::placeholder { color: #C2C2C2; }
        .ic-field:focus { border-bottom-color: #24579B !important; }
        .ic-field:hover { border-bottom-color: #8EB4E3 !important; }
      `}</style>

      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          paddingTop:    scrolled ? 13 : 20,
          paddingBottom: scrolled ? 13 : 20,
          background:    scrolled ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0)",
          borderBottom:  scrolled ? `1px solid ${IC.blueXL}` : "1px solid transparent",
          backdropFilter: scrolled ? "blur(18px) saturate(1.6)" : "none",
          transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-14 flex items-center justify-between">
          <button
            type="button"
            aria-label="Open menu"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10"
            style={{
              color: IC.blue,
              transition: "color 0.45s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <Menu size={22} />
          </button>

          <div className="hidden lg:flex items-center gap-8 text-[14px] font-medium">
            {["Reports & Tools", "Our Competence", "Shop", "News", "Events", "About Us"].map(l => (
              <a
                key={l} href="#"
                className="transition-colors duration-300 hover:opacity-80"
                style={{ color: IC.blue }}
              >
                {l}
              </a>
            ))}
          </div>
          {/* Logo right — always original colors */}
          <div className="relative flex items-center justify-end w-[170px] sm:w-[220px]" style={{ height: 36 }}>
            <Image src="/images/Logo-grey-blue.png" alt="Interconnection Consulting" width={160} height={28} className="w-[120px] sm:w-[150px] h-auto" style={{ objectFit: "contain" }} priority />
          </div>
        </div>
      </nav>

      {/* ═══ STICKY SCENE: hero + section 2 share one viewport-pinned stage ═══ */}
      <div style={{ position: "relative", height: isDesktop ? "220vh" : "100vh" }}>

        {/* ── Layer 0: persistent background that NEVER changes color ── */}
        <div style={{ position: "sticky", top: 0, height: "100vh", background: IC.blueXL, zIndex: 0 }} />

      {/* ── HERO content layer ── */}
      <section className="relative overflow-hidden" style={{ position: "sticky", top: 0, height: "100vh", background: "transparent", display: "flex", flexDirection: "column", zIndex: 2, marginTop: "-100vh" }}>

        {/* Layer 1 — Photo: right-aligned contain so full image is visible, blends into blue on left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ overflow: "hidden" }}
        >
          {/* Desktop: image shown full on right 58%, no cropping */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              transform: `translateY(${scrollY * 0.06}px)`,
              willChange: "transform",
              opacity: Math.max(0, 1 - heroOut * 1.6),
            }}
          >
            <Image
              src="/Bild.png"
              alt={D.productName}
              fill
              className="object-contain"
              style={{ objectPosition: "right center" }}
              priority
            />
            {/* Left-to-right dissolve: light surface → transparent */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(247,249,252,1) 0%, rgba(247,249,252,1) 26%, rgba(247,249,252,0.82) 36%, rgba(247,249,252,0.38) 50%, rgba(247,249,252,0.05) 66%, transparent 80%)" }} />
            {/* Subtle desaturation overlay */}
            <div className="absolute inset-0" style={{ background: "rgba(247,249,252,0.15)", mixBlendMode: "multiply" }} />
          </div>
          {/* Mobile: full bleed cover */}
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              opacity: Math.max(0, 1 - heroOut * 1.6),
            }}
          >
            <Image src="/Bild.png" alt={D.productName} fill className="object-cover" style={{ objectPosition: "center center" }} priority />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(247,249,252,0.72) 0%, rgba(247,249,252,0.38) 40%, rgba(247,249,252,0.72) 75%, rgba(247,249,252,0.95) 100%)" }} />
          </div>
        </div>

        {/* Layer 2 — Animated grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: Math.max(0, 1 - heroOut * 1.8) }}>
          <svg width="100%" height="100%" className="absolute inset-0" style={{ animation: "heroGridPulse 4s ease-in-out infinite", opacity: 0.55 }}>
            <defs>
              <pattern id="bpgrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(36,87,155,0.18)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bpgrid)" />
          </svg>
        </div>

        {/* Layer 3 — Content: flex-grow to fill viewport */}
        <div
          className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-6 lg:px-14"
          style={{
            paddingTop: "max(72px, 12vh)",
            paddingBottom: "max(32px, 5vh)",
            willChange: "transform, opacity",
          }}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left — headline + CTA */}
            <div
              style={{
                opacity: Math.max(0, 1 - heroLeftOut * 1.35),
                transform: `translate3d(${heroLeftOut * -42}px, ${heroLeftOut * -10}px, 0)`,
                filter: `blur(${heroLeftOut * 1.8}px)`,
                willChange: "transform, opacity, filter",
              }}
            >
          {/* Eyebrow line */}
          <div
            style={{
              opacity:   heroReady ? 1 : 0,
              transition: "opacity 1.2s ease 0.22s",
            }}
          >
            <div className="flex items-center mb-5 lg:mb-8">
              <p className="text-[10px] font-bold tracking-[0.45em] uppercase" style={{ color: IC.blue }}>
                Interconnection Consulting
              </p>
            </div>
          </div>

          {/* H1 — refined scale */}
          <h1
            className="font-black"
            style={{ fontSize: "clamp(37px,8.8vw,50px)", lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: 0 }}
          >
            <span
              style={{
                display: "block",
                color: IC.gray80,
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "none" : "translateY(26px)",
                transition: "opacity 1.1s cubic-bezier(0.22,1,0.36,1) 0.26s, transform 1.1s cubic-bezier(0.22,1,0.36,1) 0.26s",
              }}
            >
              {D.productName}
            </span>
            <span
              style={{
                display: "block",
                color: IC.blueLight,
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "none" : "translateY(26px)",
                transition: "opacity 1.1s cubic-bezier(0.22,1,0.36,1) 0.46s, transform 1.1s cubic-bezier(0.22,1,0.36,1) 0.46s",
              }}
            >
              {D.regionName}
            </span>
          </h1>

          <div className="mt-5 mb-6" aria-hidden="true" />

          {/* Supporting copy and key highlights */}
          <div
            style={{
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "none" : "translateY(16px)",
              transition: "opacity 1s ease 1.05s, transform 1s cubic-bezier(0.22,1,0.36,1) 1.05s",
            }}
          >
            <p className="text-[15px] leading-[1.7] max-w-[480px] mb-5 lg:mb-7" style={{ color: IC.gray50 }}>
              We help companies unlock sales growth by combining industry expertise with market data, big data analytics, and AI-driven forecasts — delivering practical strategies and measurable results.
            </p>
          </div>

          {/* CTA group */}
          <div
            style={{
              opacity:   heroReady ? 1 : 0,
              transform: heroReady ? "none" : "translateY(14px)",
              transition: "opacity 1.05s ease 0.95s, transform 1.05s cubic-bezier(0.22,1,0.36,1) 0.95s",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <a
                href="#overview"
                className="inline-flex items-center justify-center gap-3 text-[14px] font-bold px-6 py-3.5 relative overflow-hidden"
                style={{
                  borderRadius: 0,
                  color: IC.white,
                  background: IC.blue,
                  border: `1px solid ${IC.blue}`,
                  transition: "background 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  const btn = e.currentTarget as HTMLElement
                  btn.style.background = IC.blueDark
                  btn.style.borderColor = IC.blueDark
                  const arrow = btn.querySelector(".cta-arrow") as HTMLElement; if (arrow) arrow.style.transform = "translateX(4px)"
                }}
                onMouseLeave={e => {
                  const btn = e.currentTarget as HTMLElement
                  btn.style.background = IC.blue
                  btn.style.borderColor = IC.blue
                  const arrow = btn.querySelector(".cta-arrow") as HTMLElement; if (arrow) arrow.style.transform = "translateX(0)"
                }}
              >
                Talk to our Experts
                <span className="cta-arrow" style={{ display: "inline-flex", transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
                  <ArrowRight size={13} strokeWidth={2.5} />
                </span>
              </a>
              <a
                href="#overview"
                className="inline-flex items-center justify-center gap-3 text-[14px] font-semibold relative overflow-hidden"
                style={{
                  color: IC.white,
                  padding: "12px 18px",
                  borderRadius: 0,
                  background: IC.blue,
                  border: `1px solid ${IC.blue}`,
                  transition: "background 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  const btn = e.currentTarget as HTMLElement
                  btn.style.background = IC.blueDark
                  btn.style.borderColor = IC.blueDark
                  const arrow = btn.querySelector(".cta-arrow") as HTMLElement; if (arrow) arrow.style.transform = "translateX(4px)"
                }}
                onMouseLeave={e => {
                  const btn = e.currentTarget as HTMLElement
                  btn.style.background = IC.blue
                  btn.style.borderColor = IC.blue
                  const arrow = btn.querySelector(".cta-arrow") as HTMLElement; if (arrow) arrow.style.transform = "translateX(0)"
                }}
              >
                <span style={{ position: "relative", paddingBottom: 2 }}>
                  Explore market reports
                </span>
                <span className="cta-arrow" style={{ display: "inline-flex", transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
                  <ArrowRight size={13} strokeWidth={2.5} />
                </span>
              </a>
            </div>


          </div>
            </div>{/* end left column */}



          </div>{/* end grid */}
        </div>{/* end content wrapper */}


      </section>

      {/* ── SECTION 2 content layer — same stage, same bg, fades in OVER hero ── */}
      <section
        id="overview"
        className="hidden lg:flex lg:flex-col"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          background: "transparent",
          zIndex: 3,
          marginTop: "-100vh",
          justifyContent: "center",
          overflow: "hidden",
          willChange: "transform, opacity",
          pointerEvents: Math.max(sectionLeftIn, sectionRightIn) < 0.05 ? "none" : "auto",
        }}
      >
        {/* Solid light-gray backdrop — fades in as user scrolls past hero */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: IC.white,
          opacity: Math.max(0, (sectionLeftIn - 0.15) * 1.6),
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-14 w-full relative z-10"
          style={{
            transform: `scale(${0.965 + Math.max(sectionLeftIn, sectionRightIn) * 0.035})`,
            willChange: "transform",
          }}
        >
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-stretch">

            {/* Left — on dark bg */}
            <div
              className="h-full flex flex-col justify-start gap-8 py-12"
              style={{
                opacity: sectionLeftInEff,
                transform: `translate3d(${(1 - sectionLeftInEff) * -44}px, ${(1 - sectionLeftInEff) * 14}px, 0)`,
                filter: `blur(${(1 - sectionLeftInEff) * 2.2}px)`,
                willChange: "transform, opacity, filter",
              }}
            >
              <div>
                <p className="text-[11px] font-bold tracking-[0.32em] uppercase mb-4" style={{ color: IC.blue }}>How we make our customers successful</p>
                <h2 className="font-bold tracking-tight leading-[1.08]" style={{ fontSize: "clamp(31px,3.52vw,46px)", color: IC.gray80, letterSpacing: "-0.015em" }}>
                  Turn data into revenue. Predict what’s next.
                </h2>
              </div>
              <p className="text-[15px] leading-relaxed" style={{ color: "#7F7F7F" }}>
                We combine market data, big data analytics, and AI-driven forecasts to identify growth opportunities, optimize pricing, and improve sales performance - with practical strategies and tools you can actually implement.
              </p>
              <div>
                <label className="text-[10px] font-bold tracking-[0.22em] uppercase block mb-2" style={{ color: IC.blueLight }}>Search reports</label>
                <div className="flex items-end gap-0">
                  <input
                    placeholder="Industry, market or topic…"
                    className="flex-1 text-[15px] outline-none pb-2"
                    style={{
                      color: IC.gray80,
                      background: "transparent",
                      border: "none",
                      borderBottom: `1.5px solid rgba(36,87,155,0.22)`,
                      borderRadius: 0,
                      appearance: "none",
                      transition: "border-color 0.3s ease",
                    }}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = IC.blue)}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = "rgba(36,87,155,0.22)")}
                  />
                  <button
                    className="inline-flex items-center justify-between h-11 px-5 text-[13px] font-bold tracking-[0.06em] shrink-0 ml-4"
                    style={{
                      color: IC.white,
                      background: `linear-gradient(to right, ${IC.blue} 0%, ${IC.blueDark} 100%)`,
                      border: "none",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      transition: "opacity 0.25s ease",
                      minWidth: 130,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.opacity = "0.88"
                      const arrow = (e.currentTarget as HTMLElement).querySelector(".cta-arrow") as HTMLElement
                      if (arrow) arrow.style.transform = "translateX(5px)"
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.opacity = "1"
                      const arrow = (e.currentTarget as HTMLElement).querySelector(".cta-arrow") as HTMLElement
                      if (arrow) arrow.style.transform = "translateX(0)"
                    }}
                  >
                    <span>Search</span>
                    <span className="cta-arrow" style={{ display: "inline-flex", transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
                      <ArrowRight size={13} />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right — CTA panel */}
            <div
              className="h-full"
              style={{
                opacity: sectionRightInEff,
                transform: `translate3d(${(1 - sectionRightInEff) * 56}px, ${(1 - sectionRightInEff) * 12}px, 0)`,
                filter: `blur(${(1 - sectionRightInEff) * 2.4}px)`,
                willChange: "transform, opacity, filter",
              }}
            >
              <div
                id="contact-panel"
                className="h-full flex flex-col justify-between py-10 px-10"
                style={{
                  background: IC.white,
                  borderTop: `3px solid ${IC.blue}`,
                  boxShadow: "0 20px 60px rgba(36,87,155,0.10), 0 2px 8px rgba(36,87,155,0.05)",
                  animation: "panelDrift 9s ease-in-out infinite",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p className="text-[10px] font-bold tracking-[0.36em] uppercase mb-3" style={{ color: IC.blue }}>Contact us</p>
                  <h3 className="font-bold leading-[1.1] mb-7" style={{ fontSize: "clamp(22px,2.5vw,27px)", color: IC.gray80, letterSpacing: "-0.01em" }}>
                    Tell us your challenge
                  </h3>

                  <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: IC.blueLight }}>Name</label>
                        <input name="name" placeholder="Your name" className="ic-field h-10 text-[14px] outline-none pb-1" style={{ color: IC.gray80 }} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: IC.blueLight }}>Company</label>
                        <input name="company" placeholder="Your company" className="ic-field h-10 text-[14px] outline-none pb-1" style={{ color: IC.gray80 }} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: IC.blueLight }}>Email</label>
                        <input name="mail" type="email" placeholder="you@company.com" className="ic-field h-10 text-[14px] outline-none pb-1" style={{ color: IC.gray80 }} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: IC.blueLight }}>Phone</label>
                        <input name="tel" type="tel" placeholder="+43 ..." className="ic-field h-10 text-[14px] outline-none pb-1" style={{ color: IC.gray80 }} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 mb-7">
                      <label className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: IC.blueLight }}>Message</label>
                      <textarea name="message" placeholder="Briefly describe your challenge…" className="ic-field text-[14px] outline-none resize-none py-1" style={{ color: IC.gray80, minHeight: 68 }} />
                    </div>

                    <button
                      type="submit"
                      className="h-12 inline-flex items-center justify-between px-6 text-[13px] font-bold tracking-[0.06em] relative overflow-hidden"
                      style={{
                        color: IC.white,
                        background: `linear-gradient(to right, ${IC.blue} 0%, ${IC.blueDark} 100%)`,
                        border: "none",
                        cursor: "pointer",
                        transition: "opacity 0.25s ease",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.opacity = "0.88"
                        const arrow = (e.currentTarget as HTMLElement).querySelector(".cta-arrow") as HTMLElement
                        if (arrow) arrow.style.transform = "translateX(5px)"
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.opacity = "1"
                        const arrow = (e.currentTarget as HTMLElement).querySelector(".cta-arrow") as HTMLElement
                        if (arrow) arrow.style.transform = "translateX(0)"
                      }}
                    >
                      <span>Send Request</span>
                      <span className="cta-arrow" style={{ display: "inline-flex", transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
                        <ArrowRight size={14} />
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>

          </div>{/* end grid */}
        </div>{/* end max-w wrapper */}
      </section>
      </div>{/* end sticky scene */}

      {/* ── MOBILE SECTION 2 — shown only on mobile, flows naturally below hero ── */}
      <section
        className="flex flex-col lg:hidden"
        style={{ background: IC.blueXL, paddingTop: 48, paddingBottom: 56, zIndex: 3 }}
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-[11px] font-bold tracking-[0.32em] uppercase mb-4" style={{ color: IC.blue }}>How we make our customers successful</p>
              <h2 className="font-bold leading-[1.1] mb-5" style={{ fontSize: "clamp(26px,6.6vw,35px)", color: IC.gray80, letterSpacing: "-0.015em" }}>Turn data into revenue. Predict what's next.</h2>
              <div className="w-7 h-[2px] mb-6" style={{ background: IC.blue }} />
              <p className="text-[14px] leading-[1.8] mb-6" style={{ color: IC.gray50 }}>We combine market data, big data analytics, and AI-driven forecasts to identify growth opportunities, optimize pricing, and improve sales performance - with practical strategies and tools you can actually implement.</p>
              <div>
                <label className="text-[10px] font-bold tracking-[0.22em] uppercase block mb-2" style={{ color: IC.blue }}>Search reports</label>
                <div className="flex items-end gap-0">
                  <input
                    placeholder="Industry, market or topic…"
                    className="flex-1 text-[14px] outline-none pb-2"
                    style={{
                      color: IC.gray80,
                      background: "transparent",
                      border: "none",
                      borderBottom: `1.5px solid rgba(36,87,155,0.28)`,
                      borderRadius: 0,
                      appearance: "none",
                      transition: "border-color 0.3s ease",
                    }}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = IC.blue)}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = "rgba(36,87,155,0.28)")}
                  />
                  <button
                    className="inline-flex items-center justify-between h-11 px-4 text-[13px] font-bold tracking-[0.06em] shrink-0 ml-3"
                    style={{
                      color: IC.white,
                      background: `linear-gradient(to right, ${IC.blue} 0%, ${IC.blueDark} 100%)`,
                      border: "none",
                      minWidth: 110,
                      cursor: "pointer",
                      transition: "opacity 0.25s ease",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1" }}
                  >
                    <span>Search</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col py-8 px-7 relative overflow-hidden"
              style={{
                background: IC.white,
                borderTop: `3px solid ${IC.blue}`,
                boxShadow: "0 12px 40px rgba(36,87,155,0.09)",
              }}
            >
              <p className="text-[10px] font-bold tracking-[0.36em] uppercase mb-3" style={{ color: IC.blue }}>Contact us</p>
              <h3 className="font-bold leading-[1.1] mb-6" style={{ fontSize: "clamp(21px,5.2vw,26px)", color: IC.gray80, letterSpacing: "-0.01em" }}>Tell us your challenge</h3>
              <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: IC.blueLight }}>Name</label>
                  <input name="name" placeholder="Your name" className="ic-field h-10 text-[14px] outline-none pb-1" style={{ color: IC.gray80 }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: IC.blueLight }}>Company</label>
                  <input name="company" placeholder="Your company" className="ic-field h-10 text-[14px] outline-none pb-1" style={{ color: IC.gray80 }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: IC.blueLight }}>Email</label>
                  <input name="mail" type="email" placeholder="you@company.com" className="ic-field h-10 text-[14px] outline-none pb-1" style={{ color: IC.gray80 }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: IC.blueLight }}>Phone</label>
                  <input name="tel" type="tel" placeholder="+43 ..." className="ic-field h-10 text-[14px] outline-none pb-1" style={{ color: IC.gray80 }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold tracking-[0.22em] uppercase" style={{ color: IC.blueLight }}>Message</label>
                  <textarea name="message" placeholder="Briefly describe your challenge…" className="ic-field text-[14px] outline-none resize-none py-1" style={{ color: IC.gray80, minHeight: 72 }} />
                </div>
                <button
                  type="submit"
                  className="h-12 inline-flex items-center justify-between px-6 text-[13px] font-bold tracking-[0.06em] mt-1"
                  style={{ color: IC.white, background: `linear-gradient(to right, ${IC.blue} 0%, ${IC.blueDark} 100%)`, border: "none", cursor: "pointer", transition: "opacity 0.25s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; const a = (e.currentTarget as HTMLElement).querySelector(".cta-arrow") as HTMLElement; if (a) a.style.transform = "translateX(5px)" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; const a = (e.currentTarget as HTMLElement).querySelector(".cta-arrow") as HTMLElement; if (a) a.style.transform = "translateX(0)" }}
                >
                  <span>Send Request</span>
                  <span className="cta-arrow" style={{ display: "inline-flex", transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}><ArrowRight size={14} /></span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCROLLABLE CONTENT below sticky scene ══ */}
      <section id="overview-full" className="pb-2 lg:pb-4 relative overflow-hidden" style={{
        background: IC.white,
        zIndex: 10,
        position: "relative",
        marginTop: 0,
        paddingTop: isDesktop ? 80 : 48,
      }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14 relative z-10">
            <div className="mb-4" aria-hidden="true" />
            <Fade>
              <div className="flex items-end justify-between mb-14">
                <div>
                  <Label>What we do</Label>
                  <ParaTitle className="mb-0">Sales Growth Through Market Intelligence</ParaTitle>
                </div>

              </div>
            </Fade>
            <div
              className="grid sm:grid-cols-2 lg:grid-cols-3"
              style={{
                borderTop: `1px solid ${IC.blueXL}`,
                borderLeft: `1px solid ${IC.blueXL}`,
              }}
            >
              {COMPETENCES.map((c, i) => {
                const Icon = c.icon
                return (
                  <Fade key={c.title} delay={0.14 + i * 0.09} duration={0.95} style={{ display: "flex" }}>
                    <div
                      className="relative flex flex-col p-8 overflow-hidden w-full"
                      style={{
                        background: IC.white,
                        minHeight: 240,
                        borderRight: `1px solid ${IC.blueXL}`,
                        borderBottom: `1px solid ${IC.blueXL}`,
                        transition: "background 0.35s ease, box-shadow 0.35s ease",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = IC.blueXL
                        e.currentTarget.style.boxShadow = `inset 3px 0 0 ${IC.blue}`
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = IC.white
                        e.currentTarget.style.boxShadow = "none"
                      }}
                    >
                      <Icon size={22} style={{ color: IC.blue, marginBottom: 20 }} />
                      <h3 className="text-[17px] font-semibold mb-3" style={{ color: IC.gray80 }}>{c.title}</h3>
                      <p className="text-[15px] leading-relaxed flex-1" style={{ color: IC.gray50 }}>{c.desc}</p>
                      <a href="#"
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold mt-6 relative w-fit"
                        style={{ color: IC.blue, transition: "color 0.25s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)", paddingBottom: 2 }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement
                          el.style.color = IC.blueDark
                          el.style.transform = "translateX(4px)"
                          const arrow = el.querySelector(".exp-arrow") as HTMLElement; if (arrow) arrow.style.transform = "translateX(5px)"
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement
                          el.style.color = IC.blue
                          el.style.transform = "translateX(0)"
                          const arrow = el.querySelector(".exp-arrow") as HTMLElement; if (arrow) arrow.style.transform = "translateX(0)"
                        }}
                      >
                        <span>Explore</span>
                        <span className="exp-arrow" style={{ display: "inline-flex", transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
                          <ArrowRight size={11} />
                        </span>
                      </a>
                    </div>
                  </Fade>
                )
              })}
            </div>
        </div>
      </section>

      {/* NEWS & EVENTS */}
      <section className="pt-20 pb-8 lg:pt-28 lg:pb-10" style={{ background: IC.white }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Fade>
            <Label>IC News</Label>
            <ParaTitle className="mb-4">Don't miss any Industry Trends</ParaTitle>
            <div className="mb-14" aria-hidden="true" />
          </Fade>
          <div className="grid lg:grid-cols-2 gap-12 mt-4">

            {/* Press */}
            <div className="flex flex-col">
              <Fade>
                <h3 className="text-[14px] font-bold pb-4 mb-6 tracking-widest uppercase inline-flex items-center gap-3"
                  style={{ color: "rgb(77,77,77)" }}>
                  <span style={{ width: 38, height: 38, borderRadius: 999, background: `linear-gradient(145deg, ${IC.blueXL} 0%, #eef4fb 100%)`, border: `1px solid ${IC.blueXL}`, display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(36,87,155,0.12)" }}>
                    <Newspaper size={20} strokeWidth={2.15} style={{ color: IC.blue }} />
                  </span>
                  IC News
                </h3>
              </Fade>
              <div className="flex-1 flex flex-col">
              {D.press.map((p, idx) => (
                <Fade key={idx} delay={idx * 0.1} className="flex-1 flex flex-col">
                  <div className="pb-6 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="text-[17px] font-semibold" style={{ color: "#7F7F7F" }}>{p.title}</h4>
                      <span
                        className="text-[11px] font-bold px-2.5 py-1 shrink-0 tracking-wide opacity-0 pointer-events-none select-none"
                        style={{ background: IC.blueXL, color: IC.blue }}
                        aria-hidden="true"
                      >
                        00/00/0000
                      </span>
                    </div>
                    <p className="text-[15px] leading-relaxed" style={{ color: "#7F7F7F" }}>{p.desc}</p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 mt-auto pt-4 text-[13px] font-semibold"
                      style={{ color: IC.blue, transition: "color 0.25s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)", paddingBottom: 2 }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = IC.blueDark
                        el.style.transform = "translateX(4px)"
                        const arrow = el.querySelector(".rm-arrow") as HTMLElement; if (arrow) arrow.style.transform = "translateX(5px)"
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = IC.blue
                        el.style.transform = "translateX(0)"
                        const arrow = el.querySelector(".rm-arrow") as HTMLElement; if (arrow) arrow.style.transform = "translateX(0)"
                      }}
                    >
                      <span>Read more</span>
                      <span className="rm-arrow" style={{ display: "inline-flex", transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
                        <ArrowRight size={12} />
                      </span>
                    </a>
                  </div>
                </Fade>
              ))}
              </div>
              <Fade delay={0.25} className="mt-6">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.03em] px-5 py-2.5"
                  style={{
                    borderRadius: 0,
                    color: IC.white,
                    background: IC.blue,
                    border: `1px solid ${IC.blue}`,
                    transition: "background 0.25s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => {
                    const btn = e.currentTarget as HTMLElement
                    btn.style.background = IC.blueDark
                    btn.style.borderColor = IC.blueDark
                    const arrow = btn.querySelector(".cta-arrow") as HTMLElement; if (arrow) arrow.style.transform = "translateX(4px)"
                  }}
                  onMouseLeave={e => {
                    const btn = e.currentTarget as HTMLElement
                    btn.style.background = IC.blue
                    btn.style.borderColor = IC.blue
                    const arrow = btn.querySelector(".cta-arrow") as HTMLElement; if (arrow) arrow.style.transform = "translateX(0)"
                  }}
                >
                  More News
                  <span className="cta-arrow" style={{ display: "inline-flex", transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
                    <ArrowRight size={12} />
                  </span>
                </a>
              </Fade>
            </div>

            {/* Events */}
            <div className="flex flex-col">
              <Fade delay={0.05}>
                <h3 className="text-[14px] font-bold pb-4 mb-6 tracking-widest uppercase inline-flex items-center gap-3"
                  style={{ color: "rgb(77,77,77)" }}>
                  <span style={{ width: 38, height: 38, borderRadius: 999, background: `linear-gradient(145deg, ${IC.blueXL} 0%, #eef4fb 100%)`, border: `1px solid ${IC.blueXL}`, display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(36,87,155,0.12)" }}>
                    <CalendarCheck2 size={20} strokeWidth={2.15} style={{ color: IC.blue }} />
                  </span>
                  Keep in touch with our events
                </h3>
              </Fade>
              <div className="flex-1 flex flex-col">
              {D.events.map((e, idx) => (
                <Fade key={idx} delay={idx * 0.1} className="flex-1 flex flex-col">
                  <div className="pb-6 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="text-[17px] font-semibold" style={{ color: "#7F7F7F" }}>{e.title}</h4>
                      <span className="text-[11px] font-bold px-2.5 py-1 shrink-0 tracking-wide" style={{ background: IC.blueXL, color: IC.blue }}>{e.date}</span>
                    </div>
                    <p className="text-[15px] leading-relaxed" style={{ color: "#7F7F7F" }}>{e.desc}</p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 mt-auto pt-4 text-[13px] font-semibold"
                      style={{ color: IC.blue, transition: "color 0.25s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)", paddingBottom: 2 }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = IC.blueDark
                        el.style.transform = "translateX(4px)"
                        const arrow = el.querySelector(".rm-arrow") as HTMLElement; if (arrow) arrow.style.transform = "translateX(5px)"
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = IC.blue
                        el.style.transform = "translateX(0)"
                        const arrow = el.querySelector(".rm-arrow") as HTMLElement; if (arrow) arrow.style.transform = "translateX(0)"
                      }}
                    >
                      <span>Read more</span>
                      <span className="rm-arrow" style={{ display: "inline-flex", transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
                        <ArrowRight size={12} />
                      </span>
                    </a>
                  </div>
                </Fade>
              ))}
              </div>
              <Fade delay={0.3} className="mt-6">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.03em] px-5 py-2.5"
                  style={{
                    borderRadius: 0,
                    color: IC.white,
                    background: IC.blue,
                    border: `1px solid ${IC.blue}`,
                    transition: "background 0.25s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => {
                    const btn = e.currentTarget as HTMLElement
                    btn.style.background = IC.blueDark
                    btn.style.borderColor = IC.blueDark
                    const arrow = btn.querySelector(".cta-arrow") as HTMLElement; if (arrow) arrow.style.transform = "translateX(4px)"
                  }}
                  onMouseLeave={e => {
                    const btn = e.currentTarget as HTMLElement
                    btn.style.background = IC.blue
                    btn.style.borderColor = IC.blue
                    const arrow = btn.querySelector(".cta-arrow") as HTMLElement; if (arrow) arrow.style.transform = "translateX(0)"
                  }}
                >
                  More Events
                  <span className="cta-arrow" style={{ display: "inline-flex", transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
                    <ArrowRight size={12} />
                  </span>
                </a>
              </Fade>
            </div>
          </div>
        </div>
      </section>

      {/* REFERENCES */}
      <section
        className="pt-20 pb-20 lg:pt-28 lg:pb-24"
        style={{
          background: IC.blueXL,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Fade>
            <Label>References</Label>
            <ParaTitle className="mb-4">Leading Companies trust in Interconnection Consulting</ParaTitle>
            <div className="mb-14" aria-hidden="true" />
          </Fade>

          <div className="flex flex-col gap-7 mb-20 mt-0">
            {currentReferences.map((ref, idx) => {
              const imageOutX = idx === 0 ? -24 : 24
              const textOutX = idx === 0 ? 22 : -22
              const imageDelay = `0s`
              const textDelay = `0s`

              return (
              <Fade key={idx} delay={0}>
                <div className="grid lg:grid-cols-3 gap-6 lg:gap-10 items-stretch p-7"
                  style={{
                    border: `1.5px solid ${IC.blueXL}`,
                    background: IC.white,
                    minHeight: 280,
                    transition: "box-shadow 0.4s ease, border-color 0.5s ease",
                    borderColor: referenceImageFading || referenceTextFading ? "rgba(142,180,227,0.45)" : IC.blueXL,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 10px 32px rgba(36,87,155,0.09)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                >
                  <div className="flex justify-center items-center">
                    <div className="flex items-center justify-center p-5"
                      style={{
                        width: 170, height: 100, background: IC.white, border: `1.5px solid ${IC.blueXL}`, flexShrink: 0,
                        transition: "opacity 0.5s ease",
                        opacity: referenceImageFading ? 0.15 : 1,
                      }}>
                      <img
                        src={ref.logoSrc}
                        alt={ref.company}
                        style={{
                          maxWidth: 130,
                          maxHeight: 60,
                          objectFit: "contain",
                          opacity: referenceImageFading ? 0 : 1,
                          transform: referenceImageFading ? `scale(0.88) translateY(6px)` : `scale(1) translateY(0px)`,
                          filter: referenceImageFading ? "blur(4px)" : "blur(0px)",
                          transition: `opacity 0.38s cubic-bezier(0.4,0,0.2,1) ${imageDelay}, transform 0.52s cubic-bezier(0.22,1,0.36,1) ${imageDelay}, filter 0.38s ease ${imageDelay}`,
                        }}
                        onError={e => {
                          e.currentTarget.style.display = "none"
                          if (e.currentTarget.nextElementSibling) (e.currentTarget.nextElementSibling as HTMLElement).style.display = "block"
                        }}
                      />
                      <span
                        className="hidden text-[15px] font-bold text-center"
                        style={{
                          color: IC.gray80,
                          opacity: referenceImageFading ? 0 : 1,
                          transition: `opacity 0.38s ease ${imageDelay}`,
                        }}
                      >
                        {ref.company}
                      </span>
                    </div>
                  </div>
                  <div className="lg:col-span-2 flex items-center">
                    <div style={{ width: "100%" }}>
                      <div style={{
                        display: "flex", alignItems: "flex-start", gap: 10,
                        opacity: referenceTextFading ? 0 : 1,
                        transform: referenceTextFading ? `translateY(-12px)` : `translateY(0px)`,
                        filter: referenceTextFading ? "blur(5px)" : "blur(0px)",
                        transition: `opacity 0.45s cubic-bezier(0.4,0,0.2,1) ${textDelay}, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${textDelay}, filter 0.4s ease ${textDelay}`,
                      }}>
                        <span style={{
                          flexShrink: 0,
                          fontSize: "97px",
                          lineHeight: 0.72,
                          color: IC.blue,
                          marginTop: 2,
                        }}>&ldquo;</span>
                        <p className="text-[15px] leading-relaxed" style={{ color: "#7F7F7F" }}>{ref.statement}</p>
                      </div>
                      <p className="mt-3 text-[11px] font-bold tracking-[0.3em] uppercase" style={{
                        color: IC.blueLight,
                        opacity: referenceTextFading ? 0 : 1,
                        transform: referenceTextFading ? `translateY(-8px)` : `translateY(0px)`,
                        transition: `opacity 0.38s cubic-bezier(0.4,0,0.2,1) calc(${textDelay} + 0.12s), transform 0.46s cubic-bezier(0.22,1,0.36,1) calc(${textDelay} + 0.12s)`,
                      }}>{ref.company}</p>
                      <p className="mt-1.5 text-[13px]" style={{
                        color: "rgb(127,127,127)",
                        opacity: referenceTextFading ? 0 : 1,
                        transform: referenceTextFading ? `translateY(-6px)` : `translateY(0px)`,
                        transition: `opacity 0.34s cubic-bezier(0.4,0,0.2,1) calc(${textDelay} + 0.22s), transform 0.42s cubic-bezier(0.22,1,0.36,1) calc(${textDelay} + 0.22s)`,
                      }}>{ref.author}</p>
                    </div>
                  </div>
                </div>
              </Fade>
              )
            })}
          </div>

          <Fade delay={0.2}>
            <LogoPairCarousel clients={D.additionalClients} />
          </Fade>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="px-6 lg:px-14 relative"
        style={{
          background: IC.blue,
          paddingTop: 16,
          paddingBottom: 32,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-14 relative z-10" style={{ paddingTop: 16, paddingBottom: 0 }}>
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3"
          >
            <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>© 2026 Interconnection Consulting</p>
            <div className="flex items-center gap-5 text-[13px]">
              <a href="#" style={{ color: "rgba(255,255,255,0.75)" }}>Print</a>
              <a href="#" style={{ color: "rgba(255,255,255,0.75)" }}>Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
