const TaskModel = require("../database/taskModel")
const moment = require("moment")

module.exports = async (sock,msg)=>{

const tasks = await TaskModel.getAll()

const weekTasks = tasks.filter(t=>{

const diff = moment(t.deadline).diff(moment(),"days")

return diff >=0 && diff <=7

})

if(!weekTasks.length){

return sock.sendMessage(msg.key.remoteJid,{
text:"Tidak ada tugas minggu ini"
})

}

let text = "📅 *TUGAS MINGGU INI*\n\n"

weekTasks.forEach((t,i)=>{

text += `${i+1}. ${t.task}\nDeadline: ${t.deadline}\n\n`

})

await sock.sendMessage(msg.key.remoteJid,{text})

}