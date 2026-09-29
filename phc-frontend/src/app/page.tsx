"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ShieldCheck, 
  Lock, 
  User, 
  ArrowRight, 
  AlertCircle,
  HeartPulse,
  Radio,
  CheckCircle2,
  Activity,
  Truck,
  Plane,
  Mic,
  FileText,
  Clock,
  Layers,
  Building2,
  ChevronDown
} from "lucide-react"

export default function CMOLandingPage() {
  const router = useRouter()
  const [cmoId, setCmoId] = useState("CMO-WB-NADIA-04")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    setTimeout(() => {
      if (cmoId.trim() && (password === "admin123" || password === "cmo2026" || password.length >= 4)) {
        sessionStorage.setItem("cmo_auth", JSON.stringify({ id: cmoId, name: "Dr. S. K. Roy", role: "Chief Medical Officer" }))
        router.push("/dashboard")
      } else {
        setError("Invalid credentials. Try demo key: admin123")
        setIsSubmitting(false)
      }
    }, 350)
  }

  const scrollToLogin = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#19100B] flex flex-col font-sans">
      {/* Official Top Govt Banner */}
      <div className="bg-white border-b border-[#EAEBED] text-xs text-[#6B6865] px-6 py-2.5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3D8761] inline-block"></span>
          <span className="font-bold text-[#19100B]">Government of West Bengal</span>
          <span className="text-[#D1D2D6]">•</span>
          <span>Department of Health & Family Welfare • Nadia Surveillance Node</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-semibold text-[#FA5E2D]">
          <span className="w-2 h-2 rounded-full bg-[#FA5E2D] animate-ping"></span>
          SURGE LEVEL 2 PROTOCOL ACTIVE
        </div>
      </div>

      {/* Hero Section with Login Form */}
      <section className="relative border-b border-[#EAEBED] bg-gradient-to-b from-white to-[#F8F9FA] py-12 md:py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Hero Left Content */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FA5E2D]/10 text-[#FA5E2D] text-xs font-bold">
              <Radio className="w-3.5 h-3.5" />
              Adon Emergency Telemetry Engine
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#19100B] leading-[1.12]">
              District Bed Surge & <br />
              <span className="text-[#FA5E2D]">Emergency Inventory</span> Coordination
            </h1>

            <p className="text-base text-[#6B6865] max-w-xl leading-relaxed">
              Automated bed reallocation, multimodal WhatsApp ingestion, and emergency medical drone corridors across Ranaghat, Chakdaha, and Hanskhali sub-centers.
            </p>

            {/* Quick Badges */}
            <div className="grid grid-cols-3 gap-3 max-w-lg pt-2">
              <div className="bg-white border border-[#EAEBED] rounded-2xl p-3.5 shadow-sm">
                <span className="text-xs text-[#8C8A87] font-medium block">Covered PHCs</span>
                <span className="text-xl font-extrabold text-[#19100B] mt-0.5 block">3 Units</span>
              </div>
              <div className="bg-white border border-[#EAEBED] rounded-2xl p-3.5 shadow-sm">
                <span className="text-xs text-[#8C8A87] font-medium block">Cluster Beds</span>
                <span className="text-xl font-extrabold text-[#19100B] mt-0.5 block">75 Beds</span>
              </div>
              <div className="bg-white border border-[#EAEBED] rounded-2xl p-3.5 shadow-sm">
                <span className="text-xs text-[#8C8A87] font-medium block">Drone Link</span>
                <span className="text-xl font-extrabold text-[#3D8761] mt-0.5 block">Standby</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a 
                href="#overview"
                className="text-xs font-bold text-[#6B6865] hover:text-[#FA5E2D] flex items-center gap-1.5 transition"
              >
                Scroll to explore network capabilities <ChevronDown className="w-4 h-4 animate-bounce" />
              </a>
            </div>
          </div>

          {/* Hero Right: CMO Clearance Box */}
          <div className="w-full max-w-md bg-white border border-[#EAEBED] shadow-[0_12px_40px_rgba(0,0,0,0.06)] rounded-3xl p-8 relative">
            <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-[#F0F1F3]">
              <div className="w-12 h-12 rounded-2xl bg-[#FA5E2D]/10 flex items-center justify-center text-[#FA5E2D]">
                <HeartPulse className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#19100B]">CMO Access Portal</h2>
                <p className="text-xs text-[#8C8A87]">District Medical Clearance Required</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#6B6865] block mb-1.5">
                  Officer Service ID
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C8A87] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={cmoId}
                    onChange={(e) => setCmoId(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-[#EAEBED] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#19100B] focus:bg-white focus:outline-none focus:border-[#FA5E2D] transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#6B6865] block mb-1.5">
                  Security Passkey
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C8A87] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter PIN (demo: admin123)"
                    className="w-full bg-[#F8F9FA] border border-[#EAEBED] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#19100B] focus:bg-white focus:outline-none focus:border-[#FA5E2D] transition"
                  />
                </div>
                <span className="text-[11px] text-[#8C8A87] mt-1.5 block">
                  Default demo key: <strong className="text-[#FA5E2D]">admin123</strong>
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-[#FA5E2D] hover:bg-[#E54D1F] text-white font-bold text-sm py-3.5 rounded-xl transition shadow-md shadow-[#FA5E2D]/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? "Authenticating..." : "Authorize Portal Entry"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#F0F1F3] flex items-center justify-between text-[11px] text-[#8C8A87]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3D8761]" />
                AES-256 Encrypted
              </span>
              <span className="font-mono text-[#3D8761] bg-[#3D8761]/10 px-2 py-0.5 rounded-full font-bold">
                ● Node WB-08
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SCROLL SECTION 1: How the System Works (Multimodal Gemini Ingestion) */}
      <section id="overview" className="py-20 px-6 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FA5E2D] bg-[#FA5E2D]/10 px-3 py-1 rounded-full">
            Operational Overview
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#19100B]">
            How Frontline Telemetry Connects to Command
          </h2>
          <p className="text-sm text-[#6B6865] leading-relaxed">
            Primary health workers don't have time for complex forms. The system ingests raw voice notes and paper registers, converting them into live data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white border border-[#EAEBED] rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="h-44 w-full rounded-2xl overflow-hidden mb-5">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" 
                  alt="Voice Telemetry"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#FA5E2D]/10 text-[#FA5E2D] flex items-center justify-center mb-3">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#19100B]">WhatsApp Voice Ingestion</h3>
              <p className="text-xs text-[#6B6865] mt-2 leading-relaxed">
                Nurses in remote PHCs send voice notes in Bengali or English. Gemini automatically extracts patient footfalls, critical symptoms, and vacant bed counts.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F0F1F3] text-xs font-semibold text-[#FA5E2D] flex items-center gap-1">
              Audio Telemetry Pipeline <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#EAEBED] rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="h-44 w-full rounded-2xl overflow-hidden mb-5">
                <img 
                  src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80" 
                  alt="Register Extraction"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#3D8761]/10 text-[#3D8761] flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#19100B]">Vision Register OCR</h3>
              <p className="text-xs text-[#6B6865] mt-2 leading-relaxed">
                Field photos of physical ward registers are parsed in seconds. Bed saturation figures, stock of IV fluids, and doctor shifts are synced automatically.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F0F1F3] text-xs font-semibold text-[#3D8761] flex items-center gap-1">
              Multimodal Vision Sync <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#EAEBED] rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="h-44 w-full rounded-2xl overflow-hidden mb-5">
                <img 
                  src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80" 
                  alt="Emergency Corridors"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#19100B]/10 text-[#19100B] flex items-center justify-center mb-3">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#19100B]">Green Corridors & Drone Drops</h3>
              <p className="text-xs text-[#6B6865] mt-2 leading-relaxed">
                When a facility hits 90%+ saturation, the engine calculates safe diversion routes and schedules instant drone delivery for antivenom and critical supplies.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F0F1F3] text-xs font-semibold text-[#19100B] flex items-center gap-1">
              Automated Dispatch Corridor <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* SCROLL SECTION 2: Nadia Cluster Facility Network */}
      <section className="bg-white border-y border-[#EAEBED] py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#3D8761] bg-[#3D8761]/10 px-3 py-1 rounded-full">
                Cluster Geography
              </span>
              <h2 className="text-3xl font-extrabold text-[#19100B] mt-2">Active Surveillance Facilities</h2>
              <p className="text-xs text-[#6B6865] mt-1">Real-time status across primary nodes in the Nadia district network.</p>
            </div>
            <button 
              onClick={scrollToLogin}
              className="bg-[#FA5E2D] hover:bg-[#E54D1F] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm self-start md:self-auto cursor-pointer"
            >
              Sign In to Command Center
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Ranaghat */}
            <div className="border border-[#EAEBED] rounded-3xl p-6 bg-[#F8F9FA] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#FA5E2D]" />
                  <h3 className="font-extrabold text-base text-[#19100B]">Ranaghat PHC</h3>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FA5E2D]/10 text-[#FA5E2D]">
                  Surge Critical
                </span>
              </div>
              <p className="text-xs text-[#6B6865]">
                Heavy footfall due to localized monsoon gastroenteritis outbreak. Antivenom reserves exhausted.
              </p>
              <div className="bg-white border border-[#EAEBED] rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#6B6865]">
                  <span>Bed Saturation</span>
                  <span className="font-bold text-[#FA5E2D]">19 / 20 (95%)</span>
                </div>
                <div className="flex justify-between text-[#6B6865]">
                  <span>Oxygen Units</span>
                  <span className="font-bold text-[#19100B]">4 Units</span>
                </div>
                <div className="flex justify-between text-[#6B6865]">
                  <span>Transit Node</span>
                  <span className="font-bold text-[#19100B]">NH-12 Link</span>
                </div>
              </div>
            </div>

            {/* Chakdaha */}
            <div className="border border-[#EAEBED] rounded-3xl p-6 bg-[#F8F9FA] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#3D8761]" />
                  <h3 className="font-extrabold text-base text-[#19100B]">Chakdaha BPHC</h3>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#3D8761]/10 text-[#3D8761]">
                  Surplus Ready
                </span>
              </div>
              <p className="text-xs text-[#6B6865]">
                Designated primary donor hospital. Adequate reserves of ASV vials and open general beds.
              </p>
              <div className="bg-white border border-[#EAEBED] rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#6B6865]">
                  <span>Bed Saturation</span>
                  <span className="font-bold text-[#3D8761]">11 / 30 (37%)</span>
                </div>
                <div className="flex justify-between text-[#6B6865]">
                  <span>Oxygen Units</span>
                  <span className="font-bold text-[#19100B]">8 Units</span>
                </div>
                <div className="flex justify-between text-[#6B6865]">
                  <span>Spare Beds</span>
                  <span className="font-bold text-[#3D8761]">19 Available</span>
                </div>
              </div>
            </div>

            {/* Hanskhali */}
            <div className="border border-[#EAEBED] rounded-3xl p-6 bg-[#F8F9FA] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#19100B]" />
                  <h3 className="font-extrabold text-base text-[#19100B]">Hanskhali RH</h3>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#3D8761]/10 text-[#3D8761]">
                  Stable
                </span>
              </div>
              <p className="text-xs text-[#6B6865]">
                Sub-cluster secondary facility. Steady inflow with standby ambulance readiness.
              </p>
              <div className="bg-white border border-[#EAEBED] rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#6B6865]">
                  <span>Bed Saturation</span>
                  <span className="font-bold text-[#19100B]">12 / 25 (48%)</span>
                </div>
                <div className="flex justify-between text-[#6B6865]">
                  <span>Oxygen Units</span>
                  <span className="font-bold text-[#19100B]">5 Units</span>
                </div>
                <div className="flex justify-between text-[#6B6865]">
                  <span>Spare Beds</span>
                  <span className="font-bold text-[#3D8761]">13 Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCROLL SECTION 3: Bottom Call-to-Action */}
      <section className="py-20 px-6 max-w-5xl mx-auto w-full text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-[#FA5E2D]/10 text-[#FA5E2D] flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8 stroke-[2.2]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-[#19100B]">
          Authorized Healthcare Clearance Required
        </h2>
        <p className="text-sm text-[#6B6865] max-w-lg mx-auto leading-relaxed">
          Access to this portal is restricted to District Medical Officers, Chief Medical Officers of Health (CMOH), and designated frontline logistics directors.
        </p>
        <button
          onClick={scrollToLogin}
          className="bg-[#FA5E2D] hover:bg-[#E54D1F] text-white px-8 py-3.5 rounded-xl text-sm font-bold transition shadow-lg shadow-[#FA5E2D]/25 inline-flex items-center gap-2 cursor-pointer"
        >
          Return to Officer Login <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#EAEBED] bg-white py-8 px-6 text-center text-xs text-[#8C8A87]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Department of Health & Family Welfare, Government of West Bengal.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#19100B] cursor-pointer">Protocol Guidelines</span>
            <span>•</span>
            <span className="hover:text-[#19100B] cursor-pointer">Security Policy</span>
            <span>•</span>
            <span className="hover:text-[#19100B] cursor-pointer">CMO Support Desk</span>
          </div>
        </div>
      </footer>
    </div>
  )
}