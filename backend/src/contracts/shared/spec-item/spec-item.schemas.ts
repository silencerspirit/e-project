import { enum_ as enumType, object, string } from 'valibot';

import { SpecItemType } from './spec-item.enums';

export const SpecItemSchema = object({
  key: enumType(SpecItemType),
  label: string(),
  value: string(),
});
