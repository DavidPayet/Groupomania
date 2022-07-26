import { useFetch } from '../utils/hooks/useFetch'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Posts from '../components/Posts'
import '../styles/HomePage.css'

export default function HomePage() {
  const { data, isLoading, error } = useFetch(`http://localhost:8000/api/posts`)
  console.log(data)

  if (error) {
    console.log('Problème de récupération de données !!!')
  }

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
              data.slice(0).reverse().map(post => (
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
