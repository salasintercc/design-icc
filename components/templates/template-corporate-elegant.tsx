"use client"

import { ArrowRight, BarChart3, Users, Lightbulb, Database, ChevronRight, Menu, X, TrendingUp, Globe, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

const NAV_LINKS = ["Services", "Industries", "Insights", "Events", "About"]

const SERVICES = [
  { icon: BarChart3, title: "Market Analysis", desc: "Comprehensive market studies with data-driven insights across 50+ industries worldwide." },
  { icon: Users, title: "Customer Insights", desc: "Deep understanding of customer behavior, satisfaction, and loyalty drivers." },
  { icon: Lightbulb, title: "Innovation Management", desc: "Strategic frameworks to identify and capitalize on emerging market opportunities." },
  { icon: Database, title: "Big Data & MIS", desc: "Management information systems and analytics tools for real-time decision making." },
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
    <div ref={ref} className={className} style={{ ...style, opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>
      {children}
    </div>
  )
}

export default function TemplateCorporateElegant() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const serviceLabels = ["Market", "Customers", "Innovation", "Data Tools"]

  return (
    <div className="min-h-screen" style={{ background: "#faf8f5", color: "#292524" }}>
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(250,248,245,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          paddingTop: scrolled ? 16 : 24,
          paddingBottom: scrolled ? 16 : 24,
          borderBottom: scrolled ? "1px solid #e7e5e4" : "1px solid transparent",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-tight" style={{ color: "#1c1917" }}>ICC</span>
          <span className="hidden sm:block text-sm" style={{ color: "#d6d3d1" }}>|</span>
          <span className="hidden sm:block text-sm font-medium" style={{ color: "#78716c" }}>Interconnection Consulting</span>
        </div>
        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(link => (
            <a key={link} href="#" className="text-[13px] font-medium transition-colors" style={{ color: "#78716c" }}>{link}</a>
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <a href="#" className="text-[13px] font-medium px-4 py-2" style={{ color: "#78716c" }}>Log in</a>
          <a href="#" className="text-[13px] font-semibold px-5 py-2.5" style={{ background: "#1c1917", color: "#faf8f5" }}>
            Get Started
          </a>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden" aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={22} style={{ color: "#1c1917" }} /> : <Menu size={22} style={{ color: "#1c1917" }} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 pt-20 px-6 flex flex-col" style={{ background: "#faf8f5" }}>
          <div className="flex flex-col gap-1 py-8 flex-1">
            {NAV_LINKS.map(link => (
              <a key={link} href="#" className="text-2xl font-semibold py-3" style={{ color: "#1c1917" }}>{link}</a>
            ))}
          </div>
          <div className="flex flex-col gap-3 pb-10">
            <a href="#" className="text-base font-semibold px-6 py-3.5 text-center" style={{ background: "#1c1917", color: "#faf8f5" }}>Get Started</a>
          </div>
        </div>
      )}

      {/* Hero - Revolut bold centered style with warm elegance */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-elegant.jpg" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(28,25,23,0.5) 0%, rgba(28,25,23,0.85) 60%, rgba(28,25,23,0.95) 100%)" }} />
        </div>
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-12 py-32 text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-10" style={{ color: "#d6a756" }}>Since 1998</p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.95] mb-8" style={{ color: "#fafaf9" }}>
              Defining growth<br />potential for<br />
              <span style={{ color: "#d6a756" }}>global enterprises</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto" style={{ color: "#d6d3d1" }}>
              For those who want more from their market data — there{"'"}s ICC. Precision research, global insights, trusted results.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold transition-all" style={{ background: "#d6a756", color: "#1c1917" }}>
                Talk to Our Experts
              </a>
              <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium transition-all" style={{ border: "1px solid rgba(214,167,86,0.3)", color: "#fafaf9" }}>
                View Reports <ArrowRight size={16} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20" style={{ background: "#1c1917" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
            {STATS.map((stat, idx) => (
              <AnimatedSection key={stat.label} delay={idx * 0.1} className="text-center">
                <span className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#d6a756" }}>{stat.value}</span>
                <p className="text-xs font-semibold mt-3 tracking-[0.2em] uppercase" style={{ color: "#78716c" }}>{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services - Revolut tabbed */}
      <section className="py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: "#d6a756" }}>Our Services</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl" style={{ color: "#1c1917" }}>
              How we make our customers successful
            </h2>
          </AnimatedSection>

          {/* Tab pills */}
          <div className="flex gap-2 mb-12 overflow-x-auto pb-2">
            {serviceLabels.map((label, idx) => (
              <button
                key={label}
                onClick={() => setActiveService(idx)}
                className="px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  background: activeService === idx ? "#1c1917" : "transparent",
                  color: activeService === idx ? "#d6a756" : "#78716c",
                  border: activeService === idx ? "none" : "1px solid #e7e5e4",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-14 h-14 flex items-center justify-center mb-8" style={{ background: "#1c1917" }}>
                {(() => { const Icon = SERVICES[activeService].icon; return <Icon size={28} style={{ color: "#d6a756" }} /> })()}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-5" style={{ color: "#1c1917" }}>
                {SERVICES[activeService].title}
              </h3>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#78716c" }}>
                {SERVICES[activeService].desc}
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase" style={{ color: "#d6a756" }}>
                Learn more <ArrowRight size={14} />
              </a>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/images/hero-elegant.jpg" alt={SERVICES[activeService].title} fill className="object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(214,167,86,0.1) 0%, transparent 60%)" }} />
              <div className="absolute bottom-6 left-6 right-6 p-5" style={{ background: "rgba(28,25,23,0.92)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium mb-1" style={{ color: "#78716c" }}>Success rate</p>
                    <p className="text-2xl font-bold" style={{ color: "#fafaf9" }}>97.3%</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5" style={{ background: "rgba(214,167,86,0.1)" }}>
                    <TrendingUp size={14} style={{ color: "#d6a756" }} />
                    <span className="text-xs font-semibold" style={{ color: "#d6a756" }}>+4.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-28 lg:py-36" style={{ background: "#1c1917" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: "#d6a756" }}>Industries</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto" style={{ color: "#fafaf9" }}>
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
                className="group flex items-center justify-between p-6 cursor-pointer transition-all"
                style={{ background: "rgba(214,167,86,0.03)", border: "1px solid rgba(214,167,86,0.08)" }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center" style={{ background: "rgba(214,167,86,0.08)" }}>
                    <industry.icon size={18} style={{ color: "#d6a756" }} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold" style={{ color: "#fafaf9" }}>{industry.name}</h3>
                    <p className="text-xs" style={{ color: "#78716c" }}>{industry.count}</p>
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: "#44403c" }} className="transition-transform group-hover:translate-x-1" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* News - Revolut editorial style */}
      <section className="py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: "#d6a756" }}>IC News</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#1c1917" }}>Latest insights</h2>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase" style={{ color: "#d6a756" }}>View all <ArrowRight size={16} /></a>
          </AnimatedSection>

          <div className="flex flex-col">
            {[
              { title: "Full-Cup Recovery: Spain's HoReCa Coffee Market Stirs Forward", tag: "Food & Beverage", date: "Feb 2026" },
              { title: "From Downturn to Stabilization: European Sanitary Pipes Market", tag: "Construction", date: "Jan 2026" },
              { title: "IC Social Media Insights: Boating Industry 2026", tag: "Leisure", date: "Mar 2026" },
            ].map((article, idx) => (
              <AnimatedSection key={article.title} delay={idx * 0.1}>
                <article className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 cursor-pointer" style={{ borderBottom: "1px solid #e7e5e4" }}>
                  <div className="flex items-center gap-6 flex-1">
                    <span className="text-sm font-medium shrink-0 w-20 hidden md:block" style={{ color: "#a8a29e" }}>{article.date}</span>
                    <h3 className="text-lg font-semibold leading-snug transition-colors" style={{ color: "#1c1917" }}>{article.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="px-3 py-1 text-[11px] font-semibold tracking-wide uppercase" style={{ background: "#1c1917", color: "#d6a756" }}>{article.tag}</span>
                    <ArrowUpRight size={18} style={{ color: "#d6a756" }} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-20" style={{ borderTop: "1px solid #e7e5e4", borderBottom: "1px solid #e7e5e4" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-10" style={{ color: "#a8a29e" }}>Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center gap-x-14 gap-y-6 items-center">
            {["Saint-Gobain", "Schneider Electric", "Epson", "Sodexo", "Salamander", "ELK", "Kontron"].map(client => (
              <span key={client} className="text-base font-semibold tracking-wide" style={{ color: "#d6d3d1" }}>{client}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Revolut "Join" with dark panel */}
      <section className="py-28 lg:py-36">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <div className="w-16 h-0.5 mx-auto mb-10" style={{ background: "#d6a756" }} />
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8" style={{ color: "#1c1917" }}>
              Join the 4,458+ companies using ICC
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-lg mb-12 max-w-xl mx-auto" style={{ color: "#78716c" }}>
              Premium market intelligence for enterprises that demand precision.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <a href="#" className="inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-semibold transition-all" style={{ background: "#d6a756", color: "#1c1917" }}>
              Get Interconnection
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16" style={{ background: "#1c1917" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div>
              <h4 className="text-sm font-semibold mb-5" style={{ color: "#fafaf9" }}>Services</h4>
              <div className="flex flex-col gap-3">
                {["Market Analysis", "Customer Insights", "Innovation", "Big Data & MIS"].map(l => (
                  <a key={l} href="#" className="text-sm" style={{ color: "#78716c" }}>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-5" style={{ color: "#fafaf9" }}>Industries</h4>
              <div className="flex flex-col gap-3">
                {["Automotive", "Construction", "Consumer Goods", "Technology"].map(l => (
                  <a key={l} href="#" className="text-sm" style={{ color: "#78716c" }}>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-5" style={{ color: "#fafaf9" }}>Company</h4>
              <div className="flex flex-col gap-3">
                {["About ICC", "Careers", "Events", "Contact"].map(l => (
                  <a key={l} href="#" className="text-sm" style={{ color: "#78716c" }}>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-5" style={{ color: "#fafaf9" }}>Legal</h4>
              <div className="flex flex-col gap-3">
                {["Imprint", "Privacy", "Terms", "Cookies"].map(l => (
                  <a key={l} href="#" className="text-sm" style={{ color: "#78716c" }}>{l}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8" style={{ borderTop: "1px solid #292524" }}>
            <span className="text-lg font-bold tracking-tight" style={{ color: "#fafaf9" }}>ICC</span>
            <p className="text-xs" style={{ color: "#57534e" }}>2026 Interconnection Consulting GmbH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
