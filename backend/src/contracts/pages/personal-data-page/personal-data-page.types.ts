import { InferOutput } from 'valibot';
import { PersonalDataPageSchema } from './personal-data-page.schemas';

export type TPersonalDataPage = InferOutput<typeof PersonalDataPageSchema>;
