<template>
  <div class="couter">
    <button class="couter__button" @click="changeCounter(-1)">-</button>
    <div class="couter__input-wrapper">
      <input
        class="couter__input"
        type="number"
        v-model.number="localCount"
        @input="inputChange"
      />
    </div>
    <button class="couter__button" @click="changeCounter(1)">+</button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref, defineProps, toRefs } from "vue";

type TProps = {
  count: number;
  min: number;
  max: number;
};
const props = defineProps<TProps>();
const { count, min, max } = toRefs(props);

const emit = defineEmits(["updateCount"]);
const localCount = ref(count.value);

const changeCounter = (value: number) => {
  if (localCount.value + value > min.value && localCount.value + value < max.value) {
    localCount.value = localCount.value + value;
  }
  emit("updateCount", localCount.value);
};

const inputChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = Number(target.value);
  if (value > min.value && value < max.value) {
    localCount.value = value;
  } else if (value <= min.value) {
    localCount.value = min.value + 1;
  } else if (value >= max.value) {
    localCount.value = max.value - 1;
  }

  emit("updateCount", localCount.value);
};
</script>

<style lang="scss" scoped>
.couter {
  display: flex;
  align-items: center;
  column-gap: 5px;

  &__button {
    width: 48px;
    height: 48px;

    display: flex;
    align-items: center;
    justify-content: center;

    outline: none;
    border: none;
    border-radius: 8px;
    background: none;

    font-weight: 400;
    font-size: 22px;
    line-height: 24px;

    color: #000000;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: rgba(0, 0, 0, 0.04);
    }
  }

  &__input-wrapper {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &__input {
    text-align: center;

    max-width: 48px;
    height: 48px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 8px;

    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    color: #000000;
  }
}
</style>
