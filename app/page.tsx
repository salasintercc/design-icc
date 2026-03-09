"use client"

import { useState, useEffect } from "react"
import TemplateDarkExecutive from "@/components/templates/template-dark-executive"
import TemplateLightMinimalist from "@/components/templates/template-light-minimalist"
import TemplateBoldGradient from "@/components/templates/template-bold-gradient"
import TemplateCorporateElegant from "@/components/templates/template-corporate-elegant"
import TemplateICBlueProfessional from "@/components/templates/template-ic-blue-professional"
import TemplateICEditorial from "@/components/templates/template-ic-editorial"

const TEMPLATES = [
  {
    id: "ic-blue-professional",
    name: "IC Blue Professional",
    description: "Light white base, strong IC Blue structure. Classic, authoritative, brand-true.",
    colors: ["#FFFFFF", "#24579B", "#DCE6F2", "#8EB4E3"],
    preview: "bg-white",
    badge: "New",
  },
  {
    id: "ic-editorial",
    name: "IC Editorial",
    description: "Airy white & light blue. Editorial layout, IC Blue used as a refined accent.",
    colors: ["#F5F8FC", "#24579B", "#376092", "#DCE6F2"],
    preview: "bg-[#F5F8FC]",
    badge: "New",
  },
  {
    id: "dark-executive",
    name: "Dark Executive",
    description: "Dark navy with cyan accents. Bold, authoritative, data-driven.",
    colors: ["#0a1628", "#38bdf8", "#0f1d32", "#f8fafc"],
    preview: "bg-[#0a1628]",
  },
  {
    id: "light-minimalist",
    name: "Light Minimalist",
    description: "Clean white with blue accents. Modern, airy, Revolut-inspired.",
    colors: ["#fafbfc", "#3b82f6", "#0f172a", "#f1f5f9"],
    preview: "bg-[#fafbfc]",
  },
  {
    id: "bold-gradient",
    name: "Bold Gradient",
    description: "Dark with indigo-to-cyan gradients. Futuristic, tech-forward.",
    colors: ["#020617", "#6366f1", "#06b6d4", "#818cf8"],
    preview: "bg-[#020617]",
  },
  {
    id: "corporate-elegant",
    name: "Corporate Elegant",
    description: "Warm neutrals with gold accents. Premium, sophisticated, timeless.",
    colors: ["#faf8f5", "#1c1917", "#d6a756", "#f5f0eb"],
    preview: "bg-[#faf8f5]",
  },
]

