import type { AstroGlobal } from 'astro';

const fields: Partial<AstroGlobal> = {};

export function useAstro(astro?: AstroGlobal): Partial<AstroGlobal> {
  if (!astro) return fields;

  const { url } = astro;

  fields.url = url;

  return fields;
}
