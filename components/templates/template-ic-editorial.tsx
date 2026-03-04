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
  productName:  "Windows",
  regionName:   "Austria",
  productTypes: ["Market Analysis", "Competition Analysis", "Market Forecast", "Company Profiles"],

  descTitle: "Austrian Window Market Overview",
  descText:  "The Austrian window market encompasses residential, commercial, and industrial segments. This comprehensive study covers market size, growth trends, competitive landscape, and future outlook through 2030, based on primary research with 200+ market participants across the value chain.",

  trendTitle: "Key Market Trends 2025–2027",
  trendText:  "The Austrian window market is undergoing significant transformation driven by energy efficiency regulations (EU Energy Performance of Buildings Directive), rising raw material costs, and growing demand for smart window solutions. Triple-glazed windows now account for 68% of all new residential installations.",

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

  players: ["Internorm", "Salamander", "Rehau", "Veka", "Schüco", "Aluplast", "KF Group", "Pax Fenster"],

  faqs: [
    { q: "What methodology is used in this report?",      a: "Our research combines primary data from 200+ interviews with manufacturers, distributors and end-users with secondary data analysis and our proprietary database of 14,000+ market studies." },
    { q: "Is the data available as a downloadable file?", a: "Yes. All quantitative data tables are available as Excel files. Premium editions include fully editable data models with forecasting capabilities." },
    { q: "Can the report be customized for our needs?",   a: "We offer custom research projects tailored to your specific requirements. Contact our research team for a tailored proposal and pricing." },
    { q: "How current is the data in this report?",       a: "The 2025 edition incorporates data through Q3 2025, with preliminary estimates for Q4 2025. Forecasts extend to 2030." },
  ],

  subText:  "Unlock unlimited access to our full library of 14,889 market reports across 50+ industries with an IC Subscription.",
  benefits: [
    { title: "Unlimited Downloads", text: "Access our complete report library including all updates and future editions." },
    { title: "Priority Research",   text: "Commission custom research at preferential subscriber rates." },
    { title: "Market Alerts",       text: "Real-time notifications for new publications in your tracked markets." },
    { title: "Analyst Access",      text: "Direct consultation with our team of 50+ industry specialists." },
  ],

  clientQuote: "The IC report on the Austrian window market gave us exactly the intelligence needed to plan our distribution expansion. The data quality and depth of analysis is unmatched in the industry.",
  clientName:  "Head of Strategy, Leading European Window Manufacturer",
  clients:     ["Saint-Gobain", "Schneider Electric", "Sodexo", "Salamander", "ELK Fertighaus", "Kontron"],

  related: ["Doors & Entrances", "Insulation Materials", "Flat Glass", "PVC Profiles", "Aluminium Systems", "Architectural Hardware", "Sealants & Adhesives", "Roofing"],

  press: [
    { title: "Austrian Construction Market Rebounds in Q4 2025", desc: "New building permits rose 12% year-on-year, signaling positive outlook for window manufacturers." },
    { title: "EU Energy Directive Reshapes Window Standards",     desc: "Upcoming EU regulations set to increase minimum energy performance requirements from 2026 onwards." },
  ],
  events: [
    { title: "Fensterbau Frontale 2026", desc: "World's leading trade fair for windows, doors and façades.", date: "18–21 March 2026" },
    { title: "BAU Munich 2027",          desc: "International trade fair for architecture, materials and systems.", date: "January 2027" },
  ],

  references: [
    { company: "Saint-Gobain",       domain: "saint-gobain.com",      statement: "The IC report on the Austrian window market gave us exactly the intelligence needed to plan our distribution expansion. The data quality and depth of analysis is unmatched in the industry." },
    { company: "Schneider Electric", domain: "schneider-electric.com", statement: "Interconnection Consulting’s research is our go-to source when entering new European markets. Their competitive intelligence cuts months off our strategy cycles." },
  ],
  additionalClients: [
    { name: "Salamander",     domain: "salamander.de" },
    { name: "ELK Fertighaus", domain: "elk.at"        },
    { name: "Kontron",        domain: "kontron.com"   },
    { name: "Rehau",          domain: "rehau.com"     },
  ],
}

