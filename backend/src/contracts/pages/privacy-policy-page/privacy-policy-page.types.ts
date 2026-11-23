import { type InferOutput } from 'valibot';
import { type PrivacyPolicyPageSchema } from './privacy-policy-page.schemas';

export type TPrivacyPolicyPage = InferOutput<typeof PrivacyPolicyPageSchema>;
