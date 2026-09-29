import os
import json
import logging
from typing import Dict, Any, Optional
from google import genai
from google.genai import types

logger = logging.getLogger("uvicorn.error")

# Fallback directly to your key so uninitialized warnings never trigger
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or "AQ.Ab8RN6I-fothW67RJl-UQATZ1HQ76ddGOY08wcKLYsGKhj4CPA"

try:
    client = genai.Client(api_key=GEMINI_API_KEY)
    logger.info("Gemini Client successfully initialized.")
except Exception as err:
    logger.error(f"Failed to initialize Gemini Client: {err}")
    client = None

# Pydantic-free raw JSON schema for Gemini structured output
PHC_INGESTION_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "facility_id": {
            "type": "STRING",
            "description": "Name or ID of the Primary Health Center (e.g., 'Ranaghat PHC', 'Krishnanagar PHC')"
        },
        "report_date": {
            "type": "STRING",
            "description": "Date or shift referenced in the log (ISO format or YYYY-MM-DD if determinable, else 'TODAY')"
        },
        "doctor_attendance": {
            "type": "STRING",
            "enum": ["PRESENT", "ABSENT", "ON_CALL", "UNSPECIFIED"],
            "description": "Status of the primary medical officer on duty"
        },
        "patient_footfall": {
            "type": "INTEGER",
            "description": "Total outpatient or emergency patient count recorded or spoken"
        },
        "bed_capacity": {
            "type": "OBJECT",
            "properties": {
                "total_beds": {
                    "type": "INTEGER",
                    "description": "Total bed count installed at this PHC. Defaults to 20 if not explicitly mentioned."
                },
                "occupied_beds": {
                    "type": "INTEGER",
                    "description": "Number of beds currently occupied by admitted patients"
                },
                "available_beds": {
                    "type": "INTEGER",
                    "description": "Calculated spare beds remaining (total_beds - occupied_beds)"
                },
                "oxygen_supported_beds": {
                    "type": "INTEGER",
                    "description": "Number of beds equipped with functional oxygen lines/cylinders"
                },
                "bed_shortage_alert": {
                    "type": "BOOLEAN",
                    "description": "True if occupied beds exceed 80% of total capacity or emergency beds are exhausted"
                }
            },
            "required": ["total_beds", "occupied_beds", "available_beds", "oxygen_supported_beds", "bed_shortage_alert"]
        },
        "clinical_symptoms": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "symptom": {"type": "STRING", "description": "e.g., 'Acute Watery Diarrhea', 'High Fever', 'Vomiting'"},
                    "case_count": {"type": "INTEGER", "description": "Number of cases observed"},
                    "suspected_cluster": {"type": "BOOLEAN", "description": "True if an abnormal surge is flagged"}
                },
                "required": ["symptom", "case_count", "suspected_cluster"]
            }
        },
        "critical_stockouts": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "item_name": {"type": "STRING", "description": "Medicine or supply name (e.g., 'Polyvalent Anti-Snake Venom', 'ORS', 'Paracetamol')"},
                    "current_quantity": {"type": "INTEGER", "description": "Remaining stock count"},
                    "unit": {"type": "STRING", "description": "e.g., 'vials', 'strips', 'liters', 'packets'"},
                    "urgency": {
                        "type": "STRING",
                        "enum": ["CRITICAL", "LOW", "ADEQUATE"],
                        "description": "Severity level of the stockout"
                    }
                },
                "required": ["item_name", "current_quantity", "unit", "urgency"]
            }
        },
        "notes_summary": {
            "type": "STRING",
            "description": "A concise 1-2 sentence clinical and logistics summary of this report"
        }
    },
    "required": [
        "facility_id",
        "doctor_attendance",
        "patient_footfall",
        "bed_capacity",
        "clinical_symptoms",
        "critical_stockouts",
        "notes_summary"
    ]
}

SYSTEM_INSTRUCTION = """
You are the Google Edge Health Logistics & Epidemiological Parser for Indian Primary Health Centers (PHCs).
Frontline doctors and nurses communicate informally using local accents, mixed vernacular (Bengali/Hindi/English), 
handwritten OPD registers, or rough paper stock logs.

Your job:
1. Accurately extract patient footfall, doctor attendance, disease symptom counts, and medicine shortages.
2. Accurately extract BED CAPACITY and BED SURGE:
   - Identify how many beds are occupied vs total.
   - If total beds are not explicitly stated, assume standard Indian rural PHC baseline of 20 beds.
   - If occupied beds / total beds >= 0.80 or staff expresses running out of beds, mark bed_shortage_alert = true.
   - Check for mention of oxygen cylinders or oxygen-supported beds.
3. Classify stockouts:
   - Mark urgency = 'CRITICAL' for life-saving items at zero or near-zero stock (e.g., Anti-Snake Venom, IV Fluids, Rabies Vaccine, Insulin).
4. Normalize facility names (e.g., 'Ranaghat PHC', 'Nabadwip BPHC', 'Hanskhali RH').

Output valid JSON strictly following the defined schema.
"""


def extract_from_audio(audio_bytes: bytes, mime_type: str = "audio/ogg") -> Dict[str, Any]:
    """
    Parses frontline WhatsApp voice notes into structured logistics & bed capacity records.
    Compatible with .ogg (WhatsApp default), .mp3, .wav, and .m4a.
    """
    if not client:
        raise RuntimeError("Gemini Client is uninitialized. Set GEMINI_API_KEY.")

    try:
        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=[
                types.Part.from_bytes(data=audio_bytes, mime_type=mime_type),
                "Transcribe this frontline PHC WhatsApp voice note and extract complete health surveillance, bed capacity, and medicine supply data."
            ],
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                response_mime_type="application/json",
                response_schema=PHC_INGESTION_SCHEMA,
                temperature=0.1
            )
        )
        return json.loads(response.text)
    except Exception as e:
        logger.error(f"Gemini Audio Ingestion Error: {str(e)}")
        raise e


def extract_from_image(image_bytes: bytes, mime_type: str = "image/jpeg") -> Dict[str, Any]:
    """
    Parses photos of handwritten PHC paper registers, stock ledgers, or bed boards into structured records.
    """
    if not client:
        raise RuntimeError("Gemini Client is uninitialized. Set GEMINI_API_KEY.")

    try:
        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=[
                types.Part.from_bytes(data=image_bytes, mime_type=mime_type),
                "Examine this handwritten PHC register / whiteboard and extract complete health surveillance, bed capacity, and medicine supply data."
            ],
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                response_mime_type="application/json",
                response_schema=PHC_INGESTION_SCHEMA,
                temperature=0.1
            )
        )
        return json.loads(response.text)
    except Exception as e:
        logger.error(f"Gemini Image Ingestion Error: {str(e)}")
        raise e