const COMPETENCES = [
  { icon: BarChart2,  title: "Market Reports",           desc: "In-depth industry and regional analyses covering market size, trends and competitive dynamics." },
  { icon: Search,     title: "Competitive Intelligence", desc: "Map competitor positioning, benchmark your performance and identify market white spaces." },
  { icon: TrendingUp, title: "Pricing Intelligence",     desc: "Data-driven pricing strategies to optimise margins and respond to market shifts." },
  { icon: Target,     title: "Lead Generation",          desc: "Identify and reach high-value prospects with verified, segmented market data." },
  { icon: Users,      title: "Customer Insights",        desc: "Understand buyer behaviour, satisfaction drivers and churn risk across segments." },
  { icon: Lightbulb,  title: "Strategic Consulting",     desc: "Expert advisory services to turn market intelligence into decisive business action." },
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


export default function TemplateICEditorial() {
  const [scrolled, setScrolled] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

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
      `}</style>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-16 transition-all"
        style={{ paddingTop: scrolled ? 13 : 18, paddingBottom: scrolled ? 13 : 18, background: "rgba(255,255,255,0.97)", borderBottom: `1px solid ${scrolled ? IC.blueXL : "transparent"}`, backdropFilter: "blur(14px)" }}>
        <div className="flex items-center gap-2.5">
          <span className="font-black text-xs px-2 py-1.5 tracking-widest" style={{ background: IC.blue, color: IC.white }}>IC</span>
          <span className="hidden sm:block text-[13px] font-semibold tracking-tight" style={{ color: IC.gray80 }}>Interconnection Consulting</span>
        </div>
        <div className="hidden lg:flex items-center gap-10 text-[12px] font-medium tracking-wide" style={{ color: IC.gray50 }}>
          {["Reports & Tools", "Our Competences", "Shop", "News", "Events", "About"].map(l => (
            <a key={l} href="#" className="hover:text-[#24579B] transition-colors uppercase tracking-widest text-[11px]">{l}</a>
          ))}
        </div>
        <a href="#pricing" className="text-[12px] font-bold px-5 py-2.5 rounded-full transition-opacity hover:opacity-85"
          style={{ background: IC.blue, color: IC.white }}>
          Buy Report →
        </a>
      </nav>

      {/* ── SECTION 1 — SLIDE / HERO ────────────────────────────────────────
           <H1> [Product Name] + in [Region]
           [H1 extension]: Product types as pill tags
      ─────────────────────────────────────────────────────────────────────── */}
      <section className="relative" style={{ background: IC.white, paddingTop: 120 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-12 pb-0">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-end">

            {/* Left: Text */}
            <div>
              <Fade>
                <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-8" style={{ color: IC.blue }}>
                  Market Study · Interconnection Consulting
                </p>
              </Fade>
              <Fade delay={0.08}>
                {/* H1 */}
                <h1 className="font-bold tracking-tight" style={{ fontSize: "clamp(3rem,6.5vw,5rem)", lineHeight: 1.0, color: IC.gray80 }}>
                  {D.productName}
                  <br />
                  <span style={{ color: IC.blue }}>in {D.regionName}</span>
                </h1>
              </Fade>
              <Fade delay={0.18}>
                {/* H1 Extension: Product Types */}
                <div className="flex flex-wrap gap-2 mt-7 mb-10">
                  {D.productTypes.map(t => (
                    <span key={t} className="text-[11px] font-semibold tracking-wide px-3 py-1.5"
                      style={{ background: IC.blueXL, color: IC.blue }}>{t}</span>
                  ))}
                </div>
              </Fade>
              <Fade delay={0.26}>
                <div className="flex flex-wrap gap-3 mb-14">
                  <a href="#pricing" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-full transition-opacity hover:opacity-85" style={{ background: IC.blue, color: IC.white }}>
                    <ShoppingCart size={14} /> Buy Report
                  </a>
                  <a href="#overview" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full" style={{ border: `1.5px solid ${IC.blueXL}`, color: IC.gray80 }}>
                    Explore Report <ArrowRight size={14} />
                  </a>
                </div>
              </Fade>
            </div>

            {/* Right: Hero image */}
            <Fade delay={0.1} className="hidden lg:block">
              <div className="relative overflow-hidden" style={{ height: 480, borderRadius: 2 }}>
                <Image src="/images/hero-light.jpg" alt={`${D.productName} in ${D.regionName}`} fill className="object-cover" priority />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(36,87,155,0.12) 100%)` }} />
              </div>
            </Fade>
          </div>
        </div>

        {/* Bottom rule */}
        <div style={{ height: 1, background: IC.blueXL, marginTop: 0 }} />
      </section>

      {/* ── SECTION 2 — FROM DATA TO DECISIONS ────────────────────────── */}
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
        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left */}
            <Fade>
              <h2 className="font-bold tracking-tight leading-tight mb-6" style={{ fontSize: "clamp(2rem,4.5vw,3.25rem)", color: IC.gray80 }}>
                From data to decisions—fast.
              </h2>
              <p className="text-base leading-[1.8] mb-10" style={{ color: IC.gray50 }}>
                We combine market reports, competitive intelligence, and tailored consulting to improve lead generation, pricing, and customer satisfaction.
              </p>
              {/* Minimal search */}
              <div>
                <div className="flex items-center" style={{ borderBottom: `1.5px solid ${IC.blue}` }}>
                  <input
                    readOnly
                    placeholder="Search by industry + region…"
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
              <p className="mt-2.5 text-[11px]" style={{ color: IC.gray50 }}>14,889+ reports across 50+ industries &amp; regions</p>
            </Fade>

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
          <div className="mt-16 lg:mt-20">
            <div className="-mx-6 lg:-mx-16 px-6 lg:px-16 py-16 lg:py-20" style={{ background: IC.blueDark }}>
              <Fade>
                <div className="flex items-end justify-between mb-14">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: IC.blueLight }}>Our Competences</p>
                    <h2 className="font-bold tracking-tight mb-0" style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", color: IC.white, lineHeight: 1.1 }}>
                      Intelligence<br />that drives growth.
                    </h2>
                  </div>
                  <a href="#" className="hidden md:flex items-center gap-1.5 text-[13px] font-semibold pb-0.5"
                    style={{ color: IC.blueLight, borderBottom: "1px solid rgba(142,180,227,0.4)" }}>
                    All services <ArrowRight size={12} />
                  </a>
                </div>
              </Fade>
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
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — SHOP / PRICING ─────────────────────────────────────
           <H2> "Get Your Report Today"
           Edition row: [Product] [Region] [Edition] [Price]  →  Buy Now / Request Offer
           <L> Other Regions  →  <T2> name + <T2> status
      ─────────────────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 lg:py-32" style={{ background: IC.white }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
              <Fade>
                {/* H2 */}
                <h2 className="font-bold tracking-tight mb-14" style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", color: IC.gray80 }}>
                  Get Your Report Today
                </h2>
              </Fade>

              {/* Edition rows */}
              {D.editions.map((ed, idx) => (
                <Fade key={ed.name} delay={idx * 0.1}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-8"
                    style={{ borderTop: `1px solid ${IC.blueXL}`, borderBottom: idx === D.editions.length - 1 ? `1px solid ${IC.blueXL}` : undefined }}>
                    <div className="flex-1">
                      {/* T2: Product + Region */}
                      <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: IC.blueLight }}>
                        {D.productName} in {D.regionName}
                      </p>
                      {/* T2: Edition */}
                      <h3 className="text-xl font-bold mb-2" style={{ color: IC.gray80 }}>{ed.name}</h3>
                      <p className="text-xs flex items-center gap-1.5" style={{ color: IC.gray50 }}>
                        <FileText size={12} /> PDF + Excel download included
                      </p>
                    </div>
                    <div className="flex items-center gap-6 flex-wrap flex-shrink-0">
                      {/* T2: Price */}
                      <span className="text-3xl font-bold" style={{ color: IC.blue }}>{ed.price}</span>
                      <a href="#" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-full transition-opacity hover:opacity-85 whitespace-nowrap" style={{ background: IC.blue, color: IC.white }}>
                        <ShoppingCart size={14} /> Buy Now
                      </a>
                      <a href="#" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full whitespace-nowrap" style={{ border: `1.5px solid ${IC.blue}`, color: IC.blue }}>
                        <Download size={14} /> Request Offer
                      </a>
                    </div>
                  </div>
                </Fade>
              ))}

              {/* L: Other Regions */}
              <Fade delay={0.2}>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase mt-12 mb-5" style={{ color: IC.gray80 }}>
                  {D.productName} — Other Available Regions
                </p>
                <div className="flex flex-wrap gap-3">
                  {D.otherRegions.map(r => (
                    <div key={r.name} className="flex items-center gap-2 px-4 py-2"
                      style={{ border: `1px solid ${r.available ? IC.blueXL : IC.grayLight}`, background: r.available ? IC.white : IC.offWhite }}>
                      {/* T2 */}
                      <span className="text-sm font-medium" style={{ color: r.available ? IC.gray80 : IC.grayLight }}>{r.name}</span>
                      <span className="text-[11px]" style={{ color: r.available ? IC.blue : IC.grayLight }}>· {r.status}</span>
                    </div>
                  ))}
                </div>
              </Fade>
        </div>
      </section>

      {/* ── SECTION 10 — NEWS & EVENTS ─────────────────────────────────────
           <H2> "Industry News & Events"
           <H3> "Latest Press"  →  <L> <H4> title + <T2> desc
           <H3> "Upcoming Events"  →  <L> <H4> title + <T2> desc + <T2> date
      ─────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ background: IC.white }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
              <Fade>
                {/* H2 */}
                <h2 className="font-bold tracking-tight mb-16" style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", color: IC.gray80 }}>
                  Industry News &amp; Events
                </h2>
              </Fade>

              <div className="grid lg:grid-cols-2 gap-20">

                {/* Press */}
                <div>
                  <Fade>
                    {/* H3 */}
                    <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-10"
                      style={{ color: IC.blue, paddingBottom: 14, borderBottom: `1px solid ${IC.blue}` }}>
                      Latest Press &amp; Research
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
                      Upcoming Events
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
      <section className="py-24 lg:py-32" style={{ background: IC.blueXL }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <Fade>
            <p className="text-[11px] font-semibold tracking-widest uppercase mb-3" style={{ color: IC.blue }}>References</p>
            <h2 className="font-bold tracking-tight mb-16" style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", color: IC.gray80 }}>
              What Our Clients Say
            </h2>
          </Fade>

          {/* Featured references */}
          <div className="flex flex-col gap-16 mb-20">
            {D.references.map((ref, idx) => (
              <Fade key={idx} delay={idx * 0.1}>
                <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 items-center"
                  style={{ paddingBottom: 64, borderBottom: `1px solid rgba(36,87,155,0.15)` }}>
                  {/* Logo */}
                  <div className="flex justify-center">
                    <div className="flex items-center justify-center p-8"
                      style={{ width: 210, height: 126, background: IC.white, border: `1px solid rgba(36,87,155,0.12)`, flexShrink: 0 }}>
                      <img
                        src={`https://logo.clearbit.com/${ref.domain}`}
                        alt={ref.company}
                        style={{ maxWidth: 130, maxHeight: 60, objectFit: "contain" }}
                        onError={e => {
                          e.currentTarget.style.display = "none"
                          if (e.currentTarget.nextElementSibling) (e.currentTarget.nextElementSibling as HTMLElement).style.display = "block"
                        }}
                      />
                      <span className="hidden text-sm font-bold text-center" style={{ color: IC.gray80 }}>{ref.company}</span>
                    </div>
                  </div>
                  {/* Statement */}
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
            © 2026 Interconnection Consulting GmbH · Getreidemarkt 1, 1060 Vienna, Austria
          </p>
        </div>
      </footer>

    </div>
  )
}
