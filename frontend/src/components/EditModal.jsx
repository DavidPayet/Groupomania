import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Modal from './Modal'
import '../styles/Dashboard.css'

export default function EditModal({ onClose, post }) {
  const { userId } = useParams()
  const userToken = sessionStorage.getItem('userToken')
  const [description, setDescription] = useState(post.description)
  const [imageUrl, setImageUrl] = useState(null)
  const modalParams = JSON.parse(sessionStorage.getItem('modalParams'))
  const [visibleModal, setVisibleModal] = useState(false)

  const handleChangePost = e => {
    setDescription(e.target.value)
  }

  const handleChangeImgUrl = e => {
    setImageUrl(e.target.files[0])
  }

  const handleSend = async e => {
    e.preventDefault()
    const bodyFormData = new FormData()

    bodyFormData.append('userId', userId)
    bodyFormData.append('description', description)
    bodyFormData.append('image', imageUrl)

    await axios
      .put(`http://localhost:8000/api/posts/${post._id}`,
        bodyFormData,
        {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data'
          },
          params: {
            userId: userId
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          setVisibleModal(true)
          sessionStorage.setItem('modalParams', JSON.stringify({ id: 'alert200', activeClassName: 'succes', message: "Modification réussie !" }))
        }
      })
      .catch(error => {
        console.log(error);
        sessionStorage.setItem('modalParams', JSON.stringify({ id: 'alert400', activeClassName: 'alert', message: "Votre post n'a pas pu être modifié." }))
        setVisibleModal(true)
      })
  }

  return (
    <div className='SendPost editPost'>
      <button onClick={onClose} className='close-editModal'>╳</button>
      <form
        className='sendPost-form'
        method='post'
        onSubmit={handleSend}
        encType='multipart/form-data'
      >
        <label htmlFor='description'>Message</label>
        <textarea
          name="description"
          id="description"
          minLength='5'
          maxLength='300'
          defaultValue={post.description}
          required
          onChange={handleChangePost}
        ></textarea>

        <label htmlFor='file'>Ajoutez un fichier image</label>
        <input
          id='imageUrl'
          type='file'
          name='imageUrl'
          onChange={handleChangeImgUrl}
        />

        <div className="ctaBtn-container">
          <button onClick={onClose} className='ctaBtn'>Annuler</button>
          <button type='submit' className='ctaBtn'>Modifier</button>
        </div>
      </form>

      {
        visibleModal && <Modal
          id={modalParams.id}
          activeClassName={modalParams.activeClassName}
          message={modalParams.message}
          visibleModal={setVisibleModal}
        />
      }
    </div>
  )
}
