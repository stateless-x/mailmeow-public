#!/usr/bin/env bash
# Renders og/card.html into the share images (public/og-th.png, public/og-en.png), 1200x630.
# Needs Google Chrome. Run after changing the hero headline or the card.
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
for lang in th en; do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --allow-file-access-from-files --virtual-time-budget=3000 --window-size=1200,630 \
    --screenshot="$PWD/public/og-$lang.png" "file://$PWD/og/card.html?lang=$lang" >/dev/null 2>&1
  echo "public/og-$lang.png"
done
