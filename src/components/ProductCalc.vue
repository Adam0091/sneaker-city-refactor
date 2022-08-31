<template>
  <div class="product-calc">
    <div class="product-calc__container">
      <div class="product-calc__title">
        <span>Order summary</span>
      </div>

      <div class="product-calc__calculations">
        <div class="calculations__item">
          <span class="calculations__title">Sub total</span>
          <span class="calculations__value">{{ totalSum.toFixed(2) }} RWF</span>
        </div>

        <div class="calculations__item">
          <span class="calculations__title">Delivery fee</span>
          <span class="calculations__value">0RWF</span>
        </div>
      </div>

      <div class="product-calc__total-price">
        <span>{{ totalSum.toFixed(2) }} RWF</span>
      </div>

      <div class="product-calc__button">
        <UiButton
          width="217px"
          text="Proceed to checkout"
          @click="handleProceedCheckout"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBasketStore } from "@/stores/basketStore";
import { toRefs, defineProps } from "vue";
import { useRouter } from "vue-router";
import UiButton from "./UI/UiButton.vue";

type TProps = {
  totalSum: number;
};

const basketStore = useBasketStore();
const router = useRouter();

const props = defineProps<TProps>();
const { totalSum } = toRefs(props);

const handleProceedCheckout = () => {
  basketStore.clearBasket();
  router.push("/all");
};
</script>

<style lang="scss" scoped>
.product-calc {
  &__container {
  }

  &__title {
    font-weight: 400;
    font-size: 18px;
    line-height: 32px;

    color: rgba(0, 0, 0, 0.75);
  }

  &__calculations {
    padding: 32px 0;

    display: flex;
    flex-direction: column;
    row-gap: 12px;

    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }

  &__total-price {
    margin-top: 24px;

    display: flex;
    justify-content: flex-end;

    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    color: #000000;
  }

  &__button {
    margin-top: 64px;
  }
}

.calculations {
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    color: rgba(0, 0, 0, 0.65);
  }

  &__value {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    color: #000000;
  }
}
</style>
