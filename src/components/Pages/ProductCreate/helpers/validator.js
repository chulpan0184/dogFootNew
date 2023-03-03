/* eslint-disable linebreak-style */
import * as Yup from 'yup'

export const createProductFormValidationSchema = Yup.object({

  pictures: Yup.string()
    .url(),
  name: Yup.string()
    .required('Required'),
  price: Yup.number()
    .required('Required'),
  discount: Yup.number(),
  stock: Yup.number(),
  wight: Yup.string(),
  description: Yup.string()
    .required('Required'),
})
