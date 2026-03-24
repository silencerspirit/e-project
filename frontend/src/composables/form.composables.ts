import type { TRequestForm } from '@contracts';
import { reactive, readonly, ref } from 'vue';

import { postRequestForm } from '@/api';
import { wait } from '@/helpers';

export function useRequestForm() {
  const SUCCESS_TIMEOUT = 3_000;

  const isFormSended = ref<boolean>(false);

  const form = reactive<TRequestForm>({
    phone: '',
    name: '',
  });

  async function onSubmit() {
    try {
      await postRequestForm(form);
      isFormSended.value = true;
      await wait(SUCCESS_TIMEOUT);
      isFormSended.value = false;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    form,
    isFormSended: readonly(isFormSended),
    onSubmit,
  };
}
