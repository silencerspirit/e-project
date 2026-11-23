import { type InferOutput } from 'valibot';
import { type CitySchema } from './city.schemas';

export type TCity = InferOutput<typeof CitySchema>;
