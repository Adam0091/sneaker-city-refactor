<template>
  <div class="product" @click="$emit('productClick', product)">
    <div class="product__image">
      <img :src="product.image" :alt="product.title" />
    </div>
    <div class="product__description">
      <span class="product__name">{{ product.title }}</span>
      <span class="product__price">{{ product.price }}RWF</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from "vue";
import { ProductType } from "@/types/index";

type TProps = {
  product: ProductType;
};

const props = defineProps<TProps>();
const { product } = toRefs(props);
</script>

<style lang="scss" scoped>
.product {
  max-width: 250px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.01);
  }

  &__image {
    width: 100%;
    height: 250px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__description {
    padding: 24px 0;
    display: flex;
    column-gap: 8px;
    flex-direction: column;
  }

  &__name {
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
    color: #000000;
  }

  &__price {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
