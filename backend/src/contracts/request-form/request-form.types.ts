import type { InferOutput } from 'valibot';
import type { RequestFormSchema, RequestFormSubmissionSchema } from './request-form.schemas';

export type TRequestForm = InferOutput<typeof RequestFormSchema>;
export type TRequestFormSubmission = InferOutput<typeof RequestFormSubmissionSchema>;
