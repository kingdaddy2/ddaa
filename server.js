const Discord = require("discord.js");
const client = new Discord.Client();
const { loadCommands } = require("./utils/loadCommands");
const mongoose = require("mongoose");
const http = require("http");
const express = require("express");
const app = express();
const noblox = require('noblox.js')
const canvas = require('canvas')
const { Collection } = require('discord.js')
const ms = require('ms')
const sdb = require("./models/system");
const data = require("./models/balance");
const reward = require("./models/reward")
const invited = require("./models/invitedd")

const { MessageEmbed, MessageAttachment } = require('discord.js');
mongoose.connect("mongodb+srv://scc:scc@cluster0.84bzb5k.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Timeout = new Collection();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://abrasive-sheer-dollar.glitch.me/`); /// حط اسم المشروع تبعك name تعديل مهم بدل
}, 280000);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
loadCommands(client);

client.on("ready", () => {
  console.log("ready");
  client.user.setActivity("!help | Robux Community");
});

client.on('guildMemberAdd', mem=> {
  let ch = mem.guild.channels.cache.get('878414860952698881');
      if (!ch) return;  
      ch.send(`**جيب 1 انفايت لفرصة الفوز بـ 200 روبكس وجوائز أخرى يومية <@!${mem.id}>**`).then((m) => {
    setTimeout(() => {
              m.delete();
            }, 10000);
});
});

