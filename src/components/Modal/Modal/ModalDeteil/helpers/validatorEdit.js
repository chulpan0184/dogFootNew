/* eslint-disable linebreak-style */
import * as Yup from 'yup'

export const createProductEditValidationSchema = Yup.object({

  pictures: Yup.string()
    .url(),
  name: Yup.string(),
  price: Yup.number(),
  discount: Yup.number(),
  stock: Yup.number(),
  wight: Yup.string(),
  description: Yup.string(),
})
