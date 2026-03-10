const tugas = require("../commands/tugas")
const list = require("../commands/list")
const hapus = require("../commands/hapus")
const sticker = require("../commands/sticker")
const menu = require("../commands/menu")
const deadline = require("../commands/deadline")
const hariini = require("../commands/hariini")
const minggu = require("../commands/minggu")
const askAI = require("../ai/ai")
const tagall = require("../commands/tagall")
const news = require("../commands/news")
const jadwal = require("../commands/jadwal")
module.exports = async (sock, msg, text) => {

if(!text.startsWith("!")) return

const args = text.slice(1).split(" ")
const cmd = args.shift().toLowerCase()

try{

switch(cmd){

case "tugas":
return tugas(sock,msg,args)

case "tugaslist":
return list(sock,msg)

case "hapus":
return hapus(sock,msg,args)

case "sticker":
return sticker(sock,msg)

case "menu":
return menu(sock,msg)

case "deadline":
return deadline(sock,msg)

case "hariini":
return hariini(sock,msg)

case "minggu":
return minggu(sock,msg)

case "tagall":
return tagall(sock,msg)

case "news":
return news(sock,msg)

case "jadwal":
return jadwal(sock,msg,args)

case "ai":

const prompt = args.join(" ")

if(!prompt){
return sock.sendMessage(msg.key.remoteJid,{
text:"Gunakan: !ai pertanyaan"
})
}

await sock.sendMessage(msg.key.remoteJid,{
text:"🤖 AI sedang berpikir..."
})

const jawab = await askAI(prompt)

await sock.sendMessage(msg.key.remoteJid,{
text: jawab
})

return

default:
return sock.sendMessage(msg.key.remoteJid,{
text:"❌ Command tidak dikenal\nKetik !menu untuk melihat command"
})

}

}catch(err){

console.log("Command error:", err)

await sock.sendMessage(msg.key.remoteJid,{
text:"Terjadi error pada command."
})

}

}