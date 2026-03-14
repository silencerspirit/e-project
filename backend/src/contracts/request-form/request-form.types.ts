import { InferOutput } from 'valibot';
import { RequestFormSchema } from './request-form.schemas';

export type TRequestForm = InferOutput<typeof RequestFormSchema>;
