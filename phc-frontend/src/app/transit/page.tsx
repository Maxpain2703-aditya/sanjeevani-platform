"use client"

import React, { useState } from "react"
import { Truck, MapPin, ArrowRight, Clock, SendHorizontal, CheckCircle2 } from "lucide-react"
import { dispatchStockTransit } from "@/lib/api"

const RADIUS_NETWORK = [
  { from: "Ranaghat PHC", to: "Chakdaha BPHC", distanceKm: 14.2, transitTimeMins: 22, route: "NH 12 (Express Green Corridor)" },
  { from: "Ranaghat PHC", to: "Hanskhali Rural Hospital", distanceKm: 18.5, transitTimeMins: 28, route: "State Highway 11" },
  { from: "Chakdaha BPHC", to: "Hanskhali Rural Hospital", distanceKm: 22.0, transitTimeMins: 35, route: "Rural Arterial Link" },
]

export default function TransitPage() {
  const [transitFrom, setTransitFrom] = useState("Chakdaha BPHC")
  const [transitTo, setTransitTo] = useState("Ranaghat PHC")
  const [transitItem, setTransitItem] = useState("Polyvalent Anti-Snake Venom")
  const [transitQty, setTransitQty] = useState(5)
  const [message, setMessage] = useState<string | null>(null)
  const [isDispatching, setIsDispatching] = useState(false)

  const handleStockTransit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (transitFrom === transitTo) {
      alert("Source and destination cannot be the same facility.")
      return
    }
    setIsDispatching(true)
    try {
      const res = await dispatchStockTransit(transitFrom, transitTo, transitItem, transitQty)
      setMessage(`🚚 Transit Corridor Dispatched: ${res.message} (ETA: ${res.eta_minutes} mins)`)
    } catch (err: any) {
      alert(err.message || "Transit dispatch failed")
    } finally {
      setIsDispatching(false)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6 flex-1 font-sans">
      <div>
        <h1 className="text-xl font-extrabold text-[#19100B] flex items-center gap-2">
          <Truck className="w-5 h-5 text-[#FA5E2D]" />
          District Emergency Transit Corridors
        </h1>
        <p className="text-xs text-[#6B6865] mt-0.5">Green corridor ambulance coordination & inter-PHC medical supply redistribution</p>
      </div>

      {message && (
        <div className="p-4 bg-[#3D8761]/10 border border-[#3D8761]/30 rounded-2xl text-[#3D8761] text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-xs font-bold text-[#8C8A87] uppercase tracking-wider">Active Radius Connections</h2>
          <div className="space-y-3">
            {RADIUS_NETWORK.map((r, idx) => (
              <div key={idx} className="bg-white border border-[#EAEBED] rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FA5E2D]/10 flex items-center justify-center text-[#FA5E2D]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#19100B] flex items-center gap-2">
                      <span>{r.from}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8C8A87]" />
                      <span className="text-[#FA5E2D]">{r.to}</span>
                    </div>
                    <div className="text-xs text-[#8C8A87] mt-0.5">{r.route}</div>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="text-right">
                    <div className="text-sm font-bold text-[#19100B]">{r.distanceKm} km</div>
                    <div className="text-[10px] text-[#8C8A87] uppercase">Distance</div>
                  </div>
                  <div className="bg-[#F4F5F7] px-3.5 py-1.5 rounded-xl text-center">
                    <div className="text-sm font-extrabold text-[#19100B] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#FA5E2D]" /> {r.transitTimeMins} mins
                    </div>
                    <div className="text-[9px] text-[#8C8A87] uppercase font-bold">Ambulance ETA</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#EAEBED] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <h2 className="text-sm font-extrabold text-[#19100B] uppercase tracking-wider flex items-center gap-2 mb-4">
            <SendHorizontal className="w-4 h-4 text-[#FA5E2D]" /> Dispatch Stock Transit
          </h2>

          <form onSubmit={handleStockTransit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#6B6865] block mb-1">Origin PHC (Donor)</label>
              <select value={transitFrom} onChange={(e) => setTransitFrom(e.target.value)} className="w-full bg-[#F8F9FA] border border-[#EAEBED] text-xs rounded-xl px-3 py-2.5 text-[#19100B]">
                <option value="Chakdaha BPHC">Chakdaha BPHC (Surplus Available)</option>
                <option value="Hanskhali Rural Hospital">Hanskhali Rural Hospital</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6B6865] block mb-1">Destination PHC (Surge)</label>
              <select value={transitTo} onChange={(e) => setTransitTo(e.target.value)} className="w-full bg-[#F8F9FA] border border-[#EAEBED] text-xs rounded-xl px-3 py-2.5 text-[#19100B]">
                <option value="Ranaghat PHC">Ranaghat PHC (Critical Outbreak)</option>
                <option value="Hanskhali Rural Hospital">Hanskhali Rural Hospital</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#6B6865] block mb-1">Resource</label>
                <select value={transitItem} onChange={(e) => setTransitItem(e.target.value)} className="w-full bg-[#F8F9FA] border border-[#EAEBED] text-xs rounded-xl px-2.5 py-2.5 text-[#19100B]">
                  <option value="Polyvalent Anti-Snake Venom">ASV Vials</option>
                  <option value="ORS & IV Ringer Lactate">IV Fluids</option>
                  <option value="Amoxicillin 500mg">Amoxicillin</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6B6865] block mb-1">Quantity</label>
                <input type="number" min={1} max={100} value={transitQty} onChange={(e) => setTransitQty(parseInt(e.target.value, 10))} className="w-full bg-[#F8F9FA] border border-[#EAEBED] text-xs rounded-xl px-3 py-2.5 text-[#19100B]" />
              </div>
            </div>

            <button type="submit" disabled={isDispatching} className="w-full mt-2 bg-[#FA5E2D] hover:bg-[#E54D1F] text-white font-bold text-xs py-3 rounded-xl transition uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm shadow-[#FA5E2D]/25">
              <Truck className="w-4 h-4" />
              {isDispatching ? "Dispatching..." : "Authorize Transit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}