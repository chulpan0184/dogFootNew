import { REDUX_LS_KEY } from './constants'

export const initState = {
  cart: [],
  token: '',
  filter: {
    search: '',
  },
  counter: 0,
}

export function gitInitState() {
  const dataFromLS = localStorage.getItem(REDUX_LS_KEY)
  return dataFromLS ? JSON.parse(dataFromLS) : initState
}
