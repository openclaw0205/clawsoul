#!/bin/bash
# Sync souls from the root-level souls/ directory to website/souls/
# This ensures the website always has the latest soul templates.
# Run this before `next build` or `next dev`.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SOURCE="$ROOT_DIR/souls"
DEST="$SCRIPT_DIR/souls"

if [ ! -d "$SOURCE" ]; then
  echo "Error: Source souls directory not found at $SOURCE"
  exit 1
fi

echo "🔄 Syncing souls from $SOURCE to $DEST..."
rm -rf "$DEST"
cp -r "$SOURCE" "$DEST"
echo "✅ Synced $(ls -d "$DEST"/*/ 2>/dev/null | wc -l | tr -d ' ') souls"
