const express = require('express')
const router = express.Router()

const userController = require('../Controllers/UserController')

router.post("/signup", userController.SignUpUser)
router.post("/login", userController.login)
router.get("/count", userController.count)
router.get("/getUsers", userController.getUsers)

module.exports = router
