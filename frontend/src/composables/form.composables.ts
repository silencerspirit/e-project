import type { TRequestForm } from '@contracts';
import { onBeforeUnmount, reactive, readonly, ref } from 'vue';

import { postRequestForm } from '@/api';
import { wait } from '@/helpers';
import { SmartCaptchaClientError } from '@/utils/smartcaptcha/smartcaptcha.errors';
import { StrapiRequestError } from '@/utils/strapi';

import { REQUEST_FORM_MESSAGES, REQUEST_FORM_SUCCESS_TIMEOUT_MS } from './form.constants';
import type { IRequestFormState } from './form.types';

export function useRequestForm(): IRequestFormState {
  const form = reactive<TRequestForm>({
    phone: '',
    name: '',
    comment: '',
    pageUrl: import.meta.env.SSR ? '' : window.location.href,
  });

  const submitted = ref<boolean>(false);
  const loading = ref<boolean>(false);
  const errorMessage = ref<string>('');
  const statusMessage = ref<string>('');
  let submissionController: AbortController | undefined;

  function resetForm() {
    form.name = '';
    form.phone = '';
    form.comment = '';
  }

  function getErrorMessage(error: unknown): string {
    if (error instanceof StrapiRequestError) return error.publicMessage;
    if (error instanceof SmartCaptchaClientError) return error.message;
    return REQUEST_FORM_MESSAGES.failed;
  }

  async function onSubmit() {
    if (loading.value) return;

    const controller = new AbortController();
    submissionController = controller;
    errorMessage.value = '';

    try {
      loading.value = true;
      statusMessage.value = REQUEST_FORM_MESSAGES.checkingCaptcha;
      const { getSmartCaptchaToken } = await import('@/utils/smartcaptcha/smartcaptcha.utils');
      const captchaToken = await getSmartCaptchaToken(
        import.meta.env.PUBLIC_SMARTCAPTCHA_SITE_KEY ?? '',
        controller.signal,
      );
      controller.signal.throwIfAborted();
      statusMessage.value = REQUEST_FORM_MESSAGES.sending;
      await postRequestForm({ ...form, pageUrl: window.location.href, captchaToken });
      if (controller.signal.aborted) return;
      submitted.value = true;
      resetForm();
      await wait(REQUEST_FORM_SUCCESS_TIMEOUT_MS);
      submitted.value = false;
    } catch (error) {
      if (!controller.signal.aborted) {
        errorMessage.value = getErrorMessage(error);
      }
    } finally {
      loading.value = false;
      statusMessage.value = '';
      submissionController = undefined;
    }
  }

  onBeforeUnmount(() => submissionController?.abort());

  return {
    form,
    submitted: readonly(submitted),
    loading: readonly(loading),
    errorMessage: readonly(errorMessage),
    statusMessage: readonly(statusMessage),
    onSubmit,
  };
}
