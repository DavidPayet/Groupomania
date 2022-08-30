import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Form.css'
import FormInputs from './FormInputs'
import { loginInputs } from '../utils/formInputsAttributes'
import Auth from '../contexts/Auth'
import { login } from '../services/authApi'
import Modal from './Modal'

export default function LoginForm({ showLoginForm, toggleLoginForm }) {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated } = useContext(Auth)
  const userId = sessionStorage.getItem('userID')
  const modalParams = JSON.parse(sessionStorage.getItem('modalParams'))
  const [visibleModal, setVisibleModal] = useState(false)


  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const response = await login(user)

      response === true && setIsAuthenticated(response)
      response !== true && setVisibleModal(true)

      console.log('RESPONSE TRY', response);

    } catch (error) {
      console.log('ERROR CATCH', error);
    }
  }

  useEffect(() => {
    isAuthenticated && navigate(`/dashboard/${userId}`)
  }, [navigate, isAuthenticated, userId])

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
          onSubmit={handleLogin}
        >

          {
            loginInputs.map(input => (
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
