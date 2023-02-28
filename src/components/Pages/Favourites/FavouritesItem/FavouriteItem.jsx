/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
import clsx from 'clsx'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeIsPickProduct, deleteProductFavourite, getAllFavouritesProductsSelector } from '../../../../redux/slices/favouriteSlice'
import { DeleteCartModal } from '../../../Modal/DeleteModal'
import favouriteItemSyle from './favouriteItem.module.css'

export function FavouriteItem({

  pictures, name, price, id, discount, wight, stock, isChecked,
}) {
  const favourites = useSelector(getAllFavouritesProductsSelector)
  const discountPrise = price * ((100 - discount) / 100)

  const dispatch = useDispatch()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const openDeleteFavouriteHandler = () => {
    dispatch(deleteProductFavourite(id))
  }

  const selectProductHandler = () => {
    dispatch(changeIsPickProduct(id))
  }

  const isInFavourites = (productsListId) => favourites.find((product) => product.id === productsListId)
  return (
    <>
      <div className={favouriteItemSyle.wrapper}>
        <div className={favouriteItemSyle.card}>
          <div className={favouriteItemSyle.cardWr}>
            <div style={{
              display: 'flex',
              position: 'relative',
              justifyContent: 'space-between',
              minHeight: '50px',
              marginBottom: '4px',
            }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={selectProductHandler}
              />
              <h6>{name}</h6>
              <button
                type="button"
                onClick={openDeleteFavouriteHandler}
                className={clsx(
                  'btn',
                  'btn-outline-danger',
                  { 'bg-warning': isInFavourites(id) },
                )}
                // "btn btn-outline-danger card__btn"
              >
                <i className="fa-regular fa-heart fa-lg" />
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
                marginBottom: '5px',
              }}
            >
              <img style={{ borderRadius: '8px' }} width="220x" height="110px" src={pictures} />
            </div>
            {/* <p>
              Описание:
              {' '}
              {description}
            </p> */}
            <div className="d-flex flex-derection-row">
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
            <div className="d-flex" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <p>
                В наличии:
                {' '}
                {stock}
                {' '}
                шт.
              </p>
              <p>
                {' '}
              </p>
            </div>
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
          </div>
        </div>
      </div>
      <DeleteCartModal
        isOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        id={id}
      />
    </>
  )
}
