const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export interface FacilityRecord {
  facility_id: string
  report_date: string
  doctor_attendance: string
  patient_footfall: number
  bed_capacity: {
    total_beds: number
    occupied_beds: number
    available_beds: number
    oxygen_supported_beds: number
    bed_shortage_alert: boolean
  }
  clinical_symptoms: Array<{
    symptom: string
    case_count: number
    suspected_cluster: boolean
  }>
  critical_stockouts: Array<{
    item_name: string
    current_quantity: number
    unit: string
    urgency: "CRITICAL" | "LOW" | "ADEQUATE"
  }>
  notes_summary: string
}

export interface WhatsAppEvent {
  id: string
  sender: string
  type: string
  summary: string
  status: string
  timestamp: string
}

export interface DistrictOverview {
  bed_matrix: {
    total_district_beds?: number
    total_occupied?: number
    total_available?: number
    saturation_rate?: string
    critical_phcs?: string[]
    recommended_transfers?: Array<{
      from: string
      to: string
      patients: number
    }>
    [key: string]: any
  }
  surveillance: any
  whatsapp_feed: WhatsAppEvent[]
  active_phc_count: number
}

// 1. Fetch District Overview & Matrix
export async function fetchDistrictOverview(): Promise<DistrictOverview> {
  const res = await fetch(`${API_BASE_URL}/api/v1/analytics/overview`)
  if (!res.ok) throw new Error("Failed to load district overview")
  return res.json()
}

// 2. Fetch Raw Records
export async function fetchAllRecords(): Promise<{ total: number; records: FacilityRecord[] }> {
  const res = await fetch(`${API_BASE_URL}/api/v1/records`)
  if (!res.ok) throw new Error("Failed to load records")
  return res.json()
}

// 3. Authorize Surge Bed Transfer
export async function authorizeBedTransfer(from_facility: string, to_facility: string, patient_count: number) {
  const res = await fetch(`${API_BASE_URL}/api/v1/beds/authorize-transfer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from_facility, to_facility, patient_count }),
  })
  if (!res.ok) throw new Error("Bed transfer authorization failed")
  return res.json()
}

// 4. Dispatch Drone Restock
export async function dispatchDrone(facility_id: string, item_name: string, quantity: number) {
  const res = await fetch(`${API_BASE_URL}/api/v1/dispatch/drone`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ facility_id, item_name, quantity }),
  })
  if (!res.ok) throw new Error("Drone dispatch failed")
  return res.json()
}

// 5. Ingest Audio Voice Note
export async function ingestAudio(file: File) {
  const formData = new FormData()
  formData.append("file", file)
  const res = await fetch(`${API_BASE_URL}/api/v1/ingest/voice`, {
    method: "POST",
    body: formData,
  })
  if (!res.ok) throw new Error("Voice ingestion failed")
  return res.json()
}

// 6. Ingest Register Photo
export async function ingestRegister(file: File) {
  const formData = new FormData()
  formData.append("file", file)
  const res = await fetch(`${API_BASE_URL}/api/v1/ingest/image`, {
    method: "POST",
    body: formData,
  })
  if (!res.ok) throw new Error("Image ingestion failed")
  return res.json()
}
export async function dispatchStockTransit(
  from_facility: string,
  to_facility: string,
  item_name: string,
  quantity: number
) {
  const res = await fetch(`${API_BASE_URL}/api/v1/transit/stock`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from_facility, to_facility, item_name, quantity }),
  })
  if (!res.ok) throw new Error("Stock transit dispatch failed")
  return res.json()
}