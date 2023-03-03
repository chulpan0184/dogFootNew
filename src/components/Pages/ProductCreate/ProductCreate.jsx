/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { createProductFormValidationSchema } from './helpers/validator'
import { getTokenSelector } from '../../../redux/slices/tokenSlice'

export function ProductCreate() {
  const navigate = useNavigate()
  const token = useSelector(getTokenSelector)

  useEffect(
    () => {
      if (!token) {
        navigate('/signin')
      }
    },
    [token],
  )
  const initialValues = {
    pictures: '',
    name: '',
    price: null,
    discount: null,
    stock: null,
    wight: '',
    description: '',
  }
  const {
    mutateAsync, isLoading,
  } = useMutation({
    mutationFn: (values) => fetch('https://api.react-learning.ru/products', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => res.json()),
  })

  const submitProductHandler = async (values) => {
    const response = await mutateAsync(values)
    console.log({ response })

    navigate(`/products/${response._id}`)
  }

  return (
    <>
      <div className="d-flex flex-row justify-content-center" style={{ marginTop: '110px' }}><h3>Создать продукт</h3></div>

      <Formik
        initialValues={initialValues}
        validatorSchema={createProductFormValidationSchema}
        onSubmit={submitProductHandler}
      >
        <Form className="d-flex flex-column" style={{ marginTop: '10px' }}>
          <Field className="m-2" name="name" placeholder="Name" type="text" />
          <ErrorMessage component="p" className="error" name="name" />

          <Field className="m-2" name="pictures" type="text" placeholder="Img url" />
          <ErrorMessage component="p" className="error" name="pictures" />

          <Field className="m-2" name="price" type="text" placeholder="Price" />
          <ErrorMessage component="p" className="error" name="price" />

          <Field className="m-2" name="discount" type="text" placeholder="Discount" />
          <ErrorMessage component="p" className="error" name="discount" />

          <Field className="m-2" name="stock" type="text" placeholder="Stock" />
          <ErrorMessage component="p" className="error" name="stock" />

          <Field className="m-2" name="wight" type="text" placeholder="Weight" />
          <ErrorMessage component="p" className="error" name="wight" />

          <Field className="m-2" name="description" placeholder="Description" type="text" />
          <ErrorMessage component="p" className="error" name="description" />

          <button className="btn btn-secondary m-2" style={{ minWidth: '140px' }} disabled={isLoading} type="submit">Создать</button>
        </Form>
      </Formik>
    </>

  )
}

// if (isLoading) return <Loader />
// if (isError) {
//   return (
//     <div className="d-flex flex-column justify-content-center">

//       <p>
//         Error happend:
//         {' '}
//         {error.message}
//       </p>
//     </div>
//   )}

// if (!isError) {
//   return (
//     <div className="d-flex flex-column justify-content-center">
//       <h1>Товар успешно создан</h1>
//     </div>
//   )
// }

// const initialValues = {
//   author: {
//     about: '',
//     avatar: '',
//     email: '',
//     name: '',
//     __v: 0,
//     _id: '',
//   },
//   available: true,
//   created_at: new Date(new Date().setDate(new Date().getDate() + 7)),
//   description: '',
//   discount: '',
//   isPublished: true,
//   likes: [],
//   name: '',
//   pictures: '',
//   price: 0,
//   reviews: [{
//     author: '',
//     created_at: new Date(new Date().setDate(new Date().getDate() + 7)),
//     product: '',
//     rating: 0,
//     text: '',
//     updated_at: new Date(new Date().setDate(new Date().getDate() + 7)),
//     __v: 0,
//     _id: '',
//   }],
//   stock: 0,
//   tags: ['new', 'sale'],
//   updated_at: new Date(new Date().setDate(new Date().getDate() + 7)),
//   wight: '',
//   __v: 0,
//   _id: '',
// }
