<template>
  <div class="product-basket-item">
    <div class="product-basket-item__container">
      <div class="product-basket-item__about">
        <div class="about__image">
          <img :src="product.image" :alt="product.title" />
        </div>

        <div class="about__text">
          <span class="about__name">{{ product.title }}</span>
          <span class="about__price">{{ product.price }} RWF</span>
        </div>
      </div>

      <div class="product-basket-item__counter">
        <UiCounter
          :count="product.amount"
          :min="-1"
          :max="1000"
          @updateCount="updateAmountProduct"
        />
      </div>

      <div class="product-basket-item__sum-price">
        <span>{{ (product.price * amountProduct).toFixed(2) }} RWF</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BasketProductType } from "@/types";
import { toRefs, defineProps, ref } from "vue";
import UiCounter from "@/components/UI/UiCounter.vue";
import { useBasketStore } from "@/stores/basketStore";

type TProps = {
  product: BasketProductType;
};

const props = defineProps<TProps>();
const { product } = toRefs(props);

const basketStore = useBasketStore();

const amountProduct = ref(product.value.amount);

const updateAmountProduct = (value: number) => {
  if (value === 0) {
    basketStore.removeBasketProduct(product.value.id);
  } else {
    amountProduct.value = value;
    basketStore.changeAmount(product.value.id, amountProduct.value);
  }
};
</script>

<style lang="scss" scoped>
.product-basket-item {
  background: rgba(0, 0, 0, 0.04);
  padding: 24px 32px;

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__about {
    display: flex;
    column-gap: 24px;
  }

  &__counter {
  }

  &__sum-price {
    text-align: right;
    max-width: 150px;
    width: 100%;
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;

    color: #000000;
  }
}

.about {
  &__image {
    width: 96px;
    height: 80px;
    border-radius: 8px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__text {
    width: 250px;

    display: flex;
    justify-content: center;
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
