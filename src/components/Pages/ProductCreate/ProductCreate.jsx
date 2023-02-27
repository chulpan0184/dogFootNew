import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { prepareData } from '../Signup/utils'
import { createProductFormValidationSchema } from './helpers/validator'

const initialValues = {
  author: {
    about: '',
    avatar: '',
    email: '',
    name: '',
    __v: 0,
    _id: '',
  },
  available: true,
  created_at: new Date(new Date().setDate(new Date().getDate() + 7)),
  description: '',
  discount: '',
  isPublished: true,
  likes: [],
  name: '',
  pictures: '',
  price: 0,
  reviews: [{
    author: '',
    created_at: new Date(new Date().setDate(new Date().getDate() + 7)),
    product: '',
    rating: 0,
    text: '',
    updated_at: new Date(new Date().setDate(new Date().getDate() + 7)),
    __v: 0,
    _id: '',
  }],
  stock: 0,
  tags: ['new', 'sale'],
  updated_at: new Date(new Date().setDate(new Date().getDate() + 7)),
  wight: '',
  __v: 0,
  _id: '',
}

export function ProductCreate() {
  const navigate = useNavigate()
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => fetch(fetch('https://api.react-learning.ru/products', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json)),
  })

  const submitProductHandler = async (values) => {
    const preparedData = prepareData(values)
    const response = await mutateAsync(preparedData)
    navigate(`/products/${response.id}`)
  }

  return (
    <Formik
      initialValues={initialValues}
      validatorSchema={createProductFormValidationSchema}
      onSubmit={submitProductHandler}
    >
      <Form className="d-flex flex-column" style={{ marginTop: '100px' }}>
        <Field name="description" placeholder="Description" type="text" />
        <ErrorMessage component="p" className="error" name="description" />

        <Field name="discount" type="text" placeholder="Discount" />
        <ErrorMessage component="p" className="error" name="discount" />

        <Field name="name" placeholder="Name" type="text" />
        <ErrorMessage component="p" className="error" name="name" />

        <Field name="pictures" type="text" placeholder="Img url" />
        <ErrorMessage component="p" className="error" name="pictures" />

        <Field name="price" type="text" placeholder="Price" />
        <ErrorMessage component="p" className="error" name="price" />

        <Field name="stock" type="text" placeholder="Stock" />
        <ErrorMessage component="p" className="error" name="stock" />

        <Field name="wight" type="text" placeholder="Weight" />
        <ErrorMessage component="p" className="error" name="wight" />

        <Field name="created_at" type="date" />
        <ErrorMessage component="p" className="error" name="created_at" />

        <button disabled={isLoading} type="submit">Submit</button>
      </Form>
    </Formik>
  )
}
