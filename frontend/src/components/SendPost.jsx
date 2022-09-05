import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/Dashboard.css'
import Modal from './Modal'

export default function SendPost() {
  const { userId } = useParams()
  const userToken = sessionStorage.getItem('userToken')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState(null)
  const modalParams = JSON.parse(sessionStorage.getItem('modalParams'))
  const [visibleModal, setVisibleModal] = useState(false)

  const handleChangePost = e => {
    setDescription(e.target.value)
  }

  const handleChangeImgUrl = e => {
    setImageUrl(e.target.files[0])
  }

  const clearInput = () => {
    document.querySelector('textarea').value = ''
    document.querySelector('input').value = null
  }


  const handleSend = async e => {
    e.preventDefault()
    const bodyFormData = new FormData()

    bodyFormData.append('userId', userId)
    bodyFormData.append('description', description)
    bodyFormData.append('image', imageUrl)

    await axios
      .post(`http://localhost:8000/api/posts`,
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
        if (res.status === 201) {
          setDescription('')
          setImageUrl(null)
          clearInput()
          sessionStorage.setItem('modalParams', JSON.stringify({ id: 'alert201', activeClassName: 'succes', message: "Post envoyé avec succès !" }))
          setVisibleModal(true)

        }

      })
      .catch(error => {
        console.log(error);
        sessionStorage.setItem('modalParams', JSON.stringify({ id: 'alert400', activeClassName: 'alert', message: "Votre post n'a pas pu être envoyé." }))
        setVisibleModal(true)
      })
  }


  return (
    <div className='SendPost'>
      <form
        className='sendPost-form'
        method='post'
        onSubmit={handleSend}
        encType='multipart/form-data'
      >
        <label htmlFor='description'>Message</label>
        <textarea
          name='description'
          id='description'
          minLength='3'
          maxLength='1500'
          placeholder='Écrivez votre message'
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

        <button className='ctaBtn'>Envoyer</button>
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
