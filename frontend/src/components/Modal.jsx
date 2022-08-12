import { useState } from 'react';
import { createPortal } from 'react-dom'
import '../styles/Modal.css'

export default function Modal({ message, activeClassName }) {
  const [closeModal, setCloseModal] = useState(false)

  // console.log(closeModal);

  return createPortal(
    <div className={`Modal ${activeClassName}`}>
      <button
        className={`closeModalBtn ${activeClassName}`}
        onClick={() => setCloseModal(!closeModal)}
      >
        ╳
      </button>
      <p>{message}</p>
    </div>, document.body
  )
};
