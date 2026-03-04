#!/usr/bin/env bash

set -euo pipefail

# shellcheck disable=SC1091
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/dockerhub-common.sh"

require_docker
require_buildx
resolve_release_vars
require_username

echo "Building backend image locally:"
echo "  ${BACKEND_IMAGE}:${IMAGE_TAG}"
echo "  ${BACKEND_IMAGE}:${CHANNEL_TAG}"

docker buildx build \
  --platform "${PLATFORM}" \
  -f "${ROOT_DIR}/Dockerfile.backend" \
  -t "${BACKEND_IMAGE}:${IMAGE_TAG}" \
  -t "${BACKEND_IMAGE}:${CHANNEL_TAG}" \
  --load \
  "${ROOT_DIR}"

echo "Building frontend image locally:"
echo "  ${FRONTEND_IMAGE}:${IMAGE_TAG}"
echo "  ${FRONTEND_IMAGE}:${CHANNEL_TAG}"

docker buildx build \
  --platform "${PLATFORM}" \
  -f "${ROOT_DIR}/Dockerfile.frontend" \
  -t "${FRONTEND_IMAGE}:${IMAGE_TAG}" \
  -t "${FRONTEND_IMAGE}:${CHANNEL_TAG}" \
  --load \
  "${ROOT_DIR}"

persist_release_metadata

cat <<EOF
Done.

Built tags:
  ${BACKEND_IMAGE}:${IMAGE_TAG}
  ${BACKEND_IMAGE}:${CHANNEL_TAG}
  ${FRONTEND_IMAGE}:${IMAGE_TAG}
  ${FRONTEND_IMAGE}:${CHANNEL_TAG}

Saved release metadata to:
  ${RELEASE_FILE}

Next step:
  DOCKERHUB_USERNAME=${DOCKERHUB_USERNAME} npm run docker:push:prod
EOF
