import icon from '../assets/icon.svg'
import '../styles/Header.css'

export default function Header() {
  return (
    <div className="Header">
      <img className='icon' src={icon} alt="icone groupomania" />
      <p>Bienvenue sur le réseau social de votre entreprise</p>
      <h1>Groupomania</h1>
    </div>
  )
}
