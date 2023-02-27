/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, deleteProduct, getAllCartProductsSelector } from '../../../redux/slices/cartSlice'
import { addNewProductFavour } from '../../../redux/slices/favouriteSlice'

import productDeteilStyle from './productDeteilStyle.module.css'
// import { prepareData } from './utils'
import { prepareData } from './utils'
import { ReviewsDeteil } from './ReviewsDeteil'

export function DeteilProductItem({
  name, description, pictures, price, wight, stock, discount, id, likes, createdAt, reviews,
}) {
  const dispatch = useDispatch()
  const cart = useSelector(getAllCartProductsSelector)
  const moveToFavouriteHandler = () => {
    dispatch(addNewProductFavour(id))
  }

  console.log({ reviews })
  const stockLikes = Object.keys(likes).length

  const reviewsCount = Object.keys(reviews).length

  const createdAtPrepeir = prepareData(createdAt)

  const discountPrise = price * ((100 - discount) / 100)

  const moveToCartHandler = () => {
    dispatch(addNewProduct(id))
  }

  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }

  const isInCart = (productsListId) => cart.find((product) => product.id === productsListId)

  return (
    <div className={productDeteilStyle.wrapper}>
      <div className={productDeteilStyle.card}>
        <div className={productDeteilStyle.cardWr}>
          <div style={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'space-between',
            minHeight: '50px',
          }}
          >
            <h6>{name}</h6>
            <button
              type="button"
              onClick={moveToFavouriteHandler}
              className="btn btn-outline-danger card__btn"
            >
              <i className="fa-regular fa-heart fa-lg" />
            </button>
          </div>
          <div style={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'space-around',
            marginBottom: '5px',
            marginTop: '4px',
          }}
          >
            <img style={{ borderRadius: '8px' }} width="240px" height="130px" src={pictures} />
            <div className="d-flex flex-column">
              <p>{description}</p>
              <p>
                Количество лайков:
                {' '}
                {stockLikes}
              </p>
              <p>
                Дата создания:
                {' '}
                {createdAtPrepeir}

              </p>
            </div>
          </div>
          <div className="d-flex flex-derection-row gap-1">
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
          <p>
            Вес:
            {' '}
            {wight}
          </p>
          <button className="btn btn-primary p-1 mx-1" style={{ minWidth: '180px' }} type="button" onClick={isInCart(id) ? removeFromCartHandler : moveToCartHandler}>
            {isInCart(id) ? 'В корзине' : 'Добавить в корзину'}
          </button>
          <button className="btn btn btn-success p-1" style={{ minWidth: '180px' }} type="button">
            Редактировать
          </button>
        </div>
      </div>
      <div className={productDeteilStyle.cardLeft}>
        <div className="d-flex flex-derection-row justify-content-center">
          <h5 className="p-1 m-1">
            Отзывы о товарe
            {' '}
            (
            {reviewsCount}
            )
          </h5>
          <button className="btn btn btn-success p-1 m-1" style={{ minWidth: '180px' }} type="button">
            Добавить отзыв
          </button>
        </div>
        <div>
          {reviews.map((e) => (
            <ReviewsDeteil
              key={e._id}
              id={e._id}
              author={e.author}
              text={e.text}
              rating={e.rating}
            />
          ))}
        </div>
        <p>Отзывы</p>

      </div>
    </div>
  )
}
