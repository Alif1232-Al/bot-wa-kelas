const TaskModel = require("../database/taskModel")

module.exports = async (sock,msg,args)=>{

const from = msg.key.remoteJid

// ambil semua tugas
const tasks = await TaskModel.getAll()

if(!tasks.length){
return sock.sendMessage(from,{
text:"Tidak ada tugas untuk dihapus"
})
}

// kalau user tidak kasih nomor
if(!args[0]){

let text = "🗑 *Pilih tugas yang ingin dihapus*\n\n"

tasks.forEach((t,i)=>{
text += `${i+1}. ${t.task}\nDeadline: ${t.deadline}\n\n`
})

text += "Ketik:\n!hapus nomor_tugas"

return sock.sendMessage(from,{text})

}

const index = parseInt(args[0]) - 1

if(index < 0 || index >= tasks.length){

return sock.sendMessage(from,{
text:"Nomor tugas tidak valid"
})

}

const task = tasks[index]

// hapus berdasarkan ID database
await TaskModel.delete(task.id)

await sock.sendMessage(from,{
text:`✅ Tugas berhasil dihapus

📚 ${task.task}`
})

}