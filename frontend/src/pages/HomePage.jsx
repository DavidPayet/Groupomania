import axios from 'axios'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Posts from '../components/Posts'
import '../styles/HomePage.css'
import { useState } from 'react'
import { useEffect } from 'react'

export default function HomePage() {
  const [response, setResponse] = useState(undefined)
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:8000/api/posts',
      headers: { accept: '*/*' }
    })
      .then(response => {
        setResponse(response.data)
        setIsloading(!isLoading)

        response.status === 400 && console.log('Problème de récupération de données !!!')
      })

    // eslint-disable-next-line
  }, [])

  return (
    <div className="HomePage">
      <Navbar />
      <Header />

      {
        isLoading ? (
          <span>Chargement...</span>
        ) : (
          <div className="posts-container">
            {
              response.slice(0).reverse().map(post => (
                <Posts
                  key={post._id}
                  post={post}
                />
              ))
            }
          </div>
        )
      }
    </div>
  )
}
