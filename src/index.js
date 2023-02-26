/* eslint-disable no-undef */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import { useQuery, useMutation, QueryClientProvider } from '@tanstack/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import App from './App'
import { Signup } from './components/Pages/Signup/Signup'
import { SigninMemo as Signin } from './components/Pages/Signin/Signin'
import { MainMemo as Main } from './components/Main/Main'
import { Products } from './components/Pages/Products/Products'
import { Basket } from './components/Pages/Basket/Basket'
import { store } from './redux/store'
import { DeteilProducts } from './components/Pages/DeteilProducts/DeteilProducts'
import { Favourites } from './components/Pages/Favourites/Favourites/Favourites'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'signin',
        element: <Signin />,
      },
      {
        path: 'signout',
        element: <Signin />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'basket',
        element: <Basket />,
      },
      {
        path: 'deteil',
        element: <DeteilProducts />,
      },
      {
        path: 'deteil',
        element: <DeteilProducts />,
      },
      {
        path: 'favourites',
        element: <Favourites />,
      },
    ],
  },
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
