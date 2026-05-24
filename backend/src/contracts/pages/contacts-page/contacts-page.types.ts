import type { InferOutput } from 'valibot';
import { ContactsPageOffice, ContactsPageSchema } from './contacts-page.schemas';

export type TContactsPage = InferOutput<typeof ContactsPageSchema>;
export type TContactsPageOffice = InferOutput<typeof ContactsPageOffice>;
