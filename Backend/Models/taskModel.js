const mongoose = require("mongoose")
const Schema = mongoose.Schema

const notesSchema = new Schema({
  title: String,
  content: String,
  category: String,
  color: String,
})

module.exports = mongoose.model("notes", notesSchema)