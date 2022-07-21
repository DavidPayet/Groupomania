import '../styles/Form.css'

export default function LoginForm({ showLoginForm, toggleLoginForm }) {

  return (
    <div className={`${showLoginForm && 'active'} Form`}>
      <div className={`${showLoginForm && 'active'} form-container`}>
        <button
          className='closeBtn'
          onClick={toggleLoginForm}
        >
          X
        </button>

        <h3>Connectez-vous</h3>

        <form className='form-bloc' method='post'>
          <label htmlFor='login-email'>Email* : </label>
          <input
            type='email'
            id='login-email'
            name='login-email'
            placeholder='example@email.com'
            required
          />

          <label htmlFor='login-password'>Mot de passe* : </label>
          <input
            type='password'
            id='login-password'
            name='login-password'
            placeholder='Saisissez un mot de passe'
            autoComplete="off"
            required
          />

          <button className='ctaBtn' type='submit'>Se Connecter</button>
        </form>

        <span className='required-field'>* Champs obligatoires</span>
      </div>
    </div>
  )
};