client.on("message", async message => {
  if (message.author.bot) return;
  
if(message.channel.id === "878420943855292417") {
  message.react('a:robux_loveall:878427167657189466')
}
  //Getting the data from the model

  const messageArray = message.content.split(/ +/);
  const cmd = messageArray[0].toLocaleLowerCase();
  const args = messageArray.slice(0);

  const prefix = "!"; /// PREFIX
  if (!message.content.startsWith(prefix)) return;
  const commandfile =
    client.commands.get(cmd.slice(prefix.length)) ||
    client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
  if (commandfile) {
        if(commandfile.timeout) {
            if(Timeout.has(`${commandfile.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${commandfile.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
            commandfile.run(client, message, args, prefix)
            Timeout.set(`${commandfile.name}${message.author.id}`, Date.now() + commandfile.timeout)
            setTimeout(() => {
                Timeout.delete(`${commandfile.name}${message.author.id}`)
            }, commandfile.timeout)
        }
    }
});client.on("message", async message => {
  if (message.author.bot) return;
  
if(message.channel.id === "878420943855292417") {
  message.react('a:robux_loveall:878427167657189466')
}
  //Getting the data from the model

  const messageArray = message.content.split(/ +/);
  const cmd = messageArray[0].toLocaleLowerCase();
  const args = messageArray.slice(0);

  const prefix = "!"; /// PREFIX
  if (!message.content.startsWith(prefix)) return;
  const commandfile =
    client.commands.get(cmd.slice(prefix.length)) ||
    client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
  if (commandfile) {
        commandfile.run(client, message, args, prefix)
    }
});


client.on("message", async message => {
  if (message.channel.type == "dm") return;
  if(message.author.bot) return;
  if (!message.channel.name.startsWith("ticket")) return;
  let system = await sdb.findOne({
    guildid: "1163891586439053324",
  })
  if (!system) return message.channel.send("**يجب عليك تسجيل معلومات الجروب اولا ، تواصل مع اونر السيرفر لحل المشكله**");
  if(Number(message.content) > 9999) return;
  /*message.channel.send(`الرجاء كتابه عدد الروبكس المراد شراؤه :
  مثال : 10`)*/
  const rr4 = new MessageEmbed()
    .setColor('#ec1c24')
    .setDescription(`**لا يمكنك شراء اقل من ${system.limitrobux} روبكس**`);
    if (Number(message.content) < system.limitrobux) 
    return message.channel.send(rr4);
  let ticketroom = "1193996628500164648";
  let tranferID = system.owner;
  let price = system.robuxprice
  let pricerobux = Math.floor((price * 20) / 19) + 1;
  let ch = client.channels.cache.get("1194008996038844456");
  let price2 = Number(message.content) * pricerobux;
  let priceNow = Math.floor(price2 - price2 * (5 / 100));
    if(!Number(message.content)) return;
    const embed = new MessageEmbed()
    .setColor('black')
    .setTitle('Robux Communtiy')
    .setDescription(`**قم بتحويل ${price2} لـ <@${tranferID}>**\n` + '```' + `#credit ${tranferID} ${price2}` + '```\n**لديك 5 دقائق فقط للتحويل**')
    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
    let balanceuser = await data.findOne({
      userid: message.author.id
    })
    
      if(!balanceuser) {
        const dataaa = new data({
                _id: mongoose.Types.ObjectId(),
                userid: message.author.id,
                balance: 0,
                buy: true,
            });
            
            dataaa.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
    
      message.channel
        .send(`قم بنسخ الامر بالاسفل وقم بارساله:`)
        message.channel.send(`#credit ${tranferID} ${price2}`)
        .then(async m => {
          const filter = response =>
            response.content.startsWith(
              `**:moneybag: | ${message.author.username}, has transferred `
            ) &&
            response.content.includes(`${tranferID}`) &&
            response.author.id === "282859044593598464" &&
            response.content.includes(priceNow);
          m.channel
            .awaitMessages(filter, {
              max: 1,
              time: 60 * 1000 * 5,
              errors: ["time"]
            })
            .then(async memem => {
              if (!memem.first()) return;
    
                      let balanceuserr = await data.findOne({
      userid: message.author.id
    })
        balanceuserr.updateOne({balance: Number(balanceuserr.balance) + Number(Number(message.content))})
            .then(result => console.log(result))
            .catch(err => console.log(err))
            balanceuserr.updateOne({buy:false})
          .then(result => console.log(result))
            .catch(err => console.log(err))
          .then(m => {
                const rr5 = new MessageEmbed()
        .setColor('black')
        .setDescription(`**تم تحويل الرصيد بنجاح, رصيد حسابك الحالي هو \`${balanceuserr.balance + Number(Number(message.content))}R\`**`);
          message.channel.send(`<@${message.author.id}>, **سوف يتم حذف التكت خلال 10 ثواني**`,rr5)
              const rr7 = new MessageEmbed()
        .setColor('black')
        .setDescription(`**تم تحويل \`${Number(message.content)}R\` لحسابك\nلمعرفة رصيدك اكتب \n\`!balance\`\nللتحويل لحسابك اكتب امر \n\`!transfer\`\nلمعرفة الأوامر اكتب\n\`!help\`**`);
              
          message.author.send(rr7)
    
              ch.send(`**تم شراء \`${Number(Number(message.content))}R\` بواسطة <@${message.author.id}>** للشراء توجه الى <#1193996628500164648>}`)
              var role = message.guild.roles.cache.sort((b,a) => b.position + a.position).find(r => r.id === '1193997990868811847');
                      if (role) message.member.roles.add(role);
              setTimeout(() => {
                message.channel.delete()
              }, 10000)
            });
      }
              
            )
            .catch(async err => {
              m.channel.send("انتهت مهلة التحويل تم الغاء العملية").then(err => {
                setTimeout(() => {
                  err.delete();
                  m.delete();
                }, 5000);
              });
            });
        });
      } else {
        if(balanceuser.buy === false){
          balanceuser.updateOne({buy:true})
          .then(result => console.log(result))
            .catch(err => console.log(err))
        
        
      message.channel
      .send(`قم بنسخ الامر بالاسفل وقم بارساله:`)
      message.channel.send(`#credit ${tranferID} ${price2}`)
        .then(async m => {
          const filter = response =>
            response.content.startsWith(
              `**:moneybag: | ${message.author.username}, has transferred `
            ) &&
            response.content.includes(`${tranferID}`) &&
            response.author.id === "282859044593598464" &&
            response.content.includes(priceNow);
          m.channel
            .awaitMessages(filter, {
              max: 1,
              time: 60 * 1000 * 5,
              errors: ["time"]
            })
            .then(async memem => {
              if (!memem.first()) return;
    
                      let balanceuserrr = await data.findOne({
      userid: message.author.id
    })
        balanceuserrr.updateOne({balance: Number(balanceuserrr.balance) + Number(Number(message.content))})
            .then(result => console.log(result))
            .catch(err => console.log(err))
            balanceuserrr.updateOne({buy:false})
          .then(result => console.log(result))
            .catch(err => console.log(err))
          .then(m => {
                const rr6 = new MessageEmbed()
        .setColor('black')
        .setTitle(`**تم تحويل الرصيد بنجاح, رصيد حسابك الحالي هو \`${balanceuserrr.balance + Number(Number(message.content))}R\`**`);
          message.channel.send(`<@${message.author.id}> , **سوف يتم حذف التكت خلال 10 ثواني**`,rr6)
              
              const rr8 = new MessageEmbed()
        .setColor('black')
        .setTitle(`**تم تحويل \`${Number(message.content)}R\` لحسابك\nلمعرفة رصيدك اكتب \n\`!balance\`\nللتحويل لحسابك اكتب امر \n\`!transfer\`\nلمعرفة الأوامر اكتب\n\`!help\`**`);
              
              message.author.send(rr8)
              ch.send(`**تم شراء \`${Number(Number(message.content))}R\` بواسطة <@${message.author.id}>** للشراء توجه الى <#1193996628500164648>}`)
              var role = message.guild.roles.cache.sort((b,a) => b.position + a.position).find(r => r.id === '1193997990868811847');
                      if (role) message.member.roles.add(role);
              setTimeout(() => {
                message.channel.delete()
              }, 10000)
        });
      }
              
            )
            .catch(async err => {
            balanceuser.updateOne({buy: false})
            .then(result => console.log(result))
            .catch(err => console.log(err))
              m.channel.send("انتهت مهلة التحويل تم الغاء العملية").then(err => {
                setTimeout(() => {
                  err.delete();
                  m.delete();
                }, 5000);
              });
            });
        });
        } else {
          const rr9 = new MessageEmbed()
        .setColor('black')
        .setTitle(`**لديك عملية شراء بالفعل**`)
        .setDescription("**للالغاء قم بكتابة الأمر :\n\`!end\`**");
          return message.channel.send(rr9)
        }
        
      }
  
})

///// بتاع الريوارد

client.on("message", async message => {
  const messageArray = message.content.split(/ +/);
 const cmd = messageArray[0].toLocaleLowerCase();
 const args = messageArray.slice(0);

if(message.channel.id === "1194013528454090853" && message.author.id === "577236734245470228"){
  let ch = client.channels.cache.get("1194682971375009914");
 let rewardroom = client.channels.cache.get("1194682957152133173")
 let rewards = 10
 let log = client.channels.cache.get("1194001992650080376")
 let ticketroom = client.channels.cache.get("1193996628500164648")
 let channelid = "1193996628500164648"
     let messageid = "1194683204410560572"
 
 let mention = true
 let member = message.mentions.members.first(2)[1]
 if(!member) {
let member1 = await message.guild.members.cache.get(args[4])
if(!member1) return message.lineReply("**:rolling_eyes: -  لا يمكنني العثور على الداعي**"); 
   mention = false
member = member1
}  else {
 member =  message.guild.members.cache.get(message.mentions.members.first(2)[1].id)
}
if(member){
mention = true
}
 
 
 let mention2 = true
 let memberinvited = message.mentions.users.first()
 if(!memberinvited) {
let memberinvited1 = await message.guild.members.cache.get(args[0])
if(!memberinvited1) return message.lineReply("**:rolling_eyes: -  لا يمكنني العثور على المدعو**"); 
   mention2 = false
memberinvited = memberinvited1
}  else {
 memberinvited =  message.guild.members.cache.get(message.mentions.users.first().id)
}
if(memberinvited){
mention = true
}

 
if(member.id === "1134352633721786448") return;


 let invitedwad = await invited.findOne({
   username: memberinvited.id
 })
 let opened = await reward.findOne({
   guildid : message.channel.guild.id
 })
  let balanceuser = await data.findOne({
 userid: member.id
})

 if(invitedwad) {
 log.send(`${member} الواد ده عمال يخلي واحد يدخل ويطلع شوف ايه الحكايه`)  
   member.send(`لا تخلي اصحابك يطلعو ويدخلو ، مش هتستلم وهتخلي نفسك تتبند على الفاضي`)

 } else {
 

 
 
   
   
   
   if(!opened){
     const openeddata = new reward({
       guildid: message.channel.guild.id,
       reward: false,
       ticket: false,
     })
     openeddata.save()
       .then(result => console.log(result))
       .catch(err => console.log(err));
     message.lineReply(`لا يوجد داتا في السيرفر`)
   } 
   if(opened.ticket = true){
      
     member.send(`**اتفتحتلك التكت تقدر دلوقتي تشتري من السيرفر
 <#${ticketroom}>`)
ticketroom.send(`${member} تقدر تفتح تكت دلوقتي وتشتري`).then(m=>{
           setTimeout(()=>{
             m.delete()
           } ,20000)
         } )
   }
   if(opened.reward = true){
       if(!balanceuser){
         
         
   const dataaa = new data({
           _id: mongoose.Types.ObjectId(),
           userid: member.id,
           balance: rewards,
     buy: false,
       });
       
       dataaa.save()
       .then(result => console.log(result))
       .catch(err => console.log(err));
         
         
         const invitedmember = new invited({
           _id: mongoose.Types.ObjectId(),
           username: memberinvited.id,
       });
       
       invitedmember.save()
       .then(result => console.log(result))
       .catch(err => console.log(err));
       
    
                   ch.send(`**استلم ${rewards} روبوكس <@${member.id}> هديه للانفايت**`)
         rewardroom.send(`${member} **شكرا انك شاركت في نظام الرياورد ، شارك في القيفاوي اللي فوق ممكن تكسب الف روبكس يا كبير**`).then((m) =>{
setTimeout(()=>{
m.delete()
},5000)
})
var role = message.guild.roles.cache.sort((b,a) => b.position + a.position).find(r => r.id === '1167547303419203685');
                 if (role) member.roles.add(role);
        
           ////////
         const donemsg = new MessageEmbed()
   .setColor('black')
   .setDescription(`**تم تحويل \`${rewards}R\` لحسابك\nلمعرفة رصيدك اكتب \n\`!balance\`\nللتحويل لحسابك اكتب امر \n\`!transfer\`\nلمعرفة الأوامر اكتب\n\`!help\`**`);
         
      
 } else {
   balanceuser.updateOne({balance: Number(balanceuser.balance) + Number(rewards)})
     .then(result => console.log(result))
       .catch(err => console.log(err))
  const invitedmember = new invited({
           _id: mongoose.Types.ObjectId(),
           username: memberinvited.id,
       });
       
       invitedmember.save()
       .then(result => console.log(result))
       .catch(err => console.log(err))
   
     .then(m => {
               ch.send(`**استلم ${rewards} روبوكس <@${member.id}> هديه للانفايت**`)
      rewardroom.send(`${member} **شكرا انك شاركت في نظام الرياورد ، شارك في القيفاوي اللي فوق ممكن تكسب الف روبكس يا كبير**`).then((m) =>{
setTimeout(()=>{
m.delete()
},5000)
})
var role = message.guild.roles.cache.sort((b,a) => b.position + a.position).find(r => r.id === '1167547303419203685');
                 if (role) member.roles.add(role);
       ////////
         const donemsg = new MessageEmbed()
   .setColor('black')
   .setDescription(`**تم تحويل \`${rewards}R\` لحسابك\nلمعرفة رصيدك اكتب \n\`!balance\`\nللتحويل لحسابك اكتب امر \n\`!transfer\`\nلمعرفة الأوامر اكتب\n\`!help\`**`);
         
     
   });
    
 };
}
 }

}
 
 if(message.channel.id === "1159804287602409503" && message.author.id === "1134352633721786448"){
   let channelid = "1162071666088738896"
     let messageid = "1162083357555957892"
     let mention = true
 let member = message.mentions.users.first()
 if(!member) {
let member1 = await message.guild.members.cache.get(args[1])
if(!member1) return console.log(`ticket need to be claimed`)
   mention = false
member = member1
}  else {
 member =  message.guild.members.cache.get(message.mentions.users.first().id)
}
if(member){
mention = true
}
   
   let balanceuser = await data.findOne({
 userid: member.id
})
   
    let ch = client.channels.cache.get("1159833706073174047");
   
   
   
   if(!balanceuser){
         
         
   const dataaa = new data({
           _id: mongoose.Types.ObjectId(),
           userid: member.id,
           balance: 2,
     buy: false,
       });
       
       dataaa.save()
       .then(result => console.log(result))
       .catch(err => console.log(err))
         
                   ch.send(`**استلم ${2} روبوكس <@${member.id}> هديه لاستلام التكت**`)
        
           ////////
         const donemsg = new MessageEmbed()
   .setColor('black')
   .setDescription(`**تم تحويل \`${2}R\` لحسابك\nلمعرفة رصيدك اكتب \n\`!balance\`\nللتحويل لحسابك اكتب امر \n\`!transfer\`\nلمعرفة الأوامر اكتب\n\`!help\`**`);
         
      
 } else {
   balanceuser.updateOne({balance: Number(balanceuser.balance) + Number(2)})
     .then(result => console.log(result))
       .catch(err => console.log(err))
     .then(m => {
               ch.send(`**استلم ${2} روبوكس <@${member.id}> هديه لاستلام التكت**`)

       ////////
         const donemsg = new MessageEmbed()
   .setColor('black')
   .setDescription(`**تم تحويل \`${2}R\` لحسابك\nلمعرفة رصيدك اكتب \n\`!balance\`\nللتحويل لحسابك اكتب امر \n\`!transfer\`\nلمعرفة الأوامر اكتب\n\`!help\`**`);
         
     
   });
    
 };
   message.lineReply(`done ${member}`)
   }

})


/////
client.on('channelCreate', async channel => {
  //if(channel.guild.id === "1074473800571306058") return;
	
    
    setTimeout(()=>{
      channel.send(`كم عدد الروبكس اللذي تريد شراؤه؟
      مثال : 10
      اكتب العدد بس بدون اي اوامر`); 
    },3000)
    
    
  
  
})

client.login("MTE1OTc3Njg0MDY4OTM4NTUwMw.G5UE6F.Rctmx2GN3BcKl8SL9gxqj_7TO2cg0sSWbiQS-o");


