import { InferOutput } from 'valibot';
import { ImageScheme } from './image.schemas';

export type TImage = InferOutput<typeof ImageScheme>;
