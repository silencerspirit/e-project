import { GalleryPageSchema } from './gallery-page.schemas';
import type { InferOutput } from 'valibot';

export type TGalleryPage = InferOutput<typeof GalleryPageSchema>;
