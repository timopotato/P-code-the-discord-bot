// do not change these lines of code. This is to allow the bot to remain hosted on glitch.com 24/7.
const http = require('http');
const express = require('express');
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
}); //Glitch stuff
app.listen(process.env.PORT);               // ^
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);          // ^

//Main var's
const Discord = require("discord.js");
const prefix = "=";
const token = process.env.TOKEN;
const bot = new Discord.Client();
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const cheerio = require('cheerio');
const snekfetch = require('snekfetch');
const querystring = require('querystring');
const Cleverbot = require("cleverbot-node");
const clbot = new Cleverbot;

bot.on("ready", () => {
bot.user.setActivity("Do =help, or =contact!", {type: "playing"});
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
}); //When i go online

process.on("unhandledRejection", err => console.error(err.stack || err))

bot.on("guildCreate", guild => {
  bot.channels.get(`412973894912180235`).send(`I have been added to: ${guild.name} (id: ${guild.id})`);
}); //When i get added to a guild

bot.on("guildDelete", guild => {
  bot.channels.get(`412973894912180235`).send(`I have been removed to: ${guild.name} (id: ${guild.id})`);
}); //When i get removed from a guild 

bot.on("message", async msg => {
  if(msg.channel.type === `group`) return;
  if(msg.channel.type === `dm`) return;
  if(msg.content.indexOf(prefix) !==0) return;
  if(msg.author.bot) return;
  
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const ownerID = "310853886191599616";
  const pcode = msg.guild.members.get("419806744907350017")
  const blacklist = ["","","","","","","","",""]
  if(blacklist.includes(msg.author.id)) return msg.channel.send(":warning: You are blacklisted!");
  
  //NOTE calculating uptime 
function format(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return (hours) + ' hours, ' + (minutes) + ' minutes and ' + (seconds) + ' seconds.';
} //Calculating uptime

//Variables 
var uptime = process.uptime();
var n = "\n";
  
//Developer commands
if(cmd === "restart"){
  if(msg.author.id === ownerID) {
  msg.channel.send("Restarting...").then(msg => process.exit(1));
 } else {
 msg.channel.send(":warning: You are not allowed to use this command!")
 }
  }  
if(cmd === "eval"){
     if(msg.author.id === ownerID){
       try {
           var eturn = eval(msg.content.slice(5).trim());
       }
       catch (e) {
           eturn = e;
       }
       msg.channel.send('```'+eturn+'```')
  } else {
 msg.channel.send(":warning: You are not allowed to use this command!")
 }
}  
if(cmd === "say"){
  if(msg.author.id === ownerID) {
    const saymsg = args.join(" ");
      msg.delete().catch(O_o=>{});
        msg.channel.send(saymsg);
 } else {
 msg.channel.send(":warning: You are not allowed to use this command!")
 }
} 
if(cmd === "servers"){
  if(msg.author.id === ownerID){
  const getMemberCount = () => {
  let amount = 0;
  bot.guilds.forEach(c=>amount+=c.memberCount);
  return amount;
}
    const servers = []
        bot.guilds.forEach(g => {
          let servernames = String(g.name).padEnd(20);
          let memberCount2 = String(g.memberCount).padEnd(20);
          servers.push(`${g.id} | ${memberCount2} | ${servernames}`)
        })
                  msg.channel.send('```'+ n +"Server ID:         |Member count:         |Server names:"+ n +servers.join("\n") + n + "-----------------------------------------------------------------------" + n + `A total of ${bot.guilds.size} guilds, ${bot.channels.size} channels and ${getMemberCount()} members` +'```')
 } else {
 msg.channel.send(":warning: You are not allowed to use this command!")
 }  
}  
if(cmd === "leave"){
  if(msg.author.id === ownerID) {
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
        let id = args[0];
          bot.guilds.get(id).leave()
            msg.channel.send(":white_check_mark: Done. Left server!")
 } else {
 msg.channel.send(":warning: You are not allowed to use this command!")
 }
}
if(cmd === "status"){
  if(msg.author.id === ownerID){
  const status = args.join(" ");
  if(!status)
    return msg.channel.send(":warning: You must give me a status to change too!")
  bot.user.setActivity(status, {type: "playing"});
  msg.channel.send(":white_check_mark: Done. Changed status!")
 } else {
 msg.channel.send(":warning: You are not allowed to use this command!")
 }
} 
if(cmd === "sinfo"){
   if(msg.author.id === ownerID){
   if(pcode.hasPermission('EMBED_LINKS')){
     let id = args[0]
     if(!id)
       return msg.channel.send(":warning: You must give me an server ID!");
     let guild = bot.guilds.get(id);
      let roleArr = guild.roles.array().map(r=> r.name);
  const embed = new Discord.RichEmbed()
   .setTitle(`Information about ${guild.name}`)
   .setColor(0x00AE86)
   .setDescription(`ID: ${guild.id}`)
   .setFooter(`P-code`)
   .setThumbnail(guild.iconURL)
   .setTimestamp()
   .addField(`Guild created at:`, `${guild.createdAt}`)
   .addField(`Server region:`, `${guild.region}`, true)
   .addField(`Owner:`, `${guild.owner}`, true)
   .addField("Member count:", `${guild.memberCount}`, true)
   .addField("Verification level:", `${guild.verificationLevel}`, true)
   .addField(`Roles:`,`${roleArr}`)
   msg.channel.send({embed});
} else {
  return msg.channel.send(":warning: I do not have the `EMBED_LINKS`! So I am not able to send the information!")
}
} else {
 msg.channel.send(":warning: You are not allowed to use this command!")
 }
}
if(cmd === "uinfo"){ 
   if(msg.author.id === ownerID){
if(pcode.hasPermission('EMBED_LINKS')){
  let id = args[0]
  if(!id)
    return msg.channel.send(":warning: You must give me an user ID!")
 const member = bot.users.get(id)
 const user = bot.users.get(id)
 const embed = new Discord.RichEmbed()
  .setTitle(`Information about ${user.tag}`)
  .setColor(0x00AE86)
  .setDescription(`ID: ${member.id}`)
  .setFooter(`P-code`)
  .setThumbnail(user.displayAvatarURL)
  .setTimestamp()
  .addField(`Joined discord at:`, `${user.createdAt}`)
  .addField("Status:", `${member.presence.status}`, true)
  msg.channel.send({embed});
} else {
  return msg.channel.send(":warning: I do not have the `EMBED_LINKS` permission! So I am not able to send this information!")
}
} else {
 msg.channel.send(":warning: You are not allowed to use this command!")
 }
}  
if(cmd === "cinvite"){  
if(msg.author.id === ownerID){
const id = args[0]
if(!id)
  return msg.channel.send(":warning: You must give me an server ID")
const guild = bot.guilds.get(id)
const defaultChannel = guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"));
const invite = await defaultChannel.createInvite().catch(error => msg.channel.send(`:warning: I can not create an invite to this server!`));
  msg.channel.send(`${invite}`)
  } else {
 msg.channel.send(":warning: You are not allowed to use this command!")
 }
}  

//Server commands
if(cmd === "verify")  {
    let member = msg.mentions.members.first();
    let role = msg.guild.roles.find("name", "Verified");
    if(msg.guild.id === '268057885487923202') {
    if(msg.member.hasPermission('BAN_MEMBERS')){
        if(!member) {
          return msg.channel.send(":warning: You must mention someone of this server!");
        } else
        if(role == null) {
            msg.channel.send(":warning: There is no role called 'Verified'!")
        } else
      msg.channel.send(`:white_check_mark: Done. added ${role} to ${member}!`)
    }else {
      msg.channel.send(":warning: You do not have the \`BAN_MEMBERS\` permission!")
    }
    member.addRole(role, `verify command has been used by ${msg.author.tag}`)
  } else {
  msg.channel.send(":warning: This command cannot be used in this server!")
}
} //Server: Cacti Fin's Official Server
if(cmd === "failedv") {
  let member = msg.mentions.members.first();
    if(msg.guild.id !== '268057885487923202') return;
    if(msg.member.hasPermission('KICK_MEMBERS')){
        if(!member)
          return msg.channel.send(":warning: You must mention someone of this server!");
      member.send(`Hey there. You failed verification in **${msg.guild.name}**, and were therefore kicked.` + n + `This is a system that requires you to answer three simple questions, so if you would like to try again, come back using this invite.` + n +` https://discord.gg/X7gyDS6`)
      member.kick(`Failed verification command has been used by ${msg.author.tag}`)
      msg.channel.send(`:white_check_mark: Done. Kicked ${member} because they failed verification!`)
    }else {
      msg.channel.send(":warning: You do not have the ``KICK_MEMBERS`` permission!")
    }
} //Server: Cacti Fin's Official Server

//Google command
if(cmd === "google") {
 let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(msg.content)}&safe=active`;
   return snekfetch.get(searchUrl).then((result) => {
      let $ = cheerio.load(result.text);
      let googleData = $('.r').first().find('a').first().attr('href');
      googleData = querystring.parse(googleData.replace('/url?', ''));
     msg.channel.send(`${googleData.q}`)
  }).catch((err) => {
     msg.channel.send(':warning: No results found!');
  });
}  

  //Help command
if(cmd === "help"){
  if(args[0] === "verification"){
    if(msg.guild.id !== '268057885487923202') return;
 if(msg.member.hasPermission('MANAGE_MESSAGES')){
      msg.channel.send('```'+"Verification commands for Cacti Fin's Official Server:"+ n + " " + n + "• verify   - verify a user                                    =verify <mention>" + n + "• failedv  - kick a user because he/she failed verification   =failedv <mention>"+'```')
} else return msg.channel.send(":warning: You are not staff, so you are not allowed to see this")
    } else {
 msg.author.send('```'+"P-code, a multi function discord bot. Developed by Potato#6163" + n + " " + n + "Moderation:" + n + "• kick      - kicks a user from the server.     =kick <mention> <reason> (reason is optional)" + n + "• ban       - bans a user from the server.      =ban <mention> <reason> (reason is optional)" + n + "• addrole   - adds a role to a user.            =addrole <mention> <role> (=addrole everyone <role> for everyone)" + n + "• removole  - removes a role from a user.       =removerole <mention> <role> (=removerole everyone <role> for everyone)" + n + "• setnick   - changes a nicknme of a user.      =setnick <mention> <new name> (leave <new name> blank to reset the nickname)" + n + "• resetnick - resets all nicknames in a server. =setnick" + n + "• hackban   - bans a user using their ID.       =hackban <ID>" + n + "• unban     - unbans a user using their ID.     =unban <ID>" + n + "• clear     - clears messages in the channel    =clear <amount> (max <amount> is 99)" + n + " " + n + "Information:" + n + "• user      - shows info about a user           =info user <mention> (leave <mention> blank for your information" + n + "• bot       - shows info about me               =info bot" + n + "• server    - shows info about the server       =info guild OR =info server" + n + "• channel   - shows info about the channel      =info channel" + n + "• avatar    - shows a user his avatar           =avatar <mention> (leave <mention blank to get your avatar)" + n + "• mbc       - shows the amount of members       =mbc OR =membercount" + n + "• roles     - shows all the roles               =roles" + n + "• perms     - shows all the perms of a user     =perms" +'```') 
 msg.author.send('```'+"Fun:" + n +"• google    - google the world wide web!        =google <the thing you want to google>" + n +"• lenny     - sends a funny face in chat        =lenny" + n + "• meme      - sends a random meme               =meme" + n + "• choose    - chooses between options           =choose <option1>, <option2> etc..." + n + "• dice      - rolls a dice                      =dice" + n + "• 8ball     - answers your yes/no question      =8ball <question> (MUST be a yes no question)" + n + "• rate      - rates your given thing            =rate <thing to rate>" + n + "• roast     - roast a user                      =roast <mention>" + n + "• ben       - ben a user (ben = fake ban)       =ben <mention>"  + n + "• kill      - kill a user                       =kill <mention>" + n + "• slap      - slap a user                       =slap <mention>" + n + "• kiss      - kiss a user                       =kiss <mention>" + n + "• bite      - bite a user                       =bite <mention>" + n + "• hug       - hug a user                        =hug <mention>" + n + "• calc      - use a calculator                  =calc <som>" + n + "• quote     - get a random quote                =quote " + n + " " + n + "Other:" + n + "• ping      - shows the bot response time       =ping" + n + "• uptime    - shows the bot uptime              =uptime" + n + "• invite    - shows the bot invite link         =invite" + n + " " + n + "If you need any other help, do =contact <question> and the developer will react as soon as he can!"     +'```') 
 msg.channel.send(":white_check_mark: Help has been sent to your DMs!")   
  if(msg.author.id === ownerID)
    msg.author.send('```'+"Developer commands:" + n + " " + n + "• restart - restarts the bot                        =restart" + n + "• eval    - eval the shit out of stuff              =eval <shit>" + n + "• say     - talk through the bot                    =say <sentence>" + n + "• servers - shows the servers where the bot is in   =servers" + n + "• leave   - leave a server using ID                 =leave <ID>" + n + "• status  - change the bots status                  =status <status>" + n + "• sinfo   - check server info using ID              =sinfo <ID>" + n + "• uinfo   - check user info using ID                =uinfo <ID>"+'```')
  }
  }  
  
