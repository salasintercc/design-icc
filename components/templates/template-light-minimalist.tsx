"use client"

import { ArrowRight, BarChart3, Users, Lightbulb, Database, ChevronRight, Menu, X, TrendingUp, Globe, ArrowUpRight } from "lucide-react"
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
    <div ref={ref} className={className} style={{ ...style, opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>
      {children}
    </div>
  )
}

export default function TemplateLightMinimalist() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: "#fafbfc", color: "#1e293b" }}>
      {/* Navbar - Revolut style clean */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          paddingTop: scrolled ? 16 : 24,
          paddingBottom: scrolled ? 16 : 24,
          borderBottom: scrolled ? "1px solid #e2e8f0" : "1px solid transparent",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: "#0f172a", color: "#fff" }}>IC</div>
          <span className="text-base font-semibold tracking-tight" style={{ color: "#0f172a" }}>Interconnection</span>
        </div>
        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(link => (
            <a key={link} href="#" className="text-[13px] font-medium transition-colors" style={{ color: "#64748b" }}>{link}</a>
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <a href="#" className="text-[13px] font-medium px-4 py-2 rounded-full" style={{ color: "#64748b" }}>Log in</a>
          <a href="#" className="text-[13px] font-semibold px-5 py-2.5 rounded-full" style={{ background: "#0f172a", color: "#fff" }}>
            Get Started
          </a>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden" aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={22} style={{ color: "#0f172a" }} /> : <Menu size={22} style={{ color: "#0f172a" }} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 pt-20 px-6 flex flex-col" style={{ background: "#fff" }}>
          <div className="flex flex-col gap-1 py-8 flex-1">
            {NAV_LINKS.map(link => (
              <a key={link} href="#" className="text-2xl font-semibold py-3" style={{ color: "#0f172a" }}>{link}</a>
            ))}
          </div>
          <div className="flex flex-col gap-3 pb-10">
            <a href="#" className="text-base font-semibold px-6 py-3.5 rounded-full text-center" style={{ background: "#0f172a", color: "#fff" }}>Get Started</a>
          </div>
        </div>
      )}

      {/* Hero - Revolut style: massive text centered */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-12 py-32 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-10" style={{ background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0" }}>
              Trusted by 4,458+ enterprises since 1998
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.95] mb-8" style={{ color: "#0f172a" }}>
              Market intelligence,<br />
              <span style={{ color: "#3b82f6" }}>simplified.</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto" style={{ color: "#64748b" }}>
              For those who want more from their market data — there{"'"}s ICC. Transform complexity into clarity, insights into action.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold" style={{ background: "#0f172a", color: "#fff" }}>
                Explore Services
              </a>
              <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-medium" style={{ border: "1px solid #e2e8f0", color: "#334155" }}>
                View Reports <ArrowRight size={16} />
              </a>
            </div>
          </AnimatedSection>
        </div>
        {/* Hero image below text */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6">
          <div className="h-20 rounded-t-3xl overflow-hidden" style={{ background: "linear-gradient(to top, #f1f5f9, transparent)" }} />
        </div>
      </section>

      {/* Feature image section */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden">
              <Image src="/images/hero-light.jpg" alt="ICC workspace" fill className="object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,23,42,0.7) 0%, transparent 60%)" }} />
              <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12">
                <p className="text-sm font-semibold mb-2" style={{ color: "#93c5fd" }}>Global Coverage</p>
                <h3 className="text-2xl md:text-3xl font-bold" style={{ color: "#fff" }}>50+ industries worldwide</h3>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
            {STATS.map((stat, idx) => (
              <AnimatedSection key={stat.label} delay={idx * 0.1} className="text-center">
                <span className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#0f172a" }}>{stat.value}</span>
                <p className="text-sm font-medium mt-2" style={{ color: "#94a3b8" }}>{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services - tabbed Revolut style */}
      <section className="py-28 lg:py-36" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-5" style={{ color: "#3b82f6" }}>Services</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl" style={{ color: "#0f172a" }}>
              However you grow — ICC is all you need
            </h2>
          </AnimatedSection>

          {/* Revolut-style tab pills */}
          <div className="flex gap-2 mb-12 overflow-x-auto pb-2">
            {SERVICES.map((service, idx) => (
              <button
                key={service.title}
                onClick={() => setActiveTab(idx)}
                className="px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  background: activeTab === idx ? "#0f172a" : "#f1f5f9",
                  color: activeTab === idx ? "#fff" : "#64748b",
                }}
              >
                {service.tag}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ background: "#eff6ff" }}>
                {(() => { const Icon = SERVICES[activeTab].icon; return <Icon size={28} style={{ color: "#3b82f6" }} /> })()}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-5" style={{ color: "#0f172a" }}>
                {SERVICES[activeTab].title}
              </h3>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#64748b" }}>
                {SERVICES[activeTab].desc}
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-base font-semibold" style={{ color: "#3b82f6" }}>
                Learn more <ArrowRight size={16} />
              </a>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden" style={{ background: "#f1f5f9" }}>
              <Image src="/images/hero-light.jpg" alt={SERVICES[activeTab].title} fill className="object-cover" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl shadow-lg" style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium mb-1" style={{ color: "#94a3b8" }}>Active projects</p>
                    <p className="text-2xl font-bold" style={{ color: "#0f172a" }}>3,167+</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "#eff6ff" }}>
                    <TrendingUp size={14} style={{ color: "#3b82f6" }} />
                    <span className="text-xs font-semibold" style={{ color: "#3b82f6" }}>+23%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries grid - Revolut card style */}
      <section className="py-28 lg:py-36" style={{ background: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-5" style={{ color: "#3b82f6" }}>Industries</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto" style={{ color: "#0f172a" }}>
              50+ industries. One partner.
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
                style={{ background: "#fff", border: "1px solid #e2e8f0" }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#eff6ff" }}>
                    <industry.icon size={18} style={{ color: "#3b82f6" }} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold" style={{ color: "#0f172a" }}>{industry.name}</h3>
                    <p className="text-xs" style={{ color: "#94a3b8" }}>{industry.count}</p>
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: "#cbd5e1" }} className="transition-transform group-hover:translate-x-1" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-28 lg:py-36" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase mb-5" style={{ color: "#3b82f6" }}>IC News</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#0f172a" }}>Latest insights</h2>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#3b82f6" }}>View all <ArrowRight size={16} /></a>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Full-Cup Recovery: Spain's HoReCa Coffee Market", tag: "Food & Beverage", date: "Feb 2026" },
              { title: "European Sanitary Pipes: From Downturn to Stabilization", tag: "Construction", date: "Jan 2026" },
              { title: "IC Social Media Insights: Boating Industry 2026", tag: "Leisure", date: "Mar 2026" },
            ].map((article, idx) => (
              <AnimatedSection key={article.title} delay={idx * 0.1}>
                <article className="group cursor-pointer">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden relative mb-5">
                    <Image src="/images/hero-light.jpg" alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold" style={{ background: "#eff6ff", color: "#3b82f6" }}>{article.tag}</span>
                    <span className="text-xs" style={{ color: "#94a3b8" }}>{article.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold leading-snug mb-2" style={{ color: "#0f172a" }}>{article.title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "#3b82f6" }}>
                    Read article <ArrowUpRight size={14} />
                  </span>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Revolut "Join" style */}
      <section className="py-28 lg:py-36">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="rounded-[2rem] p-12 lg:p-20 text-center" style={{ background: "#0f172a" }}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8" style={{ color: "#fff" }}>
                Join the 4,458+ companies using ICC
              </h2>
              <p className="text-lg mb-12 max-w-lg mx-auto" style={{ color: "#94a3b8" }}>
                Get started with market intelligence that drives real growth.
              </p>
              <a href="#" className="inline-flex items-center justify-center gap-2 px-10 py-4.5 rounded-full text-base font-semibold" style={{ background: "#fff", color: "#0f172a" }}>
                Get Interconnection
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer - Revolut grid */}
      <footer className="py-16" style={{ borderTop: "1px solid #e2e8f0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div>
              <h4 className="text-sm font-semibold mb-5" style={{ color: "#0f172a" }}>Services</h4>
              <div className="flex flex-col gap-3">
                {["Market Analysis", "Customer Insights", "Innovation", "Big Data & MIS"].map(l => (
                  <a key={l} href="#" className="text-sm" style={{ color: "#94a3b8" }}>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-5" style={{ color: "#0f172a" }}>Industries</h4>
              <div className="flex flex-col gap-3">
                {["Automotive", "Construction", "Consumer Goods", "Technology"].map(l => (
                  <a key={l} href="#" className="text-sm" style={{ color: "#94a3b8" }}>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-5" style={{ color: "#0f172a" }}>Company</h4>
              <div className="flex flex-col gap-3">
                {["About ICC", "Careers", "Events", "Contact"].map(l => (
                  <a key={l} href="#" className="text-sm" style={{ color: "#94a3b8" }}>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-5" style={{ color: "#0f172a" }}>Legal</h4>
              <div className="flex flex-col gap-3">
                {["Imprint", "Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
                  <a key={l} href="#" className="text-sm" style={{ color: "#94a3b8" }}>{l}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8" style={{ borderTop: "1px solid #e2e8f0" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px]" style={{ background: "#0f172a", color: "#fff" }}>IC</div>
              <span className="text-sm font-medium" style={{ color: "#94a3b8" }}>Interconnection Consulting</span>
            </div>
            <p className="text-xs" style={{ color: "#cbd5e1" }}>2026 Interconnection Consulting GmbH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
