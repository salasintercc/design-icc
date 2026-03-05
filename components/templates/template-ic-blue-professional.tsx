"use client"

/**
 * TEMPLATE 5 — IC Blue Professional  (v2 – Sophisticated)
 * Design: Geometric · Swiss grid · Micro-interactions · Refined transitions
 */

import { ArrowRight, ShoppingCart, Download, FileText, ChevronLeft, ChevronRight, BarChart2, Search, TrendingUp, Target, Users, Lightbulb, ArrowDown } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"

/* ── Brand tokens ──────────────────────────────────────────────────────── */
const IC = {
  blue:      "#24579B",
  blueDark:  "#1e4a86",
  blueLight: "#8EB4E3",
  blueXL:    "#DCE6F2",
  gray80:    "#2C2C2C",
  gray60:    "#4D4D4D",
  gray50:    "#7F7F7F",
  grayLight: "#C2C2C2",
  white:     "#FFFFFF",
  offWhite:  "#F7F9FC",
  surface:   "#F4F7FB",
}

const D = {
  productName:  "Defining Growth Potential",
  regionName:   "Since 1998",
  productTypes: ["Industry knowledge", "Concepts & tools", "Lead generation", "Pricing optimisation"],

  editions: [
    { name: "Standard Edition 2025",                    price: "€2,490", highlight: false },
    { name: "Premium Edition 2025 (incl. data tables)", price: "€3,990", highlight: true  },
  ],
  otherRegions: [
    { name: "Germany",        status: "Available",  available: true  },
    { name: "Switzerland",    status: "Available",  available: true  },
    { name: "Czech Republic", status: "Available",  available: true  },
    { name: "Poland",         status: "Q2 2026",    available: false },
    { name: "Hungary",        status: "Q3 2026",    available: false },
    { name: "Romania",        status: "On Request", available: false },
  ],

  press: [
    { title: "Building Back Growth: European Sandwich Panels Market Shows Signs of Recovery", desc: "After two years of decline, the market is starting to grow again, driven by increasing renovation projects and a solid level of new investments." },
    { title: "Europe's Door Access Control Goes Smart: Integrated Readers on the Rise", desc: "Residential new-builds are expected to recover gradually, supported by ongoing renovation activity and rising demand for integrated security solutions." },
  ],
  events: [
    { title: "Free Online Preview: Facility Services in Central and Eastern Europe 2026", desc: "Webinar with latest market tracking insights and practical recommendations.", date: "10/03/2026" },
    { title: "Free Online Preview: Facility Services in Italy 2026", desc: "Webinar covering current trends, opportunities and strategic implications.", date: "11/03/2026" },
  ],

  references: [
    { company: "Admonter", domain: "admonter.com", statement: "At the IC Impulsworkshop 'Sales Optimization' we appreciate not only the practical relevance, but also the eloquent language and the perfect rhetoric. The most important benefit for our company was the sales pipeline." },
    { company: "Österreichs Personaldienstleister", domain: "personaldienstleister.at", statement: "The sales management tool 'Jobs Intelligence' has become indispensable for fast and correct strategic management decisions as well as daily support for hot leads for the sales team." },
  ],
  additionalClients: [
    { name: "CISA",          domain: "cisa.com" },
    { name: "Citibank",      domain: "citibank.com" },
    { name: "Codex Partners",domain: "codex.partners" },
    { name: "Concentro",     domain: "concentro.com" },
  ],
}

const COMPETENCES = [
  { icon: BarChart2,  title: "Management Consulting", desc: "Tailor-made consulting solutions to optimise sales, pricing and strategic execution." },
  { icon: Search,     title: "Customer Insights",     desc: "Practical insight into customer needs, behaviour and market expectations." },
  { icon: TrendingUp, title: "Innovation Management", desc: "From trend detection to innovation priorities that create measurable growth." },
  { icon: Target,     title: "Big Data Tools",        desc: "Data-driven tools for structured market intelligence and decision support." },
  { icon: Users,      title: "Market Reports",        desc: "High-quality market reports worldwide with actionable and relevant findings." },
  { icon: Lightbulb,  title: "Industry Experience",   desc: "Deep sector expertise built through decades of projects and market research." },
]

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
    <p className="text-[10px] font-bold tracking-[0.32em] uppercase mb-4"
       style={{ color: light ? IC.blueLight : IC.blue }}>
      {children}
    </p>
  )
}

