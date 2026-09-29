import logging
from typing import List, Dict, Any

logger = logging.getLogger("uvicorn.error")

def compute_district_bed_matrix(facility_logs: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Analyzes bed capacity across all PHCs in the district.
    Identifies facilities facing epidemic surges/overflow and maps them
    to nearby donor PHCs with spare bed reserves.
    """
    total_district_beds = 0
    total_occupied_beds = 0
    total_oxygen_beds = 0
    
    critical_bed_shortages = []
    donor_facilities = []

    for record in facility_logs:
        facility_id = record.get("facility_id", "Unknown PHC")
        bed_data = record.get("bed_capacity", {})
        
        total = bed_data.get("total_beds", 20)
        occupied = bed_data.get("occupied_beds", 0)
        available = bed_data.get("available_beds", max(0, total - occupied))
        oxygen = bed_data.get("oxygen_supported_beds", 0)
        
        total_district_beds += total
        total_occupied_beds += occupied
        total_oxygen_beds += oxygen
        
        occupancy_ratio = (occupied / total) if total > 0 else 0.0

        # PHC is under heavy surge (>80% occupied or flagged by frontline staff)
        if occupancy_ratio >= 0.80 or bed_data.get("bed_shortage_alert", False):
            critical_bed_shortages.append({
                "facility_id": facility_id,
                "total_beds": total,
                "occupied_beds": occupied,
                "available_beds": available,
                "occupancy_rate_pct": round(occupancy_ratio * 100, 1),
                "severity": "CRITICAL_OVERFLOW",
                "recommended_transfer_out": max(3, occupied - int(total * 0.75))
            })
        # PHC has healthy surplus (under 60% occupancy, at least 4 available beds)
        elif occupancy_ratio < 0.60 and available >= 4:
            donor_facilities.append({
                "facility_id": facility_id,
                "total_beds": total,
                "occupied_beds": occupied,
                "available_beds": available,
                "transferable_surplus": max(1, available - 3),
                "oxygen_beds_available": oxygen
            })

    district_occupancy_pct = (
        round((total_occupied_beds / total_district_beds) * 100, 1)
        if total_district_beds > 0
        else 0.0
    )

    # Automatically generate recommended patient/bed re-allocation pairs
    transfer_recommendations = []
    donor_idx = 0
    for deficit in critical_bed_shortages:
        if donor_idx < len(donor_facilities):
            donor = donor_facilities[donor_idx]
            transfer_recommendations.append({
                "from_facility": deficit["facility_id"],
                "to_facility": donor["facility_id"],
                "patients_to_transfer": min(deficit["recommended_transfer_out"], donor["transferable_surplus"]),
                "donor_available_beds": donor["available_beds"],
                "status": "PENDING_CMO_AUTHORIZATION"
            })
            donor_idx += 1

    return {
        "district_metrics": {
            "total_beds": total_district_beds,
            "occupied_beds": total_occupied_beds,
            "available_beds": max(0, total_district_beds - total_occupied_beds),
            "oxygen_supported_beds": total_oxygen_beds,
            "district_occupancy_rate_pct": district_occupancy_pct,
            "epidemic_surge_active": len(critical_bed_shortages) > 0
        },
        "critical_bed_shortages": critical_bed_shortages,
        "donor_facilities": donor_facilities,
        "recommended_transfers": transfer_recommendations
    }


def analyze_epidemic_and_stockouts(facility_logs: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Cross-checks disease symptom clusters against stockout levels.
    Flags emergency risks (e.g. Diarrhea cluster + ORS depleted = Cholera alert).
    """
    disease_clusters = []
    emergency_stockouts = []

    for record in facility_logs:
        fac = record.get("facility_id", "Unknown PHC")
        
        # Check symptoms
        for symptom in record.get("clinical_symptoms", []):
            if symptom.get("suspected_cluster") or symptom.get("case_count", 0) >= 15:
                disease_clusters.append({
                    "facility_id": fac,
                    "symptom": symptom.get("symptom"),
                    "cases": symptom.get("case_count"),
                    "severity": "HIGH_SURVEILLANCE_FLAG"
                })
        
        # Check stockouts
        for item in record.get("critical_stockouts", []):
            if item.get("urgency") == "CRITICAL" or item.get("current_quantity", 0) <= 2:
                emergency_stockouts.append({
                    "facility_id": fac,
                    "item_name": item.get("item_name"),
                    "current_quantity": item.get("current_quantity"),
                    "unit": item.get("unit", "units"),
                    "urgency": item.get("urgency", "CRITICAL")
                })

    return {
        "disease_clusters": disease_clusters,
        "emergency_stockouts": emergency_stockouts,
        "total_active_clusters": len(disease_clusters),
        "total_critical_stockouts": len(emergency_stockouts)
    }