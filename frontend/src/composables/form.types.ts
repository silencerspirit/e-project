import type { TRequestForm } from '@contracts';
import type { Ref } from 'vue';

export interface IRequestFormState {
  errorMessage: Readonly<Ref<string>>;
  form: TRequestForm;
  loading: Readonly<Ref<boolean>>;
  onSubmit: () => Promise<void>;
  statusMessage: Readonly<Ref<string>>;
  submitted: Readonly<Ref<boolean>>;
}
