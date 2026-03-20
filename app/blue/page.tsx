"use client"

import Link from "next/link"
import TemplateICBlueProfessionalAlt from "@/components/templates/template-ic-blue-professional-alt"

export default function AltPage() {
  return (
    <div className="relative">
      <Link
        href="/"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-5 py-2.5 text-xs font-semibold opacity-30 hover:opacity-80 transition-opacity focus:opacity-80"
        style={{
          background: "rgba(0,0,0,0.55)",
          color: "#fff",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
        </svg>
        Back
      </Link>
      <TemplateICBlueProfessionalAlt />
    </div>
  )
}
