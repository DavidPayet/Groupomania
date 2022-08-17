import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Posts from '../components/Posts'
import '../styles/PersonalPosts.css'

export default function PersonalPosts() {
  const [response, setResponse] = useState(undefined)
  const [isLoading, setIsloading] = useState(true)
  const params = useParams()
  const userId = params.userId

  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:8000/api/posts`,
      headers: { accept: '*/*' }
    })
      .then(response => {
        const myPosts = response.data.filter(el => el.userId === userId)

        setResponse(myPosts)
        setIsloading(!isLoading)

        response.status === 400 && console.log('Problème de récupération de données !!!')
      })
      .then()

    // eslint-disable-next-line
  }, [])
  console.log(response);


  return (
    <div className="PersonalPosts">
      <Navbar />
      <h2>Mes Posts</h2>
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
};
