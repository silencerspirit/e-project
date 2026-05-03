<template>
  <section
    class="v-about-team-section bg-background py-20 lg:py-28"
    aria-labelledby="about-team-title"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-14 text-center">
        <p class="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">Команда</p>
        <h2
          id="about-team-title"
          class="text-balance text-3xl font-bold text-foreground sm:text-4xl"
        >
          {{ info.title }}
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {{ info.description }}
        </p>
      </div>

      <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="(card, i) in info.team"
          :key="`${card.name}-${i}`"
          class="v-about-team-section__item group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl"
        >
          <article class="h-full">
            <figure class="v-about-team-section__item-img relative overflow-hidden">
              <VImage
                :image="card.photo"
                class="absolute h-full w-full transition-transform duration-500 group-hover:scale-105"
                fit="cover"
              />
            </figure>

            <div class="p-5">
              <h3 class="text-lg font-semibold text-foreground">{{ card.name }}</h3>
              <p class="text-sm font-medium text-primary">{{ card.position }}</p>

              <p
                v-if="card.description"
                class="mt-3 text-sm leading-relaxed text-muted-foreground"
              >
                {{ card.description }}
              </p>

              <address
                v-if="isExistPhoneOrEmail(card)"
                class="mt-4 flex items-center gap-3 not-italic"
              >
                <a
                  v-if="card.phone"
                  :href="`tel:${card.phone}`"
                  class="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary transition-colors hover:bg-primary/10"
                  :aria-label="`Позвонить ${card.name}`"
                >
                  <LucidePhone
                    class="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </a>

                <a
                  v-if="card.email"
                  :href="`mailto:${card.email}`"
                  class="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary transition-colors hover:bg-primary/10"
                  :aria-label="`Написать ${card.name}`"
                >
                  <LucideMail
                    class="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </a>
              </address>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TAboutPage, TAboutTeamItem } from '@contracts';
import { LucideMail, LucidePhone } from 'lucide-vue-next';

import VImage from '@/components/vue/image/VImage.vue';

defineProps<{
  info: NonNullable<TAboutPage['teamSection']>;
}>();

function isExistPhoneOrEmail(card: TAboutTeamItem): boolean {
  return Boolean(card.phone ?? card.email ?? '');
}
</script>

<style lang="scss">
.v-about-team-section {
  &__item-img {
    aspect-ratio: 3 / 4;
  }
}
</style>
