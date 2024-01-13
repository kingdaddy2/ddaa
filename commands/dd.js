module.exports.run = async (client, message, args, prefix, mes) => {
    setTimeout(()=>{
message.channel.delete()
},3000)
};
  module.exports.config = {
  name: "dd",
  aliases: []
};