import type { InferOutput } from 'valibot';
import { type ContactsPageOffice, type ContactsPageSchema } from './contacts-page.schemas';

export type TContactsPage = InferOutput<typeof ContactsPageSchema>;
export type TContactsPageOffice = InferOutput<typeof ContactsPageOffice>;
