import '../styles/Form.css'

export default function SignupForm({ showSignupForm, toggleSignupForm }) {

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

        <form className='form-bloc'>
          <label htmlFor='email'>Email* : </label>
          <input type='email' id='email' name='email' placeholder='example@email.com' required />

          <label htmlFor='password'>Mot de passe* : </label>
          <input type='password' id='password' name='password' placeholder='Saisissez un mot de passe' required />

          <label htmlFor='passwordConf'>Confirmez* : </label>
          <input type='password' id='passwordConf' name='passwordConf' placeholder='Confirmez votre mot de passe' required />

          <button className='ctaBtn' type='submit'>Valider</button>
        </form>

        <span className='required-field'>* Champs obligatoires</span>
      </div>
    </div>
  )
};
