import { useState } from 'react'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'
import iconSecondary from '../assets/icon-secondary.svg'
import '../styles/ConnectionPage.css'

export default function ConnectionPage() {
  const [showSignupForm, setShowSignupForm] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)

  const toggleSignupForm = () => {
    setShowSignupForm(!showSignupForm)
  }

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm)
  }

  return (
    <div className="ConnectionPage">
      <div className="left-side">
        <img className='icon-left' src={iconSecondary} alt="icone groupomania" />
      </div>

      <div className="right-side">
        <img className='icon-right' src={iconSecondary} alt="icone groupomania" />
        <h1>Groupomania</h1>
        <p>Rejoignez le réseau social de votre entreprise.</p>
        <button className='ctaBtn' onClick={toggleSignupForm}>S'inscrire</button>
        <span className='or'>OU</span>
        <button className='ctaBtn' onClick={toggleLoginForm}>Se connecter</button>
        <SignupForm
          showSignupForm={showSignupForm}
          toggleSignupForm={toggleSignupForm}
        />
        <LoginForm
          showLoginForm={showLoginForm}
          toggleLoginForm={toggleLoginForm}
        />
      </div>
    </div>
  )
};
