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
python -m pip install -r requirements.txt
python manage.py collectstatic --noinput --clear
cd ..
