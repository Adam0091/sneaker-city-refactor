import { PRODUCTS_URL, CATEGORIES_URL, CATEGORY_URL } from '@/constants/index'
import { СategoriesType } from '@/types/enums'

export const GET_PRODUCTS = async () =>
  await fetch(PRODUCTS_URL).then((res) => res.json())

export const GET_CATEGORIES = async () =>
  await fetch(CATEGORIES_URL).then((res) => res.json())

export const GET_PRODUCTS_BY_CATEGORY = async (category: string) => {
  if (category === СategoriesType.ALL) {
    return GET_PRODUCTS()
  } else {
    return await fetch(
      `${CATEGORY_URL}/${category}`
    ).then((res) => res.json())
  }
}
