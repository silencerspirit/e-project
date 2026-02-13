import { MainPageSchema } from './main-page.schemas';
import type { InferOutput } from 'valibot';

export type TMainPage = InferOutput<typeof MainPageSchema>;
