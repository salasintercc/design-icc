"use client"

/**
 * TEMPLATE 6 — IC Editorial
 * Market Research Product Detail Page
 * Sections: Hero → Description → Trends → Shop → Players → FAQ → Subscription → Clients → Related → News & Events
 * Design: Editorial full-width · Large decorative numbers · White + blueXL backgrounds · IC Blue as refined accent
 */

import { ArrowRight, ShoppingCart, Download, FileText, ArrowUpRight, ChevronLeft, ChevronRight, BarChart2, Search, TrendingUp, Target, Users, Lightbulb } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

const IC = {
  blue:      "#24579B",
  blueDark:  "#376092",
  blueLight: "#8EB4E3",
  blueXL:    "#DCE6F2",
  gray80:    "#4D4D4D",
  gray50:    "#7F7F7F",
  grayLight: "#C2C2C2",
  white:     "#FFFFFF",
  offWhite:  "#F5F8FC",
}

const D = {
  productName:  "Defining Growth Potential",
  regionName:   "Since 1998",
  productTypes: ["Industry knowledge", "Concepts & tools", "Lead generation", "Pricing optimisation"],

  descTitle: "How we make our customers successful",
  descText:  "Consultants by passion and excellence! Interconnection Consulting provides worldwide since 1998 to our customers competitive advantages through valuable industry and market knowledge as well as through tailor-made concepts and tools in order to optimize sales processes, lead generation, pricing and customer satisfaction.",

  trendTitle: "IC News - Don't miss any Industry Trends",
  trendText:  "After two years of decline, key industrial markets are starting to grow again, driven by increasing renovation projects and a solid level of new investments.",

  editions: [
    { name: "Standard Edition 2025",                    price: "€2,490" },
    { name: "Premium Edition 2025 (incl. data tables)", price: "€3,990" },
  ],
  otherRegions: [
    { name: "Germany",        status: "Available",  available: true  },
    { name: "Switzerland",    status: "Available",  available: true  },
    { name: "Czech Republic", status: "Available",  available: true  },
    { name: "Poland",         status: "Q2 2026",    available: false },
    { name: "Hungary",        status: "Q3 2026",    available: false },
    { name: "Romania",        status: "On Request", available: false },
  ],

  players: ["Admonter", "CISA", "Citibank", "Codex Partners", "Concentro", "Conex", "CRH", "Deceuninck"],

  faqs: [
    { q: "What methodology is used in this report?",      a: "Our research combines primary data from 200+ interviews with manufacturers, distributors and end-users with secondary data analysis and our proprietary database of 14,000+ market studies." },
    { q: "Is the data available as a downloadable file?", a: "Yes. All quantitative data tables are available as Excel files. Premium editions include fully editable data models with forecasting capabilities." },
    { q: "Can the report be customized for our needs?",   a: "We offer custom research projects tailored to your specific requirements. Contact our research team for a tailored proposal and pricing." },
    { q: "How current is the data in this report?",       a: "The 2025 edition incorporates data through Q3 2025, with preliminary estimates for Q4 2025. Forecasts extend to 2030." },
  ],

  subText:  "Keep in touch with our events and get the most up-to-date market data, industry sales and marketing concepts as well as praxis relevant tools.",
  benefits: [
    { title: "Unlimited Downloads", text: "Access our complete report library including all updates and future editions." },
    { title: "Priority Research",   text: "Commission custom research at preferential subscriber rates." },
    { title: "Market Alerts",       text: "Real-time notifications for new publications in your tracked markets." },
    { title: "Analyst Access",      text: "Direct consultation with our team of 50+ industry specialists." },
  ],

  clientQuote: "At the IC Impulsworkshop 'Sales Optimization' we appreciate not only the practical relevance, but also the eloquent language and the perfect rhetoric.",
  clientName:  "Adrian Capellari, Head of Sales, Admonter Holzindustrie",
  clients:     ["Admonter", "Österreichs Personaldienstleister", "CISA", "Citibank", "Codex Partners", "Concentro"],

  related: ["Management Consulting", "Customer Insights", "Innovation Management", "Big Data Tools", "Market Reports", "Industry Experience", "Lead Generation", "Pricing"],

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

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function Fade({ children, className, style, delay = 0 }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; delay?: number }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px) scale(0.985)",
        filter: visible ? "blur(0px)" : "blur(4px)",
        transition: `opacity 0.78s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.78s cubic-bezier(0.22,1,0.36,1) ${delay}s, filter 0.78s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </div>
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

function ParaH2({ children, speed = 0.06, className, style }: {
  children: React.ReactNode; speed?: number; className?: string; style?: React.CSSProperties
}) {
  const { ref, offset } = useParallax(speed)
  return (
    <div ref={ref} style={{ transform: `translateY(${offset}px)`, willChange: "transform" }}>
      <h2 className={className} style={style}>{children}</h2>
    </div>
  )
}

// Drop: headings descend into place (editorial weight — opposite of Fade)
function Drop({ children, className, style, delay = 0 }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; delay?: number }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(-22px)",
      filter: visible ? "blur(0px)" : "blur(3px)",
      transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, filter 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      willChange: "opacity, transform, filter",
    }}>
      {children}
    </div>
  )
}

// SectionReveal: whole-section lift with strong Y + heading parallax
function SectionReveal({ children, className, style, delay = 0 }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; delay?: number }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(64px)",
      transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      willChange: "opacity, transform",
    }}>
      {children}
    </div>
  )
}

export default function TemplateICEditorial() {
  const [scrolled,  setScrolled]  = useState(false)
  const [scrollY,   setScrollY]   = useState(0)
  const [heroReady, setHeroReady] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 50); setScrollY(window.scrollY) }
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])
  useEffect(() => { const t = setTimeout(() => setHeroReady(true), 80); return () => clearTimeout(t) }, [])

  return (
    <div className="min-h-screen" style={{ background: IC.white, color: IC.gray80 }}>

      <style>{`
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
        @keyframes edHeroIn {
          from { opacity: 0; transform: translateY(28px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0);   filter: blur(0px); }
        }
        @keyframes edDecoIn {
          from { opacity: 0; transform: translateX(-30px) rotate(-3deg); }
          to   { opacity: 1; transform: translateX(0)    rotate(-3deg); }
        }
        @keyframes edLineIn {
          from { transform: scaleY(0); opacity: 0; }
          to   { transform: scaleY(1); opacity: 1; }
        }
        @keyframes edImgReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
      `}</style>

      {/* NAVBAR — Clean minimal */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-16"
        style={{
          paddingTop: 16, paddingBottom: 16,
          background: scrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.92)",
          borderBottom: `1px solid ${scrolled ? IC.blueXL : "rgba(220,230,242,0.5)"}`,
          backdropFilter: "blur(16px)",
          transition: "border-color 0.4s ease, background 0.4s ease",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 flex items-center justify-center font-black text-[11px]" style={{ background: IC.blue, color: IC.white }}>IC</div>
          <span className="hidden sm:block text-[13px] font-semibold" style={{ color: IC.gray80, letterSpacing: "-0.01em" }}>Interconnection Consulting</span>
        </div>
        <div className="hidden lg:flex items-center gap-9">
          {["What we do", "Market Reports", "Industry Experience", "News", "Events", "About IC"].map(l => (
            <a key={l} href="#"
              className="text-[11px] font-medium transition-colors duration-200"
              style={{ color: IC.gray50, letterSpacing: "0.02em" }}
              onMouseEnter={e => (e.currentTarget.style.color = IC.blue)}
              onMouseLeave={e => (e.currentTarget.style.color = IC.gray50)}
            >{l}</a>
          ))}
        </div>
        <a href="#overview"
          className="inline-flex items-center gap-2 text-[12px] font-bold px-5 py-2.5"
          style={{ background: IC.blue, color: IC.white }}
        >
          Contact us <ArrowRight size={12} />
        </a>
      </nav>

      {/* ── HERO — Editorial Parallax ──────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: IC.white, minHeight: "100vh" }}>

        {/* Layer A — Large circle outline, depth 1 (slowest) */}
        <div className="absolute select-none pointer-events-none" style={{
          top: "-18%", left: "-16%",
          width: "clamp(400px, 70vw, 820px)", height: "clamp(400px, 70vw, 820px)",
          borderRadius: "50%",
          border: "1px solid rgba(36,87,155,0.055)",
          transform: `translateY(${scrollY * 0.08}px)`,
          willChange: "transform",
        }} />


        {/* Right image panel — clip-reveal on load, drifts up on scroll */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0" style={{ width: "44%", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: "-10% 0",
            transform: `translateY(${scrollY * 0.14}px) scale(1.1)`,
            transformOrigin: "center top",
            willChange: "transform",
            animation: heroReady ? "edImgReveal 1.1s cubic-bezier(0.77,0,0.18,1) 0.25s both" : "none",
          }}>
            <Image src="/images/hero-light.jpg" alt={D.productName} fill className="object-cover" priority />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.55) 0%, transparent 28%, transparent 100%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 52%, rgba(36,87,155,0.14) 100%)" }} />
          </div>
          {/* Left-edge accent line */}
          <div style={{
            position: "absolute", left: 0, top: "8%", width: 2, height: "84%",
            background: `linear-gradient(to bottom, transparent, ${IC.blue}, transparent)`,
            transformOrigin: "top",
            animation: heroReady ? "edLineIn 1s cubic-bezier(0.22,1,0.36,1) 0.65s both" : "none",
          }} />
        </div>

        {/* Text content — each group has its own parallax depth */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16" style={{ paddingTop: 148, paddingBottom: 88 }}>
          <div className="lg:max-w-[55%]">

            {/* Category label */}
            <div style={{
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "none" : "translateY(10px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s",
              marginBottom: 26,
            }}>
              <p className="text-[10px] font-bold tracking-[0.38em] uppercase" style={{ color: IC.blue }}>
                Interconnection Consulting
              </p>
            </div>

            {/* H1 — counter-parallax depth, CSS transition reveal tied to heroReady */}
            <div style={{ transform: `translateY(${scrollY * -0.07}px)`, willChange: "transform" }}>
              <h1 style={{ fontSize: "clamp(3.4rem,7.2vw,6.2rem)", lineHeight: 0.94, letterSpacing: "-0.026em", marginBottom: 0 }}>
                <span style={{
                  display: "block", color: IC.gray80, fontWeight: 900,
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "none" : "translateY(24px)",
                  transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s",
                }}>{D.productName}</span>
                <span style={{
                  display: "block", color: IC.blue, fontWeight: 300, fontStyle: "italic", paddingLeft: "0.1em",
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "none" : "translateY(24px)",
                  transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1) 0.32s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.32s",
                }}>{D.regionName}</span>
              </h1>
            </div>

            {/* Rule — medium depth */}
            <div style={{ transform: `translateY(${scrollY * -0.05}px)`, willChange: "transform" }}>
              <div className="my-8 origin-left" style={{
                height: 1, width: "100%",
                background: `linear-gradient(90deg, ${IC.blue} 0%, ${IC.blueXL} 100%)`,
                transform: heroReady ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 1s cubic-bezier(0.22,1,0.36,1) 0.62s",
              }} />
            </div>

            {/* Subtitle + CTAs — barely moves */}
            <div style={{ transform: `translateY(${scrollY * -0.02}px)`, willChange: "transform" }}>
              <div style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "none" : "translateY(14px)", transition: "opacity 0.7s ease 0.68s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.68s" }}>
                <div className="flex items-start gap-6 mb-10">
                  <div style={{ width: 2, minHeight: 52, background: IC.blue, flexShrink: 0, marginTop: 4 }} />
                  <p className="text-base leading-[1.75]" style={{ color: IC.gray50, maxWidth: 420 }}>
                    Talk to our Experts
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <a href="#overview" className="inline-flex items-center gap-2.5 text-[13px] font-bold px-7 py-3.5" style={{ background: IC.blue, color: IC.white }}>
                    Contact us <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div style={{ height: 1, background: IC.blueXL, position: "relative", zIndex: 10 }} />
      </section>

      {/* ── SECTION 2 — FROM DATA TO DECISIONS ────────────────────────── */}
      <section id="overview" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: IC.offWhite }}>
        {/* Section number */}
        <div className="absolute top-12 right-8 select-none pointer-events-none" style={{ fontSize: "clamp(5rem,10vw,9rem)", fontWeight: 900, lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(36,87,155,0.06)", letterSpacing: "-0.04em" }}>02</div>
        {/* Left edge accent */}
        <div className="absolute left-0 top-16 bottom-16" style={{ width: 3, background: `linear-gradient(to bottom, transparent, ${IC.blue}, transparent)` }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left */}
            <div>
              <Drop>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: IC.blue }}>How we make our customers successful</p>
              </Drop>
              <Drop delay={0.06}>
                <ParaH2 className="font-bold tracking-tight leading-[1.05] mb-8" style={{ fontSize: "clamp(2.2rem,5vw,3.6rem)", color: IC.gray80, letterSpacing: "-0.02em" }}>
                  Consultants by passion<br />and <em style={{ fontStyle: "italic", fontWeight: 300, color: IC.blueDark }}>excellence!</em>
                </ParaH2>
              </Drop>
              <SectionReveal delay={0.12}>
              <p className="text-base leading-[1.85] mb-10" style={{ color: IC.gray50 }}>
                {D.descText}
              </p>
              {/* Minimal search */}
              <div>
                <div className="flex items-center" style={{ borderBottom: `1.5px solid ${IC.blue}` }}>
                  <input
                    readOnly
                    placeholder="Industry Report Search"
                    className="flex-1 py-3 bg-transparent text-sm outline-none"
                    style={{ color: IC.gray50 }}
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
              <p className="mt-2.5 text-[11px]" style={{ color: IC.gray50 }}>14,889 market reports worldwide</p>
              </SectionReveal>
            </div>

            {/* Right — CTA panel */}
            <Fade delay={0.15}>
              <div
                className="flex flex-col justify-between py-12 px-10"
                style={{
                  background: "linear-gradient(145deg, #2d588f 0%, #376092 72%)",
                  border: "1px solid rgba(142,180,227,0.2)",
                  boxShadow: "0 18px 60px rgba(23,53,95,0.2)",
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
            </Fade>

          </div>

          {/* Competences Grid */}
          <div className="mt-16 lg:mt-20 relative">
            {/* Section number */}
            <div className="absolute -top-6 right-0 select-none pointer-events-none" style={{ fontSize: "clamp(5rem,10vw,9rem)", fontWeight: 900, lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(142,180,227,0.18)", letterSpacing: "-0.04em" }}>03</div>
            <div className="-mx-6 lg:-mx-16 px-6 lg:px-16 py-16 lg:py-20" style={{ background: IC.blueDark }}>
              <Drop>
                <div className="flex items-end justify-between mb-14">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: IC.blueLight }}>What we do</p>
                    <ParaH2 className="font-bold tracking-tight mb-0" style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", color: IC.white, lineHeight: 1.1 }}>
                      Industry Experience<br />that creates value.
                    </ParaH2>
                  </div>
                  <a href="#" className="hidden md:flex items-center gap-1.5 text-[13px] font-semibold pb-0.5"
                    style={{ color: IC.blueLight, borderBottom: "1px solid rgba(142,180,227,0.4)" }}>
                    All services <ArrowRight size={12} />
                  </a>
                </div>
              </Drop>
              <SectionReveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.08)" }}>
                {COMPETENCES.map((c, i) => {
                  const Icon = c.icon
                  return (
                    <Fade key={c.title} delay={i * 0.07}>
                      <div
                        className="relative flex flex-col p-8 overflow-hidden"
                        style={{ background: IC.blueDark, minHeight: 240, transition: "background 0.35s ease, box-shadow 0.35s ease" }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.06)"
                          e.currentTarget.style.boxShadow = `inset 3px 0 0 ${IC.blueLight}`
                          const num = e.currentTarget.querySelector(".deco-num") as HTMLElement
                          if (num) num.style.opacity = "1"
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = IC.blueDark
                          e.currentTarget.style.boxShadow = "none"
                          const num = e.currentTarget.querySelector(".deco-num") as HTMLElement
                          if (num) num.style.opacity = "0"
                        }}
                      >
                        <span
                          className="deco-num absolute top-4 right-5 font-black pointer-events-none select-none"
                          style={{ fontSize: "4.5rem", lineHeight: 1, color: IC.blueLight, opacity: 0, transition: "opacity 0.4s ease" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <Icon size={22} style={{ color: IC.blueLight, marginBottom: 20 }} />
                        <h3 className="text-[15px] font-bold mb-3" style={{ color: IC.white }}>{c.title}</h3>
                        <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(142,180,227,0.7)" }}>{c.desc}</p>
                        <a href="#" className="inline-flex items-center gap-1.5 text-[12px] font-bold mt-6"
                          style={{ color: IC.blueLight }}>
                          Explore <ArrowRight size={11} />
                        </a>
                      </div>
                    </Fade>
                  )
                })}
              </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 10 — NEWS & EVENTS ─────────────────────────────────────
           <H2> "Industry News & Events"
           <H3> "Latest Press"  →  <L> <H4> title + <T2> desc
           <H3> "Upcoming Events"  →  <L> <H4> title + <T2> desc + <T2> date
      ─────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 relative" style={{ background: IC.offWhite }}>
        {/* Section number */}
        <div className="absolute top-12 right-8 select-none pointer-events-none" style={{ fontSize: "clamp(5rem,10vw,9rem)", fontWeight: 900, lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(36,87,155,0.06)", letterSpacing: "-0.04em" }}>04</div>
        {/* Left edge accent */}
        <div className="absolute left-0 top-16 bottom-16" style={{ width: 3, background: `linear-gradient(to bottom, transparent, ${IC.blue}, transparent)` }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
              <Drop>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: IC.blue }}>Stay Informed</p>
                <ParaH2 className="font-bold tracking-tight mb-16" style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", color: IC.gray80 }}>
                  IC News - Don't miss any Industry Trends
                </ParaH2>
              </Drop>

              <div className="grid lg:grid-cols-2 gap-20">

                {/* Press */}
                <div>
                  <Fade>
                    {/* H3 */}
                    <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-10"
                      style={{ color: IC.blue, paddingBottom: 14, borderBottom: `1px solid ${IC.blue}` }}>
                      IC News
                    </h3>
                  </Fade>
                  {D.press.map((p, idx) => (
                    <Fade key={idx} delay={idx * 0.1}>
                      <article className="mb-10 pb-10" style={{ borderBottom: `1px solid ${IC.blueXL}` }}>
                        {/* H4 */}
                        <h4 className="text-base font-bold mb-3 leading-snug" style={{ color: IC.gray80 }}>{p.title}</h4>
                        {/* T2 */}
                        <p className="text-sm leading-relaxed" style={{ color: IC.gray50 }}>{p.desc}</p>
                        <a href="#" className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold" style={{ color: IC.blue }}>
                          Read more <ArrowRight size={12} />
                        </a>
                      </article>
                    </Fade>
                  ))}
                </div>

                {/* Events */}
                <div>
                  <Fade>
                    {/* H3 */}
                    <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-10"
                      style={{ color: IC.blue, paddingBottom: 14, borderBottom: `1px solid ${IC.blue}` }}>
                      Keep in touch with our events
                    </h3>
                  </Fade>
                  {D.events.map((e, idx) => (
                    <Fade key={idx} delay={idx * 0.1}>
                      <article className="mb-10 pb-10" style={{ borderBottom: `1px solid ${IC.blueXL}` }}>
                        {/* T2: Date */}
                        <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: IC.blueLight }}>{e.date}</p>
                        {/* H4 */}
                        <h4 className="text-base font-bold mb-3 leading-snug" style={{ color: IC.gray80 }}>{e.title}</h4>
                        {/* T2: Description */}
                        <p className="text-sm leading-relaxed" style={{ color: IC.gray50 }}>{e.desc}</p>
                        <a href="#" className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold" style={{ color: IC.blue }}>
                          View event <ArrowRight size={12} />
                        </a>
                      </article>
                    </Fade>
                  ))}
                </div>
              </div>
        </div>
      </section>

      {/* ── SECTION 11 — REFERENCES ───────────────────────────────────────────────
           Featured: Logo oval + statement  (x2)
           Bottom row: 4 additional client logos
      ─────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 relative" style={{ background: IC.blueXL }}>
        {/* Section number */}
        <div className="absolute top-12 right-8 select-none pointer-events-none" style={{ fontSize: "clamp(5rem,10vw,9rem)", fontWeight: 900, lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(36,87,155,0.1)", letterSpacing: "-0.04em" }}>05</div>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <Drop>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: IC.blue }}>Client Voices</p>
            <ParaH2 className="font-bold tracking-tight mb-16" style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", color: IC.gray80 }}>
              Leading Companies trust in Interconnection Consulting
            </ParaH2>
          </Drop>

          {/* Featured references */}
          <div className="flex flex-col gap-16 mb-20">
            {D.references.map((ref, idx) => (
              <Fade key={idx} delay={idx * 0.1}>
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center" style={{ paddingBottom: 64, borderBottom: `1px solid rgba(36,87,155,0.15)` }}>
                  <div className="lg:col-span-1">
                    <div className="flex items-center justify-center p-8" style={{ background: IC.white, border: `1px solid rgba(36,87,155,0.15)`, minHeight: 120 }}>
                      <img
                        src={`https://logo.clearbit.com/${ref.domain}`}
                        alt={ref.company}
                        style={{ maxWidth: 180, maxHeight: 56, objectFit: "contain", filter: "grayscale(100%)", opacity: 0.72 }}
                        onError={e => {
                          e.currentTarget.style.display = "none"
                          if (e.currentTarget.nextElementSibling) (e.currentTarget.nextElementSibling as HTMLElement).style.display = "block"
                        }}
                      />
                      <span className="hidden text-sm font-bold text-center" style={{ color: IC.gray80 }}>{ref.company}</span>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div style={{ fontSize: "4.5rem", lineHeight: 0.8, color: IC.blueXL, fontFamily: "Georgia, serif", marginBottom: 12, filter: "brightness(0.8)" }}>&ldquo;</div>
                    <p className="text-lg leading-loose" style={{ color: IC.gray80 }}>{ref.statement}</p>
                    <p className="mt-5 text-xs font-bold tracking-widest uppercase" style={{ color: IC.blue }}>{ref.company}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>

          <Fade delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {D.additionalClients.map((c) => (
                <div key={c.name} className="flex items-center justify-center p-6"
                  style={{ height: 80, background: IC.white, border: `1px solid rgba(36,87,155,0.12)` }}>
                  <img
                    src={`https://logo.clearbit.com/${c.domain}`}
                    alt={c.name}
                    style={{ maxWidth: 110, maxHeight: 40, objectFit: "contain", filter: "grayscale(100%)", opacity: 0.7 }}
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
      <footer className="py-12" style={{ background: IC.offWhite, borderTop: `1px solid ${IC.blueXL}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-black text-xs px-2 py-1.5 tracking-widest" style={{ background: IC.blue, color: IC.white }}>IC</span>
            <span className="text-sm font-semibold" style={{ color: IC.gray80 }}>Interconnection Consulting</span>
          </div>
          <p className="text-xs text-center md:text-right" style={{ color: IC.grayLight }}>
            © 2026 Interconnection Consulting GmbH · Getreidemarkt 1, 1060 Vienna
          </p>
        </div>
      </footer>

    </div>
  )
}
