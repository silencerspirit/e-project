import { array, GenericSchema, lazy, number, object, string } from 'valibot';

interface INavigationItem {
  title: string;
  url?: string;
  children: INavigationItem[];
  order: number;
}

export const NavigationItemSchema: GenericSchema<INavigationItem> = /*#__PURE__*/ object({
  title: string(),
  url: string(),
  children: array(lazy(() => NavigationItemSchema)),
  order: number(),
});

export const MenuSchema = /*#__PURE__*/ object({
  header: array(NavigationItemSchema),
  footer: array(NavigationItemSchema),
});
