const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express()
const port = 5000;

const taskRouter = require("./Routes/taskRouter")
const userRouter = require("./Routes/userRouter")
const adminRouter = require('./Routes/adminRouter')

app.use(cors())
app.use(express.json())

const mongoURL = 'mongodb://localhost:27017/TaskManagerPro'

mongoose.connect(mongoURL)
  .then(() => console.log("DB connected"))
  .catch(() => console.log("DB connection failed"))

app.use("/user", userRouter)
app.use("/task", taskRouter)
app.use("/admin", adminRouter)

app.listen(port, () => {
  console.log(`It's running on ${port} server`);
})

