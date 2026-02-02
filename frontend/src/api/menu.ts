import { MenuSchema, type TMenu } from '@contracts/menu';
import { parse } from 'valibot';
import { cached, strapiFetch } from 'src/utils';
import { BASE_CACHE_TIME_MS } from 'src/constants';

export function getMenu(): Promise<TMenu> {
  return cached('/api/menu', BASE_CACHE_TIME_MS, async () => {
    const json = await strapiFetch('/api/menu');
    return parse(MenuSchema, json);
  });
}
