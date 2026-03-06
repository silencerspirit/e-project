import { array, GenericSchema, nullish, number, object, string } from 'valibot';
import { MenuPosition } from './navigation-item.enums';

interface INavigationItem {
  title: string;
  url: string;
  order: number;
}

export const NavigationItemSchema: GenericSchema<INavigationItem> = /*#__PURE__*/ object({
  title: string(),
  url: string(),
  order: number(),
});

export const MenuSchema = /*#__PURE__*/ object({
  [MenuPosition.Header]: nullish(array(NavigationItemSchema), []),
  [MenuPosition.FooterFirstColumn]: nullish(array(NavigationItemSchema), []),
  [MenuPosition.FooterSecondColumn]: nullish(array(NavigationItemSchema), []),
});
