import icon from '../assets/icon-secondary.svg'
import '../styles/Header.css'

export default function Header() {
  return (
    <div className="Header">
      <img className='icon' src={icon} alt="icone groupomania" />
      <p>Bienvenue sur votre réseau social</p>
    </div>
  )
}
