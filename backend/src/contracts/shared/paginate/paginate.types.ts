import { type InferOutput } from 'valibot';
import { type PaginateSchema } from './paginate.schemas';

export type TPaginate = InferOutput<typeof PaginateSchema>;
