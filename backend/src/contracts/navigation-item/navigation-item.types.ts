import { type InferOutput } from 'valibot';
import { type MenuSchema, type NavigationItemSchema } from './navigation-item.schemas';

export type TNavigationItem = InferOutput<typeof NavigationItemSchema>;

export type TMenu = InferOutput<typeof MenuSchema>;
