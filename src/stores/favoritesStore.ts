import { ProductType } from '@/types'
import { setLocalStorage } from '@/utils/localStorage'
import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favoritesProduct: [] as ProductType[]
  }),
  actions: {
    addFavoriteProduct (product: ProductType) {
      this.favoritesProduct.push(product)
      setLocalStorage('favoriteStore', this.favoritesProduct)
    },
    removeFavoriteProduct (product: ProductType) {
      this.favoritesProduct = this.favoritesProduct.filter(
        (item: ProductType) => item.id !== product.id
      )
      setLocalStorage('favoriteStore', this.favoritesProduct)
    }
  }
})
