import type { TPropertyFullItem } from '@contracts';
import { isNull } from 'es-toolkit';
import { isNaN } from 'es-toolkit/compat';

import { FILTER_CODES } from './properties.consts';
import type { TParsedSegments } from './properties.types';

export function parseSegments(input: string | undefined): TParsedSegments {
  const result: TParsedSegments = {};

  if (!input) return result;

  const segments = input
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean);

  for (const rawSegment of segments) {
    const segment = decodeURIComponent(rawSegment);

    const code = FILTER_CODES.find((c) => segment.startsWith(`${c}-`));
    if (!code) continue;

    const value = segment.slice(code.length + 1).trim();
    if (!value) continue;

    result[code] = value;
  }

  return result;
}

export function buildSegmentsUrl(filters: TParsedSegments): string {
  const segments = FILTER_CODES.flatMap((code) => {
    const value = filters[code]?.trim();
    if (!value) return [];

    return `${code}-${encodeURIComponent(value)}`;
  });

  if (!segments.length) return '/properties/';

  return `/properties/filters/${segments.join('/')}/`;
}

export function isExistCoords(property: TPropertyFullItem): boolean {
  return (
    !isNull(property.latitude) &&
    !isNull(property.longitude) &&
    !isNaN(Number(property.latitude)) &&
    !isNaN(Number(property.longitude)) &&
    property.latitude > 0 &&
    property.longitude > 0
  );
}
