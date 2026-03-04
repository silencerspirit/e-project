#!/usr/bin/env bash

set -euo pipefail

# shellcheck disable=SC1091
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/dockerhub-common.sh"

require_docker
load_release_metadata
resolve_release_vars
require_username

echo "Pushing backend image:"
echo "  ${BACKEND_IMAGE}:${IMAGE_TAG}"
echo "  ${BACKEND_IMAGE}:${CHANNEL_TAG}"

docker push "${BACKEND_IMAGE}:${IMAGE_TAG}"
docker push "${BACKEND_IMAGE}:${CHANNEL_TAG}"

echo "Pushing frontend image:"
echo "  ${FRONTEND_IMAGE}:${IMAGE_TAG}"
echo "  ${FRONTEND_IMAGE}:${CHANNEL_TAG}"

docker push "${FRONTEND_IMAGE}:${IMAGE_TAG}"
docker push "${FRONTEND_IMAGE}:${CHANNEL_TAG}"

cat <<EOF
Done.

Published tags:
  ${BACKEND_IMAGE}:${IMAGE_TAG}
  ${BACKEND_IMAGE}:${CHANNEL_TAG}
  ${FRONTEND_IMAGE}:${IMAGE_TAG}
  ${FRONTEND_IMAGE}:${CHANNEL_TAG}
EOF
