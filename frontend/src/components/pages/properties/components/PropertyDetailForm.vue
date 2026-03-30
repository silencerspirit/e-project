<template>
  <div class="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
    <div
      v-if="isFormSended"
      class="py-6 text-center"
    >
      <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
        <CircleCheck
          class="h-7 w-7 text-green-600"
          aria-hidden="true"
        />
      </div>
      <h3 class="mb-2 text-xl font-semibold text-foreground">Заявка отправлена!</h3>
      <p class="text-sm text-muted-foreground">Мы свяжемся с вами в ближайшее время</p>
    </div>

    <div v-else>
      <h3 class="mb-2 text-xl font-bold text-foreground">Узнать подробнее</h3>
      <p class="mb-6 text-sm text-muted-foreground">Оставьте заявку, и наш специалист расскажет всё о {{ title }}</p>

      <form
        class="space-y-4"
        @submit.prevent="onSubmit"
      >
        <div>
          <label
            for="property-contact-name"
            class="mb-2 block text-sm font-medium text-foreground"
          >
            Ваше имя
          </label>
          <VueInput
            v-model="form.name"
            id="property-contact-name"
            type="text"
            placeholder="Иван Петров"
            class="py-5"
            required
            autocomplete="name"
            data-property-form-name
          />
        </div>

        <div>
          <label
            for="property-contact-phone"
            class="mb-2 block text-sm font-medium text-foreground"
          >
            Телефон
          </label>
          <div class="relative">
            <Phone
              class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <VueInput
              v-model="form.phone"
              id="property-contact-phone"
              type="tel"
              name="phone"
              placeholder="+7 (___) ___-__-__"
              maska="+7 (###) ###-##-##"
              class="py-5 pl-11"
              required
              autocomplete="tel"
            />
          </div>
        </div>

        <VueButton
          type="submit"
          :disabled="isLoading"
          class="h-12 w-full bg-primary font-medium text-primary-foreground hover:bg-primary/90"
        >
          <SendHorizontal
            class="mr-2 h-4 w-4"
            aria-hidden="true"
          />
          Отправить заявку
        </VueButton>

        <p class="text-center text-xs text-muted-foreground">
          Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CircleCheck, Phone, SendHorizontal } from 'lucide-vue-next';

import VueButton from '@/components/vue/button/VueButton.vue';
import VueInput from '@/components/vue/input/VueInput.vue';
import { useRequestForm } from '@/composables';

defineProps<{
  title: string;
}>();

const { form, isFormSended, onSubmit, isLoading } = useRequestForm();
</script>
