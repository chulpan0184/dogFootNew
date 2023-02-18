/* eslint-disable linebreak-style */
/* eslint-disable max-len */

import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'

import { createSigninFormValidationSchema } from './validatorSignin'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { getToken, getTokenSelector } from '../../../redux/slices/tokenSlice'
// import { AppTokenContext } from '../../contexts/AppTokenContextProvider'

const initialValues = {
  email: '',
  password: '',
}

function Signin() {
  const token = useSelector(getTokenSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationFn: (values) => dogFoodApi.Signin(values, token)
      .then((res) => dispatch(getToken(res.token))),
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)
    setTimeout(() => navigate('/products'))
    // navigate('/products')
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createSigninFormValidationSchema}
      onSubmit={submitHandler}
    >
      <Form>
        <Field name="email" placeholder="Email" type="email" />
        <ErrorMessage component="p" className="error" name="email" />

        <Field name="password" placeholder="password" type="password" />
        <ErrorMessage component="p" className="error" name="password" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}

export const SigninMemo = memo(Signin)
