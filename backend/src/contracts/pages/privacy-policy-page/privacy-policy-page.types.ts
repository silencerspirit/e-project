import { InferOutput } from 'valibot';
import { PrivacyPolicyPageSchema } from './privacy-policy-page.schemas';

export type TPrivacyPolicyPage = InferOutput<typeof PrivacyPolicyPageSchema>;
