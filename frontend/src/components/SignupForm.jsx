import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import '../styles/Form.css'
import FormInputs from './FormInputs'

export default function SignupForm({ showSignupForm, toggleSignupForm }) {

  // const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: '',
    passwordConf: ''
  })

  const [accountCreated, setAccountCreated] = useState(false)

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
  console.log(user);



  const handleSubmit = async (e) => {
    e.preventDefault()

    const { email, password } = user

    await fetch(`http://localhost:8000/api/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        res.clone().json()
        if (res.status === 201) {
          setUser({ email: '', password: '', passwordConf: '' })
          setAccountCreated(!accountCreated)
          alert('Compte créé avec succès ! \n Vous pouvez dès à présent vous connecter.')
          toggleSignupForm()
        }
        if (res.status === 409) {
          alert('Cet email possède déjà un compte');
        }
      })
      .catch(error => console.log(error))

    // console.log(JSON.stringify({ email, password }));
  }


  return (
    <div className={`${showSignupForm && 'active'} Form`}>
      <div className={`${showSignupForm && 'active'} form-container`}>
        <button
          className='closeBtn'
          onClick={toggleSignupForm}
        >
          X
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
                accountCreated={setAccountCreated}
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
