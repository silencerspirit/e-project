import type { TPrivacyPolicyPage } from '@contracts';

import { BASE_CACHE_TIME_MS } from '@/constants';
import { cached, strapiFetch } from '@/utils';

export function getPrivacyPolicyPage(): Promise<TPrivacyPolicyPage> {
  return cached('/api/privacy-policy-page', BASE_CACHE_TIME_MS, () =>
    strapiFetch<TPrivacyPolicyPage>('/api/privacy-policy-page'),
  );
}
