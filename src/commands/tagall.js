module.exports = async (sock,msg)=>{

const from = msg.key.remoteJid

// pastikan hanya di group
if(!from.endsWith("@g.us")){
return sock.sendMessage(from,{
text:"❌ Command ini hanya bisa dipakai di group"
})
}

// ambil metadata group
const metadata = await sock.groupMetadata(from)

const participants = metadata.participants

let text = "📢 *TAG SEMUA ANGGOTA*\n\n"

let mentions = []

for(const p of participants){

const id = p.id

mentions.push(id)

text += `@${id.split("@")[0]}\n`

}

await sock.sendMessage(from,{
text,
mentions
})

}