function SH({ children, light = false, className }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <h2
      className={`font-bold tracking-tight leading-[1.08] ${className ?? ""}`}
      style={{
        fontSize: "clamp(1.75rem,3.2vw,2.6rem)",
        color: light ? IC.white : IC.gray80,
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

export default function TemplateICBlueProfessional() {
  const [scrolled,   setScrolled]   = useState(false)
  const [scrollY,    setScrollY]    = useState(0)
  const [winH,       setWinH]       = useState(900)
  const [hovEdition, setHovEdition] = useState<number | null>(null)
  const [dot,        setDot]        = useState(0)
  const [heroReady,  setHeroReady]  = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setWinH(window.innerHeight)
    const fn = () => {
      setScrolled(window.scrollY > 60)
      setScrollY(window.scrollY)
    }
    const onResize = () => setWinH(window.innerHeight)
    window.addEventListener("scroll", fn, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("scroll", fn)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 180)
    return () => clearTimeout(t)
  }, [])

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
  // horizontal bridge: section 2 -> section 3 (What we do)
  const overviewHorizontal = clamp01((scrollY - winH * 0.92) / (winH * 0.70))
  // keep old names as aliases for rest of component
  const heroBridgeProgress = heroOut
  const sectionLeadIn = sectionIn

  return (
    <div className="min-h-screen" style={{ background: IC.white, color: IC.gray80 }}>

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
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-14"
        style={{
          paddingTop:    scrolled ? 13 : 20,
          paddingBottom: scrolled ? 13 : 20,
          background:    scrolled ? "rgba(255,255,255,0.92)" : "transparent",
          borderBottom:  scrolled ? `1px solid ${IC.blueXL}` : "1px solid transparent",
          backdropFilter: scrolled ? "blur(18px) saturate(1.6)" : "none",
          transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 flex items-center justify-center font-black text-[13px]"
            style={{ background: scrolled ? IC.blue : IC.white, color: scrolled ? IC.white : IC.blue, transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)" }}
          >
            IC
          </div>
          <span
            className="hidden sm:block text-[13px] font-bold"
            style={{ color: scrolled ? IC.blue : IC.white, transition: "color 0.45s cubic-bezier(0.22,1,0.36,1)" }}
          >
            Interconnection Consulting
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-[13px] font-medium">
          {["What we do", "Market Reports", "Industry Experience", "News", "Events", "About IC"].map(l => (
            <a
              key={l} href="#"
              className="transition-colors duration-300 hover:opacity-80"
              style={{ color: scrolled ? IC.gray80 : "rgba(255,255,255,0.85)" }}
            >
              {l}
            </a>
          ))}
        </div>
        <a
          href="#pricing"
          className="text-[13px] font-bold px-5 py-2.5 transition-all duration-300"
          style={{
            background: scrolled ? IC.blue : "rgba(255,255,255,0.14)",
            color: IC.white,
            border: `1px solid ${scrolled ? "transparent" : "rgba(255,255,255,0.45)"}`,
          }}
        >
          Contact us
        </a>
      </nav>

      {/* ═══ STICKY SCENE: hero + section 2 share one viewport-pinned stage ═══ */}
      <div style={{ position: "relative", height: "332vh" }}>

        {/* ── Layer 0: persistent background that NEVER changes color ── */}
        <div style={{ position: "sticky", top: 0, height: "100vh", background: IC.blueDark, zIndex: 0 }} />

      {/* ── HERO content layer ── */}
      <section className="relative overflow-hidden" style={{ position: "sticky", top: 0, height: "100vh", background: "transparent", display: "flex", flexDirection: "column", zIndex: 2, marginTop: "-100vh" }}>

        {/* Layer 1 — Photo (right half, slowest) */}
        <div
          className="hidden lg:block absolute right-0 top-0 bottom-0 pointer-events-none"
          style={{ width: "48%", overflow: "hidden" }}
        >
          <div style={{
            position: "absolute", inset: "-8% 0",
            transform: `translateY(${scrollY * 0.14}px) scale(1.08)`,
            transformOrigin: "center top",
            willChange: "transform",
            opacity: Math.max(0, 1 - heroOut * 1.6),
          }}>
            <Image src="/images/hero-light.jpg" alt={D.productName} fill className="object-cover" priority />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(30,74,134,0.96) 0%, rgba(30,74,134,0.60) 30%, rgba(30,74,134,0.12) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(20,44,90,0.25) 0%, rgba(20,44,90,0.55) 100%)" }} />
          </div>
        </div>

        {/* Layer 2 — Animated grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: Math.max(0, 1 - heroOut * 1.8) }}>
          <svg width="100%" height="100%" className="absolute inset-0" style={{ animation: "heroGridPulse 4s ease-in-out infinite", opacity: 0.55 }}>
            <defs>
              <pattern id="bpgrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(142,180,227,1)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bpgrid)" />
          </svg>
        </div>

        {/* Layer 3 — Content: flex-grow to fill viewport */}
        <div
          className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-6 lg:px-14"
          style={{
            paddingTop: 100,
            paddingBottom: 60,
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
            <div className="flex items-center gap-4 mb-8">
              <div
                className="h-px origin-left"
                style={{
                  width: 36,
                  background: IC.blueLight,
                  animation: heroReady ? "heroLineGrow 1.35s cubic-bezier(0.22,1,0.36,1) 0.36s both" : "none",
                }}
              />
              <p className="text-[9px] font-bold tracking-[0.45em] uppercase" style={{ color: "rgba(142,180,227,0.7)" }}>
                Interconnection Consulting
              </p>
            </div>
          </div>

          {/* H1 — refined scale */}
          <h1
            className="font-black"
            style={{ fontSize: "clamp(1.85rem,3.1vw,2.85rem)", lineHeight: 0.9, letterSpacing: "-0.03em", marginBottom: 0 }}
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

          {/* Thin accent line — draws in after title */}
          <div
            className="mt-5 mb-6 h-px origin-left"
            style={{
              width: 56,
              background: "rgba(142,180,227,0.45)",
              animation: heroReady ? "heroLineGrow 1.25s cubic-bezier(0.22,1,0.36,1) 0.82s both" : "none",
            }}
          />

          {/* Supporting copy and key highlights */}
          <div
            style={{
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "none" : "translateY(16px)",
              transition: "opacity 1s ease 1.05s, transform 1s cubic-bezier(0.22,1,0.36,1) 1.05s",
            }}
          >
            <p className="text-[13px] leading-[1.75] max-w-[480px] mb-7" style={{ color: "rgba(220,230,242,0.82)" }}>
              Consultants by passion and excellence. We help companies improve sales performance through industry knowledge, practical concepts and measurable tools.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                "14,889 market reports",
                "50+ industries",
                "35+ years experience",
              ].map((tag, i) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold px-3.5 py-1.5"
                  style={{
                    color: i === 0 ? IC.white : "rgba(220,230,242,0.9)",
                    background: i === 0 ? "rgba(142,180,227,0.24)" : "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(142,180,227,0.24)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA group */}
          <div
            style={{
              opacity:   heroReady ? 1 : 0,
              transform: heroReady ? "none" : "translateY(14px)",
              transition: "opacity 1.05s ease 0.95s, transform 1.05s cubic-bezier(0.22,1,0.36,1) 0.95s",
            }}
          >
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#overview"
                className="inline-flex items-center gap-3 text-[13px] font-bold px-6 py-3"
                style={{ color: IC.white, background: "rgba(142,180,227,0.2)", border: "1px solid rgba(142,180,227,0.45)" }}
              >
                Talk to our Experts <ArrowRight size={13} strokeWidth={2.5} />
              </a>
              <a
                href="#overview"
                className="inline-flex items-center gap-3 text-[13px] font-semibold"
                style={{ color: "rgba(220,230,242,0.92)" }}
                onMouseEnter={e => { const el = e.currentTarget.querySelector(".cta-ul") as HTMLElement; if (el) el.style.width = "100%" }}
                onMouseLeave={e => { const el = e.currentTarget.querySelector(".cta-ul") as HTMLElement; if (el) el.style.width = "0%" }}
              >
                <span style={{ position: "relative", paddingBottom: 2 }}>
                  Explore market reports
                  <span className="cta-ul" style={{ position: "absolute", bottom: 0, left: 0, height: "1px", width: "0%", background: "rgba(255,255,255,0.62)", transition: "width 0.45s cubic-bezier(0.22,1,0.36,1)" }} />
                </span>
                <ArrowRight size={13} strokeWidth={2.5} />
              </a>
            </div>
          </div>
            </div>{/* end left column */}

            {/* Right — stats panel (distinctly different from editorial image-only) */}
            <div
              className="hidden lg:grid grid-cols-2 gap-3"
              style={{
                opacity: (heroReady ? 1 : 0) * Math.max(0, 1 - heroRightOut * 1.35),
                transform: `translate3d(${heroRightOut * 52}px, ${heroRightOut * -8}px, 0)`,
                filter: `blur(${heroRightOut * 2}px)`,
                willChange: "transform, opacity, filter",
              }}
            >
              {[
                { value: "14,889",  label: "Market Reports",    sub: "in our library" },
                { value: "50+",     label: "Industries",        sub: "covered globally" },
                { value: "35+",     label: "Years Experience",  sub: "since 1988" },
                { value: "200+",    label: "Expert Interviews", sub: "per study" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    padding: "20px 22px",
                    background: i % 2 === 0 ? "rgba(255,255,255,0.07)" : "rgba(36,87,155,0.35)",
                    border: "1px solid rgba(142,180,227,0.18)",
                    animationDelay: `${0.7 + i * 0.1}s`,
                  }}
                >
                  <p className="font-black" style={{ fontSize: "clamp(1.6rem,2.8vw,2.2rem)", color: IC.white, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.value}</p>
                  <p className="text-[11px] font-bold mt-1" style={{ color: IC.blueLight }}>{s.label}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(220,230,242,0.5)" }}>{s.sub}</p>
                </div>
              ))}
            </div>

          </div>{/* end grid */}
        </div>{/* end content wrapper */}

        {/* Scroll indicator */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: scrollY > winH * 0.12 ? 0 : 1, transition: "opacity 0.8s ease" }}
        >
          <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.18)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, background: IC.blueLight, animation: "scrollBounce 1.8s ease-in-out infinite", height: "40%" }} />
          </div>
          <p className="text-[9px] tracking-[0.35em] uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>Scroll</p>
        </div>

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
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          background: "transparent",
          zIndex: 3,
          marginTop: "-100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          willChange: "transform, opacity",
          pointerEvents: Math.max(sectionLeftIn, sectionRightIn) < 0.05 ? "none" : "auto",
        }}
      >
        {/* White gradient to the right — horizontal transition */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `linear-gradient(to right, transparent 0%, rgba(255,255,255,0.12) 42%, ${IC.white} 100%)`,
          opacity: Math.max(0, (sectionLeftIn - 0.56) * 2.4),
        }} />

        <div className="relative w-full overflow-hidden" style={{ height: "100vh" }}>
          <div
            style={{
              display: "flex",
              width: "200vw",
              height: "100%",
              transform: `translate3d(${-overviewHorizontal * 100}vw, 0, 0)`,
              willChange: "transform",
            }}
          >
            {/* PANEL 1 — section 2 */}
            <div style={{ width: "100vw", flexShrink: 0, display: "flex", alignItems: "center" }}>
              <div className="max-w-7xl mx-auto px-6 lg:px-14 w-full relative z-10"
                style={{
                  paddingTop: 88,
                  paddingBottom: 42,
                  transform: `scale(${0.965 + Math.max(sectionLeftIn, sectionRightIn) * 0.035})`,
                  willChange: "transform",
                }}
              >
                <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">

            {/* Left — on dark bg */}
            <div
              style={{
                opacity: sectionLeftIn,
                transform: `translate3d(${(1 - sectionLeftIn) * -44}px, ${(1 - sectionLeftIn) * 14}px, 0)`,
                filter: `blur(${(1 - sectionLeftIn) * 2.2}px)`,
                willChange: "transform, opacity, filter",
              }}
            >
              <p className="text-[10px] font-bold tracking-[0.32em] uppercase mb-4" style={{ color: IC.blueLight }}>How we make our customers successful</p>
              <h2 className="font-bold tracking-tight leading-[1.08] mb-4" style={{ fontSize: "clamp(1.75rem,3.2vw,2.6rem)", color: IC.white, letterSpacing: "-0.015em" }}>
                Consultants by passion<br />and excellence!
              </h2>
              <div className="w-7 h-[2px] mb-8" style={{ background: "rgba(142,180,227,0.6)" }} />
              <p className="text-[13px] leading-[1.8] mb-10" style={{ color: "rgba(220,230,242,0.78)" }}>
                Interconnection Consulting provides worldwide since 1998 to our customers competitive advantages through valuable industry and market knowledge as well as through tailor-made concepts and tools in order to optimize sales processes, lead generation, pricing and customer satisfaction.
              </p>
              <div>
                <div className="flex items-center gap-0" style={{ borderBottom: `1.5px solid rgba(142,180,227,0.6)` }}>
                  <input readOnly placeholder="Industry Report Search"
                    className="flex-1 py-3 bg-transparent text-sm outline-none"
                    style={{ color: "rgba(220,230,242,0.7)" }}
                  />
                  <button className="flex items-center gap-1.5 px-3 py-3 text-[13px] font-bold shrink-0"
                    style={{ color: IC.blueLight }}>
                    Search <ArrowRight size={12} />
                  </button>
                </div>
              </div>
              <p className="mt-2.5 text-[11px]" style={{ color: "rgba(142,180,227,0.55)" }}>14,889 market reports worldwide</p>
            </div>

            {/* Right — CTA panel */}
            <div
              style={{
                opacity: sectionRightIn,
                transform: `translate3d(${(1 - sectionRightIn) * 56}px, ${(1 - sectionRightIn) * 12}px, 0)`,
                filter: `blur(${(1 - sectionRightIn) * 2.4}px)`,
                willChange: "transform, opacity, filter",
              }}
            >
              <div
                className="flex flex-col justify-between py-12 px-10"
                style={{
                  background: "linear-gradient(145deg, #1e4a86 0%, #24579B 72%)",
                  border: "1px solid rgba(142,180,227,0.2)",
                  boxShadow: "0 18px 60px rgba(23,53,95,0.23)",
                  animation: "panelDrift 9s ease-in-out infinite",
                }}
              >
                <div>
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: IC.blueLight }}>Contact us</p>
                  <h3 className="font-bold leading-[1.15] mb-12" style={{ fontSize: "clamp(1.4rem,2.8vw,1.75rem)", color: IC.white }}>
                    Do not hesitate<br />to contact us
                  </h3>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    {[
                      ["Contact Us", "#"],
                      ["Send inquiry", "#"],
                    ].map(([label, href]) => (
                      <a
                        key={label} href={href}
                        className="flex items-center justify-between py-4 text-[15px] font-medium"
                        style={{ color: IC.white, borderBottom: "1px solid rgba(255,255,255,0.1)", transition: "opacity 0.2s, transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}
                        onMouseEnter={e => {
                          e.currentTarget.style.opacity = "0.78"
                          e.currentTarget.style.transform = "translateX(6px)"
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.opacity = "1"
                          e.currentTarget.style.transform = "translateX(0)"
                        }}
                      >
                        {label}
                        <ArrowRight size={14} style={{ color: IC.blueLight, flexShrink: 0 }} />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  {[["14,889+", "Reports"], ["35+", "Years"], ["50+", "Analysts"]].map(([n, l]) => (
                    <div key={l}>
                      <p className="text-[22px] font-bold" style={{ color: IC.white }}>{n}</p>
                      <p className="text-[11px] mt-1" style={{ color: IC.blueLight }}>{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

                </div>{/* end grid */}
              </div>{/* end max-w wrapper panel 1 */}
            </div>

            {/* PANEL 2 — section 3 (What we do + cards) */}
            <div style={{ width: "100vw", flexShrink: 0, background: IC.white, display: "flex", alignItems: "center" }}>
              <div className="max-w-7xl mx-auto px-6 lg:px-14 w-full"
                style={{
                  transform: `translate3d(${(1 - overviewHorizontal) * -120}px, 0, 0)`,
                  opacity: 0.35 + overviewHorizontal * 0.65,
                  willChange: "transform, opacity",
                  paddingTop: 88,
                  paddingBottom: 42,
                }}
              >
                <div className="mb-8" style={{ position: "relative" }}>
                  <div style={{ height: 1, background: `linear-gradient(90deg, ${IC.blueXL} 0%, rgba(36,87,155,0.6) 45%, ${IC.blueXL} 100%)` }} />
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: 1,
                      width: `${22 + overviewHorizontal * 78}%`,
                      background: `linear-gradient(90deg, ${IC.blue} 0%, ${IC.blueLight} 100%)`,
                      transition: "width 0.25s ease",
                    }}
                  />
                </div>
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.32em] uppercase mb-4" style={{ color: IC.blue }}>What we do</p>
                    <h2 className="font-bold tracking-tight leading-[1.08]" style={{ fontSize: "clamp(2rem,3.6vw,3.2rem)", color: IC.gray80, letterSpacing: "-0.02em" }}>
                      Industry Experience<br />that creates value.
                    </h2>
                  </div>
                  <a href="#" className="hidden md:flex items-center gap-1.5 text-[13px] font-semibold pb-0.5"
                    style={{ color: IC.blue, borderBottom: `1px solid ${IC.blueLight}` }}>
                    All services <ArrowRight size={12} />
                  </a>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: IC.blueXL }}>
                  {COMPETENCES.map((c, i) => {
                    const Icon = c.icon
                    return (
                      <div
                        key={c.title}
                        className="relative flex flex-col p-6 overflow-hidden"
                        style={{ background: IC.white, minHeight: 180, transition: "background 0.35s ease, box-shadow 0.35s ease" }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = IC.surface
                          e.currentTarget.style.boxShadow = `inset 3px 0 0 ${IC.blue}`
                          const num = e.currentTarget.querySelector(".deco-num") as HTMLElement
                          if (num) num.style.color = IC.blueXL
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = IC.white
                          e.currentTarget.style.boxShadow = "none"
                          const num = e.currentTarget.querySelector(".deco-num") as HTMLElement
                          if (num) num.style.color = "transparent"
                        }}
                      >
                        <span
                          className="deco-num absolute top-4 right-5 font-black pointer-events-none select-none"
                          style={{ fontSize: "3.8rem", lineHeight: 1, color: "transparent", transition: "color 0.4s ease" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <Icon size={20} style={{ color: IC.blue, marginBottom: 16 }} />
                        <h3 className="text-[15px] font-bold mb-2" style={{ color: IC.gray80 }}>{c.title}</h3>
                        <p className="text-sm leading-relaxed flex-1" style={{ color: IC.gray60 }}>{c.desc}</p>
                        <a href="#" className="inline-flex items-center gap-1.5 text-[12px] font-bold mt-5" style={{ color: IC.blue }}>
                          Explore <ArrowRight size={11} />
                        </a>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>{/* end sticky scene */}

      {/* NEWS & EVENTS */}
      <section className="py-24 lg:py-32" style={{ background: IC.white }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Fade>
            <Label>IC News</Label>
            <ParaTitle className="mb-4">Don't miss any Industry Trends</ParaTitle>
            <Rule />
          </Fade>
          <div className="grid lg:grid-cols-2 gap-16 mt-4">

            {/* Press */}
            <div>
              <Fade>
                <h3 className="text-[13px] font-bold pb-5 mb-8 tracking-widest uppercase"
                  style={{ color: IC.gray80, borderBottom: `2px solid ${IC.blue}` }}>
                  IC News
                </h3>
              </Fade>
              {D.press.map((p, idx) => (
                <Fade key={idx} delay={idx * 0.1}>
                  <div className="pb-8 mb-8" style={{ borderBottom: `1px solid ${IC.blueXL}` }}>
                    <h4 className="text-[15px] font-semibold mb-2" style={{ color: IC.gray80 }}>{p.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: IC.gray60 }}>{p.desc}</p>
                  </div>
                </Fade>
              ))}
            </div>

            {/* Events */}
            <div>
              <Fade delay={0.05}>
                <h3 className="text-[13px] font-bold pb-5 mb-8 tracking-widest uppercase"
                  style={{ color: IC.gray80, borderBottom: `2px solid ${IC.blue}` }}>
                  Keep in touch with our events
                </h3>
              </Fade>
              {D.events.map((e, idx) => (
                <Fade key={idx} delay={idx * 0.1}>
                  <div className="pb-8 mb-8" style={{ borderBottom: `1px solid ${IC.blueXL}` }}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="text-[15px] font-semibold" style={{ color: IC.gray80 }}>{e.title}</h4>
                      <span className="text-[10px] font-bold px-2.5 py-1 shrink-0 tracking-wide" style={{ background: IC.blueXL, color: IC.blue }}>{e.date}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: IC.gray60 }}>{e.desc}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REFERENCES */}
      <section className="py-24 lg:py-32" style={{ background: IC.offWhite }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Fade>
            <Label>References</Label>
            <ParaTitle className="mb-4">Leading Companies trust in Interconnection Consulting</ParaTitle>
            <Rule />
          </Fade>

          <div className="flex flex-col gap-12 mb-16 mt-4">
            {D.references.map((ref, idx) => (
              <Fade key={idx} delay={idx * 0.1}>
                <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 items-center p-10"
                  style={{
                    border: `1.5px solid ${IC.blueXL}`,
                    background: IC.white,
                    transition: "box-shadow 0.3s ease",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 10px 32px rgba(36,87,155,0.09)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                >
                  <div className="flex justify-center">
                    <div className="flex items-center justify-center p-8"
                      style={{ width: 200, height: 120, background: IC.white, border: `1.5px solid ${IC.blueXL}`, flexShrink: 0 }}>
                      <img
                        src={`https://logo.clearbit.com/${ref.domain}`}
                        alt={ref.company}
                        style={{ maxWidth: 130, maxHeight: 60, objectFit: "contain", filter: "grayscale(0%)" }}
                        onError={e => {
                          e.currentTarget.style.display = "none"
                          if (e.currentTarget.nextElementSibling) (e.currentTarget.nextElementSibling as HTMLElement).style.display = "block"
                        }}
                      />
                      <span className="hidden text-sm font-bold text-center" style={{ color: IC.gray80 }}>{ref.company}</span>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div style={{ fontSize: "5rem", lineHeight: 0.8, color: IC.blueXL, fontFamily: "Georgia, serif", marginBottom: 12 }}>&ldquo;</div>
                    <p className="text-[17px] leading-relaxed font-light" style={{ color: IC.gray80 }}>{ref.statement}</p>
                    <p className="mt-5 text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: IC.blueLight }}>{ref.company}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>

          <Fade delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {D.additionalClients.map((c) => (
                <div key={c.name} className="flex items-center justify-center p-6"
                  style={{ height: 76, background: IC.white, border: `1.5px solid ${IC.blueXL}` }}>
                  <img
                    src={`https://logo.clearbit.com/${c.domain}`}
                    alt={c.name}
                    style={{ maxWidth: 110, maxHeight: 40, objectFit: "contain", filter: "grayscale(100%)", opacity: 0.75 }}
                    onError={e => {
                      e.currentTarget.style.display = "none"
                      if (e.currentTarget.nextElementSibling) (e.currentTarget.nextElementSibling as HTMLElement).style.display = "block"
                    }}
                  />
                  <span className="hidden text-xs font-semibold" style={{ color: IC.gray80 }}>{c.name}</span>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-14 px-6 lg:px-14" style={{ background: IC.blue }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center font-black text-[13px]" style={{ background: IC.white, color: IC.blue }}>IC</div>
              <span className="text-sm font-bold" style={{ color: IC.white }}>Interconnection Consulting</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: IC.blueLight }}>
              Market intelligence for the building materials & construction industry since 1989.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: IC.blueLight }}>Quick Links</p>
            {["About IC", "Reports & Studies", "Consulting", "Contact"].map(l => (
              <a key={l} href="#" className="block text-sm mb-2" style={{ color: IC.white, opacity: 0.85 }}>{l}</a>
            ))}
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: IC.blueLight }}>Contact</p>
            <p className="text-sm leading-relaxed" style={{ color: IC.white, opacity: 0.85 }}>
              Getreidemarkt 1, 1060 Vienna<br />
              +43 1 585 47 10<br />
              office@interconnection.at
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6" style={{ borderTop: `1px solid rgba(142,180,227,0.3)` }}>
          <p className="text-xs" style={{ color: IC.blueLight }}>© 2026 Interconnection Consulting GmbH · All rights reserved</p>
        </div>
      </footer>

    </div>
  )
}
