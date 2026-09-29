"use client"

import React, { useState, useEffect, useRef } from "react"
import { 
  AlertTriangle, 
  Bed, 
  Pill, 
  Activity, 
  Plane, 
  UploadCloud, 
  Mic, 
  RefreshCw, 
  ShieldAlert, 
  ArrowRight,
  TrendingUp,
  UserCheck
} from "lucide-react"
import { 
  fetchDistrictOverview, 
  fetchAllRecords, 
  authorizeBedTransfer, 
  dispatchDrone, 
  ingestAudio, 
  ingestRegister,
  type FacilityRecord,
  type DistrictOverview
} from "@/lib/api"

export default function DashboardPage() {
  const [overview, setOverview] = useState<DistrictOverview | null>(null)
  const [facilities, setFacilities] = useState<FacilityRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  const audioInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState<"audio" | "image" | null>(null)

  const loadData = async () => {
    setLoading(true)
    try {
      const [ovData, recData] = await Promise.all([
        fetchDistrictOverview(),
        fetchAllRecords()
      ])
      setOverview(ovData)
      setFacilities(recData.records)
    } catch (err) {
      console.error("Backend error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleBedTransfer = async (from: string, to: string, count: number) => {
    try {
      const res = await authorizeBedTransfer(from, to, count)
      setActionMessage(`✅ Transfer Authorized: ${res.message}`)
      loadData()
    } catch (err: any) {
      alert(err.message || "Transfer failed")
    }
  }

  const handleDroneDispatch = async (facilityId: string, item: string, qty: number) => {
    try {
      const res = await dispatchDrone(facilityId, item, qty)
      setActionMessage(`🚀 Drone Dispatched: ${res.payload} to ${res.destination} (ETA: ${res.eta_minutes} mins)`)
      loadData()
    } catch (err: any) {
      alert(err.message || "Drone dispatch failed")
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "audio" | "image") => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(type)
    try {
      if (type === "audio") {
        await ingestAudio(file)
        setActionMessage(`🎙️ Voice note processed by Gemini. Ward logs updated.`)
      } else {
        await ingestRegister(file)
        setActionMessage(`📷 Register photo parsed by Gemini Vision. Data synchronized.`)
      }
      loadData()
    } catch (err: any) {
      alert(`${type} upload failed: ` + (err.message || "Unknown error"))
    } finally {
      setUploading(null)
      if (e.target) e.target.value = ""
    }
  }

  const criticalFacilities = facilities.filter(f => f.bed_capacity?.bed_shortage_alert)
  const allStockouts = facilities.flatMap(f => 
    (f.critical_stockouts || []).map(s => ({ ...s, facility_id: f.facility_id }))
  )

  const totalBedsOccupied = facilities.reduce((a, b) => a + (b.bed_capacity?.occupied_beds || 0), 0)
  const totalBedsTally = facilities.reduce((a, b) => a + (b.bed_capacity?.total_beds || 0), 0)
  const saturationPct = Math.round((totalBedsOccupied / (totalBedsTally || 1)) * 100)

  return (
    <div className="flex-1 flex flex-col p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
      {/* Action Notification */}
      {actionMessage && (
        <div className="bg-[#FA5E2D]/10 border border-[#FA5E2D]/30 px-5 py-2.5 rounded-2xl flex items-center justify-between text-xs text-[#FA5E2D] font-bold">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage(null)} className="underline hover:opacity-80">Dismiss</button>
        </div>
      )}

      {/* Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-[#EAEBED] p-5 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-[#19100B]">PHC Emergency Command & Triage</h1>
          <p className="text-xs text-[#6B6865] mt-0.5">Real-time frontline bed allocation & Gemini intake pipeline</p>
        </div>

        <div className="flex items-center gap-2.5">
          <input type="file" ref={audioInputRef} accept="audio/*,.ogg" className="hidden" onChange={(e) => handleFileUpload(e, "audio")} />
          <input type="file" ref={imageInputRef} accept="image/*,.jpeg,.jpg,.png" className="hidden" onChange={(e) => handleFileUpload(e, "image")} />

          <button
            onClick={() => audioInputRef.current?.click()}
            disabled={uploading !== null}
            className="flex items-center gap-2 bg-[#F4F5F7] hover:bg-[#EAEBED] text-[#19100B] px-3.5 py-2 rounded-xl text-xs font-semibold transition"
          >
            <Mic className={`w-3.5 h-3.5 text-[#FA5E2D] ${uploading === "audio" ? "animate-spin" : ""}`} />
            {uploading === "audio" ? "Processing..." : "Ingest Voice Note"}
          </button>

          <button
            onClick={() => imageInputRef.current?.click()}
            disabled={uploading !== null}
            className="flex items-center gap-2 bg-[#F4F5F7] hover:bg-[#EAEBED] text-[#19100B] px-3.5 py-2 rounded-xl text-xs font-semibold transition"
          >
            <UploadCloud className={`w-3.5 h-3.5 text-[#3D8761] ${uploading === "image" ? "animate-spin" : ""}`} />
            {uploading === "image" ? "Processing..." : "Scan Register"}
          </button>

          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 bg-[#FA5E2D] hover:bg-[#E54D1F] text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm shadow-[#FA5E2D]/20"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Sync
          </button>
        </div>
      </div>

      {/* Clean Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#EAEBED] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#8C8A87] text-xs font-semibold">
            <span>District Bed Saturation</span>
            <Bed className="w-4 h-4 text-[#8C8A87]" />
          </div>
          <div className="text-3xl font-black text-[#19100B] mt-2">
            {totalBedsOccupied} / {totalBedsTally}
          </div>
          <div className="mt-2 text-xs font-semibold text-[#FA5E2D] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            {saturationPct}% capacity across cluster
          </div>
        </div>

        <div className="bg-white border border-[#EAEBED] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#8C8A87] text-xs font-semibold">
            <span>Surge Alert Centers</span>
            <AlertTriangle className="w-4 h-4 text-[#FA5E2D]" />
          </div>
          <div className="text-3xl font-black text-[#FA5E2D] mt-2">
            {criticalFacilities.length} PHC
          </div>
          <div className="mt-2 text-xs text-[#8C8A87]">
            Ranaghat (19/20 beds filled)
          </div>
        </div>

        <div className="bg-white border border-[#EAEBED] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#8C8A87] text-xs font-semibold">
            <span>Donor Reserves Ready</span>
            <UserCheck className="w-4 h-4 text-[#3D8761]" />
          </div>
          <div className="text-3xl font-black text-[#3D8761] mt-2">
            {facilities.filter(f => !f.bed_capacity?.bed_shortage_alert).reduce((a, b) => a + (b.bed_capacity?.available_beds || 0), 0)}
          </div>
          <div className="mt-2 text-xs text-[#8C8A87]">
            Chakdaha (19) & Hanskhali (13)
          </div>
        </div>

        <div className="bg-white border border-[#EAEBED] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-[#8C8A87] text-xs font-semibold">
            <span>Emergency Stockouts</span>
            <Pill className="w-4 h-4 text-[#FA5E2D]" />
          </div>
          <div className="text-3xl font-black text-[#19100B] mt-2">
            {allStockouts.filter(s => s.urgency === "CRITICAL").length}
          </div>
          <div className="mt-2 text-xs text-[#8C8A87]">
            ASV & IV Ringer Lactate
          </div>
        </div>
      </div>

      {/* Critical Reallocation Banner */}
      {criticalFacilities.length > 0 && (
        <div className="bg-white border-2 border-[#FA5E2D]/40 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FA5E2D]/10 text-[#FA5E2D] text-xs font-bold mb-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Recommended Patient Diversion
            </div>
            <h3 className="text-lg font-extrabold text-[#19100B]">
              Divert 5 Patients: Ranaghat PHC ➔ Chakdaha BPHC
            </h3>
            <p className="text-xs text-[#6B6865] mt-0.5">
              Ranaghat is at 95% capacity. Chakdaha has 19 open beds and 8 oxygen units (22 min transit via NH 12).
            </p>
          </div>

          <button
            onClick={() => handleBedTransfer("Ranaghat PHC", "Chakdaha BPHC", 5)}
            className="inline-flex items-center gap-2 bg-[#FA5E2D] hover:bg-[#E54D1F] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm shadow-[#FA5E2D]/30"
          >
            <ArrowRight className="w-4 h-4" /> Authorize Bed Transfer
          </button>
        </div>
      )}

      {/* Facility Ward Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {facilities.map((fac) => {
          const totalBeds = fac.bed_capacity?.total_beds || 1
          const occupiedBeds = fac.bed_capacity?.occupied_beds || 0
          const bedPct = Math.round((occupiedBeds / totalBeds) * 100)
          const isShortage = fac.bed_capacity?.bed_shortage_alert

          return (
            <div 
              key={fac.facility_id}
              className={`bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between ${
                isShortage ? "border-[#FA5E2D]/40" : "border-[#EAEBED]"
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-[#19100B]">{fac.facility_id}</h3>
                    <span className="text-xs text-[#8C8A87]">Footfall: {fac.patient_footfall} patients</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                    isShortage ? "bg-[#FA5E2D]/10 text-[#FA5E2D]" : "bg-[#3D8761]/10 text-[#3D8761]"
                  }`}>
                    {isShortage ? "Critical Surge" : "Optimal"}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-5 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#6B6865]">Beds Occupied</span>
                    <span className="text-[#19100B]">{occupiedBeds} / {totalBeds} ({bedPct}%)</span>
                  </div>
                  <div className="w-full bg-[#F4F5F7] rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-2.5 rounded-full ${bedPct >= 90 ? "bg-[#FA5E2D]" : bedPct >= 60 ? "bg-[#FFA766]" : "bg-[#3D8761]"}`}
                      style={{ width: `${bedPct}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-[#8C8A87] pt-1 flex justify-between font-medium">
                    <span>Available: <strong className="text-[#3D8761]">{fac.bed_capacity?.available_beds ?? 0}</strong></span>
                    <span>O2 Beds: <strong className="text-[#19100B]">{fac.bed_capacity?.oxygen_supported_beds ?? 0}</strong></span>
                  </div>
                </div>

                {/* Symptoms */}
                <div className="mt-5">
                  <span className="text-[11px] font-bold uppercase text-[#8C8A87] block mb-2">Reported Symptoms</span>
                  <div className="flex flex-wrap gap-1.5">
                    {fac.clinical_symptoms?.map((s, idx) => (
                      <span 
                        key={idx}
                        className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold ${
                          s.suspected_cluster 
                            ? "bg-[#FA5E2D]/10 text-[#FA5E2D]" 
                            : "bg-[#F4F5F7] text-[#6B6865]"
                        }`}
                      >
                        {s.symptom} ({s.case_count})
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-xs text-[#6B6865] bg-[#F8F9FA] p-3 rounded-xl border border-[#EAEBED] italic">
                  "{fac.notes_summary}"
                </p>
              </div>

              {fac.critical_stockouts && fac.critical_stockouts.length > 0 && (
                <div className="mt-5 pt-4 border-t border-[#F0F1F3] space-y-2">
                  <span className="text-[11px] font-bold text-[#FA5E2D] flex items-center gap-1">
                    <Pill className="w-3.5 h-3.5" /> Emergency Shortage:
                  </span>
                  {fac.critical_stockouts.map((stk, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs bg-[#F8F9FA] p-2.5 rounded-xl border border-[#EAEBED]">
                      <div>
                        <span className="font-bold text-[#19100B]">{stk.item_name}</span>
                        <div className="text-[10px] text-[#FA5E2D] font-mono">
                          Remaining: {stk.current_quantity} {stk.unit}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDroneDispatch(fac.facility_id, stk.item_name, 10)}
                        className="flex items-center gap-1 bg-[#19100B] hover:bg-[#332218] text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition"
                      >
                        <Plane className="w-3 h-3" /> Drone Drop
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* WhatsApp Ingestion Feed */}
      <div className="bg-white border border-[#EAEBED] rounded-2xl p-6 shadow-sm">
        <h2 className="text-base font-extrabold text-[#19100B] mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#3D8761]" />
          Live WhatsApp Frontline Telemetry Feed
        </h2>
        <div className="space-y-3">
          {overview?.whatsapp_feed?.map((evt) => (
            <div key={evt.id} className="bg-[#F8F9FA] border border-[#EAEBED] rounded-xl p-4 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#19100B]">{evt.sender}</span>
                  <span className="text-[10px] bg-white border border-[#EAEBED] px-2 py-0.5 rounded-md text-[#6B6865] font-mono">{evt.type}</span>
                </div>
                <p className="text-xs text-[#6B6865] mt-1">{evt.summary}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-[#3D8761] bg-[#3D8761]/10 px-2.5 py-1 rounded-full">
                  {evt.status}
                </span>
                <div className="text-[10px] text-[#8C8A87] mt-1">{evt.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}