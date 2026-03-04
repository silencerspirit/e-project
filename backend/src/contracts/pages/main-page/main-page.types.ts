import { MainPagePageFacetSchema, MainPagePageFormSchema, MainPageSchema } from './main-page.schemas';
import type { InferOutput } from 'valibot';

export type TMainPage = InferOutput<typeof MainPageSchema>;
export type TMainPageFacet = InferOutput<typeof MainPagePageFacetSchema>;
export type TMainPageForm = InferOutput<typeof MainPagePageFormSchema>;
