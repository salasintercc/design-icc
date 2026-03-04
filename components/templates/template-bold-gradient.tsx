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

export default function TemplateBoldGradient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const featureLabels = ["Analysis", "Insights", "Innovation", "Big Data"]

  return (
    <div className="min-h-screen" style={{ background: "#020617", color: "#e2e8f0" }}>
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(2,6,23,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          paddingTop: scrolled ? 16 : 24,
          paddingBottom: scrolled ? 16 : 24,
          borderBottom: scrolled ? "1px solid rgba(99,102,241,0.08)" : "1px solid transparent",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs" style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "#fff" }}>IC</div>
          <span className="text-base font-semibold tracking-tight" style={{ color: "#f1f5f9" }}>Interconnection</span>
        </div>
        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(link => (
            <a key={link} href="#" className="text-[13px] font-medium transition-colors" style={{ color: "#94a3b8" }}>{link}</a>
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <a href="#" className="text-[13px] font-medium px-4 py-2 rounded-full" style={{ color: "#94a3b8" }}>Log in</a>
          <a href="#" className="text-[13px] font-semibold px-5 py-2.5 rounded-full" style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "#fff" }}>
            Get Started
          </a>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden" aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 pt-20 px-6 flex flex-col" style={{ background: "#020617" }}>
          <div className="flex flex-col gap-1 py-8 flex-1">
            {NAV_LINKS.map(link => (
              <a key={link} href="#" className="text-2xl font-semibold py-3" style={{ color: "#e2e8f0" }}>{link}</a>
            ))}
          </div>
          <div className="flex flex-col gap-3 pb-10">
            <a href="#" className="text-base font-semibold px-6 py-3.5 rounded-full text-center" style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "#fff" }}>Get Started</a>
          </div>
        </div>
      )}

      {/* Hero - Bold centered with glow */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-25" style={{ background: "#6366f1" }} />
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15" style={{ background: "#06b6d4" }} />
        </div>
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-12 py-32 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-10" style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#818cf8" }} />
              27+ years of market intelligence
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight leading-[0.93] mb-8">
              <span style={{ color: "#f8fafc" }}>The future of</span><br />
              <span style={{ background: "linear-gradient(135deg, #818cf8, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>market intelligence</span><br />
              <span style={{ color: "#f8fafc" }}>starts here</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto" style={{ color: "#94a3b8" }}>
              For those who want more from their market data — there{"'"}s ICC. Custom research, real insights, global coverage.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold hover:brightness-110 transition-all" style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "#fff" }}>
                Explore Services
              </a>
              <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-medium transition-all" style={{ border: "1px solid #1e293b", color: "#e2e8f0" }}>
                View Reports <ArrowRight size={16} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20" style={{ borderTop: "1px solid rgba(99,102,241,0.08)", borderBottom: "1px solid rgba(99,102,241,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
            {STATS.map((stat, idx) => (
              <AnimatedSection key={stat.label} delay={idx * 0.1} className="text-center">
                <span className="text-4xl md:text-5xl font-bold tracking-tight" style={{ background: "linear-gradient(135deg, #818cf8, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{stat.value}</span>
                <p className="text-sm font-medium mt-2" style={{ color: "#64748b" }}>{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services - Revolut tabbed cards */}
      <section className="py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-5" style={{ background: "linear-gradient(135deg, #818cf8, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Services</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl" style={{ color: "#f8fafc" }}>
              Check out what we do
            </h2>
          </AnimatedSection>

          {/* Tab pills */}
          <div className="flex gap-2 mb-12 overflow-x-auto pb-2">
            {featureLabels.map((label, idx) => (
              <button
                key={label}
                onClick={() => setActiveFeature(idx)}
                className="px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  background: activeFeature === idx ? "linear-gradient(135deg, #6366f1, #06b6d4)" : "rgba(99,102,241,0.06)",
                  color: activeFeature === idx ? "#fff" : "#94a3b8",
                  border: activeFeature === idx ? "none" : "1px solid rgba(99,102,241,0.1)",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.15))" }}>
                {(() => { const Icon = SERVICES[activeFeature].icon; return <Icon size={30} style={{ color: "#818cf8" }} /> })()}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-5" style={{ color: "#f1f5f9" }}>
                {SERVICES[activeFeature].title}
              </h3>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#94a3b8" }}>
                {SERVICES[activeFeature].desc}
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-base font-semibold" style={{ color: "#818cf8" }}>
                Learn more <ArrowRight size={16} />
              </a>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image src="/images/hero-gradient.jpg" alt={SERVICES[activeFeature].title} fill className="object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, transparent 70%)" }} />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl" style={{ background: "rgba(2,6,23,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(99,102,241,0.15)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium mb-1" style={{ color: "#64748b" }}>Client satisfaction</p>
                    <p className="text-2xl font-bold" style={{ color: "#f8fafc" }}>97.3%</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(99,102,241,0.1)" }}>
                    <TrendingUp size={14} style={{ color: "#818cf8" }} />
                    <span className="text-xs font-semibold" style={{ color: "#818cf8" }}>+4.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="py-28 lg:py-36" style={{ background: "#0a0f1e" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#f8fafc" }}>
              Everything in one place
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Large card spanning 2 cols */}
            <AnimatedSection className="md:col-span-2 relative rounded-3xl overflow-hidden" style={{ minHeight: 360, background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.08)" }}>
              <Image src="/images/hero-gradient.jpg" alt="Global coverage" fill className="object-cover opacity-30" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.5) 50%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#818cf8" }}>Global Coverage</p>
                <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "#f8fafc" }}>50+ industries across all continents</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>From automotive to agriculture, we deliver precise market intelligence that drives strategic decisions.</p>
              </div>
            </AnimatedSection>

            {/* Right card */}
            <AnimatedSection delay={0.1} className="rounded-3xl p-8" style={{ background: "rgba(6,182,212,0.04)", border: "1px solid rgba(6,182,212,0.08)" }}>
              <Globe size={32} style={{ color: "#22d3ee" }} className="mb-6" />
              <h3 className="text-xl font-bold mb-3" style={{ color: "#f8fafc" }}>Events & Forums</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#94a3b8" }}>Industry forums with the latest market data and sales concepts.</p>
              <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "#22d3ee" }}>See events <ArrowRight size={14} /></a>
            </AnimatedSection>

            {/* Bottom small card */}
            <AnimatedSection delay={0.15} className="rounded-3xl p-8" style={{ background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.08)" }}>
              <TrendingUp size={32} style={{ color: "#818cf8" }} className="mb-6" />
              <h3 className="text-xl font-bold mb-3" style={{ color: "#f8fafc" }}>Real-time Analytics</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>Custom dashboards and MIS tools for instant access to market data.</p>
            </AnimatedSection>

            {/* Bottom large card spanning 2 cols */}
            <AnimatedSection delay={0.2} className="md:col-span-2 rounded-3xl p-8 lg:p-10 flex flex-col justify-between" style={{ minHeight: 240, background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(6,182,212,0.06))", border: "1px solid rgba(99,102,241,0.08)" }}>
              <div>
                <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#a5b4fc" }}>Reports</p>
                <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "#f8fafc" }}>14,889+ market reports and counting</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>Precise, actionable reports tailored for decision-makers.</p>
              </div>
              <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold mt-6" style={{ color: "#818cf8" }}>Browse reports <ArrowRight size={14} /></a>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase mb-5" style={{ background: "linear-gradient(135deg, #818cf8, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>IC News</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#f8fafc" }}>Latest insights</h2>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#818cf8" }}>View all <ArrowRight size={16} /></a>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "Full-Cup Recovery: Spain's HoReCa Coffee Market", tag: "Food & Beverage", date: "Feb 2026" },
              { title: "European Sanitary Pipes: Downturn to Stabilization", tag: "Construction", date: "Jan 2026" },
              { title: "IC Social Media Insights: Boating Industry 2026", tag: "Leisure", date: "Mar 2026" },
            ].map((article, idx) => (
              <AnimatedSection key={article.title} delay={idx * 0.1}>
                <article className="group cursor-pointer p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid #1e293b" }}>
                  <div className="aspect-[16/10] rounded-xl overflow-hidden relative mb-5">
                    <Image src="/images/hero-gradient.jpg" alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold" style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc" }}>{article.tag}</span>
                    <span className="text-xs" style={{ color: "#475569" }}>{article.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold leading-snug mb-3" style={{ color: "#f1f5f9" }}>{article.title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "#818cf8" }}>
                    Read article <ArrowUpRight size={14} />
                  </span>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 lg:py-36">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8" style={{ color: "#f8fafc" }}>
              Join the 4,458+ companies using ICC
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-lg mb-12 max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
              Custom market intelligence that drives real growth.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <a href="#" className="inline-flex items-center justify-center gap-2 px-10 py-4.5 rounded-full text-base font-semibold hover:brightness-110 transition-all" style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "#fff" }}>
              Get Interconnection
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
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
                {["Imprint", "Privacy", "Terms", "Cookies"].map(l => (
                  <a key={l} href="#" className="text-sm" style={{ color: "#64748b" }}>{l}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8" style={{ borderTop: "1px solid #1e293b" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center font-bold text-[10px]" style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "#fff" }}>IC</div>
              <span className="text-sm font-medium" style={{ color: "#64748b" }}>Interconnection Consulting</span>
            </div>
            <p className="text-xs" style={{ color: "#334155" }}>2026 Interconnection Consulting GmbH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
