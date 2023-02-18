import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dogLogo from './images/LogoDog.svg'
import headerStyles from './header.module.css'
import Search from '../Search/Search'
import { getTokenSelector, getToken } from '../../redux/slices/tokenSlice'

function Header() {
  const token = useSelector(getTokenSelector)
  const dispatch = useDispatch()

  const outHandler = () => {
    dispatch(getToken(''))
    console.log(token)
  }

  const { basketCounter } = useSelector((state) => state)

  return (
    <header className={headerStyles.wr}>
      <nav>
        <ul className={headerStyles.menu}>
          <li>
            <Link to="/">
              <div><img src={dogLogo} alt="dogLogo" /></div>
              DogFoot
            </Link>
          </li>
          <li>
            <Search />
            {/* <button className={headerStyles.button} type="submit">
              <img className="img__serch" src={serch} alt="serch" />
            </button> */}
          </li>
          {/* <li>
            <input type="text" src={serch} placeholder="serch..." />
          </li> */}
          <li>
            <NavLink
              className={headerStyles.basketNavLink}
              // to={token ? '/basket' : 'Signin'}
              to="/basket"
            >
              Basket
              <div className={headerStyles.basketCounter}>{basketCounter}</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={outHandler}
              className={({ isActive }) => classNames({ [headerStyles.activLink]: isActive })}
              to="Signin"
            >
              Signout
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={outHandler}
              className={({ isActive }) => classNames({
                [headerStyles.activLink]: isActive,
              })}
              to="Signin"
              // to={token ? 'products' : 'Signin'}
            >
              Signin
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activLink]: isActive })}
              to="/signup"
            >
              Signup
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => classNames({ [headerStyles.activLink]: isActive })}
              to="/products"
              // to={token ? '/products' : 'Signin'}
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export const HeaderMemo = memo(Header)

// eslint-disable-next-line no-undef
// const search = useSelector(getSearchSelector)
// const {
//   data, isLoading, isError, error, refetch,
// } = useQuery({
//   // eslint-disable-next-line no-undef
//   queryKey: getQueryKey(search),
//   queryFn: () => dogFoodApi.getAllProducts(search),
//   enabled: (token !== undefined) && (token !== ''),
// })
// console.log({
//   data, isLoading, isError, error, refetch,
// })
