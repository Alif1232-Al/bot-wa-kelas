const isAdmin = require("../utils/isAdmin")

module.exports = async (sock, msg, args) => {

const groupId = msg.key.remoteJid
const sender = msg.key.participant || msg.key.remoteJid

const admin = await isAdmin(sock, groupId, sender)

if(!admin){
return sock.sendMessage(groupId,{
text:"❌ Hanya admin yang bisa pakai command ini"
})
}

if(args[0] === "kick"){

const number = args[1]

const jid = number+"@s.whatsapp.net"

await sock.groupParticipantsUpdate(
groupId,
[jid],
"remove"
)

sock.sendMessage(groupId,{
text:"✅ Member berhasil dikeluarkan"
})

}

}