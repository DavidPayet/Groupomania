const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/users')
const password = require('../middlewares/password')

router.post('/signup', password, userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router