import { InferOutput } from 'valibot';
import { PaginateSchema } from './paginate.schemas';

export type TPaginate = InferOutput<typeof PaginateSchema>;
