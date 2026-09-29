# Use official lightweight Python image
FROM python:3.11-slim

# Set environment settings to ensure logs output cleanly to Cloud Run/terminal
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Set the working directory inside the container
WORKDIR /app

# Copy dependency definition first for efficient Docker layer caching
COPY requirements.txt .

# Install dependencies without caching build files
RUN pip install --no-cache-dir -r requirements.txt

# Copy all project files into the container
COPY . .

# Set default port (Google Cloud Run passes PORT=8080 automatically)
ENV PORT=8080
EXPOSE 8080

# Launch Uvicorn bound to all network interfaces on the runtime port
CMD exec uvicorn server:app --host 0.0.0.0 --port ${PORT}