"use client"

import { ArrowRight, BarChart3, Users, Lightbulb, Database, ChevronRight, Menu, X, TrendingUp, Globe, CalendarDays, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

const NAV_LINKS = ["Services", "Industries", "Insights", "Events", "About"]

const SERVICES = [
  { icon: BarChart3, title: "Market Analysis", desc: "Comprehensive market studies with data-driven insights across 50+ industries worldwide.", tag: "Core" },
  { icon: Users, title: "Customer Insights", desc: "Deep understanding of customer behavior, satisfaction, and loyalty drivers.", tag: "Research" },
  { icon: Lightbulb, title: "Innovation Management", desc: "Strategic frameworks to identify and capitalize on emerging market opportunities.", tag: "Strategy" },
  { icon: Database, title: "Big Data & MIS", desc: "Management information systems and analytics tools for real-time decision making.", tag: "Technology" },
]

const STATS = [
  { value: "4,458", label: "Clients Served" },
  { value: "14,889", label: "Reports Delivered" },
  { value: "3,167", label: "Projects Completed" },
  { value: "27+", label: "Years of Excellence" },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, isVisible }
}

function AnimatedSection({ children, className, style, delay = 0 }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; delay?: number }) {
  const { ref, isVisible } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

export default function TemplateDarkExecutive() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: "#0a1628", color: "#e2e8f0" }}>
      {/* Revolut-style Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,22,40,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          paddingTop: scrolled ? 16 : 24,
          paddingBottom: scrolled ? 16 : 24,
          borderBottom: scrolled ? "1px solid rgba(56,189,248,0.08)" : "1px solid transparent",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs" style={{ background: "#38bdf8", color: "#0a1628" }}>IC</div>
          <span className="text-base font-semibold tracking-tight" style={{ color: "#f1f5f9" }}>Interconnection</span>
        </div>
        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(link => (
            <a key={link} href="#" className="text-[13px] font-medium transition-colors hover:opacity-100" style={{ color: "#94a3b8" }}>{link}</a>
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <a href="#" className="text-[13px] font-medium px-4 py-2 rounded-full transition-all" style={{ color: "#94a3b8" }}>Log in</a>
          <a href="#" className="text-[13px] font-semibold px-5 py-2.5 rounded-full transition-all" style={{ background: "#38bdf8", color: "#0a1628" }}>
            Get Started
          </a>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden" aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 pt-20 px-6 flex flex-col" style={{ background: "#0a1628" }}>
          <div className="flex flex-col gap-1 py-8 flex-1">
            {NAV_LINKS.map(link => (
              <a key={link} href="#" className="text-2xl font-semibold py-3 transition-colors" style={{ color: "#e2e8f0" }}>{link}</a>
            ))}
          </div>
          <div className="flex flex-col gap-3 pb-10">
            <a href="#" className="text-base font-semibold px-6 py-3.5 rounded-full text-center" style={{ background: "#38bdf8", color: "#0a1628" }}>Get Started</a>
            <a href="#" className="text-base font-medium px-6 py-3.5 rounded-full text-center" style={{ border: "1px solid #1e3a5f", color: "#e2e8f0" }}>Log in</a>
          </div>
        </div>
      )}

      {/* Hero - Revolut style: massive text, centered, compelling */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-dark.jpg" alt="" fill className="object-cover opacity-15" priority />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(56,189,248,0.08) 0%, transparent 70%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #0a1628 0%, transparent 20%, transparent 80%, #0a1628 100%)" }} />
        </div>
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-12 py-32 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-10" style={{ background: "rgba(56,189,248,0.08)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.15)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#38bdf8" }} />
              Trusted by 4,458+ enterprises since 1998
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.95] mb-8" style={{ color: "#f8fafc" }}>
              Change the way you<br />
              <span style={{ color: "#38bdf8" }}>understand markets</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto" style={{ color: "#94a3b8" }}>
              For those who want more from their market data — there{"'"}s Interconnection Consulting. Discover insights that drive growth.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold transition-all hover:brightness-110" style={{ background: "#38bdf8", color: "#0a1628" }}>
                Explore Our Services
              </a>
              <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-medium transition-all" style={{ border: "1px solid rgba(56,189,248,0.2)", color: "#e2e8f0" }}>
                View Reports <ArrowRight size={16} />
              </a>
            </div>
          </AnimatedSection>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs font-medium" style={{ color: "#475569" }}>Scroll to explore</span>
          <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5" style={{ border: "1.5px solid #334155" }}>
            <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: "#38bdf8" }} />
          </div>
        </div>
      </section>

      {/* Stats ticker - Revolut style horizontal */}
      <section className="py-20" style={{ borderTop: "1px solid rgba(56,189,248,0.08)", borderBottom: "1px solid rgba(56,189,248,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
            {STATS.map((stat, idx) => (
              <AnimatedSection key={stat.label} delay={idx * 0.1} className="text-center">
                <span className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#38bdf8" }}>{stat.value}</span>
                <p className="text-sm font-medium mt-2" style={{ color: "#64748b" }}>{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services - Revolut tabbed approach */}
      <section className="py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="mb-16 lg:mb-20">
            <p className="text-sm font-semibold tracking-widest uppercase mb-5" style={{ color: "#38bdf8" }}>What we do</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-3xl" style={{ color: "#f8fafc" }}>
              Make your data, well-informed
            </h2>
          </AnimatedSection>

          {/* Tab navigation like Revolut's Send/Split/Gift */}
          <div className="flex gap-2 mb-12 overflow-x-auto pb-2">
            {SERVICES.map((service, idx) => (
              <button
                key={service.title}
                onClick={() => setActiveService(idx)}
                className="px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  background: activeService === idx ? "#38bdf8" : "rgba(56,189,248,0.06)",
                  color: activeService === idx ? "#0a1628" : "#94a3b8",
                  border: activeService === idx ? "none" : "1px solid rgba(56,189,248,0.1)",
                }}
              >
                {service.tag}
              </button>
            ))}
          </div>

          {/* Active service card - Revolut feature style */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" style={{ background: "rgba(56,189,248,0.08)" }}>
                {(() => { const Icon = SERVICES[activeService].icon; return <Icon size={30} style={{ color: "#38bdf8" }} /> })()}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-5" style={{ color: "#f1f5f9" }}>
                {SERVICES[activeService].title}
              </h3>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#94a3b8" }}>
                {SERVICES[activeService].desc}
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-base font-semibold transition-all" style={{ color: "#38bdf8" }}>
                Learn more <ArrowRight size={16} />
              </a>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden" style={{ background: "#0f1d32" }}>
              <Image src="/images/hero-dark.jpg" alt={SERVICES[activeService].title} fill className="object-cover opacity-60" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.15) 0%, transparent 60%)" }} />
              {/* Floating stat card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl" style={{ background: "rgba(10,22,40,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(56,189,248,0.1)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium mb-1" style={{ color: "#64748b" }}>Projects delivered</p>
                    <p className="text-2xl font-bold" style={{ color: "#f8fafc" }}>3,167+</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(56,189,248,0.1)" }}>
                    <TrendingUp size={14} style={{ color: "#38bdf8" }} />
                    <span className="text-xs font-semibold" style={{ color: "#38bdf8" }}>+23%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries - Revolut card grid */}
      <section className="py-28 lg:py-36" style={{ background: "#071020" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-16 lg:mb-20">
            <p className="text-sm font-semibold tracking-widest uppercase mb-5" style={{ color: "#38bdf8" }}>Industries</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto" style={{ color: "#f8fafc" }}>
              50+ industries. One trusted partner.
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Automotive", icon: TrendingUp, count: "2,400+ studies" },
              { name: "Construction", icon: BarChart3, count: "1,800+ studies" },
              { name: "Consumer Goods", icon: Users, count: "3,100+ studies" },
              { name: "Agriculture", icon: Globe, count: "890+ studies" },
              { name: "Technology", icon: Database, count: "1,500+ studies" },
              { name: "Energy & Utilities", icon: Lightbulb, count: "760+ studies" },
            ].map((industry, idx) => (
              <AnimatedSection
                key={industry.name}
                delay={idx * 0.05}
                className="group flex items-center justify-between p-6 rounded-2xl cursor-pointer transition-all"
                style={{ background: "rgba(56,189,248,0.03)", border: "1px solid rgba(56,189,248,0.06)" }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(56,189,248,0.08)" }}>
                    <industry.icon size={18} style={{ color: "#38bdf8" }} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold" style={{ color: "#f1f5f9" }}>{industry.name}</h3>
                    <p className="text-xs" style={{ color: "#64748b" }}>{industry.count}</p>
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: "#334155" }} className="transition-transform group-hover:translate-x-1" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* News - Revolut style feature cards */}
      <section className="py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase mb-5" style={{ color: "#38bdf8" }}>IC News</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#f8fafc" }}>Latest insights</h2>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#38bdf8" }}>View all news <ArrowRight size={16} /></a>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "Full-Cup Recovery: Spain's HoReCa Coffee Market", tag: "Food & Beverage", date: "Feb 2026" },
              { title: "European Sanitary Pipes: From Downturn to Stabilization", tag: "Construction", date: "Jan 2026" },
              { title: "IC Social Media Insights: Boating Industry 2026", tag: "Leisure", date: "Mar 2026" },
            ].map((article, idx) => (
              <AnimatedSection key={article.title} delay={idx * 0.1}>
                <article className="group cursor-pointer">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden relative mb-5">
                    <Image src="/images/hero-dark.jpg" alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,22,40,0.8) 0%, transparent 50%)" }} />
                    <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold" style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8" }}>{article.tag}</span>
                  </div>
                  <span className="text-xs font-medium mb-2 block" style={{ color: "#475569" }}>{article.date}</span>
                  <h3 className="text-lg font-semibold leading-snug mb-3 transition-colors" style={{ color: "#f1f5f9" }}>{article.title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "#38bdf8" }}>
                    Read article <ArrowUpRight size={14} />
                  </span>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-20" style={{ borderTop: "1px solid rgba(56,189,248,0.06)", borderBottom: "1px solid rgba(56,189,248,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-10" style={{ color: "#475569" }}>Trusted by leading companies worldwide</p>
          <div className="flex flex-wrap justify-center gap-x-14 gap-y-6 items-center">
            {["Saint-Gobain", "Schneider Electric", "Epson", "Sodexo", "Salamander", "ELK", "Kontron"].map(client => (
              <span key={client} className="text-base font-semibold tracking-wide" style={{ color: "#334155" }}>{client}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Revolut "Join the 40+ million" style */}
      <section className="py-28 lg:py-36">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8" style={{ color: "#f8fafc" }}>
              Join the 4,458+ companies using ICC
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-lg mb-12 max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
              Get started with customized market intelligence that drives strategic growth. No fluff, just insights.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <a href="#" className="inline-flex items-center justify-center gap-2 px-10 py-4.5 rounded-full text-base font-semibold transition-all hover:brightness-110" style={{ background: "#38bdf8", color: "#0a1628" }}>
              Get Interconnection
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer - Revolut style grid */}
      <footer className="py-16" style={{ borderTop: "1px solid #1e293b" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div>
              <h4 className="text-sm font-semibold mb-5" style={{ color: "#f1f5f9" }}>Services</h4>
              <div className="flex flex-col gap-3">
                {["Market Analysis", "Customer Insights", "Innovation", "Big Data & MIS"].map(l => (
                  <a key={l} href="#" className="text-sm" style={{ color: "#64748b" }}>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-5" style={{ color: "#f1f5f9" }}>Industries</h4>
              <div className="flex flex-col gap-3">
                {["Automotive", "Construction", "Consumer Goods", "Technology"].map(l => (
                  <a key={l} href="#" className="text-sm" style={{ color: "#64748b" }}>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-5" style={{ color: "#f1f5f9" }}>Company</h4>
              <div className="flex flex-col gap-3">
                {["About ICC", "Careers", "Events", "Contact"].map(l => (
                  <a key={l} href="#" className="text-sm" style={{ color: "#64748b" }}>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-5" style={{ color: "#f1f5f9" }}>Legal</h4>
              <div className="flex flex-col gap-3">
                {["Imprint", "Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
                  <a key={l} href="#" className="text-sm" style={{ color: "#64748b" }}>{l}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8" style={{ borderTop: "1px solid #1e293b" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-[10px]" style={{ background: "#38bdf8", color: "#0a1628" }}>IC</div>
              <span className="text-sm font-medium" style={{ color: "#64748b" }}>Interconnection Consulting</span>
            </div>
            <p className="text-xs" style={{ color: "#334155" }}>2026 Interconnection Consulting GmbH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
