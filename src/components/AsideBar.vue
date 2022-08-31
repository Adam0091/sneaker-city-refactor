<template>
  <aside class="aside">
    <div class="aside__filters">
      <div class="filters__item" v-for="filter in filtersComponents" :key="filter.name">
        <span class="filters__title">{{ filter.name }}</span>
        <div class="filters__container">
          <component :is="filter.component" @update-filter="updateFilter"></component>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import PriceFilter from "@/components/Filters/PriceFilter.vue";
import RatingFilter from "@/components/Filters/RatingFilters.vue";

import { ref, defineEmits } from "vue";

const emit = defineEmits(["changeFilter"]); // Плохо ли двойное всплытие emit

const filterOptions = ref({
  price: {
    min: 0,
    max: 1000,
  },
  rating: 0,
});

const filtersComponents = ref([
  // это не состояние
  {
    name: "Price range",
    component: PriceFilter,
  },
  {
    name: "Rating",
    component: RatingFilter,
  },
]);

const updateFilter = (type: string, value: number) => {
  if (type === "max") {
    filterOptions.value.price.max = value;
  }

  if (type === "min") {
    filterOptions.value.price.min = value;
  }
  if (type === "min") {
    filterOptions.value.price.min = value;
  }
  if (type === "rating") {
    filterOptions.value.rating = value;
  }

  emit("changeFilter", filterOptions.value);
};
</script>

<style lang="scss" scoped>
.aside {
  margin-left: 32px;
  max-width: 302px;
  width: 100%;
}

.filters {
  &__item {
    padding: 32px 42px 32px 32px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }

  &__title {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    color: #000000;
  }
}
</style>
