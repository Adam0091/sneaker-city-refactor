import { BasketProductType } from '@/types'
import { setLocalStorage } from '@/utils/localStorage'
import { defineStore } from 'pinia'

export const useBasketStore = defineStore('basket', {
  state: () => ({
    basket: [] as BasketProductType[]
  }),
  actions: {
    addBasketProduct (product: BasketProductType) {
      this.basket.push(product)
      setLocalStorage('basketStore', this.basket)
    },
    removeBasketProduct (productID: string) {
      this.basket = this.basket.filter(
        (item: BasketProductType) => item.id !== productID)
      setLocalStorage('basketStore', this.basket)
    },
    changeAmount (productID: string, value: number) {
      const index = this.basket.findIndex((product) => product.id === productID)
      this.basket[index].amount = value
      setLocalStorage('basketStore', this.basket)
    },
    clearBasket () {
      this.basket = [] as BasketProductType[]
      setLocalStorage('basketStore', this.basket)
    }
  }
})
