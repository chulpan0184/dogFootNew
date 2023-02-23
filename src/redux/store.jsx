import { configureStore } from '@reduxjs/toolkit'
import { REDUX_LS_KEY } from './constants'
import { gitInitState } from './initState'
import { cartReducer } from './slices/cartSlice'

import { filterReducer } from './slices/filterSlice'
import { tokenReducer } from './slices/tokenSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    token: tokenReducer,

  },
  preloadedState: gitInitState(),
})

store.subscribe(() => window.localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState())))
