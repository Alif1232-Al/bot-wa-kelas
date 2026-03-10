module.exports = async (sock,msg)=>{

const text = `
╔══════════════════════╗
      🤖  *BOT KELAS FLASKPAMO*
╚══════════════════════╝

👋 Halo Murid murid Endar!
Bot ini dibuat khusus untuk membantu
anggota *Flaskpamo* coding (kontol didinding).

━━━━━━━━━━━━━━━━━━━━━━

📚 *MENU TUGAS*
┌─────────────────────
│ !tugas "nama" tanggal
│ ➜ tambah tugas baru
│
│ !tugaslist
│ ➜ lihat semua tugas
│
│ !hapus ID
│ ➜ hapus tugas
└─────────────────────

⏰ *MENU DEADLINE*
┌─────────────────────
│ !deadline
│ ➜ lihat semua deadline
│
│ !hariini
│ ➜ deadline hari ini
│
│ !minggu
│ ➜ deadline minggu ini
└─────────────────────

📅 *MENU JADWAL KULIAH*
┌─────────────────────
│ !jadwal
│ ➜ lihat semua jadwal
│
│ !jadwal senin
│ ➜ jadwal hari tertentu
└─────────────────────

🧠 *AI ASSISTANT*
┌─────────────────────
│ !ai pertanyaan
│ ➜ tanya AI Gemini
│
│ contoh:
│ !ai jelaskan neural network
└─────────────────────

📰 *INFORMASI*
┌─────────────────────
│ !news
│ ➜ berita terbaru Indonesia
└─────────────────────

🎨 *MEDIA*
┌─────────────────────
│ !sticker
│ ➜ ubah gambar jadi sticker
└─────────────────────

👥 *GROUP*
┌─────────────────────
│ !tagall
│ ➜ tag semua anggota grup
└─────────────────────

━━━━━━━━━━━━━━━━━━━━━━
⚡ *BOT FEATURES*

• AI Gemini 🤖
• Task Manager 📚
• Deadline Tracker ⏰
• Jadwal Kuliah 📅
• News Update 📰
• Sticker Maker 🎨

━━━━━━━━━━━━━━━━━━━━━━

💡 *Tips*
Gunakan command dengan awalan *!*  

contoh:
!menu  
!jadwal  
!tugas  

━━━━━━━━━━━━━━━━━━━━━━

© Bot Flaskpamo 2026
CP/CREDIT Made with Alif Gantengss & JavCode
`

await sock.sendMessage(msg.key.remoteJid,{
text
})

}