import classNames from 'classnames'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dogLogo from './images/LogoDog.svg'
import heart from './images/Heart.svg'
import headerStyles from './header.module.css'
import Search from '../Search/Search'
import { getTokenSelector, getToken } from '../../redux/slices/tokenSlice'
import { getAllCartProductsSelector } from '../../redux/slices/cartSlice'
import { getAllFavouritesProductsSelector } from '../../redux/slices/favouriteSlice'

function Header() {
  const token = useSelector(getTokenSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(
    () => {
      if (!token) {
        navigate('/signin')
      }
    },
    [token],
  )

  const outHandler = () => {
    dispatch(getToken(''))
    console.log(token)
  }

  const cart = useSelector(getAllCartProductsSelector)
  const favourites = useSelector(getAllFavouritesProductsSelector)
  const countBasket = Object.keys(cart).length
  const countFavourites = Object.keys(favourites).length

  return (
    <header className={headerStyles.wr}>
      <nav>
        <ul className={headerStyles.menu}>
          <li>
            <Link to="/">
              <div><img src={dogLogo} alt="dogLogo" /></div>
              DogFood
            </Link>
          </li>
          <li>
            <Search />
          </li>
          <li>
            <NavLink
              className={headerStyles.basketNavLink}
              to="/basket"
            >
              Корзина
              <div className={headerStyles.basketCounter}>{countBasket}</div>
            </NavLink>
          </li>
          <li>

            <NavLink
              className={headerStyles.favourites}
              to="/favourites"
            >
              Избранные
              <div className={headerStyles.wr_heart}>
                <div className={headerStyles.count__heart}>{countFavourites}</div>
              </div>
              <img className={headerStyles.img__heart} src={heart} alt="heart" />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={headerStyles.user}
              to="/user"
            >
              Пользователь
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={outHandler}
              className={({ isActive }) => classNames({ [headerStyles.activLink]: isActive })}
              to="Signin"
            >
              Выйти
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={outHandler}
              className={({ isActive }) => classNames({
                [headerStyles.activLink]: isActive,
              })}
              to="Signin"
            >
              Войти
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activLink]: isActive })}
              to="/signup"
            >
              Регистрация
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activLink]: isActive })}
              to="/products"
            >
              Товары
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export const HeaderMemo = memo(Header)
