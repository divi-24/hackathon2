#!/bin/bash

# Startup script for Render deployment

set -e

echo "Starting HR Agent API..."

# Install dependencies
pip install -r requirements.txt

# Run migrations/setup if needed
echo "Application ready"

# Start Uvicorn
exec uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000} --workers 2
