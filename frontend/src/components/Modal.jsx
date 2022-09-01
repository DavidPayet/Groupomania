import '../styles/Modal.css'
import { createPortal } from 'react-dom'

export default function Modal({ id, message, activeClassName, visibleModal }) {
  const reloadSuccesEditModal = JSON.parse(sessionStorage.getItem('modalParams'))

  const handleCloseModal = () => {

    document.querySelector('.Modal').style.display = 'none'
    visibleModal(false)
    reloadSuccesEditModal.id === 'alert200' && window.location.reload()
  }

  return createPortal(
    <div className="modal-container">
      <div id={id} className={`Modal ${activeClassName}`}>
        <button
          className={`closeModalBtn ${activeClassName}`}
          onClick={handleCloseModal}
        >
          ╳
        </button>
        <p>{message}</p>
      </div>
    </div>, document.body
  )
}
