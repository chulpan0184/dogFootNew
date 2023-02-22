/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
import { useDispatch, useSelector } from 'react-redux'
import {
  changeIsPickProduct, deleteProduct, getAllCartProductsSelector, productIncrement, productDecrement, chekAllProduct, nonChekAllProduct,
} from '../../../redux/slices/cartSlice'
import basketitemSyle from './basketitem.module.css'

export function BasketItem({

  pictures, name, price, id, description, discount, wight, stock, count, isChecked,
}) {
  const cart = useSelector(getAllCartProductsSelector)

  const dispatch = useDispatch()

  const discountPrise = price * ((100 - discount) / 100)

  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }

  const selectProductHandler = () => {
    dispatch(changeIsPickProduct(id))
  }

  const incrementCountHandler = () => { dispatch(productIncrement(id)) }

  const decrementCountHandler = () => { dispatch(productDecrement(id)) }
  return (
    <div className={basketitemSyle.wrapper}>
      <div className={basketitemSyle.card}>
        <div className={basketitemSyle.cardWr}>
          <div style={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            minHeight: '40px',
          }}
          >
            <h6>{name}</h6>
          </div>
          <div style={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            marginBottom: '2px',
          }}
          >
            <img style={{ borderRadius: '8px' }} width="250px" height="160px" src={pictures} />
          </div>
          <p>
            Описание:
            {' '}
            {description}
          </p>
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
          <div className="d-flex" style={{ flexDirection: 'row' }}>
            <p>
              Количество:
              {' '}
              {stock}
              {' '}
              шт.
            </p>
            <div className="cart-right-info-stock">
              <button onClick={decrementCountHandler} type="button">-</button>
              <span />
              <button onClick={incrementCountHandler} type="button">+</button>
            </div>
            <p>
              {' '}
              { count }
            </p>
          </div>
          <p>
            Скидка:
            {' '}
            {discount}
            %
          </p>
          <p className="mb-1">
            Вес:
            {' '}
            {wight}
          </p>
          <button className="btn btn-primary mb-3" type="button" onClick={removeFromCartHandler}>
            Удалить
          </button>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={selectProductHandler}
          />
        </div>
      </div>
    </div>
  )
}

// const changeStatusCheckbox = () => {
//   const target = Object.keys(cart).find((currentID) => currentID === id)
//   dispatch(changeIsPickProduct(target))
// }
// const priceRorStock = price * count
// const discountpriceForStock = discountPrise * count

// const deleteProductHandler = () => {
//   console.log('bjbkn')
//   console.log({ id })
//   dispatch(deleteProduct(id))
// }

// const moveToCartHandler = () => {
//   console.log({ id })
//   dispatch(addNewProduct(id))
// }
