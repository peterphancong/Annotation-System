const express = require('express')
const userController = require('../Controllers/userController')
const { createAccount, login, valicateUser, verifyToken } = userController
// const userAuth = require('../Middlewares/userAuth')

const router = express.Router()
router.post('/createAccount', valicateUser, createAccount)
router.post('/login', login)
router.post('/verify', verifyToken)

module.exports = router