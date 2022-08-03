import { useState } from 'react'
import '../styles/Form.css'
import FormInputs from './FormInputs'
import axios from 'axios'

export default function SignupForm({ showSignupForm, toggleSignupForm }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
    passwordConf: ''
  })

  const inputs = [
    {
      id: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'exemple@email.com',
      required: true,
      autoComplete: 'on',
      label: 'Email*',
      htmlFor: 'email',
      errorMessage: 'Veuillez saisir un email valide.'
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Saisissez un mot de passe',
      required: true,
      autoComplete: 'off',
      label: 'Mot de passe*',
      htmlFor: 'password',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,50}$`,
      errorMessage: 'Votre mot de passe doit contenir au moins 6 caractères, 1 chiffres, 1 lettres majuscules, 1 caractère spécial.'
    },
    {
      id: 'passwordConf',
      name: 'passwordConf',
      type: 'password',
      placeholder: 'Confirmez votre mot de passe',
      required: true,
      autoComplete: 'off',
      label: 'Confirmer*',
      htmlFor: 'passwordConf',
      pattern: user.password,
      errorMessage: 'Votre mot de passe ne correspond pas.'
    },
  ]

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }


  const { email, password } = user

  const handleSubmit = async e => {
    e.preventDefault()

    await axios.post(`http://localhost:8000/api/auth/signup`, { email, password })
      .then(res => {
        if (res.status === 201) {
          setUser({ email: '', password: '', passwordConf: '' })
          alert('Compte créé avec succès ! \n Vous pouvez dès à présent vous connecter.')
          toggleSignupForm()
        }
      })
      .catch(error => {
        console.log(error)
        if (error.response.status === 409) {
          alert('Cet email possède déjà un compte');
        }
      })
  }

  return (
    <div className={`${showSignupForm && 'active'} Form`}>
      <div className={`${showSignupForm && 'active'} form-container`}>
        <button
          className='closeBtn'
          onClick={toggleSignupForm}
        >
          ╳
        </button>

        <h3>Inscrivez-vous</h3>

        <form
          className='form-bloc'
          method='post'
          onSubmit={handleSubmit}
        >

          {
            inputs.map(input => (
              <FormInputs
                key={input.id}
                id={input.id}
                {...input}
                value={user[input.name]}
                onChange={onChange}
              />
            ))
          }

          <button className='ctaBtn'>S'inscrire</button>
        </form>

        <span className='required-field'>* Champs obligatoires</span>
      </div>
    </div>
  )
};
