const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require('mongoose');
const data = require("../models/balance");
const sdb = require("../models/system");
const { MessageEmbed, MessageAttachment } = require('discord.js');
const talkedRecently = new Set();




module.exports.run = async (client, message, args, prefix) => {
  let cooldown = 10 * 1000
  
  if (talkedRecently.has(message.author.id)) {
            const cooldownmessage = new MessageEmbed()
    .setColor('#ec1c24')
    .setTitle(`يجب عليك الانتظار لمدة ${Number(cooldown) / 1000} ثواني ، لإعادة استخدام هذا الامر`);
    
            message.channel.send(cooldownmessage)
    .then(async (m)=> {
             setTimeout(() => {
               m.delete()
             }, 3000) 
            })
    } else {
      
      
      
      talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, cooldown);
      
  let system = await sdb.findOne({
    guildid: "1163891586439053324",
  })
  if (!system) return message.channel.send("**يجب عليك تسجيل معلومات الجروب اولا ، تواصل مع اونر السيرفر لحل المشكله**");
  
  
  
   if (!message.channel.name.startsWith("ticket")) return;
  let ticketroom = "1193996628500164648";
  let tranferID = system.owner;
  let price = system.robuxprice
  let pricerobux = Math.floor((price * 20) / 19) + 1;
  let ch = client.channels.cache.get("1194008996038844456");
  
  
  const rr1 = new MessageEmbed()
    .setColor('#ec1c24')
    .setDescription(`**يمكنك استخدام هذا الامر في السيرفر فقط <#${ticketroom}>**`);
  
  if (message.channel.type == "dm")
    return message.channel.send(rr1);
  let price2 = args[1] * pricerobux;
  let priceNow = Math.floor(price2 - price2 * (5 / 100));
    const rr2 = new MessageEmbed()
    .setColor('#ec1c24')
    .setDescription("**ألرجاء كتابة عدد الروبكس المراد شراؤه بعد الأمر\n!buy [عدد الروبكس]**");
  if (!args[1])
    return message.channel.send(rr2);
  
    const rr3 = new MessageEmbed()
    .setColor('#ec1c24')
    .setDescription(`**الرجاء كتابة رقم صحيح بعد الامر\n!buy [عدد الروبكس]**`);
  if (!args[1] || args[1].includes('.') || args[1].includes('-') || args[1].includes('+') || args[1].includes('e') || !Number(Number(args[1])))
    return message.channel.send(rr3);
    const rr4 = new MessageEmbed()
    .setColor('#ec1c24')
    .setDescription(`**لا يمكنك شراء اقل من ${system.limitrobux} روبكس**`);
    if (args[1] < system.limitrobux) 
    return message.channel.send(rr4);
  
  
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
    .send(embed)
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
    balanceuserr.updateOne({balance: Number(balanceuserr.balance) + Number(args[1])})
        .then(result => console.log(result))
        .catch(err => console.log(err))
        balanceuserr.updateOne({buy:false})
      .then(result => console.log(result))
        .catch(err => console.log(err))
      .then(m => {
            const rr5 = new MessageEmbed()
    .setColor('black')
    .setDescription(`**تم تحويل الرصيد بنجاح, رصيد حسابك الحالي هو \`${balanceuserr.balance + Number(args[1])}R\`**`);
      message.channel.send(`<@${message.author.id}>, **سوف يتم حذف التكت خلال 10 ثواني**`,rr5)
          const rr7 = new MessageEmbed()
    .setColor('black')
    .setDescription(`**تم تحويل \`${args[1]}R\` لحسابك\nلمعرفة رصيدك اكتب \n\`!balance\`\nللتحويل لحسابك اكتب امر \n\`!transfer\`\nلمعرفة الأوامر اكتب\n\`!help\`**`);
          
      message.author.send(rr7)

          ch.send(`**تم شراء \`${Number(args[1])}R\` بواسطة <@${message.author.id}>** للشراء توجه الى <#1193996628500164648>}`)
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
    if(balanceuser.buy === false){
      balanceuser.updateOne({buy:true})
      .then(result => console.log(result))
        .catch(err => console.log(err))
    
    message.channel
    .send(embed)
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
    balanceuserrr.updateOne({balance: Number(balanceuserrr.balance) + Number(args[1])})
        .then(result => console.log(result))
        .catch(err => console.log(err))
        balanceuserrr.updateOne({buy:false})
      .then(result => console.log(result))
        .catch(err => console.log(err))
      .then(m => {
            const rr6 = new MessageEmbed()
    .setColor('black')
    .setTitle(`**تم تحويل الرصيد بنجاح, رصيد حسابك الحالي هو \`${balanceuserrr.balance + Number(args[1])}R\`**`);
      message.channel.send(`<@${message.author.id}> , **سوف يتم حذف التكت خلال 10 ثواني**`,rr6)
          
          const rr8 = new MessageEmbed()
    .setColor('black')
    .setTitle(`**تم تحويل \`${args[1]}R\` لحسابك\nلمعرفة رصيدك اكتب \n\`!balance\`\nللتحويل لحسابك اكتب امر \n\`!transfer\`\nلمعرفة الأوامر اكتب\n\`!help\`**`);
          
          message.author.send(rr8)
          ch.send(`**تم شراء \`${Number(args[1])}R\` بواسطة <@${message.author.id}>** للشراء توجه الى <#1193996628500164648>}`)
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
  
  
  
  //if (!message.channel.name.startsWith("ticket")) return;
  /*let ticketroom = "879443452138512384";
  let tranferID = "742546837319319664";
  let price = 1000;
  let pricerobux = Math.floor((price * 20) / 19) + 1;

  if (message.channel.type == "dm")
    return message.channel.send(
      `**يمكنك استخدام هذا الامر في السيرفر فقط <#${ticketroom}>**`
    );
  let price2 = args[1] * pricerobux;
  let priceNow = Math.floor(price2 - price2 * (5 / 100));
  if (!args[1])
    return message.channel.send(
      "**ألرجاء كتابة عدد الروبكس المراد شراؤه بعد الأمر**"
    );
  if (!args[1] || args[1].includes('.') || args[1].includes('-') || args[1].includes('+') || args[1].includes('e') || !Number(Number(args[1])))
    return message.channel.send(
      `**الرجاء كتابة رقم صحيح بعد الامر\nمثال:\n!buy 10**`
    );
  const embed = new MessageEmbed()
    .setColor('black')
    .setTitle('Robux Communtiy')
    .setDescription(`**قم بتحويل ${price2} لـ <@${tranferID}>**\n` + '```' + `#credit ${tranferID} ${price2}` + '```\n**لديك 3 دقائق فقط للتحويل**')
    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
  message.channel
    .send(embed)
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
          time: 60 * 1000 * 3,
          errors: ["time"]
        })
        .then(async memem => {
          if (!memem.first()) return;
        
        let balanceuser = await data.findOne({
  userid: message.author.id
})
        if(!balanceuser){
         message.channel.send(`**تم تحويل الرصيد بنجاح, رصيد حسابك الحالي هو \`${args[1]}R\`**`)  
    const dataaa = new data({
            _id: mongoose.Types.ObjectId(),
            userid: message.author.id,
            balance: Number(args[1]),
        });
        
        dataaa.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
  } else {
    balanceuser.updateOne({balance: Number(balanceuser.balance) + Number(args[1])})
      .then(result => console.log(result))
        .catch(err => console.log(err))
      .then(m => {
      message.channel.send(`**تم تحويل الرصيد بنجاح, رصيد حسابك الحالي هو \`${balanceuser.balance + Number(args[1])}R\`**`)  
    });
  }
          
        })
        .catch(async err => {
          m.channel.send("انتهت مهلة التحويل تم الغاء العملية").then(err => {
            setTimeout(() => {
              err.delete();
              m.delete();
            }, 5000);
          });
        });
    });*/
      
      
  
      
      
      
      
      
      

    }
};

module.exports.config = {
  name: "buyyy",
  aliases: ["شراء"]
};
