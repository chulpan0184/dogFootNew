const LOW_PRICE = 'LOW_PRICE'
const HIGH_PRICE = 'HIGH_PRICE'
const SALES = 'SALES'

export const PRICE_FILTER = {
  type: [LOW_PRICE, HIGH_PRICE],
  name: 'Цена',
}

export const SALES_FILTER = {
  type: SALES,
  name: 'Распродажа',
}

export const FILTER_QUERY_NAME = 'filterType'

export const getFilteredProducts = ([...products], filterType) => {
  switch (filterType) {
    case LOW_PRICE:
      return products.sort((a, b) => a.price - b.price)
    case HIGH_PRICE:
      return products.sort((a, b) => b.price - a.price)
    case SALES:
      return products.filter((product) => !!product.discount)
    default:
      return products
  }
}
