import { useParams } from 'react-router-dom'
import profilIcon from '../assets/profile-icon.svg'
import thumbUp from '../assets/thumbup-icon.svg'
import editIcon from '../assets/edit-icon.svg'
import deleteIcon from '../assets/delete-icon.svg'
import '../styles/Posts.css'
import { useState } from 'react'
import DeleteModal from './DeleteModal'

export default function Posts({ post }) {
  const params = useParams().userId
  const userId = sessionStorage.getItem('userID')
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal)
  }

  return (
    <div className="one-post">
      {
        params === userId && (
          <div className="actionBtn">
            <button className='editBtn'>
              <img src={editIcon} alt="modifier le post" />
            </button>
            <button onClick={toggleDeleteModal} className='deleteBtn'>
              <img src={deleteIcon} alt="supprimer le post" />
            </button>
          </div>
        )
      }
      <div className="profil">
        <span className="avatar">
          <img src={profilIcon} alt="icone profil" />
        </span>
        {/* <span className="profil-name">{post.name}</span> */}
      </div>

      <div className="post-content">
        {post.description}
      </div>

      {
        post?.imageUrl && (
          <div className="post-img">
            <img src={post.imageUrl} alt="illustration post" />
          </div>
        )
      }

      <div className="like-action">
        <span className="thumbup-icon">
          <img src={thumbUp} alt="pouce en l'air" />
        </span>
        <span className="like-nb">{post.likes}</span>
      </div>


      {
        showDeleteModal && <DeleteModal />
      }
    </div>
  )
};
