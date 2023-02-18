/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */

// import { useDispatch } from 'react-redux'

import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, deleteProduct, getAllCartProductsSelector } from '../../../../redux/slices/cartSlice'
import productsitemStyle from './productsitem.module.css'

export function ProductsItem({
  name, products, price, pictures, wight, id, discount, isChecked, count, stock,
}) {
  const cartProducts = useSelector(getAllCartProductsSelector)

  const dispatch = useDispatch()
  const moveToCartHandler = () => {
    dispatch(addNewProduct(id))
  }

  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }

  const isInCart = (productsListId) => cartProducts.find((product) => product.id === productsListId)

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
          <p>
            цена:
            {' '}
            {price}
            {' '}
            {' '}
            руб.
          </p>
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
            {' '}
            руб.
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
