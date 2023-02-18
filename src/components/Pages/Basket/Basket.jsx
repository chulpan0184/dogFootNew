/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// import { useState, useEffect, memo } from 'react'
// import { useQuery } from '@tanstack/react-query'

// import { useSelector } from 'react-redux'
// import { dogFoodApi } from '../../../api/DogFoodApi'
// import { ProductsItem } from '../Products/ProductsItem/ProductsItem'
// import { Louder } from '../../louder/Louder'
// import { basketCounterReducer } from '../../../redux/reducer/basketCounterReduser'
// import basketStyle from './basketStyle.module.css'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { clearBasket, getAllCartProductsSelector } from '../../../redux/slices/cartSlice'

import { Louder } from '../../louder/Louder'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { getQueryCartKey } from '../../../utils'
import { getTokenSelector } from '../../../redux/slices/tokenSlice'
import basketItemStyle from './basketItemStyle.module.css'
import BasketItem from './BasketItem'

export function Basket() {
  const cart = useSelector(getAllCartProductsSelector)
  const token = useSelector(getTokenSelector)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function isCheckedAllProducts() {
    return cart.every(() => (product) => isCheked)
  }
  console.log({ cart })

  const {
    data: products, isLoading, isError, error,
  } = useQuery({
    queryKey: [getQueryCartKey(cart.lenght)],
    queryFn: () => dogFoodApi.getProductsByIds(cart.map((product) => product.id), token),
    enabled: (token !== undefined) && (token !== ''),
  })
  console.log({ products })

  useEffect( // useEffect Непускает в карзину без токена
    () => {
      if (!token) {
        navigate('/signin')
      }
    },
    [token],
  )

  const clearBasketHandler = () => {
    dispatch(clearBasket())
  }

  const isAllCardPicked = () => products.filter((item) => item.isChecked === true).lenght === cart.lenght
  const findAllPickedProducts = () => {
    const allPickedProducts = []
    cart.forEach((item) => {
      if (item.isChecked === true) allPickedProducts.push(item)
    })
    return allPickedProducts
  }

  const getCartProductById = (idItem) => cart.find((product) => product._id === idItem)
  const getCartStateProductById = (idItem) => cart.find((product) => product.id === idItem)
  const pickAllProductsHandler = () => {
    if (!isAllCardPicked()) dispatch(pickAllProducts())
    else dispatch(notPickAllProducts())
  }
  const calculateSum = () => findAllPickedProducts().reduce((sum, product) => {
    const updatedSum = sum + product.count * getCartProductById(product.id).price
    return updatedSum
  }, 0)

  // eslint-disable-next-line array-callback-return
  const calculateDiscount = () => findAllPickedProducts().reduce((sum, product) => {
    const updateSum = sum + product.count * getCartProductById(product.id).price * (getCartProductById(product.id).discount / 1)
  }, 0)

  // eslint-disable-next-line array-callback-return
  const calculateSumWithDiscount = () => findAllPickedProducts().reduce((sum, product) => {
    const updateSum = sum + product.count * getCartProductById(product.id).price * ((100 - getCartProductById(product.id).discount) / 1)
  }, 0)

  return (
    <div className="d-flex justify-content-center flex-column">
      {products[0] && (
        <ul>
          <div className="d-flex flex-row" style={{ marginBottom: '8px' }}>
            <input
              type="checkbox"
              value="isChecked"
              onClick={isAllCardPicked}
            />
            <p>Выделить все</p>

            <div className={basketItemStyle.left}>

              <h5 className="text-center">Товары в карзине</h5>
              <button type="button" className="btn btn-primary" onClick={clearBasketHandler}>
                Очистить карзину
              </button>
            </div>

          </div>

          <div className="d-flex flex-row" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}>
            <div className="d-flex justify-content-center flex-row" style={{ flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              {products.map(({ id, ...item }) => (
                <BasketItem
                  key={id}
                  id={id}
                  name={item.name}
                  price={item.price}
                  pictures={item.pictures}
                  wight={item.wight}
                  description={item.description}
                  checked={item.description}
                  discount={item.isChecked}
                  stock={item.stock}
                />
              ))}
            </div>
            <div className={basketItemStyle.right}>
              <h6 className="text-center p-1">Информация о заказе</h6>
              <div className={basketItemStyle.rightInner}>
                <h7>
                  Сумма:

                </h7>
                <h7>
                  Скидка:
                </h7>
                <h7>
                  К оплате:
                </h7>
              </div>
            </div>

          </div>

        </ul>
      )}
    </div>
  )
}

// eslint-disable-next-line max-len
// const isAllBasketPicked = () => products.filter((item) => item.isPicked === true).lenght === products.lenght
// const findAllPickedProduct = () => {
//   const allPickedProducts = []
//   products.forEach((item) => {
//     if (item.isPicked === true) allPickedProducts.push(item)
//   })
//   return allPickedProducts
// }

// const getBasketProductsById = (idItem) => products.find((product) => product._id === idItem)
// const getBasketStateProductsById = (idItem) => products.find((product) => product.id === idItem)
// const pickAllProductsHandler = () => {
//   if (!isAllBasketPicked()) dispatch(pickAllProducts())
//   else dispatch(notPickAllProducts())
// }
// const calculateSum = () => findAllPickedProduct().reduce((sum, product) => {
//   const updatedSum = sum + product.count * getBasketProductsById(product.id).price
//   return updatedSum
// }, 0)

// function Basket() {
// eslint-disable-next-line no-unused-vars
//   const [token, setToken] = useState(() => {
//     const tokenFromStorage = localStorage.getItem('token')
//     return tokenFromStorage ?? ''
//   })

//   useEffect(() => {
//     localStorage.setItem('token', token)
//     dogFoodApi.setToken(token)
//   }, [token])

//   const { basketCounter } = useSelector((state) => state)

//   const {
//     data, isLoading, isError, error, refetch,
//   } = useQuery({
//     queryKey: ['productsfetch'],
//     queryFn: () => fetch('https://api.react-learning.ru/products', {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     }).then((res) => res.json(data)),
//     enabled: token !== undefined,
//   })

//   if (isLoading) return <Louder />

//   if (isError) {
//     return (
//       <p>
//         Произошла ошибка:
//         {' '}
//         {error.message}
//       </p>
//     )
//   }

//   const clearProductsHandler = () => {
//     console.log('click')
//   }

//   console.log(isLoading, isError, error, refetch)
//   const { products } = data

//   return (
//     <>
//       <div className={basketStyle.buttonWrap}>
//         <button
//           type="button"
//         >
//           Перейти к оплате
//           {' '}
//           {basketCounter}
//           {' '}
//           товаров
//           {' '}
//           {basketCounterReducer}
//         </button>
//         <button
//           onClick={clearProductsHandler}
//           type="button"
//         >
//           Delete
//         </button>
//       </div>
//       <h1 className={basketStyle.h1}>Basket</h1>
//       {products && (
//         <div className={basketStyle.wrap}>
//           {products.map((product) => (
//             <ProductsItem
//               key={product._id}
//               name={product.name}
//               description={product.description}
//               pictures={product.pictures}
//               price={product.price}
//               wight={product.wight}
//             />
//           ))}
//         </div>
//       )}
//     </>
//   )
// }
// export const BasketMemo = memo(Basket)
