const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
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
  AdminId: {
    type: Schema.Types.ObjectId,
    ref: 'admin'
  }

}, { timestamps: true, versionKey: false })

module.exports = mongoose.model("user", userSchema)

