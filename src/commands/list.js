const db = require("../database/db")

module.exports = async (sock, msg) => {

db.all("SELECT * FROM tasks", async (err, rows) => {

if (!rows.length) {
return sock.sendMessage(msg.key.remoteJid, {
text: "Belum ada tugas"
})
}

let text = "📚 DAFTAR TUGAS\n\n"

rows.forEach((t,i)=>{
text += `${i+1}. ${t.task}\nDeadline : ${t.deadline}\n\n`
})

await sock.sendMessage(msg.key.remoteJid,{text})

})

}