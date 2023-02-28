/* eslint-disable max-len */
import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import classNames from 'classnames'
import modalDeteilStyle from './modalDeteilStyle.module.css'

function ModalInner({ children, closeHandler }) {
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

  return (
    <div className={modalDeteilStyle.modalInner}>
      <button className={classNames('btn', 'btn-primary', 'btn-sm', modalDeteilStyle.closeBtn)} onClick={closeModalByClickX} type="button">X</button>
      <button
        onClick={closeModalByClickClose}
        type="button"
        className="btn btn-primary mx-2"
      >
        Close
      </button>
      <button
        type="button"
        className="btn btn-danger"
      >
        Delete
      </button>
      {children}
    </div>
  )
}

export function ModalDeteil({ children, closeHandler, isOpen }) {
  if (!isOpen) return null

  const closeModalByClickWrap = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return createPortal(
    <div onClick={closeModalByClickWrap} className={modalDeteilStyle.wrap}>
      <ModalInner closeHandler={closeHandler}>
        {children}
      </ModalInner>
    </div>,
    document.getElementById('modal-root'),

    // <div className={modalDeteilStyle.wrap}>
    //   {children}
    // </div>,
  )
}
