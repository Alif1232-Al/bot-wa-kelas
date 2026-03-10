const db = require("../database/db")

module.exports = async (sock, msg, args) => {

const from = msg.key.remoteJid
const text = args.join(" ")

// parsing format
const match = text.match(/"(.*?)"\s(\d{4}-\d{2}-\d{2})/)

if (!match) {
return sock.sendMessage(from, {
text: `❌ Format salah

Gunakan:
!tugas "Nama tugas" 2026-03-15

Contoh:
!tugas "Machine Learning" 2026-03-15`
})
}

const task = match[1]
const deadline = match[2]

// simpan ke database
db.run(
"INSERT INTO tasks (task, deadline, chat_id, created_at) VALUES (?, ?, ?, datetime('now'))",
[task, deadline, from]
)

await sock.sendMessage(from, {
text: `✅ Tugas berhasil ditambahkan

📚 ${task}
📅 Deadline: ${deadline}`
})

}