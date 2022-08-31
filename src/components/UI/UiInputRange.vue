<template>
  <div class="range-input">
    <div class="slider">
      <div ref="progress" class="progress"></div>
    </div>
    <div class="range-input__wrapper">
      <input
        class="range-min"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="range1"
        @input="updateRange"
        v-if="double"
      />
      <input
        class="range-max"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="range2"
        @input="updateRange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, toRefs, onMounted } from "vue";

type TProps = {
  min: number;
  max: number;
  step: number;
  double: boolean;
  margin: number;
};

const props = defineProps<TProps>();
const { min, max, step, double, margin } = toRefs(props);

const progress = ref<HTMLElement | null>(null);
const emit = defineEmits(["inputRange"]);

const range1 = ref(min.value);
const range2 = ref(max.value);

onMounted(() => {
  if (progress.value) {
    progress.value.style.left = (range1.value / max.value) * 100 + "%";
    progress.value.style.right = 100 - (range2.value / max.value) * 100 + "%";
  }
});

const updateRange = (event: Event) => {
  if (!progress.value) return;

  const target = event.target as HTMLInputElement;

  if (range1.value >= range2.value) {
    if (target.className === "range-min") {
      range1.value = range2.value - margin.value;
    } else {
      range2.value = range1.value + margin.value;
    }
  }

  if (target.className === "range-min") {
    emit("inputRange", "min", range1);
    progress.value.style.left = (range1.value / max.value) * 100 + "%";
  } else {
    emit("inputRange", "max", range2);
    progress.value.style.right = 100 - (range2.value / max.value) * 100 + "%";
  }
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
  right: 0%;
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

.range-input {
  margin-top: 23px;

  &__values {
    margin-top: 17px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.values {
  &__value {
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;

    color: #000000;
  }
}
</style>
