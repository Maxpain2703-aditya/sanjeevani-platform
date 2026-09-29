from gtts import gTTS

audio_transcript = (
    "Report from Ranaghat Primary Health Care Center. "
    "Today is September 14. Doctor is present on duty. "
    "Patient footfall today is 45. "
    "We have 20 strips of Paracetamol which is low, "
    "50 packets of ORS which is normal, "
    "and Anti-snake venom is critical out of stock, zero vials remaining. "
    "About six patients came in with high fever and vomiting. "
    "No telemedicine escalation required today."
)

tts = gTTS(text=audio_transcript, lang='en', tld='co.in')
tts.save("sample_audio.mp3")
print("Generated sample_audio.mp3 successfully.")