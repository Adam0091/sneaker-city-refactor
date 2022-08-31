<template>
  <div class="slider__wrapper">
    <div class="slider__container">
      <Swiper class="parallax-slider" :pagination="pagination" :navigation="navigation">
        <SwiperSlide v-for="image in images" :key="image">
          <div class="slider__wrapper-image">
            <img :src="image" alt="product" />
          </div>
        </SwiperSlide>
      </Swiper>

      <div class="nav-ideicator prevArrow">
        <img src="@/assets/images/arrowLeft.png" alt="prev slide" />
      </div>
      <div class="nav-ideicator nextArrow">
        <img src="@/assets/images/arrowLeft.png" alt="next slide" />
      </div>
    </div>
    <div class="slider__pagination"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from "vue";

import SwiperCore, { Navigation, Parallax, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/slyles/pagination.scss";

type TProps = {
  images: string[];
};

const props = defineProps<TProps>();
const { images } = toRefs(props);

SwiperCore.use([Navigation, Parallax, Pagination]);

const navigation = { nextEl: ".nextArrow", prevEl: ".prevArrow" };
const pagination = {
  clickable: true,
  el: ".slider__pagination",
  bulletActiveClass: "pagination--active",
  bulletClass: "pagination",
  renderBullet: function (index: number, className: string) {
    return `
      <div class="${className}">
        <img class="pagination__image" src="${images.value[index]}">
      </div>
    `;
  },
};
</script>

<style scoped lang="scss">
.slider__wrapper {
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.slider__wrapper-image {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 80%;
    max-height: 200px;
  }
}

.nav-ideicator {
  width: 30px;
  height: 30px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 50%;
  z-index: 3;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.111);
  }
}

.prevArrow {
  left: 0;
  transform: translateY(-50%);
}

.nextArrow {
  right: 0;
  transform: translateY(-50%) rotate(180deg);
}

.slider__container {
  position: relative;
}

.slider__pagination {
  max-width: 500px;
  margin: 64px auto 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-around;
  column-gap: 28px;
  overflow-x: auto;
}
</style>
