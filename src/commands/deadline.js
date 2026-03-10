const TaskModel = require("../database/taskModel")

module.exports = async (sock,msg)=>{

const tasks = await TaskModel.getAll()

if(!tasks.length){

return sock.sendMessage(msg.key.remoteJid,{
text:"Tidak ada tugas tersimpan"
})

}

let text = "📅 *DAFTAR DEADLINE*\n\n"

tasks.forEach((t,i)=>{

text += `${i+1}. ${t.task}\nDeadline: ${t.deadline}\n\n`

})

await sock.sendMessage(msg.key.remoteJid,{text})

}