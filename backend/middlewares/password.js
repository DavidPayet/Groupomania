const passwordValidator = require('password-validator')

const passwordSchema = new passwordValidator()

passwordSchema
  .is().min(5)
  .is().max(50)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().symbols()
  .has().not().spaces()
  .is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = (req, res, next) => {
  passwordSchema.validate(req.body.password) ? next() : res.status(400).json({ error: `Mot de passe trop faible : ${passwordSchema.validate(req.body.password, { list: true })}` })
}