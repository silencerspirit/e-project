import { InferOutput } from 'valibot';
import { BadgeSchema } from './badge.schemas';

export type TBadge = InferOutput<typeof BadgeSchema>;
