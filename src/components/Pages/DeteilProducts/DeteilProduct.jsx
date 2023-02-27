import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getTokenSelector } from '../../../redux/slices/tokenSlice'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { PRODUCT_DETEIL } from '../../../redux/constants'
import { withQuery } from '../../HOCs/withQuery'
import { DeteilProductItem } from './DeteilProductItem'

function ProductDetailInner({ currentProduct }) {
  console.log({ currentProduct })
  return (
    <div>
      <div className="d-flex flex-row justify-content-center" style={{ marginTop: '80px' }}>
        <h3>Подробно о товаре</h3>
      </div>
      <DeteilProductItem
        name={currentProduct.name}
        description={currentProduct.description}
        pictures={currentProduct.pictures}
        price={currentProduct.price}
        wight={currentProduct.wight}
        stock={currentProduct.stock}
        discount={currentProduct.discount}
        likes={currentProduct.likes}
        createdAt={currentProduct.created_at}
        reviews={currentProduct.reviews}
      />
    </div>

  )
}
const ProductDetailInnerWithQuery = withQuery(ProductDetailInner)

export function DeteilProduct() {
  const token = useSelector(getTokenSelector)
  const { productId } = useParams()
  const navigate = useNavigate()
  useEffect(
    () => {
      if (!token) {
        navigate('/signin')
      }
    },
    [token],
  )

  const {
    data: currentProduct, isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [PRODUCT_DETEIL, productId],
    queryFn: () => dogFoodApi.getProductById(productId, token),
    enabled: !!token && productId !== undefined,
  })

  return (
    <ProductDetailInnerWithQuery
      currentProduct={currentProduct}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  )
}

// useQuery({
//   queryKey: [PRODUCT_DETEIL, productId],
//   queryFn: () => fetch(
//     `https://api.react-learning.ru/products/${productId}`,
//     {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     },
//   ).then((res) => res.json()),
