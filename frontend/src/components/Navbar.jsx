import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/icon-left-font-monochrome-white.svg'
import '../styles/Navbar.css'

export default function Navbar() {
  const [toggleNav, setToggleNav] = useState(false)

  const openCloseNav = () => {
    setToggleNav(!toggleNav)
  }

  return (
    <>
      <nav>
        <Link to='/accueil'>
          <img className="logo" src={logo} alt='logo groupomania' />
        </Link>
        <div className={`menu ${toggleNav && "active"}`}>
          <Link to='/accueil'>Accueil</Link>
          <Link to='/connexion'>Connexion</Link>
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
};
