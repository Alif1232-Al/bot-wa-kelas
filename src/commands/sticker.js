const { downloadMediaMessage } = require("baileys")
const { Sticker } = require("wa-sticker-formatter")

module.exports = async (sock, msg) => {

const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage

if(!quoted){
return sock.sendMessage(msg.key.remoteJid,{
text:"Reply gambar dengan command !sticker"
})
}

if(!quoted.imageMessage){
return sock.sendMessage(msg.key.remoteJid,{
text:"Hanya bisa membuat sticker dari gambar"
})
}

try{

const buffer = await downloadMediaMessage(
{
key: msg.message.extendedTextMessage.contextInfo.stanzaId,
message: quoted
},
"buffer",
{},
{
logger: console,
reuploadRequest: sock.updateMediaMessage
}
)

const sticker = new Sticker(buffer,{
pack:"Bot Parkiran",
author:"Bot",
type:"full"
})

await sock.sendMessage(msg.key.remoteJid,{
sticker: await sticker.toBuffer()
})

}catch(err){

console.log("Sticker error:",err)

sock.sendMessage(msg.key.remoteJid,{
text:"Gagal membuat sticker"
})

}

}