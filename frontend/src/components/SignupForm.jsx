import { useState } from 'react'
import '../styles/Form.css'
import FormInputs from './FormInputs'
import Modal from './Modal'
import { signupInputs } from '../utils/formInputsAttributes'
import axios from 'axios'

export default function SignupForm({ showSignupForm, toggleSignupForm }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
    passwordConf: ''
  })
  const modalParams = JSON.parse(sessionStorage.getItem('modalParams'))
  const [visibleModal, setVisibleModal] = useState(false)

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSignup = async e => {
    e.preventDefault()

    const { email, password, passwordConf } = user

    if (passwordConf !== password) {
      sessionStorage.setItem('modalParams', JSON.stringify({ id: 'alert401', activeClassName: 'alert', message: "Les mots de passe sont différents." }))
      setVisibleModal(true)
      return
    }

    await axios
      .post(`http://localhost:8000/api/auth/signup`, { email, password })
      .then(res => {
        if (res.status === 201) {
          setUser({ email: '', password: '', passwordConf: '' })
          sessionStorage.setItem('modalParams', JSON.stringify({ id: 'alert201', activeClassName: 'succes', message: "Compte créé avec succès ! \n Vous pouvez dès à présent vous connecter." }))
          toggleSignupForm()
          setVisibleModal(true)
          return
        }
      })
      .catch(error => {
        if (error.response.status === 409) {
          sessionStorage.setItem('modalParams', JSON.stringify({ id: 'alert401', activeClassName: 'alert', message: "Cet email possède déjà un compte." }))
          setVisibleModal(true)
          return
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
          onSubmit={handleSignup}
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

      {
        visibleModal && <Modal
          id={modalParams.id}
          activeClassName={modalParams.activeClassName}
          message={modalParams.message}
          visibleModal={setVisibleModal}
        />
      }
    </div>
  )
}
