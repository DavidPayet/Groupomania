import Navbar from '../components/Navbar'
import Header from '../components/Header'
import profilIcon from '../assets/profile-icon.svg'
import thumbUp from '../assets/thumbup-icon.svg'
import '../styles/HomePage.css'

export default function HomePage() {
  return (
    <div className="HomePage">
      <Navbar />
      <Header />

      <div className="posts-container">

        <div className="one-post">
          <div className="profil">
            <span className="avatar">
              <img src={profilIcon} alt="icone profil" />
            </span>
            <span className="profil-name">@John</span>
          </div>

          <div className="post-content">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure repudiandae sed sunt delectus tempora facilis enim quasi quis ut nemo!
          </div>

          <div className="like-action">
            <span className="thumbup-icon">
              <img src={thumbUp} alt="pouce en l'air" />
            </span>
            <span className="like-nb">30</span>
          </div>
        </div>

      </div>
    </div>
  )
};
