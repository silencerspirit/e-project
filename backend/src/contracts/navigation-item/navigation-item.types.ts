import { InferOutput } from 'valibot';
import { MenuSchema, NavigationItemSchema } from './navigation-item.schemas';

export type TNavigationItem = InferOutput<typeof NavigationItemSchema>;

export type TMenu = InferOutput<typeof MenuSchema>;
