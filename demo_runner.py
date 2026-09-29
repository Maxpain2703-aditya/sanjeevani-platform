import time
import requests

BASE_URL = "http://127.0.0.1:8000"

def run_demo():
    print("=" * 60)
    print("PHC EDGE MULTIMODAL LOGISTICS & SURVEILLANCE DEMO")
    print("=" * 60)

    # 1. Health Check
    print("\n[1/5] Verifying Gateway Health...")
    r = requests.get(f"{BASE_URL}/api/v1/health")
    print(f"Status: {r.status_code} -> {r.json()}")

    # 2. Ingest Voice Note (.ogg)
    print("\n[2/5] Ingesting Frontline Audio Log (sample_audio.ogg)...")
    with open("sample_audio.ogg", "rb") as f:
        files = {"file": ("sample_audio.ogg", f, "audio/ogg")}
        data = {"report_type": "VOICE_NOTE"}
        r = requests.post(f"{BASE_URL}/api/v1/ingest", files=files, data=data)
    audio_res = r.json()
    print(f"Extraction Status: {audio_res.get('status')}")
    print(f"Facility: {audio_res.get('extracted_data', {}).get('facility_id')}")
    print(f"Stockout Flag: {audio_res.get('critical_stockout_detected')}")

    # 3. Ingest Handwritten Register Photo (.jpeg)
    print("\n[3/5] Ingesting Paper Register Photo (sample_register.jpeg)...")
    with open("sample_register.jpeg", "rb") as f:
        files = {"file": ("sample_register.jpeg", f, "image/jpeg")}
        data = {"report_type": "PAPER_REGISTER_PHOTO"}
        r = requests.post(f"{BASE_URL}/api/v1/ingest", files=files, data=data)
    img_res = r.json()
    print(f"Extraction Status: {img_res.get('status')}")
    print(f"Facility: {img_res.get('extracted_data', {}).get('facility_id')}")
    print(f"Stockout Flag: {img_res.get('critical_stockout_detected')}")

    # 4. Fetch Pending Alerts & Dispatch First Item
    print("\n[4/5] Checking District Critical Alerts & Dispatching...")
    alerts_res = requests.get(f"{BASE_URL}/api/v1/alerts").json()
    alerts = alerts_res.get("alerts", [])
    print(f"Total Pending/Active Alerts: {len(alerts)}")

    if alerts:
        target_alert = alerts[0].get("alert_id")
        print(f"Dispatching delivery for Alert ID: {target_alert}...")
        patch_payload = {
            "status": "DISPATCHED",
            "dispatch_vehicle": "Drone-Kolkata-01",
            "notes": "Emergency restock batch dispatched via medical UAV."
        }
        patch_res = requests.patch(f"{BASE_URL}/api/v1/alerts/{target_alert}", json=patch_payload)
        print(f"Update Result: {patch_res.json().get('status')} -> Status: DISPATCHED")

    # 5. Run Infectious Disease Surveillance Analytics
    print("\n[5/5] Fetching Real-time Outbreak Surveillance Digest...")
    surv_res = requests.get(f"{BASE_URL}/api/v1/analytics/surveillance").json()
    print(f"Facilities Monitored: {surv_res.get('total_facilities_monitored')}")
    print(f"Total Footfall: {surv_res.get('total_patient_footfall')}")
    print(f"Top District Symptoms: {surv_res.get('district_top_symptoms')}")
    print(f"High-Risk Outbreak Clusters Detected: {len(surv_res.get('high_risk_clusters', []))}")
    for cluster in surv_res.get("high_risk_clusters", []):
        print(f"  [{cluster.get('risk_level')}] {cluster.get('facility_id')} -> {cluster.get('symptom')} ({cluster.get('case_count')} cases)")

    print("\n" + "=" * 60)
    print("DEMO RUN COMPLETE: All subsystems operational.")
    print("=" * 60)

if __name__ == "__main__":
    run_demo()
