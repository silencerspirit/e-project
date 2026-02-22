import type { InferOutput } from 'valibot';
import { PropertyListingPageSchema } from './property-listing-page.schemas';

export type TPropertyListingPage = InferOutput<typeof PropertyListingPageSchema>;
