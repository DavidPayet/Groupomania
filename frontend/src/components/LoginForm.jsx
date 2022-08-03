import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Form.css'
import FormInputs from './FormInputs'
import axios from 'axios'

export default function LoginForm({ showLoginForm, toggleLoginForm }) {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const inputs = [
    {
      id: 'logemail',
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
      id: 'logpassword',
      name: 'password',
      type: 'password',
      placeholder: 'Saisissez votre mot de passe',
      required: true,
      autoComplete: 'off',
      label: 'Mot de passe*',
      htmlFor: 'password',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,50}$`,
      errorMessage: 'Votre mot de passe doit contenir au moins 6 caractères, 1 chiffres, 1 lettres majuscules, 1 caractère spécial.'
    }
  ]

  const navigate = useNavigate()

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const { email, password } = user

  const handleSubmit = async e => {
    e.preventDefault()

    await axios.post(`http://localhost:8000/api/auth/login`, { email, password })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          setUser({ email: '', password: '' })
          console.log('Connection Réussit', res)
          sessionStorage.setItem("user", JSON.stringify(res.data))
          toggleLoginForm()
          // navigate('/accueil')
        }
      })
      .catch(error => {
        console.log('======CATCH=======', error)
        if (error.response.status === 401) {
          alert("Ce compte n'existe pas. \n Veuillez essayer avec un email valide ou créez un compte.");
        }
        if (error.response.status === 418) {
          alert("Mot de passe incorrect !")
        }

      })
  }


  return (
    <div className={`${showLoginForm && 'active'} Form`}>
      <div className={`${showLoginForm && 'active'} form-container`}>
        <button
          className='closeBtn'
          onClick={toggleLoginForm}
        >
          ╳
        </button>

        <h3>Connectez-vous</h3>

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

          <button className='ctaBtn'>Se connecter</button>
        </form>

        <span className='required-field'>* Champs obligatoires</span>
      </div>
    </div>
  )
};
