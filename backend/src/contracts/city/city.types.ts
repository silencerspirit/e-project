import { type InferOutput } from 'valibot';
import { CitySchema } from './city.schemas';

export type TCity = InferOutput<typeof CitySchema>;
