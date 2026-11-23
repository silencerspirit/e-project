import { type InferOutput } from 'valibot';
import { type PersonalDataPageSchema } from './personal-data-page.schemas';

export type TPersonalDataPage = InferOutput<typeof PersonalDataPageSchema>;
