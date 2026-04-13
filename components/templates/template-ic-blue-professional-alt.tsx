"use client"

import { CalendarCheck2, Newspaper, BarChart2, Search, TrendingUp, Target, Users, Lightbulb, Menu } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"
import { D, COMPETENCES } from "./ic-shared-data"

function CornerArrow({ size = 34, strokeWidth = 2.4, className }: { size?: number; strokeWidth?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 10 L22 22" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 22 L22 22 L22 10" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

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

const withAlpha = (hex: string, alpha: number) => {
  const raw = hex.replace("#", "")
  const full = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw
  const n = Number.parseInt(full, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function LogoPairCarousel({ clients }: { clients: { name: string; logoSrc?: string }[] }) {
  const [page, setPage] = useState(0)
  const [fading, setFading] = useState(false)
  const cardsPerPage = 4
  const pageCount = Math.max(1, Math.ceil(clients.length / cardsPerPage))

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setPage((p) => (p + 1) % pageCount)   // cambia contenido mientras está invisible
      }, 480)
      setTimeout(() => {
        setFading(false)                        // inicia fade-in solo tras el cambio
      }, 530)
    }, 3000)
    return () => clearInterval(timer)
  }, [pageCount])

  const start = page * cardsPerPage
  const current = Array.from({ length: cardsPerPage }, (_, i) => clients[(start + i) % clients.length])

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3 lg:grid lg:grid-cols-4">
        {current.map((c, i) => (
          <div key={i} className="flex items-center justify-center px-3 py-3 w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] lg:w-auto"
            style={{
              height: 64,
              flexShrink: 0,
              background: IC.white,
              border: `1px solid rgba(36,87,155,0.13)`,
              borderRadius: 14,
              transition: "background 0.3s ease",
            }}
          >
            {c.logoSrc ? (
              <img
                src={c.logoSrc}
                alt={c.name}
                style={{
                  maxWidth: 140,
                  maxHeight: 36,
                  objectFit: "contain",
                  opacity: fading ? 0 : 1,
                  transition: "opacity 0.38s ease",
                }}
              />
            ) : (
              <span
                className="text-[14px] font-bold tracking-widest uppercase leading-tight text-center"
                style={{
                  color: IC.blue,
                  opacity: fading ? 0 : 1,
                  transition: "opacity 0.38s ease",
                }}
              >
                {c.name}
              </span>
            )}
          </div>
        ))}
      </div>
      {pageCount > 1 && (
        <div className="flex items-center gap-1.5 mt-5 justify-center">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              style={{
                width: i === page ? 22 : 7,
                height: 5,
                borderRadius: 3,
                background: i === page ? IC.blue : IC.blueLight,
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          ))}
        </div>
      )}
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

function Label({ light = false, children }: { light?: boolean; children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold tracking-[0.32em] uppercase mb-4"
       style={{ color: light ? IC.blueLight : IC.gray80 }}>
      {children}
    </p>
  )
}

