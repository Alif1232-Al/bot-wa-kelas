const cron = require("node-cron")
const moment = require("moment")
const TaskModel = require("../database/taskModel")

module.exports = (sock) => {

console.log("⏰ Reminder scheduler aktif")

// cek setiap 1 jam
cron.schedule("0 * * * *", async () => {

console.log("🔎 Checking deadline...")

const tasks = await TaskModel.getAll()

if(!tasks.length) return

for(const task of tasks){

// hitung selisih hari
const diff = moment(task.deadline).diff(moment(),"days")

// reminder H-2
if(diff === 2){

await sock.sendMessage(task.chat_id,{
text:`⚠️ *REMINDER TUGAS*

📚 ${task.task}

📅 Deadline: ${task.deadline}
⏳ Sisa waktu: 2 hari`
})

}

}

})

}