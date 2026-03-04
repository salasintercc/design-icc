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
  productName:  "Windows",
  regionName:   "Austria",
  productTypes: ["Market Analysis", "Competition Analysis", "Market Forecast", "Company Profiles"],

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
    { title: "Austrian Construction Market Rebounds in Q4 2025", desc: "New building permits rose 12% year-on-year, signaling positive outlook for window manufacturers." },
    { title: "EU Energy Directive Reshapes Window Standards",     desc: "Upcoming EU regulations set to increase minimum energy performance requirements from 2026 onwards." },
  ],
  events: [
    { title: "Fensterbau Frontale 2026", desc: "World's leading trade fair for windows, doors and façades.", date: "18–21 March 2026" },
    { title: "BAU Munich 2027",          desc: "International trade fair for architecture, materials and systems.", date: "January 2027" },
  ],

  references: [
    { company: "Saint-Gobain",       domain: "saint-gobain.com",       statement: "The IC report on the Austrian window market gave us exactly the intelligence needed to plan our distribution expansion. The data quality and depth of analysis is unmatched in the industry." },
    { company: "Schneider Electric", domain: "schneider-electric.com",  statement: "Interconnection Consulting’s research is our go-to source when entering new European markets. Their competitive intelligence cuts months off our strategy cycles." },
  ],
  additionalClients: [
    { name: "Salamander",     domain: "salamander.de"    },
    { name: "ELK Fertighaus", domain: "elk.at"           },
    { name: "Kontron",        domain: "kontron.com"      },
    { name: "Rehau",          domain: "rehau.com"        },
  ],
}

const COMPETENCES = [
  { icon: BarChart2,  title: "Market Reports",           desc: "In-depth industry and regional analyses covering market size, trends and competitive dynamics." },
  { icon: Search,     title: "Competitive Intelligence", desc: "Map competitor positioning, benchmark performance and identify white spaces." },
  { icon: TrendingUp, title: "Pricing Intelligence",     desc: "Data-driven pricing strategies to optimise margins and respond to market shifts." },
  { icon: Target,     title: "Lead Generation",          desc: "Identify and reach high-value prospects with verified, segmented market data." },
  { icon: Users,      title: "Customer Insights",        desc: "Understand buyer behaviour, satisfaction drivers and churn risk across segments." },
  { icon: Lightbulb,  title: "Strategic Consulting",     desc: "Expert advisory services to turn market intelligence into decisive business action." },
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
      transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      willChange: "opacity, transform",
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
  return <div className="w-7 h-[2px] mt-1 mb-8" style={{ background: light ? "rgba(255,255,255,0.28)" : IC.blue }} />
}

