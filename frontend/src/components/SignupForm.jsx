import { useState } from 'react'
import '../styles/Form.css'
import FormInputs from './FormInputs'
import { signupInputs } from '../utils/formInputsAttributes'
import axios from 'axios'

export default function SignupForm({ showSignupForm, toggleSignupForm }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
    passwordConf: ''
  })

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    
    const { email, password } = user

    await axios
      .post(`http://localhost:8000/api/auth/signup`, { email, password })
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
            signupInputs.map(input => (
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
