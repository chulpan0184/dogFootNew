/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-no-constructed-context-values */
// import {
//   createContext, useEffect, useState,
// } from 'react'
// import { dogFoodApi } from '../../api/DogFoodApi'

// export const AppTokenContext = createContext()

// export function AppTokenContextProvider({ children }) {
//   const [token, setToken] = useState(() => {
//     const tokenFromStorage = localStorage.getItem('token')
//     return tokenFromStorage ?? ''
//   })

//   useEffect(() => {
//     localStorage.setItem('token', token)
//     dogFoodApi.setToken(token)
//   }, [token])

//   return (
//     <AppTokenContext.Provider value={{ token, setToken }}>
//       {children}
//     </AppTokenContext.Provider>
//   )
// }

// const [token, setToken] = useState('')
//   useEffect(() => {
//     localStorage.setItem('token', token)
//     dogFoodApi.setToken(token)
//   }, [token])

//   return (
//     <AppContext.Provider value={{ token, setToken }}>
//       {children}
//     </AppContext.Provider>
//   )
// }

// export const useAppContext = () => useContext(AppContext)
