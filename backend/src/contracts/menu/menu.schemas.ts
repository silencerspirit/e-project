import { array, GenericSchema, lazy, number, object, optional, string } from 'valibot';

interface INavigationItem {
  title: string;
  url?: string;
  children: INavigationItem[];
  order: number;
}

export const NavigationItemSchema: GenericSchema<INavigationItem> = object({
  title: string(),
  url: optional(string()),
  children: array(lazy(() => NavigationItemSchema)),
  order: number(),
});

export const MenuSchema = object({
  header: array(NavigationItemSchema),
  footer: array(NavigationItemSchema),
});
