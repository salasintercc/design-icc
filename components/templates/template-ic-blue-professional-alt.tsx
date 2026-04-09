"use client"

import { ArrowRight, ArrowDownRight, CalendarCheck2, Newspaper, BarChart2, Search, TrendingUp, Target, Users, Lightbulb, Menu } from "lucide-react"
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
  const cardsPerPage = 5
  const pageCount = Math.max(1, Math.ceil(clients.length / cardsPerPage))

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setPage((p) => (p + 1) % pageCount)
        setFading(false)
      }, 500)
    }, 3000)
    return () => clearInterval(timer)
  }, [pageCount])

  const start = page * cardsPerPage
  const current = Array.from({ length: cardsPerPage }, (_, i) => clients[(start + i) % clients.length])

  return (
    <div>
      <p className="text-[10px] font-bold tracking-[0.32em] uppercase mb-5" style={{ color: IC.gray50 }}>Also trusted by</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {current.map((c, i) => (
          <div key={i} className="flex items-center justify-center px-3 py-3"
            style={{
              height: 64,
              background: IC.white,
              border: `1px solid rgba(36,87,155,0.13)`,
              transition: "background 0.3s ease",
            }}
          >
            <span
              className="text-[12px] sm:text-[13px] font-semibold leading-tight text-center"
              style={{
                color: IC.gray80,
                opacity: fading ? 0 : 1,
                transition: "opacity 0.45s ease",
              }}
            >
              {c.name}
            </span>
          </div>
        ))}
      </div>
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
            <span
              className="text-[14px] font-bold tracking-tight"
              style={{
                color: scrolled ? IC.blue : IC.white,
                whiteSpace: "nowrap",
                transition: "color 0.45s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              Interconnection Consulting
            </span>
          </div>
        </div>
      </nav>

      {/* ═══ STICKY SCENE: hero + section 2 share one viewport-pinned stage ═══ */}
      <div style={{ position: "relative", height: isDesktop ? "262vh" : "100vh" }}>

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
            className="font-black"
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
                  const arrow = e.currentTarget.querySelector(".btn-arrow") as HTMLElement; if (arrow) arrow.style.transform = "translateX(4px)"
                }}
                onMouseLeave={e => {
                  const shine = e.currentTarget.querySelector(".btn-shine") as HTMLElement
                  if (shine) { shine.style.transition = "none"; shine.style.transform = "translateX(-80px) skewX(-18deg)" }
                  const arrow = e.currentTarget.querySelector(".btn-arrow") as HTMLElement; if (arrow) arrow.style.transform = "translateX(0)"
                }}
              >
                <span className="btn-shine" style={{ position: "absolute", top: 0, left: "-60px", width: "48px", height: "100%", background: "rgba(255,255,255,0.18)", transform: "translateX(-80px) skewX(-18deg)", pointerEvents: "none" }} />
                Our Services and Tools <span className="btn-arrow" style={{ display: "inline-flex", transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}><ArrowRight size={13} strokeWidth={2.5} /></span>
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
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-stretch">

            {/* Left — on dark bg */}
            <div
              className="h-full flex flex-col justify-start gap-8 py-12"
              style={{
                opacity: sectionLeftInEff,
                transform: `translate3d(${(1 - sectionLeftInEff) * -44}px, ${(1 - sectionLeftInEff) * 14}px, 0)`,
                willChange: "transform, opacity",
              }}
            >
              <div>
                <p className="text-[11px] font-bold tracking-[0.32em] uppercase mb-5" style={{ color: IC.gray80 }}>How we make our customers successful</p>
                <h2 className="font-bold tracking-tight leading-[1.08] mb-6" style={{ fontSize: "clamp(33px,3.7vw,48px)", color: IC.blue, letterSpacing: "-0.015em" }}>
                  Turn data into revenue. Predict what’s next.
                </h2>
                <div className="h-[2px] mt-1" aria-hidden="true" />
              </div>
              <p className="text-[15px] leading-[1.9]" style={{ color: IC.gray80 }}>
                We combine market data, big data analytics, and AI-driven forecasts to identify growth opportunities, optimize pricing, and improve sales performance - with practical strategies and tools you can actually implement.
              </p>
              <div>
                <div className="w-full max-w-[560px] rounded-[14px] p-2" style={{ background: IC.blueLight, boxShadow: "0 12px 30px rgba(36,87,155,0.16)" }}>
                  <div className="flex items-center gap-2">
                  <input
                    placeholder="Explore our Industry Markets"
                    className="flex-1 h-12 px-5 text-[15px] outline-none placeholder:text-white"
                    style={{
                      color: IC.white,
                      caretColor: IC.blue,
                      background: IC.blueLight,
                      boxShadow: "none",
                      border: "none",
                      borderRadius: 10,
                      appearance: "none",
                    }}
                  />
                  <button
                    className="flex items-center justify-center h-10 px-12 text-[13px] font-bold tracking-[0.03em] shrink-0"
                    style={{
                      color: IC.white,
                      background: IC.blue,
                      border: "none",
                      boxShadow: "none",
                      borderRadius: 999,
                      minWidth: 148,
                      whiteSpace: "nowrap",
                      transition: "opacity 0.2s ease, transform 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.92" }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1" }}
                  >
                    Search
                  </button>
                </div>
                </div>
              </div>
            </div>

            {/* Right — CTA panel */}
            <div
              className="h-full"
              style={{
                opacity: sectionRightInEff,
                transform: `translate3d(${(1 - sectionRightInEff) * 56}px, ${(1 - sectionRightInEff) * 12}px, 0)`,
                willChange: "transform, opacity",
              }}
            >
              <div
                id="contact-panel"
                className="h-full flex flex-col justify-between py-12 px-10 rounded-[30px] overflow-hidden"
                style={{
                  background: `linear-gradient(150deg, rgba(55,96,146,0.98) 0%, rgba(36,87,155,0.99) 62%, rgba(30,74,134,0.99) 100%)`,
                  border: "none",
                  boxShadow: "0 24px 74px rgba(23,53,95,0.26)",
                  backdropFilter: "blur(8px)",
                  animation: "panelDrift 9s ease-in-out infinite",
                }}
              >
                <div>
                  <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: IC.blueLight }}>Contact us</p>
                  <h3 className="font-bold leading-[1.15] mb-12" style={{ fontSize: "clamp(26px,3.23vw,33px)", color: IC.white }}>
                    Tell us your challenge
                  </h3>
                  <form className="grid grid-cols-2 gap-4 pt-6" onSubmit={(e) => e.preventDefault()}>
                    <input
                      name="mail"
                      type="email"
                      placeholder="Mail"
                      className="col-span-1 h-11 px-4 text-[14px] outline-none placeholder:text-white"
                      style={{
                        color: IC.white,
                        background: "rgba(142,180,227,0.82)",
                        border: "none",
                        borderRadius: 9,
                      }}
                    />
                    <input
                      name="name"
                      placeholder="Name"
                      className="col-span-1 h-11 px-4 text-[14px] outline-none placeholder:text-white"
                      style={{
                        color: IC.white,
                        background: "rgba(142,180,227,0.82)",
                        border: "none",
                        borderRadius: 9,
                      }}
                    />
                    <input
                      name="company"
                      placeholder="Company"
                      className="col-span-1 h-11 px-4 text-[14px] outline-none placeholder:text-white"
                      style={{
                        color: IC.white,
                        background: "rgba(142,180,227,0.82)",
                        border: "none",
                        borderRadius: 9,
                      }}
                    />
                    <input
                      name="tel"
                      type="tel"
                      placeholder="Tel"
                      className="col-span-1 h-11 px-4 text-[14px] outline-none placeholder:text-white"
                      style={{
                        color: IC.white,
                        background: "rgba(142,180,227,0.82)",
                        border: "none",
                        borderRadius: 9,
                      }}
                    />
                    <div className="col-span-2 relative">
                      <textarea
                        name="message"
                        placeholder="Message"
                        className="w-full min-h-[130px] px-4 py-3 pb-14 text-[14px] outline-none resize-none placeholder:text-white"
                        style={{
                          color: IC.white,
                          background: "rgba(142,180,227,0.82)",
                          border: "none",
                          borderRadius: 10,
                        }}
                      />
                      <button
                        type="submit"
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 h-9 inline-flex items-center justify-center px-10 text-[13px] font-bold tracking-[0.03em]"
                        style={{
                          color: IC.white,
                          background: "#1E4A86",
                          border: "none",
                          boxShadow: "none",
                          borderRadius: 999,
                          transition: "opacity 0.2s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = "0.92" }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = "1" }}
                      >
                        Send Inquiry
                      </button>
                    </div>
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
        style={{ background: IC.blueDark, paddingTop: 48, paddingBottom: 56, zIndex: 3 }}
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-[11px] font-bold tracking-[0.32em] uppercase mb-4" style={{ color: IC.gray80 }}>How we make our customers successful</p>
              <h2 className="font-bold leading-[1.1] mb-5" style={{ fontSize: "clamp(27px,6.93vw,37px)", color: IC.blue, letterSpacing: "-0.015em" }}>Turn data into revenue. Predict what's next.</h2>
              <div className="w-7 h-[2px] mb-6" style={{ background: "rgba(142,180,227,0.6)" }} />
              <p className="text-[14px] leading-[1.8] mb-6" style={{ color: IC.gray80 }}>We combine market data, big data analytics, and AI-driven forecasts to identify growth opportunities, optimize pricing, and improve sales performance - with practical strategies and tools you can actually implement.</p>
              <div className="flex items-center gap-0">
                <input
                  placeholder="Explore our Industry Markets"
                  className="flex-1 h-12 px-5 text-[14px] outline-none placeholder:text-white"
                  style={{
                    color: IC.white,
                    caretColor: IC.blue,
                    background: IC.blueLight,
                    border: "none",
                    borderRadius: 999,
                    appearance: "none",
                  }}
                />
                <button
                  className="flex items-center justify-center gap-1.5 h-12 px-4 text-[13px] font-bold tracking-[0.03em] shrink-0"
                  style={{
                    color: IC.white,
                    background: IC.blue,
                    border: "none",
                    boxShadow: "none",
                    borderRadius: 999,
                    minWidth: 120,
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-between py-10 px-8 rounded-[24px] overflow-hidden" style={{ background: `linear-gradient(150deg, rgba(55,96,146,0.98) 0%, rgba(36,87,155,0.99) 62%, rgba(30,74,134,0.99) 100%)`, border: "none", boxShadow: "0 20px 60px rgba(23,53,95,0.26)", backdropFilter: "blur(8px)" }}>
              <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: IC.blueLight }}>Contact us</p>
              <h3 className="font-bold leading-[1.15] mb-8" style={{ fontSize: "clamp(24px,5.78vw,29px)", color: IC.white }}>Tell us your challenge</h3>
              <form className="grid grid-cols-1 gap-4 pt-5" onSubmit={(e) => e.preventDefault()}>
                <input name="mail" type="email" placeholder="Mail" className="h-11 px-4 text-[14px] outline-none placeholder:text-white" style={{ color: IC.white, background: "rgba(142,180,227,0.82)", border: "none", borderRadius: 9 }} />
                <input name="name" placeholder="Name" className="h-11 px-4 text-[14px] outline-none placeholder:text-white" style={{ color: IC.white, background: "rgba(142,180,227,0.82)", border: "none", borderRadius: 9 }} />
                <input name="company" placeholder="Company" className="h-11 px-4 text-[14px] outline-none placeholder:text-white" style={{ color: IC.white, background: "rgba(142,180,227,0.82)", border: "none", borderRadius: 9 }} />
                <input name="tel" type="tel" placeholder="Tel" className="h-11 px-4 text-[14px] outline-none placeholder:text-white" style={{ color: IC.white, background: "rgba(142,180,227,0.82)", border: "none", borderRadius: 9 }} />
                <div className="relative">
                  <textarea name="message" placeholder="Message" className="w-full min-h-[110px] px-4 py-3 pb-14 text-[14px] outline-none resize-none placeholder:text-white" style={{ color: IC.white, background: "rgba(142,180,227,0.82)", border: "none", borderRadius: 10 }} />
                  <button type="submit" className="absolute bottom-4 left-1/2 -translate-x-1/2 h-10 inline-flex items-center justify-center px-10 text-[13px] font-bold tracking-[0.03em]" style={{ color: IC.white, background: "#1E4A86", border: "none", boxShadow: "none", borderRadius: 999, transition: "opacity 0.2s ease", cursor: "pointer" }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.92" }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1" }}
                  >
                    Send Inquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SCROLLABLE CONTENT below sticky scene ══ */}
      <section id="overview-full" className="pb-2 lg:pb-4 relative overflow-hidden" style={{
        background: isDesktop ? `linear-gradient(to bottom, rgba(255,255,255,0) 0px, rgba(255,255,255,0.96) 300px, ${IC.white} 420px)` : IC.white,
        zIndex: 10,
        position: "relative",
        marginTop: isDesktop ? -360 : 0,
        paddingTop: isDesktop ? 280 : 48,
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
              {COMPETENCES.map((c, i) => (
                <Fade key={c.title} delay={0.12 + i * 0.07} duration={0.85}>
                  <a
                    href="#"
                    className="group flex items-center gap-4 sm:gap-6 py-5"
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
                      className="shrink-0"
                      style={{
                        width: 64,
                        height: 44,
                        borderRadius: 999,
                        background: IC.blueXL,
                        border: "3px solid #0C3352",
                      }}
                    />

                    <span className="flex-1 min-w-0">
                      <span className="block text-[17px] font-semibold mb-1" style={{ color: IC.blue }}>
                        {c.title}
                      </span>
                      <span className="block text-[15px] leading-relaxed" style={{ color: IC.gray50 }}>
                        {c.desc}
                      </span>
                    </span>

                    <span className="wwd-arrow shrink-0 inline-flex items-center justify-center" style={{ color: IC.blue, transition: "transform 0.25s ease" }}>
                      <ArrowDownRight size={38} strokeWidth={2.2} />
                    </span>
                  </a>
                </Fade>
              ))}
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
                <span
                  className="inline-flex items-center justify-center h-9 px-10 mb-6 text-[14px] font-bold tracking-[0.18em] uppercase"
                  style={{
                    borderRadius: 999,
                    color: IC.gray80,
                    border: `2px solid rgba(36,87,155,0.28)`,
                    background: IC.white,
                    width: "fit-content",
                  }}
                >
                  News
                </span>
              </Fade>

              <div className="flex flex-col">
                {D.press.map((p, idx) => (
                  <Fade key={`press-${idx}`} delay={idx * 0.1}>
                    <div className="relative pr-14 h-[196px] py-5 flex flex-col" style={{ borderBottom: `1px solid ${IC.blueXL}` }}>
                      <h4 className="text-[17px] font-semibold mb-2" style={{ color: "#4D4D4D" }}>{p.title}</h4>
                      <p className="text-[15px] leading-relaxed" style={{ color: "#7F7F7F" }}>{p.desc}</p>
                      <a
                        href="#"
                        aria-label="View news item"
                        className="absolute right-0 bottom-4 inline-flex flex-col items-center gap-1 group"
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
                        <ArrowDownRight size={36} strokeWidth={2.2} />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] opacity-0 -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                          Read more
                        </span>
                      </a>
                    </div>
                  </Fade>
                ))}
              </div>

              <Fade delay={0.25} className="mt-auto pt-2">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.03em] px-5 py-2.5 relative overflow-hidden w-fit"
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
                <span
                  className="inline-flex items-center justify-center h-9 px-10 mb-6 text-[14px] font-bold tracking-[0.18em] uppercase"
                  style={{
                    borderRadius: 999,
                    color: IC.gray80,
                    border: `2px solid rgba(36,87,155,0.28)`,
                    background: IC.white,
                    width: "fit-content",
                  }}
                >
                  Events
                </span>
              </Fade>

              <div className="flex flex-col">
                {D.events.map((ev, idx) => (
                  <Fade key={`event-${idx}`} delay={idx * 0.1}>
                    <div className="relative pr-14 h-[196px] py-5 flex flex-col" style={{ borderBottom: `1px solid ${IC.blueXL}` }}>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="text-[17px] font-semibold" style={{ color: "#4D4D4D" }}>{ev.title}</h4>
                        <span className="text-[11px] font-bold px-2.5 py-1 shrink-0 tracking-wide" style={{ background: IC.blueXL, color: IC.blue }}>{ev.date}</span>
                      </div>
                      <p className="text-[15px] leading-relaxed" style={{ color: "#7F7F7F" }}>{ev.desc}</p>
                      <a
                        href="#"
                        aria-label="View event item"
                        className="absolute right-0 bottom-4 inline-flex flex-col items-center gap-1 group"
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
                        <ArrowDownRight size={36} strokeWidth={2.2} />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] opacity-0 -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                          Read more
                        </span>
                      </a>
                    </div>
                  </Fade>
                ))}
              </div>

              <Fade delay={0.3} className="mt-auto pt-2">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.03em] px-5 py-2.5 relative overflow-hidden w-fit"
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
            ${IC.white} 12%,
            #f7faff 24%,
            #eef4fb 38%,
            #e4edf8 52%,
            #d8e5f4 66%,
            #c9dbee 80%,
            #bfd4ea 90%,
            ${IC.blueLight} 100%)`,
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
                    border: `1px solid ${IC.blueXL}`,
                    boxShadow: "0 4px 28px rgba(36,87,155,0.08)",
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
                        className="text-[10px] font-bold tracking-[0.32em] uppercase mb-5"
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
                      <p className="text-[12.5px] font-medium leading-snug" style={{ color: IC.gray80, maxWidth: "60%" }}>
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
            <LogoPairCarousel clients={D.additionalClients} />
          </Fade>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="px-6 lg:px-14 relative"
        style={{
          background: `linear-gradient(to bottom,
            ${IC.blueLight} 0%,
            #84abd9 22%,
            #729fd2 42%,
            #5f91ca 62%,
            #4f84c2 80%,
            ${IC.blue} 100%)`,
          paddingTop: 16,
          paddingBottom: 32,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-14 relative z-10" style={{ paddingTop: 40, paddingBottom: 0 }}>
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