export default function HomePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [selectedTemplate])

  function selectTemplate(id: string) {
    setSelectedTemplate(id)
  }

  function goBack() {
    setSelectedTemplate(null)
  }

  if (selectedTemplate) {
    return (
      <div className="relative">
        <button
          onClick={goBack}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-5 py-2.5 rounded-none text-xs font-semibold transition-all hover:opacity-80 opacity-30 hover:opacity-80 focus:opacity-80"
          style={{
            background: "rgba(0,0,0,0.55)",
            color: "#fff",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
          Back
        </button>

        {selectedTemplate === "dark-executive" && <TemplateDarkExecutive />}
        {selectedTemplate === "light-minimalist" && <TemplateLightMinimalist />}
        {selectedTemplate === "bold-gradient" && <TemplateBoldGradient />}
        {selectedTemplate === "corporate-elegant" && <TemplateCorporateElegant />}
        {selectedTemplate === "ic-blue-professional" && <TemplateICBlueProfessional />}
        {selectedTemplate === "ic-editorial" && <TemplateICEditorial />}
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 lg:px-16 py-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: "#fff", color: "#0a0a0a" }}>IC</div>
          <span className="text-lg font-semibold tracking-tight" style={{ color: "#fafafa" }}>ICC Redesign</span>
        </div>
        <p className="text-sm font-medium" style={{ color: "#525252" }}>6 Template Proposals</p>
      </header>

      {/* Hero */}
      <section className="px-6 lg:px-16 pt-8 pb-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#525252" }}>Homepage Redesign</p>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight leading-tight mb-2" style={{ color: "#fafafa" }}>
            Interconnection Consulting
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "#737373" }}>
            Select a template to preview the full homepage redesign.
          </p>
        </div>
      </section>

      {/* Template Grid */}
      <section className="px-6 lg:px-16 pb-32">
        <div className="grid md:grid-cols-2 gap-6">
          {TEMPLATES.map((template, idx) => (
            <button
              key={template.id}
              onClick={() => selectTemplate(template.id)}
              className="group relative flex flex-col items-start text-left p-8 lg:p-10 rounded-2xl transition-all duration-300 cursor-pointer hover:border-[#404040]"
              style={{
                background: "#141414",
                border: "1px solid #262626",
              }}
            >
              {/* Template number + badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm font-mono font-medium" style={{ color: "#525252" }}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {(template as any).badge && (
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                    style={{ background: "#24579B", color: "#fff" }}
                  >
                    {(template as any).badge}
                  </span>
                )}
              </div>

              {/* Color swatches — only for non-IC templates */}
              {!(template as any).badge && (
                <div className="flex gap-2 mb-6">
                  {template.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full"
                      style={{ background: color, border: "1px solid rgba(255,255,255,0.08)" }}
                    />
                  ))}
                </div>
              )}

              {/* IC Editorial — visual preview */}
              {template.id === "ic-editorial" && (
                <div className="w-full mb-6 overflow-hidden pointer-events-none select-none" style={{ background: "#fff", borderRadius: 6, border: "1px solid #dce6f2" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", minHeight: 152 }}>
                    <div style={{ padding: "12px 12px 10px", background: "#f5f8fc" }}>
                      <p style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.22em", color: "#24579B", textTransform: "uppercase", marginBottom: 7 }}>Interconnection Consulting</p>
                      <p style={{ fontSize: 19, fontWeight: 900, color: "#4d4d4d", lineHeight: 0.95, marginBottom: 4 }}>Defining Growth<br />Potential</p>
                      <p style={{ fontSize: 13, fontWeight: 400, fontStyle: "italic", color: "#24579B", marginBottom: 10 }}>Since 1998</p>
                      <div style={{ borderTop: "1px solid #dce6f2", paddingTop: 7, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 8, fontWeight: 700, color: "#24579B", background: "#dce6f2", borderRadius: 99, padding: "3px 8px" }}>Contact us</span>
                        <span style={{ fontSize: 8, color: "#7f7f7f" }}>Talk to our Experts</span>
                      </div>
                    </div>
                    <div style={{ borderLeft: "1px solid #dce6f2", background: "linear-gradient(180deg, #edf3fa 0%, #ffffff 100%)", position: "relative" }}>
                      <div style={{ position: "absolute", inset: "10px", border: "1px solid #dce6f2", background: "#fff" }} />
                      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: "#24579B" }} />
                      <div style={{ position: "absolute", left: 10, right: 10, bottom: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                        <div style={{ background: "#f5f8fc", border: "1px solid #dce6f2", padding: "6px" }}>
                          <p style={{ fontSize: 6, color: "#7f7f7f", letterSpacing: "0.08em", textTransform: "uppercase" }}>Editorial</p>
                          <p style={{ fontSize: 9, fontWeight: 700, color: "#4d4d4d" }}>White + Blue</p>
                        </div>
                        <div style={{ background: "#f5f8fc", border: "1px solid #dce6f2", padding: "6px" }}>
                          <p style={{ fontSize: 6, color: "#7f7f7f", letterSpacing: "0.08em", textTransform: "uppercase" }}>Clean Grid</p>
                          <p style={{ fontSize: 9, fontWeight: 700, color: "#24579B" }}>Swiss layout</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* IC Blue Professional — visual preview */}
              {template.id === "ic-blue-professional" && (
                <div className="w-full mb-6 overflow-hidden pointer-events-none select-none" style={{ borderRadius: 6, border: "1px solid rgba(142,180,227,0.25)", background: "#1e4a86" }}>
                  <div style={{ padding: "8px 12px", borderBottom: "1px solid rgba(142,180,227,0.25)", color: "rgba(220,230,242,0.92)", fontSize: 7, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}>
                    Interconnection Consulting · Blue Professional
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", minHeight: 152 }}>
                    <div style={{ padding: "12px 12px 10px" }}>
                      <p style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.22em", color: "#8EB4E3", textTransform: "uppercase", marginBottom: 6 }}>Hero</p>
                      <p style={{ fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 0.95, marginBottom: 6 }}>Defining Growth<br />Potential</p>
                      <p style={{ fontSize: 14, fontWeight: 400, fontStyle: "italic", color: "#8EB4E3", marginBottom: 8 }}>Since 1998</p>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {["14,889 reports", "50+ industries", "35+ years"].map((t) => (
                          <span key={t} style={{ fontSize: 7, color: "#dce6f2", border: "1px solid rgba(142,180,227,0.3)", padding: "2px 5px", background: "rgba(255,255,255,0.07)" }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ borderLeft: "1px solid rgba(142,180,227,0.22)", background: "linear-gradient(160deg, rgba(220,230,242,0.18) 0%, rgba(142,180,227,0.08) 65%, rgba(36,87,155,0.2) 100%)", padding: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, alignContent: "end" }}>
                      {["14,889", "50+", "35+", "200+"].map((n) => (
                        <div key={n} style={{ border: "1px solid rgba(142,180,227,0.25)", background: "rgba(255,255,255,0.08)", padding: "6px 6px" }}>
                          <p style={{ fontSize: 11, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{n}</p>
                          <p style={{ fontSize: 6, color: "#8EB4E3", textTransform: "uppercase", letterSpacing: "0.08em" }}>KPI</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Info */}
              <h2 className="text-2xl font-bold tracking-tight mb-3" style={{ color: "#fafafa" }}>
                {template.name}
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "#737373" }}>
                {template.description}
              </p>

              {/* CTA */}
              <span className="inline-flex items-center gap-2 text-sm font-semibold mt-auto transition-all group-hover:gap-3" style={{ color: "#a3a3a3" }}>
                Preview Template
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-16 py-8 border-t" style={{ borderColor: "#1a1a1a" }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: "#404040" }}>ICC Redesign Proposal - 2026</p>
          <p className="text-sm" style={{ color: "#404040" }}>Based on interconnectionconsulting.com</p>
        </div>
      </footer>
    </div>
  )
}
