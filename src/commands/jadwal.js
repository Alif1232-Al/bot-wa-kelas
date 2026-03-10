module.exports = async (sock, msg, args) => {

const from = msg.key.remoteJid

const jadwal = {
senin: [
"08:50 - 10:30 | Sistem Pendukung Keputusan",
"10:30 - 12:10 | Kerja Praktek",
"13:00 - 14:40 | Teknologi Internet of Things"
],

rabu: [
"07:10 - 08:50 | Mobile Programming",
"08:50 - 10:30 | Teknik Kompilasi"
],

jumat: [
"07:10 - 08:50 | Rekayasa Perangkat Lunak",
"08:50 - 10:30 | Basis Data II",
"10:30 - 12:10 | Pemrograman II"
]
}

const hari = args[0]?.toLowerCase()

if(!hari){

let text = "📅 *Jadwal Kuliah*\n\n"

Object.keys(jadwal).forEach(day => {

text += `*${day.toUpperCase()}*\n`

jadwal[day].forEach(matkul => {
text += `• ${matkul}\n`
})

text += "\n"

})

return sock.sendMessage(from,{text})

}

if(!jadwal[hari]){

return sock.sendMessage(from,{
text:"❌ Hari tidak ditemukan.\nContoh: !jadwal senin"
})

}

let text = `📅 *Jadwal ${hari.toUpperCase()}*\n\n`

jadwal[hari].forEach(matkul=>{
text += `• ${matkul}\n`
})

await sock.sendMessage(from,{text})

}