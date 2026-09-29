import signal
import subprocess
import sys
import threading
import time
from datetime import datetime, timezone
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firestore
cred = credentials.Certificate("serviceAccountKey.json")
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred, {
        'projectId': 'phc-health-logistics',
    })

db = firestore.client(database_id="default")

# Global event to control continuous alarm playback
alarm_active = threading.Event()
alarm_thread = None

def continuous_alarm_worker():
    """Background worker that loops the emergency sound until stopped."""
    ps_cmd = "[console]::beep(1000, 300); (New-Object Media.SoundPlayer 'C:\\Windows\\Media\\Alarm01.wav').PlaySync()"
    while alarm_active.is_set():
        try:
            # Play one iteration synchronously inside this dedicated background thread
            subprocess.run(
                ["powershell", "-c", ps_cmd],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                check=False
            )
        except Exception:
            # Terminal bell fallback
            print('\a', end='', flush=True)
        time.sleep(0.1)

def start_continuous_siren():
    """Starts the persistent background alarm loop if not already running."""
    global alarm_thread
    if not alarm_active.is_set():
        alarm_active.set()
        alarm_thread = threading.Thread(target=continuous_alarm_worker, daemon=True)
        alarm_thread.start()

def stop_continuous_siren():
    """Stops the persistent background alarm loop."""
    if alarm_active.is_set():
        alarm_active.clear()

def print_critical_alert(facility_id: str, doc_id: str, zero_items: list, doctor_attendance: str, telemedicine_required: bool):
    """Outputs terminal banner and triggers continuous alarm loop."""
    RED = "\033[91m"
    BOLD = "\033[1m"
    RESET = "\033[0m"
    YELLOW = "\033[93m"
    
    # Start the continuous loop
    start_continuous_siren()

    print(f"\n{RED}{BOLD}========================================================================{RESET}")
    print(f"{RED}{BOLD} [CRITICAL ALERT] URGENT SUPPLY CHAIN / EMERGENCY INTERVENTION REQUIRED {RESET}")
    print(f"{RED}{BOLD}========================================================================{RESET}")
    print(f"Facility:         {BOLD}{facility_id}{RESET} (Log ID: {doc_id})")
    print(f"Doctor Status:    {YELLOW if doctor_attendance != 'PRESENT' else RESET}{doctor_attendance}{RESET}")
    print(f"Telemed Escalate: {RED if telemedicine_required else RESET}{telemedicine_required}{RESET}")
    print(f"\n{RED}Critical Zero-Stock Items Detected:{RESET}")
    for item in zero_items:
        print(f"  • {BOLD}{item.get('item_name')}{RESET}: {item.get('quantity', 0)} {item.get('unit', '')} remaining!")
    print(f"{RED}{BOLD}------------------------------------------------------------------------{RESET}")
    print(f"Action: Continuous Emergency Siren Active! Press Ctrl+C to acknowledge & stop.")
    print(f"{RED}{BOLD}========================================================================{RESET}\n")

def process_log(doc_id: str, data: dict):
    """Evaluates a PHC report and writes to 'district_critical_alerts' if depleted stock exists."""
    facility_id = data.get("facility_id", "Unknown Facility")
    inventory_actions = data.get("inventory_actions", [])
    doctor_attendance = data.get("doctor_attendance", "UNKNOWN")
    telemed = data.get("telemedicine_escalation_required", False)

    critical_items = [
        item for item in inventory_actions 
        if item.get("stockout_warning_level") == "CRITICAL_ZERO" or item.get("quantity", 1) == 0
    ]

    if critical_items:
        print_critical_alert(facility_id, doc_id, critical_items, doctor_attendance, telemed)

        alert_payload = {
            "source_log_id": doc_id,
            "facility_id": facility_id,
            "alert_timestamp": datetime.now(timezone.utc).isoformat(),
            "critical_stockouts": critical_items,
            "doctor_attendance": doctor_attendance,
            "telemedicine_escalation_required": telemed,
            "status": "DISPATCH_PENDING"
        }
        alert_ref = db.collection("district_critical_alerts").document(f"ALERT_{doc_id}")
        alert_ref.set(alert_payload)
        print(f"[STORED] Emergency alert logged in Firestore collection 'district_critical_alerts' as 'ALERT_{doc_id}'")

def start_realtime_listener():
    """Real-time snapshot listener on the daily_phc_logs collection."""
    print("Connecting Real-Time Alert Monitor with Continuous Siren to Firestore: 'daily_phc_logs'...")
    print("Awaiting new PHC log submissions (Press Ctrl+C to stop)...\n")

    logs_ref = db.collection("daily_phc_logs")

    def on_snapshot(col_snapshot, changes, read_time):
        for change in changes:
            if change.type.name in ["ADDED", "MODIFIED"]:
                doc = change.document
                process_log(doc.id, doc.to_dict())

    query_watch = logs_ref.on_snapshot(on_snapshot)

    def signal_handler(sig, frame):
        print("\n\n[SHUTDOWN] Stopping alarm siren and Firestore listener...")
        stop_continuous_siren()
        query_watch.unsubscribe()
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)

    while True:
        time.sleep(1)

if __name__ == "__main__":
    start_realtime_listener()