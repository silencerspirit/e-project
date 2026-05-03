import { AboutPageSchema, AboutPageTeamItemSchema } from './about-page.schemas';
import type { InferOutput } from 'valibot';

export type TAboutPage = InferOutput<typeof AboutPageSchema>;
export type TAboutTeamItem = InferOutput<typeof AboutPageTeamItemSchema>;
