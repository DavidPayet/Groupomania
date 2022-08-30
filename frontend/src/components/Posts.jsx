import { useParams } from 'react-router-dom'
import profilIcon from '../assets/profile-icon.svg'
import editIcon from '../assets/edit-icon.svg'
import deleteIcon from '../assets/delete-icon.svg'
import '../styles/Posts.css'
import { useState } from 'react'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
import Like from './Like'

export default function Posts({ post, postId }) {
  const params = useParams().userId
  const userId = sessionStorage.getItem('userID')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal)
  }

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal)
  }

  return (
    <div className="one-post">
      {
        params === userId && (
          <div className="actionBtn">
            <button onClick={toggleEditModal} className='editBtn'>
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

      <Like
        post={post}
      />

      {
        showDeleteModal &&
        <DeleteModal
          postId={postId}
          onClose={toggleDeleteModal}
        />
      }

      {
        showEditModal &&
        <EditModal
          postId={postId}
          onClose={toggleEditModal}
          post={post}
        />
      }
    </div>
  )
};
