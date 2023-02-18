import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const counterSlice = createSlice({
  name: 'counter',
  initialState: initState.counter,
  reducers: {
    productIncrement(state) {
      return state + 1
    },
    productDecrement(state) {
      return state - 1
    },
  },
})

export const { productIncrement, productDecrement } = counterSlice.actions
export const counterReducer = counterSlice.reducer
export const counterProductsSelector = (state) => state.counter
