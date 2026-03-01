#!/usr/bin/env bash

set -euo pipefail

CONTAINER_NAME="${CONTAINER_NAME:-alfa-mysql}"
DATABASE_NAME="${1:-${DATABASE_NAME:-alfa}}"
OUTPUT_DIR="${OUTPUT_DIR:-$(pwd)}"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
OUTPUT_FILE="${2:-${OUTPUT_DIR}/${DATABASE_NAME}_${TIMESTAMP}.sql}"

mkdir -p "$(dirname "${OUTPUT_FILE}")"

docker exec "${CONTAINER_NAME}" sh -lc \
  'mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --single-transaction --default-character-set=utf8mb4 '"${DATABASE_NAME}" \
  > "${OUTPUT_FILE}"

echo "Backup created: ${OUTPUT_FILE}"
