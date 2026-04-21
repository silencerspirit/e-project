import { GalleryItemScheme } from './gallery-item.schemas';

import type { InferOutput } from 'valibot';

export type TGalleryItem = InferOutput<typeof GalleryItemScheme>;
