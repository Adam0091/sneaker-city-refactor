<template>
  <div class="ui-loader">
    <div class="ui-loader__content">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="margin: auto; background: none; display: block; shape-rendering: auto"
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#182731"
          stroke-width="6"
          r="21"
          stroke-dasharray="98.96016858807849 34.98672286269283"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.ui-loader {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(196, 196, 196, 0.3);

  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
  }
}
</style>
