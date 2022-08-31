<template>
  <h2 class="products__category">The new arrivals</h2>
  <!-- Дублирование TransitionGroup, пытался решить внисением span, но он пропадает  -->

  <!-- <TransitionGroup name="list" tag="div" class="products__list">
    <template v-if="products.length > 0">
      <ProductItem v-for="product in products" :product="product" :key="product.id" @productClick="productActive" />
    </template>

    <template v-else>
      <span>Product not found</span>
    </template>
  </TransitionGroup> -->

  <TransitionGroup name="list" tag="div" class="products__list" v-if="products.length > 0">
    <ProductItem v-for="product in products" :product="product" :key="product.id" @productClick="productActive" />
  </TransitionGroup>
  <TransitionGroup name="list" tag="div" class="products__list" v-else>
    <span>Product not found</span>
  </TransitionGroup>
  <Teleport to="body">
    <ProductModal :product="activeProduct" v-if="isActiveModal && activeProduct" @close="hiddenModel" />
  </Teleport>

  <UiLoader v-if="loading" />
</template>

<script setup lang="ts">
import ProductModal from "@/components/ProductModal.vue";
import { defineProps, ref, toRefs } from "vue";

import ProductItem from "@/components/ProductItem.vue";
import UiLoader from "@/components/UI/UiLoader.vue";

import { ProductType } from "@/types/index";

type TProps = {
  products: ProductType[];
  loading: boolean;
};

const props = defineProps<TProps>();
const { products, loading } = toRefs(props);
const isActiveModal = ref(false); // в чём смысл этой переменной
const activeProduct = ref<ProductType | null>(null);

const productActive = (product: ProductType) => {
  activeProduct.value = product;
  isActiveModal.value = true;
};

const hiddenModel = () => {
  activeProduct.value = null;
  isActiveModal.value = false;
};
</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}

.products {
  &__category {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: #000000;
  }

  &__list {
    display: flex;
    column-gap: 24px;
    row-gap: 64px;
    justify-content: space-between;
    flex-wrap: wrap;

    margin-top: 32px;
  }
}
</style>
