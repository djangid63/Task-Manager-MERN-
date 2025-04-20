const express = require('express')
const router = express.Router()
const auth = require('../Middleware/auth')


const taskController = require('../Controllers/taskController')

router.post('/addTask', auth, taskController.addTask)
router.delete('/deleteTask/:id', auth, taskController.deleteTask)
router.get('/getTasks', auth, taskController.getTasks)
router.patch('/updateTasks/:id', auth, taskController.updateTask)
router.get('/myTasks', auth, taskController.getUserTasks)

module.exports = router