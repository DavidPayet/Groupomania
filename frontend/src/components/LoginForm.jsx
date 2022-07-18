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

        <form className='form-bloc'>
          <label htmlFor='email'>Email* : </label>
          <input type='email' id='email' name='email' placeholder='example@email.com' required />

          <label htmlFor='password'>Mot de passe* : </label>
          <input type='password' id='password' name='password' placeholder='Saisissez un mot de passe' required />

          <button className='ctaBtn' type='submit'>Valider</button>
        </form>

        <span className='required-field'>* Champs obligatoires</span>
      </div>
    </div>
  )
};
