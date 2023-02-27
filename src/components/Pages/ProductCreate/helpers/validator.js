/* eslint-disable linebreak-style */
import * as Yup from 'yup'

export const createProductFormValidationSchema = Yup.object({

  name: Yup.string(),
  description: Yup.string(),
  pictures: Yup.string()
    .url()
    .required('Required'),
  wight: Yup.string(),
  price: Yup.string(),
  stock: Yup.string(),
  discount: Yup.string(),
  created_at: Yup.date().default(() => new Date(new Date().setDate(new Date().getDate() + 7))),
})
