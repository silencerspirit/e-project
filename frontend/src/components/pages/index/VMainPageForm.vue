<template>
  <form
    action="/properties/"
    role="search"
    aria-label="Поиск аренды"
    method="GET"
    class="mt-10 rounded-2xl bg-card p-4 shadow-xl sm:p-6"
    @submit.prevent="onSubmit"
  >
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <label
          for="property-type"
          class="mb-2 block text-xs font-medium text-muted-foreground"
        >
          Тип недвижимости
        </label>
        <div class="relative">
          <Building2
            aria-hidden="true"
            class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <select
            v-model="fields.propertyType"
            id="property-type"
            name="type"
            class="h-12 w-full appearance-none rounded-lg border bg-secondary pl-10 pr-3 text-sm font-medium text-foreground outline-none ring-1 ring-transparent transition focus:ring-ring"
          >
            <option
              :value="ALL_VALUE"
              selected
            >
              Все объекты
            </option>

            <option
              v-for="(type, i) in form.propertyTypes"
              :value="type.slug"
              :key="i"
            >
              {{ type.name }}
            </option>
          </select>

          <ChevronDown
            aria-hidden="true"
            class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
        </div>
      </div>

      <div>
        <label
          for="property-city"
          class="mb-2 block text-xs font-medium text-muted-foreground"
        >
          Город
        </label>
        <div class="relative">
          <MapPin
            aria-hidden="true"
            class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <select
            id="property-city"
            name="city"
            v-model="fields.city"
            class="h-12 w-full appearance-none rounded-lg border bg-secondary pl-10 pr-3 text-sm font-medium text-foreground outline-none ring-1 ring-transparent transition focus:ring-ring"
          >
            <option
              :value="ALL_VALUE"
              selected
            >
              Все города
            </option>

            <option
              v-for="city in form.cities"
              :value="city.slug"
            >
              {{ city.name }}
            </option>
          </select>

          <ChevronDown
            aria-hidden="true"
            class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
        </div>
      </div>

      <div>
        <label
          for="property-budget"
          class="mb-2 block text-xs font-medium text-muted-foreground"
        >
          Бюджет до
        </label>
        <div class="relative">
          <Banknote
            aria-hidden="true"
            class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />

          <VInput
            client:visible
            v-model="fields.budget"
            :placeholder="`${formatPrice(form.maxPrice)} ₽`"
            :max="form.maxPrice"
            inputmode="numeric"
            type="text"
            data-maska-number-locale="ru-RU"
            data-maska-number-fraction="0"
            data-maska-number-unsigned
            data-main-page-form-budget
            id="property-budget"
            name="budget"
            class="h-auto bg-secondary py-3 pl-10 text-sm"
          />
        </div>
      </div>

      <div class="flex items-end">
        <VButton
          size="{ButtonSize.Lg}"
          type="submit"
          class="h-12 w-full gap-2 bg-primary font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Search
            aria-hidden="true"
            class="h-4 w-4"
          />
          Найти
        </VButton>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { TMainPageForm } from '@contracts';
import { Banknote, Building2, ChevronDown, MapPin, Search } from 'lucide-vue-next';
import { reactive } from 'vue';

import VButton from '@/components/vue/button/VButton.vue';
import VInput from '@/components/vue/input/VInput.vue';
import { formatPrice } from '@/helpers';

import { buildSegmentsUrl, FilterCode, type TParsedSegments } from '../properties';

const ALL_VALUE = 'all';

const props = defineProps<{
  form: TMainPageForm;
}>();

const fields = reactive<{
  budget: string;
  city: string;
  propertyType: string;
}>({
  propertyType: ALL_VALUE,
  city: ALL_VALUE,
  budget: '',
});

function normalizeBudgetValue(value: string, maxValue: string): string {
  const normalizedValue = Number.parseInt(value.replace(/\D/g, ''), 10);
  const normalizedMaxValue = Number.parseInt(maxValue.replace(/\D/g, ''), 10);

  if (!Number.isFinite(normalizedValue) || normalizedValue <= 0) return '';
  if (!Number.isFinite(normalizedMaxValue) || normalizedMaxValue <= 0) return String(normalizedValue);

  return String(Math.min(normalizedValue, normalizedMaxValue));
}

function getFilters(): TParsedSegments {
  const filters: TParsedSegments = {};
  const propertyType = fields.propertyType;
  const city = fields.city;
  const budget = normalizeBudgetValue(fields.budget, props.form.maxPrice.toString());

  if (propertyType && propertyType !== ALL_VALUE) filters[FilterCode.PropertyType] = propertyType;
  if (city && city !== ALL_VALUE) filters[FilterCode.City] = city;
  if (budget) filters[FilterCode.PriceTo] = budget;

  return filters;
}

function onSubmit() {
  const url = buildSegmentsUrl(getFilters());

  window.location.assign(url);
}
</script>
