/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-lone-blocks */

import { useQuery } from '@tanstack/react-query'
import { memo, useEffect } from 'react'
// import { dogFoodApi } from '../../../api/DogFoodApi'
// import { AppTokenContext } from '../../contexts/AppTokenContextProvider'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Louder } from '../../louder/Louder'
import { ProductsItem } from './ProductsItem/ProductsItem'
// import { withQuery } from '../../HOCs/withQuery'
import { dogFoodApi } from '../../../api/DogFoodApi'
import productsStyle from './productsStyle.module.css'
import { DELETE_ALL_PRODUCTS } from '../../../redux/type'
import { getQuerySearchKey } from '../../../utils'
import { getSearchSelector } from '../../../redux/slices/filterSlice'
import { getTokenSelector } from '../../../redux/slices/tokenSlice'
// import { withQuery } from '../../HOCs/withQuery'

// function ProductsInner({ data })

// const ProductsInnerWithQuery = withQuery(ProductsInner)

function Products() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const addBasketProductsHendler = () => {
    navigate('/basket')
  }

  const clearProductsHandler = () => {
    dispatch({
      type: DELETE_ALL_PRODUCTS,
    })
  }
  const token = useSelector(getTokenSelector)
  useEffect(
    () => {
      if (!token) {
        navigate('/signin')
      }
    },
    [token],
  )

  // const { basketCounter } = useSelector((state) => state)
  // const dispatch = useDispatch()
  const search = useSelector(getSearchSelector)
  const {
    data, isLoading, isError, error,
  } = useQuery({
    queryKey: getQuerySearchKey(search),
    queryFn: () => dogFoodApi.getAllProducts(search, token),
    enabled: (token !== undefined) && (token !== ''),
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

  const { products } = data

  return (
    <>
      <div className="d-flex flex-row" style={{ justifyContent: 'space-around' }}>
        <button
          onClick={clearProductsHandler}
          type="button"
          className="btn btn-danger"
        >
          Очистить карзину
        </button>
        <button
          onClick={addBasketProductsHendler}
          className="btn btn-primary"
          type="button"
        >
          Перейти в карзину
          {' '}
          {/* {basketCounter} */}
        </button>
      </div>
      <h1 className={productsStyle.h1}>Products</h1>
      {products && (
        <div className={productsStyle.wrap}>
          {products.map((product) => (
            <ProductsItem
              key={product._id}
              id={product._id}
              name={product.name}
              description={product.description}
              pictures={product.pictures}
              price={product.price}
              wight={product.wight}
              stock={product.stock}
              discount={product.discount}
            />
          ))}
        </div>
      )}
    </>
  )

  // return <ProductsInnerWithQuery data={data} />
}
export const ProductsMemo = memo(Products)

//   const res = await fetch(`${this.baseUrl}/products`, {
//     method: 'GET',
//     headers: {
//       authorization: `Bearer ${this.token}`,
//     },
//   })
// Обработка ошибок
//   console.log(res)
// }
