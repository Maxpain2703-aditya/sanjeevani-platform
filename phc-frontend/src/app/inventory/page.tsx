"use client"

import React, { useState, useEffect } from "react"
import { Layers } from "lucide-react"
import { fetchAllRecords, type FacilityRecord } from "@/lib/api"

export default function InventoryPage() {
  const [facilities, setFacilities] = useState<FacilityRecord[]>([])

  useEffect(() => {
    fetchAllRecords()
      .then((data) => setFacilities(data.records))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6 flex-1 font-sans">
      <div>
        <h1 className="text-xl font-extrabold text-[#19100B] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#FA5E2D]" />
          Cluster PHC Inventory Matrix
        </h1>
        <p className="text-xs text-[#6B6865] mt-0.5">Comprehensive audit of beds, oxygen reserves, and critical pharmaceutical vials</p>
      </div>

      <div className="bg-white border border-[#EAEBED] rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#EAEBED] text-xs font-bold text-[#8C8A87] uppercase tracking-wider bg-[#F8F9FA]">
              <th className="py-4 px-6">Facility</th>
              <th className="py-4 px-6">Total Beds</th>
              <th className="py-4 px-6">Available</th>
              <th className="py-4 px-6">O2 Supported</th>
              <th className="py-4 px-6">Stock Status</th>
              <th className="py-4 px-6">Doctor Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F1F3] text-sm">
            {facilities.map((fac) => {
              const isShort = fac.bed_capacity?.bed_shortage_alert
              return (
                <tr key={fac.facility_id} className="hover:bg-[#F8F9FA] transition">
                  <td className="py-4 px-6 font-bold text-[#19100B]">{fac.facility_id}</td>
                  <td className="py-4 px-6 text-[#6B6865]">{fac.bed_capacity?.total_beds}</td>
                  <td className="py-4 px-6">
                    <span className={`font-extrabold ${isShort ? "text-[#FA5E2D]" : "text-[#3D8761]"}`}>
                      {fac.bed_capacity?.available_beds}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#19100B] font-mono">{fac.bed_capacity?.oxygen_supported_beds} Units</td>
                  <td className="py-4 px-6">
                    {fac.critical_stockouts && fac.critical_stockouts.length > 0 ? (
                      <span className="text-xs bg-[#FA5E2D]/10 text-[#FA5E2D] px-2.5 py-1 rounded-full font-bold">
                        {fac.critical_stockouts.length} Critical Shortage
                      </span>
                    ) : (
                      <span className="text-xs bg-[#3D8761]/10 text-[#3D8761] px-2.5 py-1 rounded-full font-bold">
                        Adequate Stock
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-mono text-[#6B6865] bg-[#F4F5F7] px-2.5 py-1 rounded-md">
                      {fac.doctor_attendance}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}