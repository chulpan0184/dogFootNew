/* eslint-disable linebreak-style */
import * as Yup from 'yup'

export const createProductFormValidationSchema = Yup.object({

  pictures: Yup.string()
    .url(),
  name: Yup.string()
    .required('Required')
    .min(3, 'Must be Must be 3 characters or more')
    .max(15, 'Must be 15 characters or less'),
  price: Yup.number()
    .required('Required')
    .min(1, 'Must be Must be 1 characters or more'),
  discount: Yup.number(),
  stock: Yup.number()
    .min(1, 'Must be Must be 1 characters or more')
    .required('Required'),
  wight: Yup.string()
    .required('Required'),
  description: Yup.string()
    .min(3, 'Must be Must be 3 characters or more')
    .required('Required'),
})
