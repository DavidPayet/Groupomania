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
  const userToken = sessionStorage.getItem('userToken')
  const isAdmin = JSON.parse(sessionStorage.getItem('isAdmin'))


  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:8000/api/my-posts`,
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        const myPosts = response.data

        if (isAdmin === true) {
          setResponse(myPosts)
          setIsloading(!isLoading)

        } else {
          setResponse(myPosts.filter(el => el.userId === userId))
          setIsloading(!isLoading)
        }

        response.status === 400 && console.log('Problème de récupération de données !!!')
      })

    // eslint-disable-next-line
  }, [])


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
                  postId={post._id}
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
