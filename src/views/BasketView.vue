<template>
  <AppHeader />

  <main class="main">
    <ProductBasket />
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import ProductBasket from "@/components/ProductBasket.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<style scoped>
.main {
  margin: 0 64px;
}
</style>
