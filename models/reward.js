const mongoose = require("mongoose")

const rewardschema = mongoose.Schema({
  guildid: String,
  reward: Boolean,
  ticket: Boolean,
})

module.exports = mongoose.model("reward", rewardschema);