function SH({ children, light = false, className }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <h2
      className={`font-bold tracking-tight leading-[1.08] ${className ?? ""}`}
      style={{
        fontSize: "clamp(33px,3.7vw,48px)",
        color: IC.blue,
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
    let rafId = 0
    const update = () => {
      rafId = 0
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const next = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed
      setOffset((prev) => (Math.abs(prev - next) < 0.5 ? prev : next))
    }
    const fn = () => {
      if (rafId) return
      rafId = requestAnimationFrame(update)
    }
    window.addEventListener("scroll", fn, { passive: true })
    window.addEventListener("resize", fn)
    update()
    return () => {
      window.removeEventListener("scroll", fn)
      window.removeEventListener("resize", fn)
      if (rafId) cancelAnimationFrame(rafId)
    }
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

export default function TemplateICBlueProfessionalAlt() {
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
  const referenceCardsPerView = 2
  const referencePairCount = Math.max(1, Math.ceil(D.references.length / referenceCardsPerView))
  const referenceStart = referenceLogoPair * referenceCardsPerView
  const currentReferences = Array.from({ length: referenceCardsPerView }, (_, i) => D.references[(referenceStart + i) % D.references.length])

  useEffect(() => {
    setWinH(window.innerHeight)
    setWinW(window.innerWidth)
    let rafId = 0
    const fn = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        const y = window.scrollY
        setScrolled((prev) => {
          const next = y > 60
          return prev === next ? prev : next
        })
        setScrollY((prev) => (Math.abs(prev - y) < 0.5 ? prev : y))
      })
    }
    const onResize = () => {
      setWinH(window.innerHeight)
      setWinW(window.innerWidth)
    }
    window.addEventListener("scroll", fn, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("scroll", fn)
      window.removeEventListener("resize", onResize)
      if (rafId) cancelAnimationFrame(rafId)
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

  const goToReference = useCallback((dir: 1 | -1) => {
    setReferenceImageFading(true)
    setTimeout(() => setReferenceTextFading(true), 130)
    setTimeout(() => setReferenceLogoPair((p) => (p + dir + referencePairCount) % referencePairCount), 430)
    setTimeout(() => setReferenceImageFading(false), 520)
    setTimeout(() => setReferenceTextFading(false), 690)
  }, [referencePairCount])

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
        @keyframes searchIconPop {
          0%, 100% { opacity: 0.6; transform: translateY(0) scale(1); }
          50%       { opacity: 1;   transform: translateY(-2px) scale(1.14); }
        }
        .search-icon-pop { animation: searchIconPop 2.4s ease-in-out infinite; }
      `}</style>

      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          paddingTop:    scrolled ? 13 : 20,
          paddingBottom: scrolled ? 13 : 20,
          background:    scrolled ? "rgba(255,255,255,0.92)" : "transparent",
          borderBottom:  scrolled ? `1px solid ${IC.blueXL}` : "1px solid transparent",
          backdropFilter: scrolled ? "blur(18px) saturate(1.6)" : "none",
          transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-14 flex items-center justify-between">
          <button
            type="button"
            aria-label="Open menu"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10"
            style={{
              color: scrolled ? IC.gray80 : IC.white,
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
                style={{ color: scrolled ? IC.gray80 : "rgba(255,255,255,0.85)" }}
              >
                {l}
              </a>
            ))}
          </div>
          {/* Company name right */}
          <div className="relative flex items-center justify-end w-[170px] sm:w-[220px]" style={{ height: 36 }}>
            <span className="text-[14px] font-bold tracking-tight" style={{ whiteSpace: "nowrap" }}>
              <span
                style={{
                  color: scrolled ? IC.blue : IC.white,
                  transition: "color 0.45s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                Interconnection
              </span>
              <span> </span>
              <span
                style={{
                  color: scrolled ? IC.gray50 : IC.white,
                  transition: "color 0.45s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                Consulting
              </span>
            </span>
          </div>
        </div>
      </nav>

      {/* ═══ STICKY SCENE: hero + section 2 share one viewport-pinned stage ═══ */}
      <div style={{ position: "relative", height: isDesktop ? "262vh" : "200vh" }}>

        {/* ── Layer 0: persistent background that NEVER changes color ── */}
        <div style={{ position: "sticky", top: 0, height: "100vh", background: IC.blueDark, zIndex: 0 }} />

      {/* ── HERO content layer ── */}
      <section className="relative overflow-hidden" style={{ position: "sticky", top: 0, height: "100vh", background: "transparent", display: "flex", flexDirection: "column", zIndex: 2, marginTop: "-100vh" }}>

        {/* Layer 1 — Video background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            src="/Animation_MainSection.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay: IC blue left → transparent right */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, ${IC.blue} 0%, rgba(36,87,155,0.72) 30%, rgba(36,87,155,0.28) 60%, rgba(36,87,155,0) 100%)`,
              pointerEvents: "none",
            }}
          />
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
          <div className="grid lg:grid-cols-[4fr_1fr] gap-12 lg:gap-8 items-center">

            {/* Left — headline + CTA */}
            <div
              style={{
                opacity: Math.max(0, 1 - heroLeftOut * 1.35),
                transform: `translate3d(${heroLeftOut * -42}px, ${heroLeftOut * -10}px, 0)`,
                willChange: "transform, opacity",
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
              <p className="text-[14px] font-bold tracking-[0.45em] uppercase" style={{ color: "rgba(255,255,255,0.85)" }}>
                Interconnection Consulting
              </p>
            </div>
          </div>

          {/* H1 — refined scale */}
          <h1
            className="font-bold"
            style={{ fontSize: "clamp(64px,15.2vw,86px)", lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: 0 }}
          >
            <span
              style={{
                display: "block",
                color: IC.white,
                textShadow: "0 12px 34px rgba(10,24,48,0.35)",
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "none" : "translateY(26px)",
                transition: "opacity 1.1s cubic-bezier(0.22,1,0.36,1) 0.26s, transform 1.1s cubic-bezier(0.22,1,0.36,1) 0.26s",
              }}
            >
              {D.productName.split(/(?<=Better)/i)[0]}
              <br />
              {D.productName.split(/(?<=Better)/i)[1]?.trimStart()}
            </span>
            <span
              style={{
                display: "block",
                color: IC.white,
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "none" : "translateY(26px)",
                transition: "opacity 1.1s cubic-bezier(0.22,1,0.36,1) 0.46s, transform 1.1s cubic-bezier(0.22,1,0.36,1) 0.46s",
              }}
            >
            </span>
          </h1>

          <div className="mt-5 mb-6" aria-hidden="true" />

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
                className="inline-flex items-center justify-center gap-3 text-[14px] font-bold px-7 py-3.5 relative overflow-hidden"
                style={{
                  borderRadius: 999,
                  color: IC.blue,
                  background: IC.white,
                  border: "none",
                  boxShadow: "none",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={e => {
                  const shine = e.currentTarget.querySelector(".btn-shine") as HTMLElement
                  if (shine) { shine.style.transition = "transform 0.55s cubic-bezier(0.22,1,0.36,1)"; shine.style.transform = "translateX(260px) skewX(-18deg)" }
                }}
                onMouseLeave={e => {
                  const shine = e.currentTarget.querySelector(".btn-shine") as HTMLElement
                  if (shine) { shine.style.transition = "none"; shine.style.transform = "translateX(-80px) skewX(-18deg)" }
                }}
              >
                <span className="btn-shine" style={{ position: "absolute", top: 0, left: "-60px", width: "48px", height: "100%", background: "rgba(255,255,255,0.18)", transform: "translateX(-80px) skewX(-18deg)", pointerEvents: "none" }} />
                Our Services and Tools
              </a>
            </div>


          </div>
            </div>{/* end left column */}



          </div>{/* end grid */}
        </div>{/* end content wrapper */}

        {/* Bottom vignette — ends at exact IC.blueDark so section 2 top is the same color → seamless */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: 160,
            background: `linear-gradient(to bottom, transparent 0%, ${IC.blueDark} 100%)`,
          }}
        />
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
        {/* White gradient rising from bottom — stronger white dominance during scroll */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `linear-gradient(to top,
            rgba(255,255,255,1)    0%,
            rgba(255,255,255,0.99) 18%,
            rgba(255,255,255,0.95) 38%,
            rgba(255,255,255,0.88) 56%,
            rgba(255,255,255,0.72) 72%,
            rgba(255,255,255,0.45) 86%,
            rgba(255,255,255,0.18) 100%)`,
          opacity: Math.min(1, Math.max(0, (sectionRightIn - 0.03) * 1.05 + sectionLeftIn * 1.1)),
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-14 w-full relative z-10"
          style={{
            transform: `scale(${0.965 + Math.max(sectionLeftIn, sectionRightIn) * 0.035})`,
            willChange: "transform",
          }}
        >
          <div className="flex justify-center">
            <div
              className="w-full max-w-5xl py-12"
              style={{
                opacity: sectionLeftInEff,
                transform: `translate3d(${(1 - sectionLeftInEff) * -28}px, ${(1 - sectionLeftInEff) * 10}px, 0)`,
                willChange: "transform, opacity",
              }}
            >
              <div className="mb-8">
                <Label>How we make our customers successful</Label>
                <h2 className="font-bold tracking-tight leading-[1.08] mb-5" style={{ fontSize: "clamp(36px,4.1vw,56px)", color: IC.blue, letterSpacing: "-0.015em" }}>
                  Turn data into revenue. Predict what’s next.
                </h2>
                <p className="text-[16px] leading-[1.9] max-w-4xl" style={{ color: IC.gray80 }}>
                  We combine market data, big data analytics, and AI-driven forecasts to identify growth opportunities, optimize pricing, and improve sales performance - with practical strategies and tools you can actually implement.
                </p>
              </div>

              <div
                className="search-container w-full rounded-[18px] py-[14px] px-4"
                style={{
                  background: IC.blueLight,
                  boxShadow: "none",
                  transition: "transform 0.28s ease",
                }}
                onMouseEnter={e => {
                  const active = document.activeElement
                  const inp = e.currentTarget.querySelector("input")
                  if (active !== inp) {
                    e.currentTarget.style.transform = "translateY(-2px)"
                  }
                }}
                onMouseLeave={e => {
                  const active = document.activeElement
                  const inp = e.currentTarget.querySelector("input")
                  if (active !== inp) {
                    e.currentTarget.style.transform = "translateY(0)"
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="search-icon-pop shrink-0" style={{ color: withAlpha(IC.white, 0.8) }}>
                    <Search size={20} />
                  </span>
                  <input
                    placeholder="Explore our Industry Markets"
                    className="flex-1 h-14 text-[16px] outline-none placeholder:text-white"
                    style={{
                      color: IC.white,
                      caretColor: IC.white,
                      background: "transparent",
                      boxShadow: "none",
                      border: "none",
                      borderRadius: 12,
                      appearance: "none",
                    }}
                    onFocus={e => {
                      const c = e.currentTarget.closest(".search-container") as HTMLElement
                      if (c) { c.style.transform = "translateY(-2px)" }
                    }}
                    onBlur={e => {
                      const c = e.currentTarget.closest(".search-container") as HTMLElement
                      if (c) { c.style.transform = "translateY(0)" }
                    }}
                  />
                  <button
                    className="flex items-center justify-center gap-2 h-11 px-7 text-[14px] font-bold tracking-[0.03em] shrink-0"
                    style={{
                      color: IC.white,
                      background: IC.blue,
                      border: "none",
                      boxShadow: "none",
                      borderRadius: 999,
                      minWidth: 124,
                      whiteSpace: "nowrap",
                      transition: "opacity 0.2s ease, transform 0.22s cubic-bezier(0.22,1,0.36,1)",
                      cursor: "pointer",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.92"; e.currentTarget.style.transform = "scale(1.03)" }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)" }}
                  >
                    <Search size={15} />
                    Search
                  </button>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {["Automotive", "Chemicals", "Energy", "Construction", "Healthcare"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center h-8 px-4 text-[11px] font-bold tracking-[0.32em]"
                    style={{
                      color: IC.blue,
                      background: withAlpha(IC.blueXL, 0.82),
                      borderRadius: 999,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>{/* end max-w wrapper */}
      </section>
      {/* ── MOBILE PARALLAX SECTION — inside sticky scene, lg:hidden ── */}
      <section
        className="flex flex-col lg:hidden"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          background: "transparent",
          zIndex: 3,
          marginTop: "-100vh",
          overflow: "hidden",
          justifyContent: "center",
          pointerEvents: sectionIn < 0.05 ? "none" : "auto",
        }}
      >
        {/* White gradient rising from bottom */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `linear-gradient(to top,
            rgba(255,255,255,1)    0%,
            rgba(255,255,255,0.99) 22%,
            rgba(255,255,255,0.96) 44%,
            rgba(255,255,255,0.88) 62%,
            rgba(255,255,255,0.62) 80%,
            rgba(255,255,255,0.22) 94%,
            rgba(255,255,255,0.04) 100%)`,
          opacity: Math.min(1, Math.max(0, (sectionIn - 0.03) * 1.1)),
        }} />
        <div
          className="max-w-7xl mx-auto px-6 max-[420px]:px-4 w-full relative z-10"
          style={{
            opacity: sectionIn,
            transform: `translateY(${(1 - sectionIn) * 34}px)`,
            willChange: "transform, opacity",
          }}
        >
          <Label>How we make our customers successful</Label>
          <h2 className="font-bold tracking-tight leading-[1.08] mb-5" style={{ fontSize: "clamp(28px,8vw,42px)", color: IC.blue, letterSpacing: "-0.015em" }}>Turn data into revenue. Predict what's next.</h2>
          <div className="w-7 h-[2px] mb-6" style={{ background: IC.blue }} />
          <p className="text-[14px] leading-[1.75] mb-8" style={{ color: IC.gray80 }}>We combine market data, big data analytics, and AI-driven forecasts to identify growth opportunities, optimize pricing, and improve sales performance.</p>
          <div
            className="search-container w-full rounded-[14px] py-[10px] px-4 max-[420px]:px-2.5"
            style={{ background: IC.blueLight, boxShadow: `0 12px 30px ${withAlpha(IC.blue, 0.16)}`, transition: "box-shadow 0.28s ease, transform 0.28s ease" }}
            onMouseEnter={e => {
              const inp = e.currentTarget.querySelector("input")
              if (document.activeElement !== inp) { e.currentTarget.style.boxShadow = `0 16px 42px ${withAlpha(IC.blue, 0.26)}, 0 0 0 2.5px ${withAlpha(IC.white, 0.38)}`; e.currentTarget.style.transform = "translateY(-1.5px)" }
            }}
            onMouseLeave={e => {
              const inp = e.currentTarget.querySelector("input")
              if (document.activeElement !== inp) { e.currentTarget.style.boxShadow = `0 12px 30px ${withAlpha(IC.blue, 0.16)}`; e.currentTarget.style.transform = "translateY(0)" }
            }}
          >
            <div className="flex items-center gap-3 max-[420px]:gap-1.5">
              <span className="search-icon-pop shrink-0" style={{ color: withAlpha(IC.white, 0.8) }}><Search size={20} /></span>
              <input
                placeholder={winW < 420 ? "Explore markets" : "Explore our Industry Markets"}
                className="flex-1 min-w-0 h-12 max-[420px]:h-11 text-[15px] max-[420px]:text-[13px] outline-none placeholder:text-white"
                style={{ color: IC.white, caretColor: IC.white, background: "transparent", boxShadow: "none", border: "none", borderRadius: 10, appearance: "none" }}
                onFocus={e => { const c = e.currentTarget.closest(".search-container") as HTMLElement; if (c) { c.style.boxShadow = `0 16px 42px ${withAlpha(IC.blue, 0.28)}, 0 0 0 3px ${withAlpha(IC.white, 0.65)}`; c.style.transform = "translateY(-1.5px)" } }}
                onBlur={e => { const c = e.currentTarget.closest(".search-container") as HTMLElement; if (c) { c.style.boxShadow = `0 12px 30px ${withAlpha(IC.blue, 0.16)}`; c.style.transform = "translateY(0)" } }}
              />
              <button
                className="flex items-center justify-center gap-2 h-11 max-[420px]:h-10 px-6 max-[420px]:px-3.5 text-[13px] max-[420px]:text-[12px] font-bold shrink-0 min-w-[114px] max-[420px]:min-w-[88px]"
                style={{ color: IC.white, background: IC.blue, border: "none", borderRadius: 999, whiteSpace: "nowrap", transition: "opacity 0.2s ease, transform 0.22s cubic-bezier(0.22,1,0.36,1)", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.92"; e.currentTarget.style.transform = "scale(1.04)" }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)" }}
              >
                <Search size={14} />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      </div>{/* end sticky scene */}

      {/* ══ SCROLLABLE CONTENT below sticky scene ══ */}
      <section id="overview-full" className="pb-2 lg:pb-4 relative overflow-hidden" style={{
        background: isDesktop ? `linear-gradient(to bottom, rgba(255,255,255,0) 0px, rgba(255,255,255,0.96) 300px, ${IC.white} 420px)` : IC.white,
        zIndex: 10,
        position: "relative",
        marginTop: isDesktop ? -360 : -240,
        paddingTop: isDesktop ? 280 : 32,
      }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14 relative z-10">
            <div className="mb-10" aria-hidden="true" />
            <Fade>
              <div className="flex items-end justify-between mb-14">
                <div>
                  <Label>What we do</Label>
                  <ParaTitle className="mb-0">Sales Growth Through Market Intelligence</ParaTitle>
                </div>

              </div>
            </Fade>
            <div style={{ borderTop: `1.5px solid ${IC.blueXL}` }}>
              {COMPETENCES.map((c, i) => {
                const Icon = c.icon
                return (
                <Fade key={c.title} delay={0.12 + i * 0.07} duration={0.85}>
                  <a
                    href="#"
                    className="group flex items-center gap-4 sm:gap-6 py-5 pl-2 sm:pl-4 pr-2 sm:pr-4"
                    style={{
                      borderBottom: `1.5px solid ${IC.blueXL}`,
                      transition: "background 0.25s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "rgba(220,230,242,0.22)"
                      const arrow = e.currentTarget.querySelector(".wwd-arrow") as HTMLElement
                      if (arrow) arrow.style.transform = "translateX(4px)"
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "transparent"
                      const arrow = e.currentTarget.querySelector(".wwd-arrow") as HTMLElement
                      if (arrow) arrow.style.transform = "translateX(0)"
                    }}
                  >
                    <span
                      className="shrink-0 inline-flex items-center justify-center"
                      style={{
                        width: 64,
                        height: 44,
                        borderRadius: 999,
                        background: IC.blueXL,
                        border: `1.5px solid ${IC.blueXL}`,
                      }}
                    >
                      <Icon size={22} style={{ color: IC.blue }} />
                    </span>

                    <span className="flex-1 min-w-0">
                      <span className="block text-[17px] font-semibold mb-1" style={{ color: IC.blue }}>
                        {c.title}
                      </span>
                      <span className="block text-[15px] leading-relaxed" style={{ color: IC.gray50 }}>
                        {c.desc}
                      </span>
                    </span>

                    <span className="wwd-arrow shrink-0 inline-flex flex-col items-center justify-center gap-1 group" style={{ color: IC.blue, transition: "transform 0.25s ease" }}>
                      <CornerArrow size={34} strokeWidth={2.25} />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] opacity-0 -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                        Read more
                      </span>
                    </span>
                  </a>
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
            <div className="mb-8" aria-hidden="true" />
          </Fade>
          <div className="grid lg:grid-cols-2 gap-x-12 gap-y-10 mt-2 items-start">

            {/* News column */}
            <div className="flex flex-col h-full">
              <Fade>
                <h3
                  className="text-[14px] font-bold mb-6 tracking-widest inline-flex items-center gap-3"
                  style={{ color: IC.blue }}
                >
                  <span
                    style={{
                      width: 64,
                      height: 44,
                      borderRadius: 999,
                      background: IC.blueXL,
                      border: `1.5px solid ${IC.blueXL}`,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Newspaper size={22} style={{ color: IC.blue }} />
                  </span>
                  News
                </h3>
              </Fade>

              <div className="flex flex-col">
                {D.press.map((p, idx) => (
                  <Fade key={`press-${idx}`} delay={idx * 0.1}>
                    <div
                      className="group flex items-center gap-6 py-5 pr-2 min-h-[176px]"
                      style={{
                        borderBottom: `1px solid ${IC.blueXL}`,
                        transition: "background 0.25s ease",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(220,230,242,0.22)"
                        const arrow = e.currentTarget.querySelector(".icnews-arrow") as HTMLElement
                        if (arrow) arrow.style.transform = "translateX(4px)"
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent"
                        const arrow = e.currentTarget.querySelector(".icnews-arrow") as HTMLElement
                        if (arrow) arrow.style.transform = "translateX(0)"
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[17px] font-semibold mb-2" style={{ color: "#4D4D4D" }}>{p.title}</h4>
                        <p className="text-[15px] leading-relaxed" style={{ color: "#7F7F7F" }}>{p.desc}</p>
                      </div>
                      <a
                        href="#"
                        aria-label="View news item"
                        className="icnews-arrow shrink-0 inline-flex flex-col items-center gap-1 group"
                        style={{ color: IC.blue, transition: "transform 0.25s ease" }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement
                          el.style.transform = "translateX(4px)"
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement
                          el.style.transform = "translateX(0)"
                        }}
                      >
                        <CornerArrow size={34} strokeWidth={2.25} />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] opacity-0 -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                          Read more
                        </span>
                      </a>
                    </div>
                  </Fade>
                ))}
              </div>

              <Fade delay={0.25} className="mt-auto pt-8">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 h-10 text-[13px] font-bold tracking-[0.03em] px-5 relative overflow-hidden w-fit"
                  style={{
                    borderRadius: 999,
                    color: IC.white,
                    background: IC.blue,
                    border: "none",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.92" }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1" }}
                >
                  More News
                </a>
              </Fade>
            </div>

            {/* Events column */}
            <div className="flex flex-col h-full">
              <Fade delay={0.05}>
                <h3
                  className="text-[14px] font-bold mb-6 tracking-widest inline-flex items-center gap-3"
                  style={{ color: IC.blue }}
                >
                  <span
                    style={{
                      width: 64,
                      height: 44,
                      borderRadius: 999,
                      background: IC.blueXL,
                      border: `1.5px solid ${IC.blueXL}`,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CalendarCheck2 size={22} style={{ color: IC.blue }} />
                  </span>
                  Events
                </h3>
              </Fade>

              <div className="flex flex-col">
                {D.events.map((ev, idx) => (
                  <Fade key={`event-${idx}`} delay={idx * 0.1}>
                    <div
                      className="group flex items-center gap-6 py-5 pr-2 min-h-[176px]"
                      style={{
                        borderBottom: `1px solid ${IC.blueXL}`,
                        transition: "background 0.25s ease",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(220,230,242,0.22)"
                        const arrow = e.currentTarget.querySelector(".icnews-arrow") as HTMLElement
                        if (arrow) arrow.style.transform = "translateX(4px)"
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent"
                        const arrow = e.currentTarget.querySelector(".icnews-arrow") as HTMLElement
                        if (arrow) arrow.style.transform = "translateX(0)"
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="text-[17px] font-semibold" style={{ color: "#4D4D4D" }}>{ev.title}</h4>
                          <span className="text-[11px] font-bold px-2.5 py-1 shrink-0 tracking-wide" style={{ background: IC.blueXL, color: IC.blue, borderRadius: 999 }}>{ev.date}</span>
                        </div>
                        <p className="text-[15px] leading-relaxed" style={{ color: "#7F7F7F" }}>{ev.desc}</p>
                      </div>
                      <a
                        href="#"
                        aria-label="View event item"
                        className="icnews-arrow shrink-0 inline-flex flex-col items-center gap-1 group"
                        style={{ color: IC.blue, transition: "transform 0.25s ease" }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement
                          el.style.transform = "translateX(4px)"
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement
                          el.style.transform = "translateX(0)"
                        }}
                      >
                        <CornerArrow size={34} strokeWidth={2.25} />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] opacity-0 -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                          Read more
                        </span>
                      </a>
                    </div>
                  </Fade>
                ))}
              </div>

              <Fade delay={0.3} className="mt-auto pt-8">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 h-10 text-[13px] font-bold tracking-[0.03em] px-5 relative overflow-hidden w-fit"
                  style={{
                    borderRadius: 999,
                    color: IC.white,
                    background: IC.blue,
                    border: "none",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.92" }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1" }}
                >
                  More Events
                </a>
              </Fade>
            </div>
          </div>
        </div>
      </section>

      {/* REFERENCES */}
      <section
        className="pt-20 pb-16 lg:pt-28 lg:pb-20"
        style={{
          background: `linear-gradient(to bottom,
            ${IC.white} 0%,
            #fafdff 10%,
            #eef5fd 24%,
            #dce9f8 40%,
            #c7dbf0 56%,
            #a9c6e8 72%,
            #84abd9 86%,
            #5f91ca 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-14">

          {/* ── Header row ── */}
          <Fade>
            <div className="mb-2">
              <Label>References</Label>
              <ParaTitle className="mb-0">Leading Companies trust in Interconnection Consulting</ParaTitle>
              <div className="w-7 mt-1 mb-8" aria-hidden="true" />
            </div>

          </Fade>

          {/* ── Cards grid ── */}
          <div className="grid lg:grid-cols-2 gap-5 mb-12">
            {currentReferences.map((ref, idx) => (
              <Fade key={idx} delay={idx * 0.08} style={{ display: "flex" }}>
                <div
                  className="relative overflow-hidden flex flex-col w-full"
                  style={{
                    background: IC.white,
                    border: `1.5px solid ${IC.blueXL}`,
                    borderRadius: 22,
                    boxShadow: "0 10px 28px rgba(36,87,155,0.09)",
                    height: 300,
                    padding: "1.4rem 1.6rem 1.3rem 1.5rem",
                  }}
                >
                  {/* Watermark quote mark */}
                  <div
                    className="absolute bottom-14 right-3 select-none pointer-events-none"
                    style={{ fontSize: 200, lineHeight: 1, fontFamily: "Georgia, 'Times New Roman', serif", color: IC.blue, opacity: 0.04, userSelect: "none" }}
                    aria-hidden="true"
                  >
                    &rdquo;
                  </div>

                  {/* Animated content wrapper */}
                  <div
                    className="flex flex-col h-full"
                    style={{
                      opacity: referenceTextFading ? 0 : 1,
                      transform: referenceTextFading ? "translateY(-8px)" : "translateY(0)",
                      filter: referenceTextFading ? "blur(4px)" : "blur(0px)",
                      transition: "opacity 0.42s ease, transform 0.52s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease",
                    }}
                  >
                    {/* Company label + quote — starts from top */}
                    <div className="flex flex-col justify-start" style={{ flex: "1 1 auto" }}>
                      <p
                        className="text-[14px] font-bold tracking-widest uppercase mb-5"
                        style={{ color: IC.blue, flexShrink: 0 }}
                      >
                        {ref.company}
                      </p>

                      {/* Quote text — clamped to 5 lines */}
                      <p
                        className="text-[15px] leading-relaxed relative z-10"
                        style={{
                          color: "#7F7F7F",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 5,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {ref.statement}
                      </p>
                    </div>

                    {/* Divider + author + logo */}
                    <div
                      className="flex items-center justify-between pt-4 mt-auto"
                      style={{ borderTop: `1px solid ${IC.blueXL}`, flexShrink: 0 }}
                    >
                      <p className="text-[15px] font-medium leading-snug" style={{ color: IC.gray80, maxWidth: "60%" }}>
                        {ref.author}
                      </p>
                      <div
                        className="flex items-center justify-end shrink-0"
                        style={{
                          width: 90, height: 44,
                          background: "transparent",
                          opacity: referenceImageFading ? 0.15 : 1,
                          transition: "opacity 0.4s ease",
                        }}
                      >
                        <img
                          src={ref.logoSrc}
                          alt={ref.company}
                          style={{
                            maxWidth: 90, maxHeight: 36, objectFit: "contain",
                            opacity: referenceImageFading ? 0 : 1,
                            transform: referenceImageFading ? "scale(0.86)" : "scale(1)",
                            transition: "opacity 0.38s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
                          }}
                          onError={e => {
                            e.currentTarget.style.display = "none"
                            const next = e.currentTarget.nextElementSibling as HTMLElement
                            if (next) next.style.display = "block"
                          }}
                        />
                        <span
                          className="hidden text-[11px] font-bold text-right"
                          style={{ color: IC.blue }}
                        >
                          {ref.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>

          {/* Logo carousel */}
          <Fade delay={0.15}>
            <LogoPairCarousel clients={D.references.map((r) => ({ name: r.company, logoSrc: r.logoSrc }))} />
          </Fade>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="px-6 lg:px-14 relative"
        style={{
          background: `linear-gradient(to bottom,
            #5f91ca 0%,
            #5689c4 22%,
            #4a7dbc 46%,
            #3c6eae 68%,
            #2f63a4 86%,
            ${IC.blue} 100%)`,
          paddingTop: 0,
          paddingBottom: 32,
          border: "none",
          outline: "none",
          marginTop: -2,
        }}
      >
        <div className="max-w-7xl mx-auto lg:px-48 relative z-10" style={{ paddingTop: 40, paddingBottom: 0 }}>
          <div
            className="flex flex-row items-center justify-between gap-2 pt-3"
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
