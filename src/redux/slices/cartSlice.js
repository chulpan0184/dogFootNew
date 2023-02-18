import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState.cart,
  reducers: {
    changeIsPickProduct(state, action) {
      const currentProduct = state.find((product) => product.id === action.payload)
      if (currentProduct) currentProduct.isPicked = !currentProduct.isPicked
    },
    deleteProduct(state, action) {
      return state.filter((product) => product.id !== action.payload)
    },
    clearBasket() {
      return []
    },

    // incrementCountHandler(state, action){
    //   return c
    // },
    addNewProduct: {
      reducer(state, action) {
        const currentProduct = state.find((product) => product.id === action.payload)
        if (!currentProduct) state.unshift(action.payload)
      },
      prepare(id) {
        return {
          payload: {
            id,
            isChecked: false,
            count: 1,
          },
        }
      },
    },
  },
})

export const {
  changeIsPickProduct, deleteProduct, clearBasket, addNewProduct,
} = cartSlice.actions
export const getAllCartProductsSelector = (state) => state.cart
export const cartReducer = cartSlice.reducer
