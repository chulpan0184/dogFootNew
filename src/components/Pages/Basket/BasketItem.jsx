/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
import { useDispatch, useSelector } from 'react-redux'
import { changeIsPickProduct, deleteProduct, getAllCartProductsSelector } from '../../../redux/slices/cartSlice'
import { counterProductsSelector, productDecrement, productIncrement } from '../../../redux/slices/counterSlice'
import basketitemSyle from './basketitem.module.css'

function BasketItem({

  pictures, products, name, price, id, description, discount, isChecked, count, stock, wight,
}) {
  const cart = useSelector(getAllCartProductsSelector)
  const dispatch = useDispatch()

  const deleteProductHandler = () => {
    dispatch(deleteProduct(id))
  }
  const selectProductHandler = () => {
    dispatch(changeIsPickProduct(id))
  }
  const incrementCountHandler = () => {
    if (count < stock) { dispatch(productIncrement()) }
  }
  const decrementCountHandler = () => {
    if (count > 0) {
      dispatch(productDecrement(id))
    }
  }

  // const cart = useSelector(getAllCartProductsSelector)
  // const { counterProducts } = useSelector(counterProductsSelector)
  // console.log({ counterProducts })

  // console.log(decrementCountHandler)

  const isInCart = (productsListId) => cart.find((product) => product.id === productsListId)

  return (
    <div className={basketitemSyle.wrapper}>
      <div className={basketitemSyle.card}>
        <div className={basketitemSyle.cardWr}>
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
            Описание:
            {' '}
            {description}
          </p>
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
          <button className="btn btn-primary mb-3" type="button" onClick={isInCart(id) ? deleteProductHandler : selectProductHandler}>
            {isInCart(id) ? 'Удалить' : 'В карзине'}
          </button>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={selectProductHandler}
          />
          {/* <button className="btn btn-primary" type="button" onClick={incrementCountHandler}>
            +
            {' '}
            {counterProducts}
          </button> */}

        </div>
      </div>
    </div>
  )
}
export default BasketItem
