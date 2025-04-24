const mongoose = require("mongoose")

const Schema = mongoose.Schema

const adminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("admin", adminSchema)