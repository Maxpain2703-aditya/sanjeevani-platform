from google import genai

ai_client = genai.Client(api_key="AQ.Ab8RN6I-fothW67RJl-UQATZ1HQ76ddGOY08wcKLYsGKhj4CPA")

print("Available models supporting content generation:\n")
for model in ai_client.models.list():
    # Filter for models that support generating text/multimodal responses
    if "generateContent" in (model.supported_actions or []):
        print(model.name)