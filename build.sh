#!/bin/bash
# Exit on error
set -e

echo "Building Vite Frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Collecting Django Static Files..."
cd backend
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 manage.py collectstatic --noinput --clear
cd ..

echo "Moving static files out of backend to prevent Lambda size limits..."
mv backend/staticfiles vercel_dist
