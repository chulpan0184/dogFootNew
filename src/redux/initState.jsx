import { REDUX_LS_KEY } from './constants'

export const initState = {
  cart: [],
  token: '',
  filter: {
    search: '',
  },
}

export function gitInitState() {
  const dataFromLS = localStorage.getItem(REDUX_LS_KEY)
  return dataFromLS ? JSON.parse(dataFromLS) : initState
}
