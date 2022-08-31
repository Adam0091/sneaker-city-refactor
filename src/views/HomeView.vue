<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

import AppHeader from "@/components/AppHeader.vue";
import AsideBar from "@/components/AsideBar.vue";
import AppFooter from "@/components/AppFooter.vue";
import ProductsList from "@/components/ProductsList.vue";

import { GET_PRODUCTS, GET_PRODUCTS_BY_CATEGORY } from "@/utils/network";

import { FilterOptionsType, ProductType } from "@/types/index";
let products:ProductType[] = [];
const filterProducts = ref<ProductType[]>([]);
const currentCategory = ref("");
const loading = ref(true);

onMounted(async () => {
  products = await GET_PRODUCTS(); // Стоит ли решить через localStorage
  filterProducts.value = [...products];
  loading.value = false;
});

watch(currentCategory, async () => {
  loading.value = true;
  products = await GET_PRODUCTS_BY_CATEGORY(currentCategory.value); // Стоит ли решить через localStorage
  filterProducts.value = [...products];
  loading.value = false;
});

const filter = (filterOptions: FilterOptionsType) => {
  filterProducts.value = products.filter(
    (product) =>
      product.price >= filterOptions.price.min &&
      product.price <= filterOptions.price.max &&
      product.rating.rate >= filterOptions.rating
  );
};
</script>

<template>
  <AppHeader @change-category="currentCategory = $event" />
  <div class="container">
    <AsideBar @change-filter="filter" />
    <div class="wrapper">
      <main class="main">
        <ProductsList :products="filterProducts" :loading="loading" />
      </main>
      <AppFooter />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
}

.main {
  padding: 32px 0 92px 0;
  min-height: 800px;
}

.wrapper {
  margin: 0 64px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
