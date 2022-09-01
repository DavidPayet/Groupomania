import { useContext } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import logo from '../assets/icon-left-font-monochrome-white.svg'
import Auth from "../contexts/Auth"
import { logout } from "../services/authApi"
import '../styles/Navbar.css'

export default function Navbar() {
  const [toggleNav, setToggleNav] = useState(false)
  const { isAuthenticated, setIsAuthenticated } = useContext(Auth)
  const userId = sessionStorage.getItem('userID')

  const openCloseNav = () => {
    setToggleNav(!toggleNav)
  }

  const handleLogout = () => {
    logout()
    setIsAuthenticated(false)
  }

  return (
    <>
      <nav>
        <Link to='/accueil'>
          <img className="logo" src={logo} alt='logo groupomania' />
        </Link>
        <div className={`menu ${toggleNav && "active"}`}>
          {
            !isAuthenticated ? (
              <>
                <Link to='/'>Se Connecter</Link>
              </>
            ) : (
              <>
                <Link to='/accueil'>Accueil</Link>
                <Link to={`/dashboard/${userId}`}>Mon Compte</Link>
                <Link to={`/mes-posts/${userId}`}>Mes Posts</Link>
                <Link to='/' onClick={handleLogout}>Se Déconnecter</Link>
              </>
            )
          }
        </div>
      </nav>

      <button
        type="button"
        aria-label="toggle curtain navigation"
        className={`nav-toggler ${toggleNav && "active"}`}
        onClick={() => openCloseNav()}
      >
        <span className="line l1"></span>
        <span className="line l2"></span>
        <span className="line l3"></span>
      </button>
    </>
  )
}
