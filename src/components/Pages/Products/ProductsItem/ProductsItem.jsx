/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */

// import { useDispatch } from 'react-redux'

import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { addNewProduct, deleteProduct, getAllCartProductsSelector } from '../../../../redux/slices/cartSlice'

import productsitemStyle from './productsitem.module.css'
import { getTokenSelector } from '../../../../redux/slices/tokenSlice'

export function ProductsItem({
  name, products, price, pictures, wight, id, discount, isPicked, count, stock,
}) {
  const cart = useSelector(getAllCartProductsSelector)
  const token = useSelector(getTokenSelector)

  useEffect(
    () => {
      if (!token) {
        Navigate('/signin')
      }
    },
    [token],
  )

  const discountPrise = price * ((100 - discount) / 100)

  const dispatch = useDispatch()
  const moveToCartHandler = () => {
    dispatch(addNewProduct(id))
  }

  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }

  const isInCart = (productsListId) => cart.find((product) => product.id === productsListId)

  return (
    <div className={productsitemStyle.wrapper}>
      <div className={productsitemStyle.card}>
        <div className={productsitemStyle.cardWr}>
          <p>{products}</p>
          <div style={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            minHeight: '50px',
          }}
          >
            <h6>{name}</h6>
          </div>
          <div style={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
          >
            <img style={{ borderRadius: '8px' }} width="250px" height="150px" src={pictures} />
          </div>
          <div className="d-flex flex-derection-row gap-2">
            <span> цена:</span>
            <s>
              {' '}
              {price}
              {' '}
              руб.
              {' '}
            </s>
            <p>
              {' '}
              {discountPrise}
              {' '}
              руб.
            </p>
          </div>
          <p>
            Количество:
            {' '}
            {stock}
            {' '}
            шт.
          </p>
          <p>
            Скидка:
            {' '}
            {discount}
            %
          </p>
          <p className="mb-4">
            Вес:
            {' '}
            {wight}
          </p>
          <button className="btn btn-primary mb-3" type="button" onClick={isInCart(id) ? removeFromCartHandler : moveToCartHandler}>
            {isInCart(id) ? 'В корзине' : 'Добавить в карзину'}
          </button>
          <input
            type="checkbox"
          />
        </div>
      </div>
    </div>

  )
}

// const { basketCounter } = useSelector((state) => state)
// console.log(basketCounter)

// const checkHandler = () => {
//   if (checked) {
//     dispatch({
//       type: COUNTER_INCREMENT,
//     })
//   } else {
//     dispatch({
//       type: COUNTER_DECREMENT,
//     })
//   }
//   setChecked(!checked)
// }

// setChecked(!checked)

// <>
//   <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
//     <div>Products...</div>
//     <div className="d-flex align-items-center">
//       <div>{products}</div>
//       <img src={pictures} />
//       <p>{products}</p>
//       <p>{name}</p>
//       <p>{price}</p>
//       <p>{description}</p>
//       <p>{wight}</p>
//     </div>
//   </div>
//   <div>{products}</div>
// </>
