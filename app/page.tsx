"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import TemplateDarkExecutive from "@/components/templates/template-dark-executive"
import TemplateLightMinimalist from "@/components/templates/template-light-minimalist"
import TemplateBoldGradient from "@/components/templates/template-bold-gradient"
import TemplateCorporateElegant from "@/components/templates/template-corporate-elegant"
import TemplateICBlueProfessional from "@/components/templates/template-ic-blue-professional"
import TemplateICBlueProfessionalAlt from "@/components/templates/template-ic-blue-professional-alt"
import TemplateICBlueProfessionalV2 from "@/components/templates/template-ic-blue-professional-v2"
import TemplateICBlueProfessionalLight from "@/components/templates/template-ic-blue-professional-light"
import TemplateICEditorial from "@/components/templates/template-ic-editorial"

const TEMPLATES = [
  {
    id: "ic-blue-professional-alt",
    name: "IC Blue Professional",
    description: "Same structure, alternate palette and smoother reference transitions.",
    colors: ["#1E4A86", "#24579B", "#8EB4E3", "#DCE6F2"],
    preview: "bg-[#1E4A86]",
    badge: "New",
    route: "/blue",
  },
  {
    id: "ic-blue-professional-v2",
    name: "IC Gray Professional",
    description: "Refined version with unified typography, compressed cards and polished animations.",
    colors: ["#4D4D4D", "#FFFFFF", "#24579B", "#8EB4E3"],
    preview: "bg-[#4D4D4D]",
    badge: "Latest",
    route: "/gray",
  },
  {
    id: "ic-blue-professional-light",
    name: "IC Blue Professional Light",
    description: "Same structure as V2 but in full light mode — white body, IC Blue hero, blue gradient contact panel.",
    colors: ["#FFFFFF", "#24579B", "#1E4A86", "#DCE6F2"],
    preview: "bg-white",
    badge: "New",
    route: "/light",
  },
  {
    id: "ic-blue-professional",
    name: "IC Blue Professional old version",
    description: "Light white base, strong IC Blue structure. Classic, authoritative, brand-true.",
    colors: ["#FFFFFF", "#24579B", "#DCE6F2", "#8EB4E3"],
    preview: "bg-white",
  },
  {
    id: "ic-editorial",
    name: "IC Editorial",
    description: "Airy white & light blue. Editorial layout, IC Blue used as a refined accent.",
    colors: ["#F5F8FC", "#24579B", "#376092", "#DCE6F2"],
    preview: "bg-[#F5F8FC]",
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

const IC_COLORS = [
  { token: "blue", name: "IC Blue", hex: "#24579B", usage: "Primary actions, links, key accents" },
  { token: "blueDark", name: "Blue Akzent Darker 25%", hex: "#376092", usage: "Hero overlays, depth backgrounds" },
  { token: "blueLight", name: "IC Blue Light", hex: "#8EB4E3", usage: "Search bars, soft highlights" },
  { token: "blueXL", name: "IC Blue XL", hex: "#DCE6F2", usage: "Borders, chips, subtle surfaces" },
  { token: "gray80", name: "Gray 80", hex: "#4D4D4D", usage: "Headings on light surfaces" },
  { token: "gray50", name: "Gray 50", hex: "#7F7F7F", usage: "Body text and metadata" },
  { token: "grayLight", name: "Gray Light", hex: "#C2C2C2", usage: "Dividers and disabled states" },
  { token: "white", name: "White", hex: "#FFFFFF", usage: "Cards, primary contrast backgrounds" },
]

const IC_TYPE_SCALE = [
  { role: "H1 / Hero", size: "clamp(64px, 15.2vw, 86px)", weight: "900", sample: "Defining Better Growth Potential" },
  { role: "H2 / Section", size: "clamp(36px, 4.1vw, 56px)", weight: "700", sample: "Turn data into revenue" },
  { role: "H3 / Block", size: "23–30px", weight: "700", sample: "Sales Growth Through Market Intelligence" },
  { role: "Body", size: "13–16px", weight: "400", sample: "Readable, practical text for long sections and cards." },
  { role: "Eyebrow", size: "10–11px", weight: "700", sample: "HOW WE MAKE CUSTOMERS SUCCESSFUL" },
  { role: "Link / CTA", size: "12–14px", weight: "600–700", sample: "Our Services and Tools" },
  { role: "Nav", size: "13–14px", weight: "400–500", sample: "Reports & Tools · News · Events" },
]

const IC_COMPONENT_SIZES = [
  {
    component: "Button · Primary",
    desktop: "h-44px · px-28px · text 14px",
    mobile: "h-40px · px-22px · text 13px",
    radius: "999px",
  },
  {
    component: "Button · Secondary/Ghost",
    desktop: "h-44px · px-24px · text 14px",
    mobile: "h-38px · px-18px · text 12px",
    radius: "999px",
  },
  {
    component: "Search container",
    desktop: "h-84px (input 56px + paddings)",
    mobile: "h-64px (input 44–48px + paddings)",
    radius: "14–18px",
  },
  {
    component: "Search button",
    desktop: "h-44px · min-w 124px · text 14px",
    mobile: "h-40px · min-w 88px · text 12px",
    radius: "999px",
  },
  {
    component: "Tag / Chip",
    desktop: "h-32px · px-16px · text 11px",
    mobile: "h-28px · px-12px · text 10px",
    radius: "999px",
  },
  {
    component: "News / Event card row",
    desktop: "min-h 176px · py 20px",
    mobile: "min-h 148px · py 16px",
    radius: "0px (row) / 22px (reference card)",
  },
]

export default function HomePage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [selectedTemplate])

  function selectTemplate(id: string) {
    const tpl = TEMPLATES.find(t => t.id === id)
    if (tpl && "route" in tpl && tpl.route) {
      router.push(tpl.route as string)
      return
    }
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
        {selectedTemplate === "ic-blue-professional-alt" && <TemplateICBlueProfessionalAlt />}
        {selectedTemplate === "ic-blue-professional-v2" && <TemplateICBlueProfessionalV2 />}
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
        <p className="text-sm font-medium" style={{ color: "#525252" }}>{TEMPLATES.length} Template Proposals</p>
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

      {/* Design System Card */}
      <section className="px-6 lg:px-16 pb-6">
        <div className="rounded-2xl p-6 lg:p-7" style={{ background: "#141414", border: "1px solid #262626" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#525252" }}>Design System</p>
          <p className="text-lg font-bold mb-1" style={{ color: "#fafafa" }}>IC Blue Professional</p>
          <p className="text-sm mb-4" style={{ color: "#525252" }}>Tipografía: <span style={{ color: "#a3a3a3" }}>Geist</span> · Base: <span style={{ color: "#a3a3a3" }}>13px</span></p>

          <div className="grid xl:grid-cols-2 gap-5">
            {/* Color Palette */}
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: "#737373" }}>Paleta de colores · Tokens</p>
              <div className="grid grid-cols-1 gap-1.5">
                {IC_COLORS.map((c) => (
                  <div key={c.token} className="flex items-center gap-3 py-2 px-2.5 rounded-md" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <div className="w-6 h-6 rounded-md flex-shrink-0" style={{ background: c.hex, border: "1px solid rgba(255,255,255,0.12)" }} />
                    <div className="min-w-[80px] text-[11px] font-mono" style={{ color: "#8EB4E3" }}>{c.hex}</div>
                    <div className="min-w-[145px] text-[11px] font-semibold" style={{ color: "#d4d4d4" }}>{c.name}</div>
                    <div className="text-[10px] leading-relaxed" style={{ color: "#8a8a8a" }}>{c.usage}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: "#737373" }}>Tipografía · Geist</p>
              <div className="flex flex-col gap-1.5">
                {IC_TYPE_SCALE.map((t) => (
                  <div key={t.role} className="py-2 px-2.5 rounded-md" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className="text-[11px] font-semibold" style={{ color: "#d4d4d4" }}>{t.role}</span>
                      <span className="text-[10px] font-mono" style={{ color: "#737373" }}>{t.size} · w{t.weight}</span>
                    </div>
                    <p className="text-[12px]" style={{ color: "#a3a3a3" }}>{t.sample}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Components */}
            <div className="xl:col-span-2">
              <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: "#737373" }}>Componentes UI que usaremos</p>
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: "#8EB4E3" }}>Buttons / CTA</p>
                  <div className="flex flex-wrap gap-2.5 items-center">
                    <span className="inline-flex items-center justify-center h-9 px-5 rounded-full text-[12px] font-bold" style={{ background: "#FFFFFF", color: "#24579B" }}>Primary light</span>
                    <span className="inline-flex items-center justify-center h-9 px-5 rounded-full text-[12px] font-bold" style={{ background: "#24579B", color: "#FFFFFF" }}>Primary blue</span>
                    <span className="inline-flex items-center justify-center h-9 px-4 rounded-full text-[12px] font-semibold" style={{ border: "1px solid #DCE6F2", color: "#DCE6F2" }}>Secondary ghost</span>
                  </div>
                </div>

                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: "#8EB4E3" }}>Search / Input</p>
                  <div className="rounded-xl h-11 px-3 flex items-center justify-between" style={{ background: "#8EB4E3" }}>
                    <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.85)" }}>Explore our Industry Markets</span>
                    <span className="inline-flex items-center justify-center h-8 px-4 rounded-full text-[11px] font-bold" style={{ background: "#24579B", color: "#FFFFFF" }}>Search</span>
                  </div>
                </div>

                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: "#8EB4E3" }}>Tags / Chips</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Automotive",
                      "Chemicals",
                      "Energy",
                      "Healthcare",
                    ].map((chip) => (
                      <span key={chip} className="inline-flex items-center h-7 px-3 rounded-full text-[10px] font-bold tracking-[0.16em]" style={{ background: "rgba(220,230,242,0.82)", color: "#24579B" }}>
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: "#8EB4E3" }}>Content card</p>
                  <div className="rounded-xl p-3" style={{ background: "#FFFFFF", border: "1px solid #DCE6F2" }}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-1" style={{ color: "#24579B" }}>News</p>
                    <p className="text-[13px] font-semibold mb-1" style={{ color: "#4D4D4D" }}>How AI reshapes market intelligence</p>
                    <p className="text-[12px] leading-relaxed" style={{ color: "#7F7F7F" }}>Compact cards with clear hierarchy and strong readability.</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: "#8EB4E3" }}>Sizes & layout specs (base para desarrollo)</p>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left border-separate border-spacing-y-1">
                    <thead>
                      <tr>
                        <th className="py-1.5 px-2 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "#a3a3a3" }}>Componente</th>
                        <th className="py-1.5 px-2 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "#a3a3a3" }}>Desktop</th>
                        <th className="py-1.5 px-2 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "#a3a3a3" }}>Mobile</th>
                        <th className="py-1.5 px-2 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "#a3a3a3" }}>Radius</th>
                      </tr>
                    </thead>
                    <tbody>
                      {IC_COMPONENT_SIZES.map((s) => (
                        <tr key={s.component} style={{ background: "rgba(255,255,255,0.02)" }}>
                          <td className="py-2 px-2 text-[12px] font-semibold" style={{ color: "#d4d4d4" }}>{s.component}</td>
                          <td className="py-2 px-2 text-[11px]" style={{ color: "#b8b8b8" }}>{s.desktop}</td>
                          <td className="py-2 px-2 text-[11px]" style={{ color: "#b8b8b8" }}>{s.mobile}</td>
                          <td className="py-2 px-2 text-[11px] font-mono" style={{ color: "#8EB4E3" }}>{s.radius}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
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

              {/* IC Blue Professional Light — visual preview */}
              {template.id === "ic-blue-professional-light" && (
                <div className="w-full mb-6 overflow-hidden pointer-events-none select-none" style={{ borderRadius: 6, border: "1px solid rgba(220,230,242,0.3)", background: "#ffffff" }}>
                  <div style={{ padding: "8px 12px", borderBottom: "1px solid #DCE6F2", color: "#24579B", fontSize: 7, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}>
                    Interconnection Consulting · Blue Professional Light
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", minHeight: 152 }}>
                    <div style={{ padding: "12px 12px 10px", background: "linear-gradient(180deg, #F7F9FC 0%, #FFFFFF 100%)" }}>
                      <p style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.22em", color: "#24579B", textTransform: "uppercase", marginBottom: 6 }}>Hero</p>
                      <p style={{ fontSize: 20, fontWeight: 900, color: "#4D4D4D", lineHeight: 0.95, marginBottom: 6 }}>Defining Growth<br />Potential</p>
                      <p style={{ fontSize: 13, fontWeight: 400, fontStyle: "italic", color: "#24579B", marginBottom: 8 }}>Since 1998</p>
                      <div style={{ borderTop: "1px solid #DCE6F2", paddingTop: 7, display: "flex", gap: 5 }}>
                        <span style={{ fontSize: 8, fontWeight: 700, color: "#fff", background: "#24579B", padding: "3px 8px" }}>Contact us</span>
                        <span style={{ fontSize: 8, color: "#7F7F7F" }}>Light mode</span>
                      </div>
                    </div>
                    <div style={{ borderLeft: "1px solid #DCE6F2", background: "linear-gradient(180deg, #1E4A86 0%, #24579B 100%)", padding: 8, display: "grid", gap: 6 }}>
                      <div style={{ border: "1px solid rgba(220,230,242,0.35)", background: "rgba(255,255,255,0.08)", height: 76 }} />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                        <div style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(220,230,242,0.35)", padding: "6px" }}>
                          <p style={{ fontSize: 6, color: "#DCE6F2", letterSpacing: "0.08em", textTransform: "uppercase" }}>Palette</p>
                          <p style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>White + Blue</p>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(220,230,242,0.35)", padding: "6px" }}>
                          <p style={{ fontSize: 6, color: "#DCE6F2", letterSpacing: "0.08em", textTransform: "uppercase" }}>Style</p>
                          <p style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>Clean light</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* IC Blue Professional V2 — visual preview */}
              {template.id === "ic-blue-professional-v2" && (
                <div className="w-full mb-6 overflow-hidden pointer-events-none select-none" style={{ borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)", background: "rgb(77,77,77)" }}>
                  <div style={{ padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontSize: 7, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}>
                    Interconnection Consulting · Gray Professional
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", minHeight: 152 }}>
                    <div style={{ padding: "12px 12px 10px" }}>
                      <p style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.22em", color: "#8EB4E3", textTransform: "uppercase", marginBottom: 6 }}>Hero</p>
                      <p style={{ fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 0.95, marginBottom: 6 }}>Defining Growth<br />Potential</p>
                      <p style={{ fontSize: 14, fontWeight: 400, fontStyle: "italic", color: "#8EB4E3", marginBottom: 10 }}>Since 1998</p>
                      <div style={{ display: "flex", gap: 5 }}>
                        <span style={{ fontSize: 8, fontWeight: 700, color: "#fff", background: "rgb(127,127,127)", border: "1px solid #24579B", padding: "3px 8px" }}>Talk to our Experts</span>
                      </div>
                    </div>
                    <div style={{ borderLeft: "1px solid rgba(255,255,255,0.12)", background: "#fff", padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                      <div style={{ background: "#F7F9FC", border: "1px solid #DCE6F2", padding: "6px 8px" }}>
                        <p style={{ fontSize: 6, color: "#8EB4E3", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>What we do</p>
                        <p style={{ fontSize: 9, fontWeight: 700, color: "#2C2C2C" }}>Industry Experience</p>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                        {[["14,889+","Reports"],["35+","Years"]].map(([n,l]) => (
                          <div key={n} style={{ background: "#fff", border: "1px solid #DCE6F2", padding: "5px" }}>
                            <p style={{ fontSize: 10, fontWeight: 800, color: "#8EB4E3", lineHeight: 1 }}>{n}</p>
                            <p style={{ fontSize: 6, color: "rgb(127,127,127)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* IC Blue Professional Alt — visual preview */}
              {template.id === "ic-blue-professional-alt" && (
                <div className="w-full mb-6 overflow-hidden pointer-events-none select-none" style={{ borderRadius: 6, border: "1px solid rgba(142,180,227,0.28)", background: "#12396f" }}>
                  <div style={{ padding: "8px 12px", borderBottom: "1px solid rgba(142,180,227,0.28)", color: "rgba(220,230,242,0.92)", fontSize: 7, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}>
                    Interconnection Consulting · Blue Professional
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", minHeight: 152 }}>
                    <div style={{ padding: "12px 12px 10px", background: "linear-gradient(180deg, #1e4a86 0%, #24579B 100%)" }}>
                      <p style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.22em", color: "#8EB4E3", textTransform: "uppercase", marginBottom: 6 }}>Hero</p>
                      <p style={{ fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 0.95, marginBottom: 6 }}>Defining Growth<br />Potential</p>
                      <p style={{ fontSize: 13, fontWeight: 400, fontStyle: "italic", color: "#DCE6F2", marginBottom: 8 }}>Since 1998</p>
                      <div style={{ borderTop: "1px solid rgba(220,230,242,0.25)", paddingTop: 7, display: "flex", gap: 5 }}>
                        <span style={{ fontSize: 8, fontWeight: 700, color: "#24579B", background: "#DCE6F2", borderRadius: 99, padding: "3px 8px" }}>Contact us</span>
                        <span style={{ fontSize: 8, color: "#dce6f2" }}>Smooth transitions</span>
                      </div>
                    </div>
                    <div style={{ borderLeft: "1px solid rgba(142,180,227,0.25)", background: "linear-gradient(180deg, #0f2d56 0%, #1e4a86 100%)", padding: 8, display: "grid", gap: 6 }}>
                      <div style={{ border: "1px solid rgba(142,180,227,0.25)", background: "rgba(255,255,255,0.08)", height: 76 }} />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                        <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(142,180,227,0.25)", padding: "6px" }}>
                          <p style={{ fontSize: 6, color: "#8EB4E3", letterSpacing: "0.08em", textTransform: "uppercase" }}>Reference</p>
                          <p style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>Soft In/Out</p>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(142,180,227,0.25)", padding: "6px" }}>
                          <p style={{ fontSize: 6, color: "#8EB4E3", letterSpacing: "0.08em", textTransform: "uppercase" }}>Palette</p>
                          <p style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>Alt Blue</p>
                        </div>
                      </div>
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
