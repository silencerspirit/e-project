import { type InferOutput } from 'valibot';
import { type ImageScheme } from './image.schemas';

export type TImage = InferOutput<typeof ImageScheme>;
