import '../styles/Modal.css'
import { createPortal } from 'react-dom'

export default function Modal({ id, message, activeClassName, visibleModal }) {
  // const [closeModal, setCloseModal] = useState(false)


  const handleCloseModal = () => {
    console.log('MODAL CLOSED');

    document.querySelector('.Modal').style.display = 'none'
    visibleModal(false)
  }

  return createPortal(
    <div id={id} className={`Modal ${activeClassName}`}>
      <button
        className={`closeModalBtn ${activeClassName}`}
        onClick={handleCloseModal}
      >
        ╳
      </button>
      <p>{message}</p>
    </div>, document.body
  )
};
