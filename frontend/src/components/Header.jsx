import icon from '../assets/icon-secondary.svg'
import '../styles/Header.css'

export default function Header() {
  return (
    <div className="Header">
      <img className='icon' src={icon} alt="icone groupomania" />
      <h2>Bienvenue sur votre réseau social</h2>
    </div>
  )
}
