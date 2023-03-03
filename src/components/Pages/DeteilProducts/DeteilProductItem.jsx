/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { clsx } from 'clsx'
import { addNewProduct, deleteProduct, getAllCartProductsSelector } from '../../../redux/slices/cartSlice'
import { addNewProductFavour, deleteProductFavourite, getAllFavouritesProductsSelector } from '../../../redux/slices/favouriteSlice'

import productDeteilStyle from './productDeteilStyle.module.css'
// import { prepareData } from './utils'
import { prepareData } from './utils'
import { ReviewsDeteil } from './ReviewsDeteil'
import { ModalEdit } from '../../Modal/Modal/ModalEdit/ModalEdit'
import { ReviewsForm } from './ReviewsForm/ReviewsForm'
import { ModalDelete } from '../../Modal/Modal/ModalDeleteProd/ModalDelete'
// import { getEmailSelector } from '../../../redux/slices/emailSlice'

export function DeteilProductItem({
  name, description, pictures, price, wight, stock, discount, id, likes, createdAt, reviews, currentEmail, email,
}) {
  const isAuthtor = (email === currentEmail)
  const dispatch = useDispatch()
  const cart = useSelector(getAllCartProductsSelector)
  const favourites = useSelector(getAllFavouritesProductsSelector)
  const isInFavourites = (productsListId) => favourites.find((product) => product.id === productsListId)

  const [isDeleteModalHandler, setiIsDeleteModalHandler] = useState(false)
  const closeDeleteModalHandler = () => {
    setiIsDeleteModalHandler(false)
  }
  const openDeleteModalHandler = () => {
    setiIsDeleteModalHandler(true)
  }

  const [isDeleteModalDeleteHandler, setIsDeleteModalDeleteHandler] = useState(false)
  const closeDeleteModalDeleteHandler = () => {
    setIsDeleteModalDeleteHandler(false)
  }
  const openDeleteModalDeleteHandler = () => {
    setIsDeleteModalDeleteHandler(true)
  }

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

  const removeFromFavouriteHandler = () => {
    dispatch(deleteProductFavourite(id))
  }
  const moveToFavouriteHandler = () => {
    dispatch(addNewProductFavour(id))
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
              onClick={isInFavourites(id) ? removeFromFavouriteHandler : moveToFavouriteHandler}
              className={clsx(
                'btn',
                'btn-outline-danger',
                { 'bg-warning': isInFavourites(id) },
              )}
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
              <div className="d-flex flex-derection-row">
                <p>
                  Количество лайков:
                  {' '}
                  {stockLikes}
                </p>
                <div className="cart-right-info-stock">
                  <button type="button">+</button>
                </div>
              </div>
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
          <div className="d-flex flex-derection-row justify-content-center">
            <button className="btn btn-primary p-1 mx-1" style={{ minWidth: '180px' }} type="button" onClick={isInCart(id) ? removeFromCartHandler : moveToCartHandler}>
              {isInCart(id) ? 'В корзине' : 'Добавить в корзину'}
            </button>
            <ModalEdit id={id} isOpen={isDeleteModalHandler} closeHandler={closeDeleteModalHandler} />
            <ModalDelete id={id} isOpen={isDeleteModalDeleteHandler} closeHandler={closeDeleteModalDeleteHandler} />
            {isAuthtor && (
              <button onClick={openDeleteModalHandler} className="btn btn btn-secondary p-1" style={{ minWidth: '180px' }} type="button">
                Редактировать
              </button>
            )}
            {isAuthtor && (
            <button onClick={openDeleteModalDeleteHandler} className="btn btn btn-danger p-1 mx-1" style={{ minWidth: '180px' }} type="button">
              Удалить
            </button>
            )}
          </div>
        </div>
      </div>
      <div className={productDeteilStyle.cardLeft}>
        <div className="d-flex flex-derection-row justify-content-center">
          <h5 className="p-1 m-1">
            Отзывы о товаре
            {' '}
            (
            {reviewsCount}
            )
          </h5>
        </div>
        <div>
          <ReviewsForm
            id={id}
          />
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
