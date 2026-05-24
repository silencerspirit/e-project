<template>
  <section class="bg-secondary/50 py-16 lg:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 class="text-balance text-3xl font-bold text-foreground sm:text-4xl">{{ info?.title }}</h2>
          <p
            class="mt-4 max-w-lg text-lg text-muted-foreground"
            v-if="info?.description"
          >
            {{ info.description }}
          </p>

          <div class="mt-10 space-y-6">
            <div
              class="flex items-start gap-4"
              v-for="(feature, i) in info?.features"
              :key="i"
            >
              <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <LucideCircleCheckBig class="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 class="font-semibold text-foreground">{{ feature.value }}</h4>
                <p class="mt-1 text-sm text-muted-foreground">
                  {{ feature.label }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
          <div
            v-if="isFormSended"
            class="py-8"
          >
            <VFormSuccess />
          </div>

          <form
            v-else
            class="space-y-5"
            @submit.prevent="onSubmit"
          >
            <div>
              <label
                for="name"
                class="mb-2 block text-sm font-medium text-foreground"
              >
                Ваше имя *
              </label>
              <div class="relative">
                <LucideUser
                  aria-hidden="true"
                  class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                />

                <VInput
                  v-model="form.name"
                  name="name"
                  class="py-6 pl-12 text-base"
                  required
                  placeholder="Ваше имя"
                />
              </div>
            </div>
            <div>
              <label
                for="phone"
                class="mb-2 block text-sm font-medium text-foreground"
              >
                Телефон *
              </label>
              <div class="relative">
                <Phone
                  aria-hidden="true"
                  class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                />

                <VInput
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
            <div>
              <label
                for="comment"
                class="mb-2 block text-sm font-medium text-foreground"
              >
                Комментарий
              </label>
              <div class="relative">
                <LucideMessageSquare
                  aria-hidden="true"
                  class="absolute left-4 top-4 h-5 w-5 text-muted-foreground"
                />

                <textarea
                  v-model="form.comment"
                  name="comment"
                  placeholder="Опишите ваш вопрос..."
                  class="min-h-[120px] w-full resize-none rounded-xl border border-input py-3 pl-12 pr-4 text-base focus:outline-none focus:ring-1 focus:ring-ring"
                ></textarea>
              </div>
            </div>
            <VButton
              :size="ButtonSize.Xl"
              :disabled="isLoading"
              type="submit"
              class="w-full"
            >
              <LucideSend class="mr-2 h-5 w-5" />
              Отправить заявку
            </VButton>

            <p class="text-center text-xs text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь с

              <a
                href="/privacy-policy/"
                class="text-primary hover:underline"
                >политикой конфиденциальности</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TContactsPage } from '@contracts';
import { LucideCircleCheckBig, LucideMessageSquare, LucideSend, LucideUser, Phone } from 'lucide-vue-next';

import { ButtonSize } from '@/components/vue/button/button.enums';
import VButton from '@/components/vue/button/VButton.vue';
import VFormSuccess from '@/components/vue/form-success/VFormSuccess.vue';
import VInput from '@/components/vue/input/VInput.vue';
import { useRequestForm } from '@/composables';

defineProps<{
  info: TContactsPage['contactsFormSection'];
}>();

const { form, isFormSended, isLoading, onSubmit } = useRequestForm();
</script>
