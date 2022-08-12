import axios from 'axios';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/SendPost.css'

export default function SendPost() {
  const { userId } = useParams()
  const userToken = sessionStorage.getItem('userToken')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleChangePost = e => {
    setDescription(e.target.value)
  }

  const handleChangeImgUrl = e => {
    setImageUrl(e.target.files[0])
  }

  const handleSend = async e => {
    e.preventDefault()
    const bodyFormData = new FormData()

    bodyFormData.append('userId', userId);
    bodyFormData.append('description', description);
    bodyFormData.append('image', imageUrl);

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
        // res.status === 201 && setSendPost({ userId: '', description: '', imageUrl: '', __v: 0 })
        console.log('====== RESPONSE ======', res);

      })
      .catch(error => {
        console.log('====== ERROR ======', error);
        console.log({ userId, description, imageUrl });
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
          name="description"
          id="description"
          minLength='5'
          maxLength='300'
          placeholder='Écrivez votre message'
          required
          onChange={handleChangePost}
        ></textarea>

        <label htmlFor='file'>Ajoutez un fichier image</label>
        <input id='imageUrl' type='file' name='imageUrl' onChange={handleChangeImgUrl} />

        <button className='ctaBtn'>Envoyer</button>
      </form>
    </div>
  )
};
