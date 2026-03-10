#!/bin/bash

# Bulldocks Dashboard & Server Starter

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

echo "🐶 Starting Bulldocks Dashboard..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install express cors chokidar 2>&1 | grep -v "^npm notice"
  echo ""
fi

# Start server in background
echo "🚀 Starting server on http://localhost:3333..."
node server.js &
SERVER_PID=$!

# Give server time to start
sleep 2

# Open dashboard in browser
DASHBOARD_URL="http://localhost:3333"
echo "🌐 Opening dashboard at ${DASHBOARD_URL}..."

if command -v open &> /dev/null; then
  open "$DASHBOARD_URL"
elif command -v xdg-open &> /dev/null; then
  xdg-open "$DASHBOARD_URL"
elif command -v start &> /dev/null; then
  start "$DASHBOARD_URL"
else
  echo "⚠️  Could not open browser. Open manually: $DASHBOARD_URL"
fi

echo ""
echo "✅ Dashboard running!"
echo "📍 API: http://localhost:3333/api/tasks"
echo "🛑 Press Ctrl+C to stop"
echo ""

# Wait for server
wait $SERVER_PID
