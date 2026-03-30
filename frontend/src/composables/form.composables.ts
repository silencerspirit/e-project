import type { TRequestForm } from '@contracts';
import { reactive, readonly, ref } from 'vue';

import { postRequestForm } from '@/api';
import { wait } from '@/helpers';

export function useRequestForm() {
  const SUCCESS_TIMEOUT = 3_000;

  const isFormSended = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  const form = reactive<TRequestForm>({
    phone: '',
    name: '',
    pageUrl: import.meta.env.SSR ? '' : window.location.href,
  });

  function resetForm() {
    form.name = '';
    form.phone = '';
  }

  async function onSubmit() {
    try {
      isLoading.value = true;
      await postRequestForm(form);
      isFormSended.value = true;
      resetForm();
      await wait(SUCCESS_TIMEOUT);
      isFormSended.value = false;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    form,
    isFormSended: readonly(isFormSended),
    isLoading: readonly(isLoading),
    onSubmit,
  };
}
