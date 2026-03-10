const TaskModel = require("../database/taskModel")
const moment = require("moment")

module.exports = async (sock,msg)=>{

const today = moment().format("YYYY-MM-DD")

const tasks = await TaskModel.getAll()

const todayTasks = tasks.filter(t=>t.deadline === today)

if(!todayTasks.length){

return sock.sendMessage(msg.key.remoteJid,{
text:"Tidak ada tugas deadline hari ini"
})

}

let text = "📌 *TUGAS HARI INI*\n\n"

todayTasks.forEach((t,i)=>{

text += `${i+1}. ${t.task}\nDeadline: ${t.deadline}\n\n`

})

await sock.sendMessage(msg.key.remoteJid,{text})

}