<template>
  <section
    class="bg-background py-20 lg:py-28"
    aria-labelledby="main-page-action-title"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 sm:p-12 lg:p-16"
      >
        <div
          class="pointer-events-none absolute inset-0 opacity-10"
          aria-hidden="true"
        >
          <div class="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-card"></div>
          <div class="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-card"></div>
        </div>

        <div class="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2
              id="main-page-action-title"
              class="text-balance text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl lg:text-5xl"
            >
              Готовы найти идеальную недвижимость?
            </h2>
            <p class="mt-6 max-w-lg text-lg text-primary-foreground/80">
              Оставьте заявку, и наш специалист свяжется с вами в течение 15 минут для бесплатной консультации
            </p>

            <ul class="mt-8 flex flex-wrap gap-6 text-primary-foreground/90">
              <li
                class="flex items-center gap-2"
                v-for="(item, i) in ADVANTAGES"
                :key="i"
              >
                <CircleCheck
                  aria-hidden="true"
                  class="h-5 w-5"
                />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="main-page-action__form rounded-2xl bg-card p-6 shadow-2xl sm:p-8">
            <div
              v-if="isFormSended"
              id="request-form-success"
              class="py-8 text-center"
              aria-live="polite"
            >
              <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CircleCheck
                  aria-hidden="true"
                  class="h-8 w-8 text-green-600"
                />
              </div>
              <h3 class="mb-2 text-xl font-semibold text-foreground">Заявка отправлена!</h3>
              <p class="text-muted-foreground">Наш специалист свяжется с вами в ближайшее время</p>
            </div>

            <div v-else>
              <h3 class="mb-6 text-xl font-semibold text-foreground">Оставьте ваш номер телефона</h3>
              <form
                class="space-y-4"
                id="request-form"
                @submit.prevent="onSubmit"
              >
                <div>
                  <label
                    for="request-form-phone"
                    class="mb-2 block text-sm font-medium text-foreground"
                  >
                    Телефон
                  </label>
                  <div class="relative">
                    <Phone
                      aria-hidden="true"
                      class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                    />

                    <VueInput
                      v-model="form.phone"
                      id="request-form-phone"
                      type="tel"
                      name="phone"
                      placeholder="+7 (___) ___-__-__"
                      class="py-6 pl-12 text-base"
                      required
                      maska="+7 (###) ###-##-##"
                      autocomplete="tel"
                    />
                  </div>
                </div>
                <VueButton
                  :size="ButtonSize.Lg"
                  :disabled="isLoading"
                  type="submit"
                  class="h-14 w-full bg-primary text-base font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <SendHorizontal
                    aria-hidden="true"
                    class="mr-2 h-5 w-5"
                  />
                  Отправить
                </VueButton>
                <p class="text-center text-xs text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { CircleCheck, Phone, SendHorizontal } from 'lucide-vue-next';

import { ButtonSize } from '@/components/vue/button/button.enums';
import VueButton from '@/components/vue/button/VueButton.vue';
import { useRequestForm } from '@/composables';

import VueInput from './input/VueInput.vue';

const ADVANTAGES = ['Бесплатная консультация', 'Помощь с ипотекой', 'Показ объектов'];

const { form, isFormSended, onSubmit, isLoading } = useRequestForm();
</script>
