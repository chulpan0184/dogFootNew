import classNames from 'classnames'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

function ModalInner({ closeDeleteModalHandler, children }) {
  useEffect(() => {
    console.log('asdfkjasdlkfj')

    const closeModalByEscape = (e) => {
      if (e.key === 'Escape') {
        closeDeleteModalHandler()
      }
    }

    document.addEventListener('keydown', closeModalByEscape)

    return () => {
      console.log('UseEffect Return')
      document.removeEventListener('keydown', closeModalByEscape)
    }
  }, [])

  const closeModalByClickX = () => closeDeleteModalHandler()

  return (
    <div className={styles.modalInner}>
      <button
        type="button"
        className={classNames(
          'btn',
          'btn-primary',
          'btn-sm',
          styles.closeBtn,
        )}
        onClick={closeModalByClickX}
      >
        X
      </button>
      {children}
    </div>
  )
}

export function Modal({ isOpen, closeHandler, children }) {
  if (!isOpen) return null

  const closeModalByClickWrapper = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return createPortal(
    <div onMouseDown={closeModalByClickWrapper} className={styles.modalWr}>
      <ModalInner closeHandler={closeHandler}>
        {children}
      </ModalInner>
    </div>,
    document.getElementById('modal-root'),
  )
}
