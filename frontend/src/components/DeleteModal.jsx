import axios from 'axios';
import '../styles/DeleteModal.css'

export default function DeleteModal({ onClose, postId }) {
  const userId = sessionStorage.getItem('userID')
  const userToken = sessionStorage.getItem('userToken')

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/posts/${postId}?userId=${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then(res => res.status === 200 && window.location.reload())
  }

  return (
    <div className="DeleteModal">
      <p>Confirmer la suppression du post ?</p>
      <button onClick={onClose} className='ctaBtn'>Non</button>
      <button onClick={handleDelete} className='ctaBtn'>Oui</button>
    </div>
  )
};
