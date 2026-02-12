import { array, GenericSchema, lazy, number, object, string } from 'valibot';

interface INavigationItem {
  title: string;
  url?: string;
  children: INavigationItem[];
  order: number;
}

export const NavigationItemSchema: GenericSchema<INavigationItem> = object({
  title: string(),
  url: string(),
  children: array(lazy(() => NavigationItemSchema)),
  order: number(),
});

export const MenuSchema = object({
  header: array(NavigationItemSchema),
  footer: array(NavigationItemSchema),
});
