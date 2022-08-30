import { useState } from 'react'
import axios from 'axios'
import thumbUp from '../assets/thumbup-icon.svg'

export default function Like({ post }) {
  const userToken = sessionStorage.getItem('userToken')
  const userId = sessionStorage.getItem('userID')

  const likes = post.likes
  const usersLiked = post.usersLiked

  const [like, setLike] = useState(likes)
  const [postAlreadyLiked, setPostAlreadyLiked] = useState(usersLiked.some(user => user === userId))

  const handleLike = async () => {
    console.log(post);

    await axios
      .post(`http://localhost:8000/api/posts/${post._id}/like`,
        {
          userId: userId,
          like: postAlreadyLiked ? 0 : 1
        },
        {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        console.log('================ RES DEBUT ====================');
        console.log(res);
        console.log(post);
        console.log(usersLiked);
        console.log(postAlreadyLiked);
        console.log('================ RES FIN ====================');

        setPostAlreadyLiked(!postAlreadyLiked)
        postAlreadyLiked
          ? setLike(like - 1)
          : setLike(like + 1)

      })
      .catch(err => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      })

  }

  return (
    <div className="like-action">
      <button onClick={handleLike} className="thumbup-icon">
        <img src={thumbUp} alt="bouton like" />
      </button>
      <span className="like-nb">{like}</span>
    </div>
  )
};
