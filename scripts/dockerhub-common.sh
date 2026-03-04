#!/usr/bin/env bash

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RELEASE_FILE="${RELEASE_FILE:-${ROOT_DIR}/.dockerhub-release.env}"

load_release_metadata() {
  if [[ -f "${RELEASE_FILE}" ]]; then
    # shellcheck disable=SC1090
    source "${RELEASE_FILE}"
  fi
}

resolve_release_vars() {
  DOCKERHUB_USERNAME="${DOCKERHUB_USERNAME:-}"
  PLATFORM="${PLATFORM:-linux/amd64}"
  CHANNEL_TAG="${CHANNEL_TAG:-prod}"
  IMAGE_TAG="${IMAGE_TAG:-$(date +%d.%m.%Y-%H-%M)-$(git -C "$ROOT_DIR" rev-parse --short HEAD 2>/dev/null || echo local)}"
  BACKEND_IMAGE="${BACKEND_IMAGE:-${DOCKERHUB_USERNAME}/alfa-backend}"
  FRONTEND_IMAGE="${FRONTEND_IMAGE:-${DOCKERHUB_USERNAME}/alfa-frontend}"
}

require_docker() {
  if ! command -v docker >/dev/null 2>&1; then
    echo "docker is required"
    exit 1
  fi
}

require_buildx() {
  if ! docker buildx version >/dev/null 2>&1; then
    echo "docker buildx is required"
    exit 1
  fi
}

require_username() {
  if [[ -z "${DOCKERHUB_USERNAME}" ]]; then
    echo "Set DOCKERHUB_USERNAME before running this script"
    exit 1
  fi
}

persist_release_metadata() {
  cat > "${RELEASE_FILE}" <<EOF
DOCKERHUB_USERNAME=${DOCKERHUB_USERNAME}
PLATFORM=${PLATFORM}
CHANNEL_TAG=${CHANNEL_TAG}
IMAGE_TAG=${IMAGE_TAG}
BACKEND_IMAGE=${BACKEND_IMAGE}
FRONTEND_IMAGE=${FRONTEND_IMAGE}
EOF
}
