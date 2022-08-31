<template>
  <Transition name="modal">
    <div class="product-modal" @click="$emit('close')">
      <div class="product-modal__container" @click.stop>
        <div class="product-modal__product">
          <div class="product__header">
            <div class="product__description">
              <div class="product__name">
                <h5>{{ product.title }}</h5>
              </div>
              <div class="product__price">
                <span>{{ product.price }}RWF</span>
              </div>
            </div>

            <div
              class="product__add-favorite"
              :class="{ 'product__add-favorite--active': isFavoriteProduct }"
              @click="clickFavorite"
            >
              <svg
                width="24"
                height="22"
                viewBox="0 0 24 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.8401 3.60999C20.3294 3.099 19.7229 2.69364 19.0555 2.41708C18.388 2.14052 17.6726 1.99817 16.9501 1.99817C16.2276 1.99817 15.5122 2.14052 14.8448 2.41708C14.1773 2.69364 13.5709 3.099 13.0601 3.60999L12.0001 4.66999L10.9401 3.60999C9.90843 2.5783 8.50915 1.9987 7.05012 1.9987C5.59109 1.9987 4.19181 2.5783 3.16012 3.60999C2.12843 4.64169 1.54883 6.04096 1.54883 7.49999C1.54883 8.95903 2.12843 10.3583 3.16012 11.39L4.22012 12.45L12.0001 20.23L19.7801 12.45L20.8401 11.39C21.3511 10.8792 21.7565 10.2728 22.033 9.60535C22.3096 8.93789 22.4519 8.22248 22.4519 7.49999C22.4519 6.77751 22.3096 6.0621 22.033 5.39464C21.7565 4.72718 21.3511 4.12075 20.8401 3.60999V3.60999Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <div class="product__slider-images">
            <UiSliderImage :images="fakeArrayImages" />
          </div>
        </div>

        <div class="product-modal__description">
          <div class="description__header">
            <div class="description__title-wrapper">
              <div class="description__title">
                <span>Description</span>
              </div>

              <div
                class="description__arrow"
                :class="{ 'description__arrow--active': isHiddenDescription }"
                @click="clickArrow"
              >
                <img src="@/assets/images/arrowUp.png" alt="show or hidden description" />
              </div>
            </div>

            <div
              class="description__container"
              :class="{ 'description__container--hidden': isHiddenDescription }"
            >
              <p class="description__text">
                {{ product.description }}
              </p>
            </div>
          </div>

          <div class="product-modal__add-to-card">
            <UiCounter
              :count="amountProduct"
              @updateCount="updateAmountProduct"
              :min="0"
              :max="1000"
            />
            <UiButton @click="handleAddProduct" text="Add to card" width="135px" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs } from "vue";

import { useFavoriteStore } from "@/stores/favoritesStore";

import UiButton from "@/components/UI/UiButton.vue";
import UiCounter from "@/components/UI/UiCounter.vue";
import UiSliderImage from "@/components/UI/UiSliderImage.vue";

import { ProductType } from "@/types";
import { useBasketStore } from "@/stores/basketStore";

type TProps = {
  product: ProductType;
};

const props = defineProps<TProps>();
const { product } = toRefs(props);

const basketStore = useBasketStore();
const favoriteStore = useFavoriteStore();

const amountProductInBasket = () => {
  const basketProduct = basketStore.basket.filter((item) => item.id === product.value.id);
  if (basketProduct.length !== 0) {
    return basketProduct[0].amount;
  }

  return 1;
};

const isHiddenDescription = ref(false); // не нравиться наличие is
const isFavoriteProduct = ref(false); // не нравиться наличие is
const amountProduct = ref(amountProductInBasket());

const fakeArrayImages = Array(4).fill(product.value.image);

const handleAddProduct = () => {
  const isProductInBasket =
    basketStore.basket.filter((item) => item.id === product.value.id).length !== 0;

  if (isProductInBasket) {
    basketStore.changeAmount(product.value.id, amountProduct.value);
  } else {
    basketStore.addBasketProduct(
      Object.assign({ amount: amountProduct.value }, product.value)
    );
  }
};

const clickArrow = () => (isHiddenDescription.value = !isHiddenDescription.value);
const clickFavorite = () => {
  if (isFavoriteProduct.value) {
    favoriteStore.removeFavoriteProduct(product.value);
    isFavoriteProduct.value = false;
  } else {
    favoriteStore.addFavoriteProduct(product.value);
    isFavoriteProduct.value = true;
  }
};
const updateAmountProduct = (value: number) => {
  amountProduct.value = value;
  basketStore.changeAmount(product.value.id, amountProduct.value);
};
</script>

<style lang="scss" scoped>
.product-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(196, 196, 196, 0.3);

  &__container {
    max-width: 90%;
    min-height: 300px;
    max-height: 90%;
    width: 100%;
    height: 100%;

    background: white;

    display: flex;
    justify-content: center;
  }

  &__product {
    padding: 30px 65px 30px 64px;
    flex: 66% 0 1;

    background: rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    row-gap: 40px;
  }

  &__description {
    flex: 34% 0 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 32px 64px;
  }

  &__add-to-card {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    column-gap: 20px;
    row-gap: 20px;
  }
}

.product {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__description {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  &__name {
    font-weight: 700;
    font-size: 36px;

    color: #000000;
  }

  &__price {
    margin-top: 24px;

    font-weight: 400;
    font-size: 18px;
    line-height: 28px;

    color: rgba(0, 0, 0, 0.65);
  }

  &__add-favorite {
    width: 20px;
    height: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transition: all 0.2s;

    &--active {
      svg path {
        fill: rgb(237, 83, 83);
      }
    }

    &:hover {
      transform: scale(1.1);
    }
  }

  &__slider-images {
    max-width: 47vw;
    height: 100%;
    overflow: hidden;
  }
}

.description {
  &__header {
    padding-bottom: 32px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }

  &__title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    color: #000000;
  }

  &__arrow {
    width: 20px;
    height: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transition: all 0.2s;
    user-select: none;

    &--active {
      transform: rotate(180deg);
    }
  }

  &__container {
    overflow: hidden;
    height: 100%;
    transition: all 0.2s;

    &--hidden {
      height: 0px;
    }
  }

  &__text {
    margin-top: 18px;

    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    color: rgba(0, 0, 0, 0.65);
  }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