//Moderation commands
if(cmd === "kick"){
  if(pcode.hasPermission('KICK_MEMBERS')){
  if(msg.member.hasPermission('KICK_MEMBERS')|| msg.author.id == ownerID) {
  let member = msg.mentions.members.first();
  if(!member)
    return msg.channel.send(":warning: You must mention someone of this server!");
    if(!member.kickable)
      msg.channel.send(":warning: This user has an higher role than me, so i cannot kick!");
  await member.kick(`kick command has been used by ${msg.author.tag}`);  msg.channel.send(`:white_check_mark: Done. Kicked ${member}!`);  member.send(`You have been kicked from ${msg.guild.name} by ${msg.author}`)
    .catch(error => msg.channel.send(":warning: Something went wrong, try again later!")); return;
  } else {
  msg.channel.send(":warning: You do not have the \`KICK_MEMBERS\` permission!")
  }
  }else {
    msg.channel.send(":warning: I do not have ``KICK_MEMBERS`` permission!")
  }
}       
if(cmd === "ban"){
  if(pcode.hasPermission('BAN_MEMBERS')){
  if(msg.member.hasPermission('BAN_MEMBERS')|| msg.author.id == ownerID) {
  let member = msg.mentions.members.first();
  if(!member)
    return msg.channel.send(":warning: You must mention someone of this server!");
       if(!member.banable)
      msg.channel.send(":warning: This user has an higher role than me, so  cannot ban!")
  let reason = args.slice(1).join(' ');
  await member.ban(`ban command has been used by ${msg.author.tag}`); msg.channel.send(`:white_check_mark: Done. Banned ${member}!`);     member.send(`You have been banned from ${msg.guild.name} by ${msg.author}`)
        .catch(error => msg.channel.send(":warning: Something went wrong, try again later!")); return;
  } else {
  msg.channel.send(":warning: You do not have \`BAN_MEMBERS\` permission!")
  }
  }else {
    msg.channel.send(":warning: I do not have ``BAN_MEMBERS`` permission!")
  }
}  
if(cmd === "addrole"){
  if(args[0] === "everyone") {
      if(pcode.hasPermission("MANAGE_ROLES") || pcode.hasPermission("ADMINISTRATOR")){
      if(msg.member.hasPermission("ADMINISTRATOR") || msg.author.id === msg.guild.ownerID){
  let role = msg.content.slice(18).trim();
  if(!role)
   return msg.channel.send(":warning: You must give a role to add!");
         if(!msg.guild.roles.find("name", role)) 
  return msg.channel.send(":warning: I cannot find this role, did you spell it right?");
msg.guild.members.forEach(m=>m.addRole(msg.guild.roles.find('name', role))); msg.channel.send(`:white_check_mark: Done. added ${role} to everyone!`);
} else {
  msg.channel.send(":warning: You dont have the `ADMINISTRATOR` permission!")
}
   } else {
     msg.channel.send(":warning: I do not have the `MANAGE_ROLES` permission!")
   }
} else {
    if(pcode.hasPermission("MANAGE_ROLES") || pcode.hasPermission("ADMINISTRATOR")){
      if(msg.member.hasPermission("MANAGE_ROLES") || msg.member.hasPermission("ADMINISTRATOR") || msg.author.id === msg.guild.ownerID){
        let roleToAdd = args.slice(1).join(" "); 
        let memb = msg.mentions.members.first(); 
        if(!memb) return msg.channel.send(":warning: You must mention someone of this server!");
        if(!roleToAdd) return msg.channel.send(":warning: You must give a role to add!");
        if(!msg.guild.roles.find("name", roleToAdd)) return msg.channel.send(":warning: I cannot find this role,a did you spell it right?");
        let roleObj = msg.guild.roles.find("name", roleToAdd);
        let authorHighestRole = msg.member.highestRole.position;
        let yzbotHighRole = pcode.highestRole.position;
        let rolePos = roleObj.position;
        if(rolePos >= authorHighestRole && rolePos >= yzbotHighRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That role is higher than my you and me!");
        if(rolePos >= authorHighestRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That role is higher than your role!");
        if(rolePos >= yzbotHighRole) return msg.channel.send(":warning: That role is higher than my role!");
        memb.addRole(roleObj, `addrole command executed by ${msg.author.tag}`).catch(console.error);
        msg.channel.send(`:white_check_mark: Done. Added **${roleToAdd}** to <@${memb.id}>`);
      }else{
        return msg.channel.send(":warning: You do not have the ``MANAGE_ROLES`` permission!");
      }
    }else{
      return msg.channel.send(":warning: I do not have the ``MANAGE_ROLES`` permission!");
    }
  
}
}  
if(cmd === "removerole"){
   if(args[0] === "everyone") {
      if(pcode.hasPermission("MANAGE_ROLES") || pcode.hasPermission("ADMINISTRATOR")){
      if(msg.member.hasPermission("ADMINISTRATOR") || msg.author.id === msg.guild.ownerID){
  let role = msg.content.slice(21).trim();
  if(!role)
   return msg.channel.send(":warning: You must give a role to remove from everyone");
         if(!msg.guild.roles.find("name", role)) 
  return msg.channel.send(":warning: I cannot find this role, did you spell it right?");
msg.guild.members.forEach(m=>m.removeRole(msg.guild.roles.find('name', role))); msg.channel.send(`:white_check_mark: Done. removed ${role} from everyone`);
} else {
  msg.channel.send(":warning: You dont have the `ADMINISTRATOR` permission!")
}
   } else {
     msg.channel.send(":warning: I do not have the `MANAGE_ROLES` permission!")
   }
   } else {
   if(pcode.hasPermission("MANAGE_ROLES") || pcode.hasPermission("ADMINISTRATOR")){
      if(msg.member.hasPermission("MANAGE_ROLES") || msg.member.hasPermission("ADMINISTRATOR") || msg.author.id === msg.guild.ownerID){
        let roleToAdd = args.slice(1).join(" "); 
        let memb = msg.mentions.members.first(); 
        if(!memb) return msg.channel.send(":warning: You must mention someone of this server!");
        if(!roleToAdd) return msg.channel.send(":warning: You must give a role to remove!");
        if(!msg.guild.roles.find("name", roleToAdd)) return msg.channel.send(":warning: I cannot find a role with that name, did you spell it right?");
        let roleObj = msg.guild.roles.find("name", roleToAdd);
        let authorHighestRole = msg.member.highestRole.position;
        let yzbotHighRole = pcode.highestRole.position;
        let rolePos = roleObj.position;
        if(rolePos >= authorHighestRole && rolePos >= yzbotHighRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That role is higher than you and me!");
        if(rolePos >= authorHighestRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That role is higher then your role!");
        if(rolePos >= yzbotHighRole) return msg.channel.send(":warning: That role is higher then my role!");
        memb.removeRole(roleObj, `removerole command executed by ${msg.author.tag}`).catch(console.error);
        msg.channel.send(`:white_check_mark: Done. Removed **${roleToAdd}** from <@${memb.id}>.`);
      }else{
        return msg.channel.send(":warning: You do not have the ``MANAGE_ROLES`` permission!");
      }
    }else{
      return msg.channel.send(":warning: I do not have the ``MANAGE_ROLES`` permission!");
    }
   }
}  
if(cmd === "setnick"){
    if(pcode.hasPermission("MANAGE_NICKNAMES") || pcode.hasPermission("ADMINISTRATOR")){
      if(msg.member.hasPermission("MANAGE_NICKNAMES") || msg.member.hasPermission("ADMINISTRATOR") || msg.author.id === msg.guild.ownerID){
        let memb = msg.mentions.members.first();
        if(!memb) return msg.channel.send(":warning: You must mention someone of this server!");
        let authorHighestRole = msg.member.highestRole.position;
        let pcodeHighRole = pcode.highestRole.position;
        let membHighestRole = memb.highestRole.position;
        if(membHighestRole >= authorHighestRole && membHighestRole >= pcodeHighRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That user has a role role than you and me!");
        if(membHighestRole >= authorHighestRole && msg.author.id !== msg.guild.ownerID) return msg.channel.send(":warning: That user has a higher role than you!");
        if(membHighestRole >= pcodeHighRole) return msg.channel.send(":warning: That user has a higher role than!"); 
        if(memb.id === msg.guild.ownerID) return msg.channel.send(`:warning: I cannot change the nickname of the server owner!`);
        let inputtedNick = args.slice(1).join(" ");
        if(!inputtedNick) return msg.channel.send(":warning: Please provide a nickname to set!");
        if(inputtedNick.length > 32) return msg.channel.send(`:warning: you must enter a nickname that is less than 32 characters long! (${inputtedNick.length} characters were entered)!`);
        memb.setNickname(inputtedNick, `setnick command has been used by ${msg.author.tag}`);
        msg.channel.send(`:white_check_mark: Done. Changed nickname to ${inputtedNick}`);
      }else{
        return msg.channel.send(`:warning: ${msg.author} you do not have the ``MANAGE_NICKNAMES`` permission!`);
      }
    }else{
      return msg.channel.send(":warning: I do not have the ``MANAGE_NICKNAMES`` permission!");
    }
}
if(cmd === "resetnick"){
  if(pcode.hasPermission('MANAGE_NICKNAMES')){
 if (msg.member.hasPermission('ADMINISTRATOR')|| msg.author.id == ownerID) {
 msg.guild.members.map(m=>{m.setNickname('');})
 msg.channel.send(':white_check_mark: Done. Reseted all nicknames in this server!')
 }else {
  msg.channel.send(`:warning: You are not an admin!`)
 }
} else {
  msg.channel.send(":warning: I do not have ``MANAGE_NICKNAMES`` permission!")
}
}  
if(cmd === "hackban"){
  if(pcode.hasPermission('BAN_MEMBERS')){
    if (msg.member.hasPermission('BAN_MEMBERS')|| msg.author.id == ownerID){
  let id = args[0]
  if(!id)
    return msg.channel.send(":warning: you must provide an id to ban!")
      if(id === msg.author.id);
      return msg.channel.send(":warning: Why do you want to hackban yourself?")
      let member = `<@${id}>`
  msg.guild.ban(id, `hackban command has been used by ${msg.author.tag}`)
      msg.channel.send(`:white_check_mark: Done. hackbaned ${member} succesfully!`)
  } else {
  msg.channel.send(":warning: You do not have the \`BAN_MEMBERS\` permission!")
  } 
    } else {
  msg.channel.send(":warning: do not have the \`BAN_MEMBERS\` permission!")
  } 
  }   
if(cmd === "unban"){
  if(pcode.hasPermission('BAN_MEMBERS')){
 if (msg.member.hasPermission('BAN_MEMBERS')|| msg.author.id == ownerID){
 let id = args[0];
   if(!id)
     return msg.channel.send(":warning: You must give an id to unban!")
  msg.guild.fetchBans().then(bans => {
   var person = bans.find('id',id).id;
    msg.guild.unban(person, `unban command has been used by ${msg.author.tag}`);
     msg.channel.send(`:white_check_mark: Done. unbanned <@${id}>!`)
 });
} else {
 msg.channel.send(`:warning: ${msg.author} you do not have \`BAN_MEMBERS\` permission!`)
  }
  } else {
  msg.channel.send(`:warning: ${msg.author} I do not have \`BAN_MEMBERS\` permission!`)
  } 
  }   
if(cmd === "clear"){
if(pcode.hasPermission("MANAGE_MESSAGES") || pcode.hasPermission("ADMINISTRATOR")){
      if(msg.member.hasPermission("MANAGE_MESSAGES") || msg.author.id == ownerID){
        let amount = args[0]; // The first argument is the expected amount of messages to delete.
        if(!amount) return msg.channel.send("please provide a valid number of messages to delete!");
        //if(amount.length > 2) return msg.channel.send("you may only enter two characters as the amount of messages to delete, a number between 1 and 99!");
        if(isNaN(amount)) return msg.channel.send(":warning: the entered value is not a number!"); // Is the amount specified, not a number? Test with isNaN()!
        let amountInteger = parseInt(amount); // Parse it as an integer so we can add one to it.
        if(amountInteger < 1 || amountInteger > 1001) return msg.channel.send(":warning: Please provide a number between 1 and 100!");
        msg.channel.fetchMessages({ limit: amountInteger+1 }).then(m=>msg.channel.bulkDelete(m)); // Fetch the number of messages specified, then delete that amount of messages from the channel.
        const rep = msg.channel.send(`:white_check_mark: Done. Cleared **${amount}** messages!`) // Tell the user that they successfully deleted the wanted messages.
        .then((themsg) => {
          const del = () => themsg.delete(); // function to delete the message
          setTimeout(del, 2100); // delete in 3 seconds
        });
      }else{
        return msg.channel.send(":warning: You do not have the ``MANAGE_MESSAGES`` permission!");
      }
    }else{
      return msg.channel.send(":warning: I do not have the ``MANAGE_MESSAGES`` permission!");
    }  
}

//Information commands 
if(cmd === "info"){
 if(args[0] === undefined){
  msg.channel.send("```Info commands:  (=info <command>)" + n + " " + n + "• user    - gives info about the user" + n +  "• bot     - gives info about me" + n +  "• guild   - gives info about the guild" + n + "• channel - gives info about the channel" + n + "• role    - gives info about a role```")}
 if(args[0] === "user"){
  if(pcode.hasPermission('EMBED_LINKS')){
 const member = msg.mentions.members.first();
 const user = msg.mentions.users.first();
    if(!member)
      msg.channel.send(":warning: You must mention someone of this server!")
     let roleArr = member.roles.array().map(r=> `${ r.name }` );
       let finalRoles = roleArr.join(", ");
 const embed = new Discord.RichEmbed()
  .setTitle(`Information about ${user.tag}`)
  .setColor(0x00AE86)
  .setDescription(`Joined Discord on ${user.createdAt}`)
  .setFooter(`User ID: ${member.id}`)
  .setThumbnail(user.displayAvatarURL)
  .setTimestamp()
  .addField(`Joined server at:`, `${member.joinedAt}`)
  .addField(`Nickname:`, `${member.nickname}`, true)
  .addField("Status:", `${member.presence.status}`, true)
  .addField(`Roles:`, `${finalRoles}`)
  msg.channel.send({embed});
} else {
  return msg.channel.send(":warning: I do not have ``EMBED_LINKS`` permission! So i cannot send this infomation.")
}
}
 if(args[0] === "bot"){
   if(pcode.hasPermission('EMBED_LINKS')){
  const embed = new Discord.RichEmbed()
   .setTitle(`Information about P-code`)
   .setDescription(`A multi function discord bot by discord user Potato#6163`)
   .setColor(0x00AE86)
   .setFooter(`P-code`)
   .setTimestamp()
   .addField(`When was P-code created?`, `P-code was created at: 21-01-2018.`)
   .addField(`Who is the developer?`, `P-code is created by discord user: Potato#3265.`)
   .addField(`Why was i created?`, `I wanted to make a bot that could help Discord users to improve their server(s)!`)
   .addField(`Servers:`, `${bot.guilds.size}`)
   .addField(`Ping:`, `${Math.round(bot.ping)}ms`, true)
   .addField(`Uptime:`, format(uptime), true)
   msg.channel.send({embed});
} else {
  return msg.channel.send(":warning: I do not have ``EMBED_LINKS`` permission! So i cannot send this information!")
}
}
 if(args[0] === "guild" || args[0] === "server") {
   if(msg.guild.id === "396799859900022784")
     return msg.channel.send(":warning: Yzfire has disabled this command!")
   if(pcode.hasPermission('EMBED_LINKS')){
  let roleArr = msg.guild.roles.array().map(r=>r.name);
  const defaultChannel = msg.guild.channels.find(c=> c.permissionsFor(msg.guild.me).has("SEND_MESSAGES"));
  const embed = new Discord.RichEmbed()
   .setTitle(`Information about ${msg.guild.name}`)
   .setColor(0x00AE86)
   .setDescription(`Created at ${msg.guild.createdAt}`)
   .setFooter(`Server ID: ${msg.guild.id}`)
   .setThumbnail(msg.guild.iconURL)
   .setTimestamp()
   .addField(`Server region:`, `${msg.guild.region}`, true)
   .addField(`Owner:`, `${msg.guild.owner}`, true)
   .addField("Member count:", `${msg.guild.memberCount}`, true)
   .addField("Verification level:", `${msg.guild.verificationLevel}`, true)
   .addField(`Roles:`,`${roleArr.length} `,true )
   .addField(`Default channel:`, `${defaultChannel}`, true )
   msg.channel.send({embed});
} else {
  return msg.channel.send(":warning: I do not have ``EMBED_LINKS`` permission! So i cannot send this information!")
}
}
 if(args[0] === "channel"){
   if(pcode.hasPermission('EMBED_LINKS')){
 const embed = new Discord.RichEmbed()
 .setTitle(`Information about ${msg.channel.name}`)
 .setColor(0x00AE86)
 .setDescription(`ID: ${msg.channel.id}`)
 .setFooter(`P-code`)
 .setThumbnail(msg.guild.iconURL)
 .setTimestamp()
 .addField(`Channel created at:`, `${msg.channel.createdAt}`)
 msg.channel.send({embed});
} else {
  return msg.channel.send(":warning: I do not have ``EMBED_LINKS`` permission! So i cannot send this information!")
}
}
 if(args[0] === "role"){
   let wantedRole = args.slice(1).join(" "); // The word role is actually args[0] so we have to slice from 1 and join them all up (e.g. ["role", "Bot", "Developer"]) - in that case we'd want to join bot and developer together with a space. 
   if(!msg.guild.roles.find("name", wantedRole)) return msg.channel.send(":warning: I cannot find a role with that name! (Did you type the name right? It is case-sensitive)!");
    let roleObj = msg.guild.roles.find("name", wantedRole);
    let onsidebar;
    let isrolementionable;
    if(roleObj.hoist == "true"){
       onsidebar = "Yes";
    }
    else{
      onsidebar = "No";
    }

    if(roleObj.mentionable){
      isrolementionable = "Yes";
    }else{
      isrolementionable = "No";
    }

    const getRoleMembers = () => {
      if(roleObj.members.size < 50){
        let membArr = roleObj.members.array().map(m=>m.id);
        let mentionArr = membArr.map(memb=>`<@${memb}>`)
        let finalMentions = mentionArr.join(", ");
        return finalMentions;
      }else{
        return roleObj.members.size;
      }
    }
    if(pcode.hasPermission("EMBED_LINKS") || pcode.hasPermission("ADMINISTRATOR")){
      const embed = new Discord.RichEmbed()
        .setTitle(`Information about: ${wantedRole}`)
        .setColor(`${roleObj.hexColor}`)
        .addField("ID:", `${roleObj.id}`)
        .addField("Role created at:", `${roleObj.createdAt}`)
        .addField("Permission Number:", `${roleObj.permissions}`, true )
        .addField("Position:", `${parseInt(roleObj.position)+1}`, true )
        .addField("Colour:", `${roleObj.hexColor}`)
        .addField("Displayed seperately:", `${onsidebar}`, true )
        .addField("Mentionable:", `${isrolementionable}`, true)
        .addField("Members:", `${getRoleMembers()}`)
        .setTimestamp()
        msg.channel.send({embed});
    } else {
      msg.channel.send(":warning: I do not have ``EMBED_LINKS`` permission! So i cannot send this information!")
    }}}  
if(cmd === 'avatar'){
   if(pcode.hasPermission('EMBED_LINKS')){
 let user = msg.mentions.users.first() || msg.author;
 const embed = new Discord.RichEmbed()
      .setTitle(`Avatar of ${user.tag}`)
      .setImage(user.displayAvatarURL)
      .setColor(654321)
      .setFooter(`P-code`)
      msg.channel.send(embed)
} else {
  return msg.reply(":warning: I don't have ``EMBED_LINKS`` permission! So i cannot send this avatar.")
}
}
if(cmd === "membercount" || cmd === "mbc"){
  msg.channel.send(`This server has ${msg.guild.memberCount} members!`)
}
if(cmd === "roles"){
     if(msg.guild.id === "396799859900022784")
     return msg.channel.send(":warning: Yzfire has disabled this command!")
   let roleArr = msg.guild.roles.array().map(r=>r.name);
   let finalRoles = roleArr.join(", ");
  msg.author.send('```'+`Roles in ${msg.guild.name}: `+ n + " " + n +`${finalRoles}`+'```')
  msg.channel.send(":white_check_mark: Done. All roles have been send to your DMs!")
}
if(cmd === "channels"){
   if(msg.guild.id === "396799859900022784")
     return msg.channel.send(":warning: Yzfire has disabled this command!")
  let channelArray = msg.guild.channels.array().filter(c=>c.type === "text").map(c=>"#" + c.name);
let finalChannels = channelArray.join(", ")
msg.author.send('```'+`Channels in ${msg.guild.name}:` + n + " " + n + `${finalChannels}` +'```')
  msg.channel.send(":white_check_mark: Done. All channels have been send to your DMs!")
}
if(cmd === "perms"){
let member = msg.mentions.users.first() || msg.author.tag;
let perms = msg.member.permissions;
let has_create_invite = msg.member.hasPermission("CREATE_INSTANT_INVITE");
let has_kick = msg.member.hasPermission("KICK_MEMBERS");
let has_ban = msg.member.hasPermission("BAN_MEMBERS");
let has_admin = msg.member.hasPermission("ADMINISTRATOR");
let has_manage_channels = msg.member.hasPermission("MANAGE_CHANNELS");
let has_manage_guild = msg.member.hasPermission("MANAGE_GUILD"); 
let has_add_reactions = msg.member.hasPermission("ADD_REACTIONS"); 
let has_read_messages = msg.member.hasPermission("READ_MESSAGES");
let has_send_messages = msg.member.hasPermission("SEND_MESSAGES");
let has_send_TTS_messages = msg.member.hasPermission("SEND_TTS_MESSAGES");
let has_manage_messages = msg.member.hasPermission("MANAGE_MESSAGES");
let has_embed_links = msg.member.hasPermission("EMBED_LINKS");
let has_attach_files = msg.member.hasPermission("ATTACH_FILES");
let has_read_message_history = msg.member.hasPermission("READ_MESSAGE_HISTORY");
let has_mention_everyone = msg.member.hasPermission("MENTION_EVERYONE");
let has_external_emotes = msg.member.hasPermission("EXTERNAL_EMOJIS");
let has_connect = msg.member.hasPermission("CONNECT");
let has_speak = msg.member.hasPermission("SPEAK");
let has_mute_members = msg.member.hasPermission("MUTE_MEMBERS");
let has_deafen_members = msg.member.hasPermission("DEAFEN_MEMBERS");
let has_move_members = msg.member.hasPermission("MOVE_MEMBERS");
let has_change_nickname = msg.member.hasPermission("CHANGE_NICKNAME");
let has_manage_nicknames = msg.member.hasPermission("MANAGE_NICKNAMES");
let has_manage_roles = msg.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");
let has_manage_webhooks = msg.member.hasPermission("MANAGE_WEBHOOKS");
let has_manage_emojis = msg.member.hasPermission("MANAGE_EMOJIS");
  if(has_admin) {
    msg.channel.send("You have administrator perm")
  } else {
  msg.channel.send('```'+`Perms for ${member}` + n + " " + n +`• Create invite: ${has_create_invite}` + n + `• Kick members: ${has_kick}` + n + `• Ban members: ${has_ban}` + n + `• Manage server: ${has_manage_guild}`+ n + `• Add reactions: ${has_add_reactions}`+ n + `• Read messages: ${has_read_messages}`+ n + `• Send messages: ${has_send_messages}`+ n + `• Send TTS messages: ${has_send_TTS_messages}`+ n + `• Manage messages: ${has_manage_messages}`+ n + `• Embed links: ${has_embed_links}`+ n + `• Attach files: ${has_attach_files}`+ n + `• Read message history: ${has_read_message_history}`+ n + `• Mention everyone: ${has_mention_everyone}`+ n + `• External emotes: ${has_external_emotes}`+ n + `• Connect: ${has_connect}`+ n + `• Speak: ${has_speak}`+ n + `• Mute members: ${has_mute_members}`+ n + `• Deafen members: ${has_deafen_members}`+ n + `• Move members: ${has_move_members}`+ n + `• Change nickname: ${has_change_nickname}`+ n + `• Manage_nicknames: ${has_manage_nicknames}`+ n + `• Manage_roles: ${has_manage_roles}`+ n + `• Manage webhooks: ${has_manage_webhooks}`+ n + `• Manage emoji's: ${has_manage_emojis}`+'```')
}
}  
  
//Fun commands  
if(cmd === "lenny"){
 var myArray = ['(づ◔ ͜ʖ◔)づ', '(⌐■_■)', '¯\_ツ_/¯','☞   ͜ʖ  ☞','ᕙ(ꖘヮꖘ)ᕗ','ʢ◉ᴥ◉ʡ','( ͡°Ĺ̯ ͡°)','☞☉﹏☉☞','(╯°□°）╯︵ ┻━┻','┬─┬ ノ( ゜-゜ノ)',];
   var rand = myArray[Math.floor(Math.random() * myArray.length)];
   msg.channel.send(rand)
}
if(cmd === "meme"){
 var myArray = ['https://i.ytimg.com/vi/d3vT7MAP5JE/hqdefault.jpg', 'http://i0.kym-cdn.com/photos/images/facebook/001/217/729/f9a.jpg', 'https://absurdintellectual.com/wp-content/uploads/2017/02/maxresdefault1.jpg', `https://www.antagonist.nl/blog/wp-content/uploads/2014/01/meme_bad_luck_wouter.jpg`, `https://www.allaboutphones.nl/wp-content/uploads/2017/08/meme.jpg`, `https://assets.vogue.com/photos/5891c91ece34fb453af7d263/master/pass/06-kendrick-llama-memes.jpg`, `https://lh3.googleusercontent.com/YN836O3aUA0_6SBU76kIyd7RT_qyg9K1ol__lll6AXOh1XIhx3akXeRbtT7qpB4g6Y0=h900`, `http://memesbams.com/wp-content/uploads/2017/09/really-most-offensive-racist-memes.jpg`, `http://s2.quickmeme.com/img/53/5331d4d700b397f643dd3d30bcd6f9276f0354f37fa3e45989bc8b8067a59a83.jpg`,];
   var rand = myArray[Math.floor(Math.random() * myArray.length)];
   msg.channel.send(rand)
}
if(cmd === "choose"){
    let theirOptions = args.join(" ").split(",");
    if(!theirOptions || theirOptions.length < 2) return msg.channel.send(":warning: You must give atleast 2 options to choose from!");
    let optionsList = theirOptions.map(opt => opt.trim());
    if(optionsList.includes("@everyone") || optionsList.includes("@here")) return msg.channel.send(":warning: You cannot use those mentions for the choose command!");
    const m = msg.channel.send(`${theirOptions[Math.floor(Math.random() * theirOptions.length)]}`)
    }  
if(cmd === "dice"){
  var randnumber = Math.floor(Math.random()*6) + 1;
  msg.channel.send("You rolled number: " + randnumber);
}
if(cmd === "8ball"){
   if(pcode.hasPermission('EMBED_LINKS')){
 const question = args.join(" ");
   if(question == null) {
     msg.channel.send(":warning: You must ask me something!")
  } else {
 var myArray = ["Yes", "No", "Probably", "I don't think so", "Most likely", "I don't know", "Most likely not", "Probably not", "Definitely",];
   var rand = myArray[Math.floor(Math.random() * myArray.length)];
     msg.channel.send({embed: {
         color: 123456,
         fields: [{
             name: "Question:",
             value: `:grey_question: ${question}`
           },
           {
             name: "Answer",
             value: `:8ball: ${rand}`
           }
         ],
         footer: {
         }
             }
         });
   }
} else {
  return msg.reply(":warning: I do not have the `EMBED_LINKS` permission so i cannot answer your question!")
}
}  
if(cmd === "rate"){
  const rateObj = args.join(" ");
  if(!rateObj)
    return msg.channel.send(":warning: You must give me something or someone to rate!")
 var myArray = ['1','2','4','5','6','7','8','9','10'];
   var rand = myArray[Math.floor(Math.random() * myArray.length)];
  msg.channel.send(`I rate **${rateObj}** at ${rand} out of 10!`)
}
if(cmd === "roast"){
  let TBR = msg.mentions.members.first();
  if(!TBR)
    return msg.reply(":warning: You must mention someone to roast!");
  var myArray = [`Don't feel bad, a lot of people have no talent.`,'As an outsider, what do you think of the human race?','I would like to kick you in the teeth, but why should I improve your looks?','At least there is one thing good about your body. It is not as ugly as your face!','Did your parents ever ask you to run away from home?','If I had a face like yours. I would sue my parents!','Keep talking, someday you will say something intelligent!','Fellows like you do not grow from trees; they swing from them.','You are a man of the world and you know what sad shape the world is in.'];
  var rand = myArray[Math.floor(Math.random() * myArray.length)];
  msg.channel.send(`${TBR} ${rand}`)
}
if(cmd === "ben"){
  const ben = msg.mentions.members.first() || msg.member;
  if(!ben)
    return msg.channel.send(":warning: You must give me someone to ben!")
  msg.channel.send(`:white_check_mark: Done. **${ben}** has been benned succesfully!`)
} 
if(cmd === "kill"){
  let killer = msg.author;
  let killedHuman = msg.mentions.members.first();
  if(!killedHuman)
  return msg.channel.send(":warning: You must mention someone to kill!")
  if(killer.id === killedHuman.id)
    return msg.channel.send("Why do you want to kill yourself?")
 var myArray = [`${killer} Suffocated ${killedHuman} using a plastic bag!`,`${killer} mummified ${killedHuman} alive!`,`${killer} Gouged ${killedHuman} their eyes out!`,`${killer} burried ${killedHuman} alive!`,`${killer} burned ${killedHuman} alive!`,`${killer} starved ${killedHuman} to death!`,`${killer} Electrocuted ${killedHuman}!`];
   var rand = myArray[Math.floor(Math.random() * myArray.length)];
  msg.channel.send(rand)
}
if(cmd === "slap"){
 let killer = msg.author;
 let killedHuman = msg.mentions.members.first();
 if(!killedHuman)
 return msg.channel.sed(":warning: You must mention someone to slap!")
   if(killer.id === killedHuman.id)
    return msg.channel.send("Why do you want to slap yourself?")
 msg.channel.send(`${killer} slapped ${killedHuman}!`)
}  
if(cmd === "kiss"){
  let killer = msg.author;
  let killedHuman = msg.mentions.members.first();
  if(!killedHuman)
  return msg.channel.send(":warning: You must mention someone to kiss!")
   if(killer.id === killedHuman.id)
    return msg.reply("Awww, are you lonely?")
  msg.channel.send(`${killer} kissed ${killedHuman}!`)
}  
if(cmd === "calc"){
  let amount = args[0]
  let functiona = args[0]
  let amount2 = args[2]
  if(!amount)
    return msg.channel.send(":warning: You need to give atleast 2 numbers and a function, like `+` or `-`!")
    if(!functiona)
    return msg.channel.send(":warning: You need to give a function, like `+`,`:` or `-`!")
  if(!amount2)
    return msg.channel.send(":warning: You need to give atleast 2 numbers!")
     if(isNaN(amount)) return msg.channel.send(":warning: You need to use numbers with a caclculator")
       try {
           var eturn = eval(msg.content.slice(5).trim());
       }
       catch (e) {
           eturn = e;
       }
       msg.channel.send({
           embed: {
               fields: [
                   {
                       name: 'Input',
                       value: '```'+msg.content.slice(5).trim()+'```'
                   },
                   {
                       name: 'Output',
                       value: '```'+eturn+'```'
                   }
               ]
           }
       });
  }
if(cmd === "quote") {
   var myArray = [`"I'll f*ck this server" - Yzfire`,`"I don't think he likes my balls" - RAGE`,`"I want to hammer my dad" - Null`,`"Let's f*ck you in the donkey" - Potato`,`"Dude, why does it suck" - Potato`,`"Take my long succ" - Yzfire`,`"F*ck myjyboafhdgd" - Drunk Yzfire`,`"You have to suck and blow your way to the top" - Chomperman`,`"I love booze, booze loves me, holy shit i have to pee, i'm so drunk i'm falling to the floor, alcoholic dinosaur." - Barne-Chomperman`,`"Quil, you better f*cking quote this." -Kvothe`,`"Let's rape you up" -NoobNoob`,`"How to insert my long thing into a hole" -yzfire`,`"F*ck you and your intellectual superiority. I stand by my wrongdoing." -Void`,`"‎I'm not gonna trudge in the door with a bikini like: "YO MY PEEPS." " -Void`,`“That cute face will look even better once I rape you...” - Litwick`,`"I want to do it. How long should it be" - yzfire "10m?" - Nightcat`,`"Extend me daddy" - Yzfire`,`"How to insert my long thing into a hole" - Yzfire`,`Potato: "I work at McDonalds" N0S3C: "Yeah as food"`,`“Ah yes, touch it real hard” - Litwick`,`"BAN BAN I LIKE HAM" - Potato`,`"Am I grabbing it good?" - unknown`,`“Molestation in progress...” - Litwick`,`"Why do you have to make it hard ;-;" - Tahs0`,`"Jupiter is secretly one of my nipples." - Corrupt X`,`"I am pergenat." - MWR`,`"I FEEL RIGHT" - MWR`,`"MANGI LA MIA PIZZA TU PICCOLO FAGOT" - MWR`,`"I am going to rape my charger." - MWR`,`"French fries in progress" -N0S3C`,`"I have no crush, because I crushed them." - Corrupt X`,`"I have 8 years on an ass." - Corrupt X`,`"OPEN IT" -Jewel`];
   var rand = myArray[Math.floor(Math.random() * myArray.length)];
  msg.channel.send(rand)
}
if(cmd === "bite"){
  let killer = msg.author;
  let killedHuman = msg.mentions.members.first();
  if(!killedHuman)
    return msg.channel.send(":warning: You must mention someone to bite!")
   if(killer.id === killedHuman.id)
    return msg.chanel.send("Why do you want to bite yourself?")
  msg.channel.send(`${killer} bit ${killedHuman}!`)
}   
if(cmd === "hug"){
  let killer = msg.author;
  let killedHuman = msg.mentions.members.first();
  if(!killedHuman)
  return msg.channel.send(":warning: You must give me someone to hug!")
   if(killer.id === killedHuman.id)
    return msg.channel.send("Awww, are you lonely?")
  msg.channel.send(`${killer} hugged ${killedHuman}!`)
} 
  
  //Contact and response
if(cmd === "contact"){
  const mcontent = args.join(" ");
  if(!mcontent) {
  return msg.reply(`You need to ask a questions or send ideas.`)
 }else {
  bot.channels.get(`418430304437534730`).send(`**${msg.author.tag}** at **#${msg.channel.name}** of server "**${msg.guild.name}**" says:` + n + n + `${mcontent}` + n + n + `(IDs: User: ${msg.author.id}; Channel: ${msg.channel.id}; Server: ${msg.guild.id})`)
    
  msg.channel.send(`${msg.author} you have contacted succesfully!`)
 } 
}
if(cmd === "c"){
  if(args[0] === undefined){
    msg.channel.send('```'+"Contact commands:"+ n + " " + n + "• response   - response to contact         =c response <channel ID> <response>" + n + "• blacklist  - blacklist a user or server  =c blacklist <user/server> <ID>"+'```')}
  if(args[0] === "response"){ if(msg.channel.id !== "418430304437534730") return;
  let channel = args[1];
  let answer = args.slice(2).join(' ');
  if(!channel)
    return msg.reply("You need to give me a valid channel ID to send to!")
  if(!answer)
    return msg.reply("You need to give an answer to the question!")
  bot.channels.get(`${channel}`).send(`${answer} / Answered by ${msg.author.tag}`);
  msg.channel.send(`${msg.author} replied!`)
} 
  if(args[0] === "blacklist"){ if(msg.channel.id !== "418430304437534730") return;
   if(args[1] === undefined){
     msg.channel.send("You can blacklist a server or a user, do `=c blacklist user <id>` for a user and `=c blacklist server <id>`")
   }
   if(args[1] === "user"){
     let id = args[2]
     if(!id)
     return msg.reply("You must give an user ID to blacklist!")
     let user = bot.users.get(id);
     bot.channels.get('427505818863140866').send(`Requested to add ${user} to the blacklist (a user)`)
         msg.channel.send(`Done. Requested that ${user} needs to be blacklisted!`)
   }
   if(args[1] === "server"){
      let id = args[2]
     if(!id)
     return msg.reply("You must give an server ID to blacklist!")
     let server = bot.servers.get(id);
     bot.channels.get('427505818863140866').send(`Requested to add ${server} to the blacklist (a server)`)
     msg.channel.send(`Done. Requested that ${server} needs to be blacklisted!`)
   }}}
   
  //Other commands
if(cmd === "ping"){
  const m = await msg.channel.send("Calculating the ping...");
    m.edit(`The ping is: ${m.createdTimestamp - msg.createdTimestamp}ms`);
}
if(cmd === "uptime"){
  msg.channel.send(`I have been online for ${format(uptime)} `)
}
if(cmd === "invite"){
  msg.channel.send({embed: {
      color: 654321,
      fields: [{
          name: "Support server:",
          value: "https://discord.gg/y68DbxK"
        },
        {
          name: "Invite me to your server!",
          value: "https://discordapp.com/api/oauth2/authorize?client_id=419806744907350017&permissions=335670487&scope=bot"
        }
      ],
      footer: {
            }
          }
        });

}
     
  
});
 bot.login(token);
