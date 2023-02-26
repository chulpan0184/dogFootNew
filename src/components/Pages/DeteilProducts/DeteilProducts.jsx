import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getTokenSelector } from '../../../redux/slices/tokenSlice'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { PRODUCT_DETEIL } from '../../../redux/constants'
import { withQuery } from '../../HOCs/withQuery'

function ProductDetailInner({ currentProduct }) {
  return (
    <div>{JSON.stringify(currentProduct)}</div>
  )
}
const ProductDetailInnerWithQuery = withQuery(ProductDetailInner)

export function DeteilProducts() {
  const token = useSelector(getTokenSelector)
  const { ProductId } = useSearchParams()
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
    queryKey: [PRODUCT_DETEIL, ProductId],
    queryFn: () => dogFoodApi.getProductById(ProductId, token),
    enabled: (token !== undefined) && (token !== ''),
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
