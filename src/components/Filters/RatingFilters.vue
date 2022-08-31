<template>
  <div class="rating-filter">
    <UiInputRanges
      :min="0"
      :max="5"
      :step="0.1"
      :double="false"
      :margin="0"
      @inputRange="updateRating"
    />

    <div class="rating-filter__prices">
      <span class="rating__value">{{ 0 }}</span>
      <span class="rating__value">{{ range2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import UiInputRanges from "@/components/UI/UiInputRange.vue";

const emit = defineEmits(["updateFilter"]);

const range2 = ref(5);

const updateRating = (type: string, value: number) => {
  range2.value = value;
  emit("updateFilter", "rating", value);
};
</script>

<style lang="scss" scoped>
.slider {
  position: relative;

  height: 2px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 5px;
}

.slider .progress {
  position: absolute;
  left: 0%;
  right: 100%;
  height: 2px;
  background-color: #000000;
  border-radius: 5px;
}

.range-input {
  position: relative;
}

.range-input input {
  position: absolute;
  top: -4px;
  height: 5px;
  width: 100%;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  height: 12px;
  width: 12px;
  -webkit-appearance: none;
  pointer-events: auto;
  border-radius: 50%;
  background: #000000;
}

input[type="range"]::-moz-range-thumb {
  height: 12px;
  width: 12px;
  border: none;
  border-radius: 50%;
  -moz-appearance: none;
  pointer-events: auto;
  border-radius: 50%;
  background: #000000;
}

.rating-filter {
  margin-top: 23px;

  &__prices {
    margin-top: 17px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.rating {
  &__value {
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;

    color: #000000;
  }
}
</style>
