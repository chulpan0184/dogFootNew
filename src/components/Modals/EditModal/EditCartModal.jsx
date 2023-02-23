/* eslint-disable react/jsx-no-undef */
import { classNames } from 'classnames'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../../redux/slices/cartSlice'

export function EditCartModal({

  setIsEditModalOpen, isOpen, id,
}) {
  const dispatch = useDispatch()
  //  const [input, setInput] = useState('')
  const closeHandler = () => {
    setIsEditModalOpen(false)
  }

  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      {/* <input value={input} onChange={(e) => setInput(e.target.value)} /> */}
      Вы действительно хотите удалить товар из карзины
      <div className="d-flex justify-content-center" />
      <button
        onClick={closeHandler}
        type="button"
        className={classNames('btn', 'mx-2', 'btn-primary')}
      >
        Close
      </button>
      <button
        // disabled={!input}
        onClick={removeFromCartHandler}
        type="button"
        className="btn btn-success"
      >
        Delete
      </button>
    </Modal>

  )
}
