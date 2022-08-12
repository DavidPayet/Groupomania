export const signupInputs = [
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
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,50}$`,
    errorMessage: 'Votre mot de passe ne correspond pas.'
  },
]

export const loginInputs = [
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