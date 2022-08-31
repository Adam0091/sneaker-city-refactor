import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { getLocalStorage } from '@/utils/localStorage'

const pinia = createPinia()
pinia.use(({ store }) => {
  store.favoritesProduct = getLocalStorage('favoriteStore')
  store.basket = getLocalStorage('basketStore')
})

createApp(App).use(router).use(pinia).mount('#app')
