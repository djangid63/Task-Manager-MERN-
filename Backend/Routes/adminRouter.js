const express = require("express")
const router = express.Router()
const adminController = require('../Controllers/adminController')

router.post("/login", adminController.login)
router.get("/count", adminController.count)

module.exports = router