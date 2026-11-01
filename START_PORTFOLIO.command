#!/bin/zsh
set -e
cd "${0:A:h}"
if ! command -v npm >/dev/null 2>&1; then
  echo "Node.js/npm not found. Install Node.js first, then use npm install and npm start."
  read -k1 '?Press any key to close.'
  exit 1
fi
if [[ ! -d node_modules ]]; then
  echo "Installing project dependencies (first run only)..."
  npm install
fi
echo "Starting Hiranmai portfolio at http://localhost:3000"
npm start
