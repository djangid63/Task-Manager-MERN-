const express = require('express')
const router = express.Router()


const taskController = require('../Controllers/taskController')

router.post('/addTask', taskController.addTask)
router.delete('/deleteTask/:id', taskController.deleteTask)
router.get('/getTasks', taskController.getTasks)

module.exports = router