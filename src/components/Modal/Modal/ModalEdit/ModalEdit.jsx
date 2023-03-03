/* eslint-disable max-len */
import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import classNames from 'classnames'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import modalDeteilStyle from './modalDeteilStyle.module.css'
import { getTokenSelector } from '../../../../redux/slices/tokenSlice'
import { createProductEditValidationSchema } from './helpers/validatorEdit'

function ModalInner({
  children, closeHandler, id, pictures, name, price, discount, stock, wight, description,
}) {
  const navigate = useNavigate()
  // const dispatch = useDispatch()
  const token = useSelector(getTokenSelector)
  // const { id } = useParams()
  console.log({ id })

  useEffect(
    () => {
      if (!token) {
        navigate('/signin')
      }
    },
    [token],
  )
  const initialValues = {
    pictures,
    name,
    price,
    discount,
    stock,
    wight,
    description,
  }

  useEffect(() => {
    const closeModalByEscape = (e) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    }

    document.addEventListener('keydown', closeModalByEscape)

    return () => {
      document.removeEventListener('keydown', closeModalByEscape)
    }
  }, [])

  const closeModalByClickX = () => {
    closeHandler()
  }

  const closeModalByClickClose = () => {
    closeHandler()
  }

  const {
    mutateAsync, isLoading,
  } = useMutation({
    mutationFn: (values) => fetch(`https://api.react-learning.ru/products/${id}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => res.json()),
  })

  const submitProductEditHandler = async (values) => {
    await mutateAsync(values, id)
    // await mutateAsync(values)

    navigate('/products')
    closeHandler()
  }

  return (
    <div className={modalDeteilStyle.modalInner}>

      <Formik
        initialValues={initialValues}
        validatorSchema={createProductEditValidationSchema}
        onSubmit={submitProductEditHandler}
      >
        <Form className="d-flex flex-column" style={{ marginTop: '100px' }}>
          <Field name="name" placeholder="Name" type="boo" />
          <ErrorMessage component="p" className="error" name="name" />

          <Field name="pictures" type="text" placeholder="Img url" />
          <ErrorMessage component="p" className="error" name="pictures" />

          <Field name="price" type="text" placeholder="Price" />
          <ErrorMessage component="p" className="error" name="price" />

          <Field name="discount" type="text" placeholder="Discount" />
          <ErrorMessage component="p" className="error" name="discount" />

          <Field name="stock" type="text" placeholder="Stock" />
          <ErrorMessage component="p" className="error" name="stock" />

          <Field name="wight" type="text" placeholder="Weight" />
          <ErrorMessage component="p" className="error" name="wight" />

          <Field name="description" placeholder="Description" type="text" />
          <ErrorMessage component="p" className="error" name="description" />

          <button className="btn btn-secondary my-2" style={{ minWidth: '140px' }} disabled={isLoading} type="submit">Редактировать</button>
        </Form>
      </Formik>

      <button className={classNames('btn', 'btn-primary', 'btn-sm', modalDeteilStyle.closeBtn)} onClick={closeModalByClickX} type="button">X</button>
      <button
        onClick={closeModalByClickClose}
        type="button"
        className="btn btn-primary mx-2"
      >
        Close
      </button>
      {children}
    </div>
  )
}

export function ModalEdit({
  children, closeHandler, isOpen, id, pictures, name, price, discount, stock, wight, description,
}) {
  if (!isOpen) return null

  const closeModalByClickWrap = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return createPortal(
    <div onClick={closeModalByClickWrap} className={modalDeteilStyle.wrap}>
      <ModalInner id={id} pictures={pictures} name={name} price={price} discount={discount} stock={stock} wight={wight} description={description} closeHandler={closeHandler}>
        {children}
      </ModalInner>
    </div>,
    document.getElementById('modal-root'),

    // <div className={modalDeteilStyle.wrap}>
    //   {children}
    // </div>,
  )
}
