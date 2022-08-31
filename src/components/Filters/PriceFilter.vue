<template>
  <div class="price-filter">
    <UiInputRanges
      :min="0"
      :max="1000"
      :double="true"
      :step="10"
      :margin="10"
      @inputRange="updatePrice"
    />
    <div class="price-filter__prices">
      <span class="prices__value">{{ range1 }}RWF</span>
      <span class="prices__value">{{ range2 }}RWF</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import UiInputRanges from "@/components/UI/UiInputRange.vue";

const emit = defineEmits(["updateFilter"]);

const range1 = ref(0);
const range2 = ref(1000);

const updatePrice = (type: string, value: number) => {
  if (type === "min") {
    range1.value = value;
    emit("updateFilter", "min", range1.value);
  }
  if (type === "max") {
    range2.value = value;
    emit("updateFilter", "max", range2.value);
  }
};
</script>

<style lang="scss" scoped>
.price-filter {
  margin-top: 23px;

  &__prices {
    margin-top: 17px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.prices {
  &__value {
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;

    color: #000000;
  }
}
</style>
