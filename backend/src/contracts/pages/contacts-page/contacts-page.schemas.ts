import { SeoSchema } from '../../shared/seo';
import { MetricItemScheme } from '../../shared/metric-item';
import { array, boolean, nullish, number, object, string } from 'valibot';

const ContactsPageFormSection = /*#__PURE__*/ object({
  title: string(),
  description: nullish(string(), ''),
  features: nullish(array(MetricItemScheme), []),
});

const ContactsPageBlockSection = /*#__PURE__*/ object({
  title: string(),
  description: string(),
  value: string(),
});

export const ContactsPageOffice = /*#__PURE__*/ object({
  city: string(),
  address: string(),
  phone: string(),
  workTime: string(),
  general: nullish(boolean(), false),
  latitude: number(),
  longitude: number(),
});

const ContactsPageMapSection = /*#__PURE__*/ object({
  title: string(),
  description: nullish(string(), ''),
  offices: nullish(array(ContactsPageOffice), []),
});

export const ContactsPageSchema = /*#__PURE__*/ object({
  title: string(),
  description: string(),
  contactsBlockSection: nullish(array(ContactsPageBlockSection), []),
  contactsFormSection: nullish(ContactsPageFormSection, null),
  contactsMapSection: nullish(ContactsPageMapSection, null),

  seo: SeoSchema,
});
