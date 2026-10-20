#!/usr/bin/env bash
# Builds the package and installs it in an Angular app using the minimum `peerDependencies`
# version (`integration/angular-min-peer`), checking that the published package works there
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
APP_DIR="$ROOT_DIR/integration/angular-min-peer"

cd "$ROOT_DIR"
npm run build:pkg

TARBALL="$(cd dist/ngx-skeleton-loader && npm pack --silent --pack-destination "$APP_DIR")"

cd "$APP_DIR"
npm install --no-audit --no-fund --no-save "./$TARBALL"
npm run build
