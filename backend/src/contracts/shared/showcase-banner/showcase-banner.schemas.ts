import { array, object, string } from 'valibot';
import { PropertyListItemSchema } from '../../property';

export const ShowcaseBannerScheme = object({
  title: string(),
  description: string(),
  properties: array(PropertyListItemSchema),
});
