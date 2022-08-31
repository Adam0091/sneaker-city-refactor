<template>
  <div class="product-basket">
    <div class="product-basket__container">
      <div class="product-basket__list">
        <div class="product-basket__title">
          <span>Your shopping cart</span>
        </div>

        <div v-if="basketStore.basket.length > 0">
          <ProductBasketItem
            :product="product"
            v-for="product in basketStore.basket"
            :key="product.id"
          />
        </div>
        <div v-else>
          <span>Вы не добавили товары в корзину</span>
        </div>
      </div>

      <div class="product-basket__calc">
        <ProductCalc :totalSum="totalSum" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBasketStore } from "@/stores/basketStore";
import ProductBasketItem from "@/components/ProductBasketItem.vue";
import ProductCalc from "@/components/ProductCalc.vue";
import { onMounted, ref, watch } from "vue";

const basketStore = useBasketStore();
const totalSum = ref(0);

const updateBasketTotalSum = () => {
  totalSum.value = 0;
  basketStore.basket.forEach(
    (product) => (totalSum.value += product.amount * product.price)
  );
};

onMounted(() => {
  updateBasketTotalSum();
});

watch(basketStore, () => {
  updateBasketTotalSum();
});
</script>

<style lang="scss" scoped>
.product-basket {
  padding: 32px 32px 0 0;

  &__container {
    display: flex;
    column-gap: 71px;
    justify-content: space-between;
  }

  &__title {
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;

    color: #000000;

    margin-bottom: 21px;
  }

  &__list {
    display: flex;
    flex-direction: column;

    row-gap: 15px;

    flex: 70% 0 1;
    min-height: 70vh;
  }

  &__calc {
    flex: 30% 0 1;
  }
}
</style>
