const mongoose = require("mongoose")

const invitedschema = mongoose.Schema({
  username: String,
})

module.exports = mongoose.model("invited", invitedschema);