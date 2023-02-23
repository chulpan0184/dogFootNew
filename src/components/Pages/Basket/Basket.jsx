/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Louder } from '../../louder/Louder'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { getQueryCartKey } from '../../../utils'
import { getTokenSelector } from '../../../redux/slices/tokenSlice'
import basketItemStyle from './basketItemStyle.module.css'
import { BasketItem } from './BasketItem'
import {
  chekAllProduct, clearBasket, getAllCartProductsSelector, nonChekAllProduct,
} from '../../../redux/slices/cartSlice'

export function Basket() {
  const cart = useSelector(getAllCartProductsSelector)
  const token = useSelector(getTokenSelector)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect( // useEffect Непускает в карзину без токена
    () => {
      if (!token) {
        navigate('/signin')
      }
    },
    [token],
  )

  const {
    data = [], isLoading, isError, error,
  } = useQuery({
    queryKey: [getQueryCartKey(cart.lenght)],
    queryFn: () => dogFoodApi.getProductsByIds(cart.map((product) => product.id), token),
    keepPreviousData: true,
    enabled: !!token,
  })

  if (isLoading) return <Louder />

  if (isError) {
    return (
      <p>
        Произошла ошибка:
        {' '}
        {error.message}
      </p>
    )
  }

  const products = cart.map((product) => {
    const productFromBack = data.find((productBack) => productBack._id === product.id)
    if (productFromBack) {
      return { ...product, ...productFromBack }
    }
    return product
  })

  const clearBasketHandler = () => {
    dispatch(clearBasket())
  }

  const isAllChecked = products.every((el) => el.isChecked)
  const findAllCheckedProducts = () => {
    const allCheckedProducts = []
    cart.forEach((product) => {
      if (product.isChecked === true) allCheckedProducts.push(product)
    })
    return allCheckedProducts
  }
  const selectAllProductsHandler = () => {
    if (!isAllChecked) dispatch(chekAllProduct())
    else dispatch(nonChekAllProduct())
  }

  const getBasketProductsById = (idItem) => products.find((product) => product.id === idItem)
  const sumAllCartProducts = () => findAllCheckedProducts().reduce((sum, product) => {
    const updatedSum = sum + product.count * getBasketProductsById(product.id).price
    return updatedSum
  }, 0)

  const sumDidscauntAllCartProducts = () => findAllCheckedProducts().reduce((sum, product) => {
    const updatedSumDidscaunt = sum + product.count * getBasketProductsById(product.id).discount
    return updatedSumDidscaunt
  }, 0)

  const totalSumAllCartProducts = sumAllCartProducts() - sumDidscauntAllCartProducts()

  return (
    <div className="d-flex justify-content-center flex-column">
      {!cart[0]
      && (
        <>
          <h3>Карзина пуста</h3>
          <Link to="/products">К покупкам</Link>
          <Link to="/">На главную страницу</Link>
        </>
      )}
      {products[0] && (
      <ul>
        <div className="d-flex flex-row" style={{ marginBottom: '8px' }}>
          <input
            id="select_all"
            type="checkbox"
            onChange={selectAllProductsHandler}
          />
          <label htmlFor="select_all">Выделить все</label>
          <div className={basketItemStyle.left}>

            <h5 className="text-center">Товары в карзине</h5>
            <button type="button" className="btn btn-danger" onClick={clearBasketHandler}>
              Очистить карзину
            </button>
          </div>
        </div>
        <div className="d-flex flex-row" style={{ flexWrap: 'nowrap', alignItems: 'flex-start', gap: '20px' }}>
          <div className="d-flex justify-content-center flex-row" style={{ flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            {products.map((product) => (
              <BasketItem
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                pictures={product.pictures}
                wight={product.wight}
                description={product.description}
                isChecked={product.isChecked}
                discount={product.discount}
                stock={product.stock}
                count={product.count}
              />
            ))}
          </div>
          <div className={basketItemStyle.right}>
            <h6 className="text-center p-1">Информация о заказе</h6>
            <div className={basketItemStyle.rightInner}>
              <h7>
                Сумма:
                {' '}
                {sumAllCartProducts()}
                {' '}
                руб.
              </h7>
              <h7>
                Скидка:
                {' '}
                {sumDidscauntAllCartProducts()}
                {' '}
                руб.
              </h7>
              <p style={{ color: 'darkgreen' }}>
                К оплате:
                {' '}
                <span style={{ fontWeight: '700' }}>
                  {' '}
                  {totalSumAllCartProducts}
                  {' '}
                  руб.
                </span>
              </p>
              <button type="button" className="btn btn-primary">
                Перейти к оплате
              </button>
            </div>
          </div>

        </div>

      </ul>
      )}
    </div>
  )
}
