import iconSecondary from '../assets/icon-secondary.svg'
import '../styles/ConnectionPage.css'

export default function ConnectionPage() {
  return (
    <div className="ConnectionPage">
      <div className="left-side">
        <img className='icon-left' src={iconSecondary} alt="icone groupomania" />
      </div>

      <div className="right-side">
        <img className='icon-right' src={iconSecondary} alt="icone groupomania" />
        <h1>Groupomania</h1>
        <p>Rejoignez le réseau social de votre entreprise.</p>
        <button>S'inscrire</button>
        <span>OU</span>
        <button>Se connecter</button>
      </div>
    </div>
  )
};
