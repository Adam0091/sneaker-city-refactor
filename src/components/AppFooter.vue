<template>
  <footer class="footer">
    <div class="footer__column">
      <div class="footer__social-networks">
        <span>Don’t missout on once-in-a-while-deals:</span>
        <ul class="social-networks__list">
          <li
            class="social-networks__item"
            v-for="socialNetwork in socialNetworks"
            :key="socialNetwork.name"
          >
            <img :src="socialNetwork.img" :alt="socialNetwork.name" />
          </li>
        </ul>
      </div>
      <div class="footer__telephon">
        <span>Support line: </span>
        <a href="tel:+250788467808">+250 788 467 808</a>
      </div>
    </div>
    <div class="footer__column footer__license">
      <span>Copyright 2021 © Sneaker City ltd</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
const socialNetworks = [
  {
    name: "twitter",
    img: require("@/assets/images/twitter.png"),
  },
  {
    name: "instagram",
    img: require("@/assets/images/instagram.png"),
  },
  {
    name: "facebook",
    img: require("@/assets/images/facebook.png"),
  },
];
</script>

<style lang="scss" scoped>
.footer {
  justify-self: flex-end;
  width: 100%;
  display: flex;
  justify-content: space-between;

  border-top: 1px solid rgba(0, 0, 0, 0.15);
  padding: 34px 0 64px 0;

  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  color: rgba(0, 0, 0, 0.65);

  &__social-networks {
    display: flex;
    column-gap: 12px;
  }

  &__telephon {
    a {
      color: rgba(0, 0, 0, 0.65);
      text-decoration: none;
    }
  }

  &__license {
    display: flex;
    align-items: flex-end;
  }
}

.social-networks {
  &__list {
    display: flex;
    align-items: center;
    list-style: none;
    column-gap: 12px;
  }

  &__item {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    cursor: pointer;

    transition: all 0.2s;

    &:hover {
      background: rgba(19, 17, 17, 0.168);
    }
  }
}
</style>
