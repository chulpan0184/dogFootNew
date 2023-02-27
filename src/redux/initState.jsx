import { REDUX_LS_KEY } from './constants'

export const initState = {
  cart: [],
  likes: [],
  token: '',
  filter: {
    search: '',
  },
  favourites: [],
}

export function gitInitState() {
  const dataFromLS = localStorage.getItem(REDUX_LS_KEY)
  return dataFromLS ? JSON.parse(dataFromLS) : initState
}
