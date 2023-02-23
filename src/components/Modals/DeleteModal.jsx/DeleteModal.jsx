import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../../redux/slices/cartSlice'
import { Modal } from '../../Modal/Modal'

export function DeleteCartModal({

  setIsDeleteModalOpen, isOpen, id,
}) {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  //  const [input, setInput] = useState('')
  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpen(false)
  }

  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
    navigate('/basket')
  }
  return (
    <Modal isOpen={isOpen} closeHandler={closeDeleteModalHandler}>
      <p>
        Вы точно хотите удалить продукт
      </p>
      <div className="d-flex justify-content-center">
        <button
          onClick={closeDeleteModalHandler}
          type="button"
          className="btn btn-primary mx-2"
        >
          Close
        </button>
        <button
          onClick={removeFromCartHandler}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </Modal>
  )
}
