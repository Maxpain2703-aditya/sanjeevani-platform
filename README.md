<div align="center">

# ⚡ SANJEEVANI 
### Autonomous District Health Operations & Autonomous UAV Logistics Mesh
**Google Hackathon Submission • Developed by Team Bug Off**

[![Live Frontend](https://img.shields.io/badge/Frontend-Live%20Demo-e11d48?style=for-the-badge&logo=render&logoColor=white)](https://sanjeevani-frontend-fv7l.onrender.com/)
[![Live Backend](https://img.shields.io/badge/FastAPI-Production%20API-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://sanjeevani-backend-80sg.onrender.com/docs)
[![Gemini Engine](https://img.shields.io/badge/Gemini%203.6--Flash-Multimodal%20Core-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://cloud.google.com/vertex-ai)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue?style=for-the-badge)](LICENSE)

<p align="center">
  <b>Bridging the fatal gap between frontline disaster reports and life-saving drone cargo dispatch.</b><br>
  No portals. No spreadsheets. Just raw WhatsApp voice notes transformed into autonomous healthcare logistics in &lt;250ms.
</p>

---

</div>

## 💥 The Harsh Reality

When flash floods hit Nadia district or a localized cholera cluster erupts, the disaster isn't just the disease—**it is the communication breakdown**:

* 🚨 **Triage Collapse:** A Primary Health Center (PHC) built for 20 beds gets flooded with 50+ acute dehydration cases within 4 hours.
* 📦 **Deadly Stockouts:** High-priority supplies (Ringer’s Lactate, Polyvalent Anti-Snake Venom) hit zero buffer. Doctors scramble on unrecorded phone calls while regional warehouses sit packed with supplies just 20 km away.
* 📋 **Bureaucracy Friction:** Rural duty nurses are saving lives; they don't have time to log into clunky government web forms to file inventory tickets.

> **Sanjeevani fixes this permanently.** We don't ask nurses to learn new enterprise software. They send a 10-second voice note on WhatsApp. The autonomous system handles the rest.

---

## ⚡ The Breakthrough: How Sanjeevani Works

1. **Frontline Health Worker:** Sends voice notes or register photos via WhatsApp (+1 555-167-9544).
2. **Google Gemini 3.6-Flash:** Extracts clinical entities, doctor duty status, footfall, and supply depletion markers in under 250ms.
3. **FastAPI Command Mesh:** Central engine updates facility databases and evaluates surge conditions.
4. **Autonomous Action:**
   * **Bed Matrix:** Authorizes emergency patient diversions along the NH-12 Green Corridor.
   * **Stockout Triage:** Flags zero-buffer items and schedules automated replenishment.
   * **GIS Corridor Tracking:** Coordinates and tracks UAV flights and road transport convoys in real time.

---

## 🎮 Live System Modules

Explore all live operational portals deployed on Render:

| Portal | Role | Live Link |
| :--- | :--- | :--- |
| **🌐 3D Digital Twin Command** | Real-time WebGL spatial cluster view & system overview | [Launch 3D Twin](https://sanjeevani-frontend-fv7l.onrender.com/sanjeevani_hardware_intelligence_overview_authentication_portal/code.html) |
| **🏥 District Bed Matrix** | Ward saturation balancing, clinical step-downs & NH-12 diversions | [Open Bed Matrix](https://sanjeevani-frontend-fv7l.onrender.com/index.html) |
| **📦 Medical Stock & Sortie Triage** | Runout horizon monitoring & 1-click autonomous drone payload dispatch | [Open Stock Triage](https://sanjeevani-frontend-fv7l.onrender.com/sanjeevani_district_medical_stock_inventory_control/code.html) |
| **🗺️️ GIS Transit Corridors** | Real-time Leaflet tracking of airborne UAV sorties and road ambulances | [Open Transit GIS](https://sanjeevani-frontend-fv7l.onrender.com/sanjeevani_transit_corridor_map_operations_interactive_animated_edition/code.html) |
| **⚡ FastAPI Engine** | Interactive OpenAPI / Swagger backend documentation | [Inspect Swagger API](https://sanjeevani-backend-80sg.onrender.com/docs) |

---

## 🛠 The Operational Engine

### 1. 🎙 Multimodal WhatsApp Intake
* Nurses and field doctors send raw voice notes or photos of handwritten hospital ledgers.
* **Gemini 3.6-Flash** parses and validates clinical symptoms, doctor attendance, patient footfall, and supply depletion markers without manual form entry.

### 2. 🛏 Precision Ward Matrix & Outbreak Triage
* Visualizes real-time radial saturation gauges across district hubs (Ranaghat PHC, Chakdaha Depot, Hanskhali RH).
* **One-Click Diversions:** Authorizes rapid emergency patient transfer convoys along the NH-12 Green Corridor.
* **In-Place Clinical Step-Down:** Discharges recovering patients to instantly de-escalate bed saturation.

### 3. 🚁 Autonomous Drone Sorties (AeroSupply Mesh)
* Detects zero-buffer critical stockouts (e.g., Polyvalent Anti-Snake Venom, Ringer's Lactate).
* Launches temperature-monitored UAV flights (kept at 3.8°C cold-chain standard) arriving at rural facilities in minutes.

### 4. 🛰 Live GIS Corridor & Telemetry Engine
* Tracks moving UAVs and ground convoys using live Leaflet GIS coordinate interpolation.
* Sequential polling architecture prevents browser freezing and handles server wakeups gracefully.

---

## 💻 Tech Stack

* **AI & Cognition:** Google Gemini 3.6-Flash (Multimodal Audio & Vision Inference)
* **Backend:** Python 3.11, FastAPI, Uvicorn, Pydantic, Sequential Polling Architecture
* **Frontend:** Vanilla JavaScript (ES6+), Tailwind CSS, Leaflet GIS Engine, Three.js (WebGL Digital Twin)
* **Infrastructure:** Render Cloud (Automated CI/CD Pipeline)

---

## 🏁 Local Quickstart

### 1. Clone the Repository
```bash
git clone [https://github.com/Maxpain2703-aditya/sanjeevani-platform.git](https://github.com/Maxpain2703-aditya/sanjeevani-platform.git)
cd sanjeevani-platform
```
2. Set Up Python Backend
Bash
python -m venv .venv
Activate on Windows:

Bash
.venv\Scripts\activate
Activate on Linux/macOS:

Bash
source .venv/bin/activate
Install dependencies:

Bash
pip install -r requirements.txt
3. Start the Backend API
Bash
uvicorn app.main:app --reload --port 8000
4. Launch the Frontend
Serve the project directory:

Bash
python -m http.server 3000
Open http://localhost:3000/index.html in your browser.

👥 The Team — Team Bug Off

Aditya Mukherjee — Backend Architecture, Frontend Engineering & Multimodal AI Integration

Jayasmita Satpati — Domain Research, Clinical UX/UI Design & Product Strategy