export default function TemplateICBlueProfessional() {
  const [scrolled,   setScrolled]   = useState(false)
  const [scrollY,    setScrollY]    = useState(0)
  const [hovEdition, setHovEdition] = useState<number | null>(null)
  const [dot,        setDot]        = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60)
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const onSliderScroll = useCallback(() => {
    if (!sliderRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    const idx = Math.round((scrollLeft / (scrollWidth - clientWidth)) * (COMPETENCES.length - 1))
    setDot(Math.min(Math.max(idx, 0), COMPETENCES.length - 1))
  }, [])

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
          {["Reports & Tools", "Our Competences", "Shop", "News", "Events", "About"].map(l => (
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
          Buy Report
        </a>
      </nav>

      {/* HERO */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "92vh" }}>
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.2}px)`, willChange: "transform" }}
        >
          <Image
            src="/images/hero-light.jpg"
            alt={`${D.productName} in ${D.regionName}`}
            fill className="object-cover" priority
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(105deg, rgba(30,74,134,0.96) 0%, rgba(36,87,155,0.80) 48%, rgba(36,87,155,0.10) 100%)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px]"
          style={{ background: "linear-gradient(90deg, #8EB4E3, transparent)" }}
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-14 pb-24 pt-36">
          <Fade>
            <p className="text-[10px] font-bold tracking-[0.35em] uppercase mb-7" style={{ color: IC.blueLight }}>
              Interconnection Consulting · Market Study
            </p>
          </Fade>
          <Fade delay={0.12}>
            <h1
              className="font-bold tracking-tight leading-[0.95]"
              style={{ fontSize: "clamp(3.2rem,8vw,6rem)", color: IC.white, letterSpacing: "-0.02em" }}
            >
              {D.productName}
            </h1>
            <h1
              className="font-bold tracking-tight leading-[0.95] mb-6"
              style={{ fontSize: "clamp(3.2rem,8vw,6rem)", color: IC.blueLight, letterSpacing: "-0.02em" }}
            >
              in {D.regionName}
            </h1>
          </Fade>
          <Fade delay={0.22}>
            <p className="text-sm md:text-[15px] font-medium mb-12" style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em" }}>
              {D.productTypes.join("  ·  ")}
            </p>
          </Fade>
          <Fade delay={0.32}>
            <div className="flex flex-wrap gap-3">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[13px] font-bold"
                style={{ background: IC.white, color: IC.blue }}
              >
                <ShoppingCart size={14} /> Buy Report
              </a>
              <a
                href="#overview"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[13px] font-semibold"
                style={{ border: "1px solid rgba(255,255,255,0.38)", color: IC.white }}
              >
                View Details <ArrowRight size={13} />
              </a>
            </div>
          </Fade>
        </div>
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ opacity: scrollY > 60 ? 0 : 1, transition: "opacity 0.5s ease", pointerEvents: "none" }}
        >
          <ArrowDown size={16} style={{ color: IC.blueLight, animation: "scrollBounce 1.8s ease-in-out infinite" }} />
        </div>
      </section>

      {/* FROM DATA TO DECISIONS */}
      <section id="overview" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: IC.white }}>
        <div
          className="absolute -top-14 -left-20 w-[18rem] h-[18rem] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(36,87,155,0.14) 0%, rgba(36,87,155,0) 70%)",
            filter: "blur(8px)",
            animation: "floatOrb 8.5s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-16 right-[-2rem] w-[20rem] h-[20rem] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(142,180,227,0.18) 0%, rgba(142,180,227,0) 72%)",
            filter: "blur(10px)",
            animation: "floatOrb 10s ease-in-out infinite",
            animationDelay: "-2s",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-14 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">

            {/* Left */}
            <Fade>
              <Label>Strategy &amp; Intelligence</Label>
              <SH className="mb-4">From data to<br />decisions—fast.</SH>
              <Rule />
              <p className="text-base leading-[1.8] mb-10" style={{ color: IC.gray60 }}>
                We combine market reports, competitive intelligence, and tailored consulting to improve lead generation, pricing, and customer satisfaction.
              </p>
              {/* Minimal search */}
              <div>
                <div className="flex items-center gap-0" style={{ borderBottom: `1.5px solid ${IC.blue}` }}>
                  <input
                    readOnly placeholder="Search by industry + region…"
                    className="flex-1 py-3 bg-transparent text-sm outline-none"
                    style={{ color: IC.gray60 }}
                  />
                  <button
                    className="flex items-center gap-1.5 px-3 py-3 text-[13px] font-bold shrink-0"
                    style={{ color: IC.blue, transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "translateX(3px)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "translateX(0)")}
                  >
                    Search <ArrowRight size={12} />
                  </button>
                </div>
                <div className="origin-left mt-1 h-[2px] w-20" style={{ background: IC.blueLight, animation: "linePulse 2.4s ease-in-out infinite" }} />
              </div>
              <p className="mt-2.5 text-[11px]" style={{ color: IC.gray50 }}>14,889+ reports across 50+ industries &amp; regions</p>
            </Fade>

            {/* Right — CTA panel */}
            <Fade delay={0.15} variant="right">
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
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6" style={{ color: IC.blueLight }}>Get in Touch</p>
                  <h3 className="font-bold leading-[1.15] mb-12" style={{ fontSize: "clamp(1.4rem,2.8vw,1.75rem)", color: IC.white }}>
                    Ready to make<br />smarter decisions?
                  </h3>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    {[
                      ["Contact Us", "#"],
                      ["Request a Sample Form", "#"],
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
            </Fade>

          </div>

          {/* Competences Grid */}
          <div className="mt-24 lg:mt-32 pt-16" style={{ borderTop: `1px solid ${IC.blueXL}` }}>
            <Fade>
              <div className="flex items-end justify-between mb-14">
                <div>
                  <Label>Our Competences</Label>
                  <SH className="mb-0">Intelligence<br />that drives growth.</SH>
                </div>
                <a href="#" className="hidden md:flex items-center gap-1.5 text-[13px] font-semibold pb-0.5"
                  style={{ color: IC.blue, borderBottom: `1px solid ${IC.blueLight}` }}>
                  All services <ArrowRight size={12} />
                </a>
              </div>
            </Fade>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: IC.blueXL }}>
              {COMPETENCES.map((c, i) => {
                const Icon = c.icon
                return (
                  <Fade key={c.title} delay={i * 0.07}>
                    <div
                      className="relative flex flex-col p-8 overflow-hidden"
                      style={{ background: IC.white, minHeight: 240, transition: "background 0.35s ease, box-shadow 0.35s ease" }}
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
                        style={{ fontSize: "4.5rem", lineHeight: 1, color: "transparent", transition: "color 0.4s ease" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon size={22} style={{ color: IC.blue, marginBottom: 20 }} />
                      <h3 className="text-[15px] font-bold mb-3" style={{ color: IC.gray80 }}>{c.title}</h3>
                      <p className="text-sm leading-relaxed flex-1" style={{ color: IC.gray60 }}>{c.desc}</p>
                      <a href="#" className="inline-flex items-center gap-1.5 text-[12px] font-bold mt-6"
                        style={{ color: IC.blue }}>
                        Explore <ArrowRight size={11} />
                      </a>
                    </div>
                  </Fade>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SHOP / PRICING */}
      <section id="pricing" className="py-24 lg:py-32" style={{ background: IC.surface }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Fade>
            <Label>Shop</Label>
            <SH className="mb-4">Get Your Report Today</SH>
            <Rule />
          </Fade>

          <div className="flex flex-col gap-4 mb-16">
            {D.editions.map((ed, idx) => (
              <Fade key={ed.name} delay={idx * 0.1}>
                <div
                  className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8"
                  style={{
                    border: `1.5px solid ${hovEdition === idx ? IC.blueLight : (ed.highlight ? IC.blue : IC.blueXL)}`,
                    background: hovEdition === idx ? IC.white : (ed.highlight ? IC.blueXL : IC.white),
                    transition: "border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: hovEdition === idx ? "0 8px 28px rgba(36,87,155,0.10)" : "none",
                  }}
                  onMouseEnter={() => setHovEdition(idx)}
                  onMouseLeave={() => setHovEdition(null)}
                >
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2.5" style={{ color: IC.blueLight }}>
                      {D.productName} in {D.regionName}
                    </p>
                    <h3 className="text-[17px] font-bold mb-2" style={{ color: IC.gray80 }}>{ed.name}</h3>
                    <p className="text-xs flex items-center gap-1.5" style={{ color: IC.gray50 }}>
                      <FileText size={12} /> PDF + Excel download included
                    </p>
                  </div>
                  <div className="flex items-center gap-5 flex-shrink-0 flex-wrap">
                    <span className="text-2xl font-bold" style={{ color: IC.blue }}>{ed.price}</span>
                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-bold whitespace-nowrap" style={{ background: IC.blue, color: IC.white }}>
                      <ShoppingCart size={14} /> Buy Now
                    </a>
                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-semibold whitespace-nowrap"
                      style={{ border: `1.5px solid ${IC.blue}`, color: IC.blue }}>
                      <Download size={14} /> Request Offer
                    </a>
                  </div>
                </div>
              </Fade>
            ))}
          </div>

          {/* Other regions */}
          <Fade>
            <p className="text-[10px] font-bold tracking-[0.32em] uppercase mb-5" style={{ color: IC.gray80 }}>
              {D.productName} — Other Available Regions
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {D.otherRegions.map(r => (
                <div key={r.name} className="p-4"
                  style={{ border: `1.5px solid ${r.available ? IC.blueXL : "#E8EBF0"}`, background: r.available ? IC.white : IC.offWhite }}>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: r.available ? IC.gray80 : IC.grayLight }}>{r.name}</p>
                  <p className="text-[11px]" style={{ color: r.available ? IC.blue : IC.grayLight }}>{r.status}</p>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* NEWS & EVENTS */}
      <section className="py-24 lg:py-32" style={{ background: IC.white }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Fade>
            <Label>News &amp; Events</Label>
            <SH className="mb-4">Industry News &amp; Events</SH>
            <Rule />
          </Fade>
          <div className="grid lg:grid-cols-2 gap-16 mt-4">

            {/* Press */}
            <div>
              <Fade>
                <h3 className="text-[13px] font-bold pb-5 mb-8 tracking-widest uppercase"
                  style={{ color: IC.gray80, borderBottom: `2px solid ${IC.blue}` }}>
                  Latest Press &amp; Research
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
                  Upcoming Events
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
            <SH className="mb-4">What Our Clients Say</SH>
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
              Getreidemarkt 1, 1060 Vienna, Austria<br />
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
