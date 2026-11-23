import { type InferOutput } from 'valibot';
import { type BadgeSchema } from './badge.schemas';

export type TBadge = InferOutput<typeof BadgeSchema>;
