const mongoose = require("mongoose")
const { type } = require("os")
const Schema = mongoose.Schema

const taskSchema = new Schema({
  title: String,
  content: String,
  category: String,
  color: String,

  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("tasks", taskSchema)