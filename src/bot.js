require("dotenv").config()

const {
default: makeWASocket,
useMultiFileAuthState,
fetchLatestBaileysVersion,
DisconnectReason
} = require("baileys")

const P = require("pino")
const qrcode = require("qrcode-terminal")
const QRCode = require("qrcode") // TAMBAHAN QR LINK

const commandHandler = require("./handlers/commandHandler")

// IMPORT REMINDER
const reminder = require("./scheduler/reminder")

// IMPORT AI
const askAI = require("./ai/ai")

// ===============================
// MEMORY CHAT
// ===============================
const chatMemory = {}

// ===============================
// MEMORY MEMBER
// ===============================
const groupMembers = {}

async function startBot(){

console.log("🚀 Bot starting...")

const { state, saveCreds } = await useMultiFileAuthState("session")
const { version } = await fetchLatestBaileysVersion()

const sock = makeWASocket({
version,
logger: P({ level: "silent" }),
auth: state,
browser: ["Bot Parkiran","Chrome","1.0"],
markOnlineOnConnect: true
})

sock.ev.on("creds.update", saveCreds)


// ===============================
// CONNECTION UPDATE
// ===============================
sock.ev.on("connection.update", (update)=>{

const { connection, lastDisconnect, qr } = update

if(qr){

console.log("📱 Scan QR ini:")

// QR kecil di terminal
qrcode.generate(qr,{ small:true })

// QR link gambar
QRCode.toDataURL(qr, (err, url) => {
console.log("🔗 Buka QR ini di browser:")
console.log(url)
})

}

if(connection === "open"){
console.log("✅ WhatsApp connected")
reminder(sock)
}

if(connection === "close"){

const reason = lastDisconnect?.error?.output?.statusCode

console.log("❌ Connection closed")

if(reason !== DisconnectReason.loggedOut){
console.log("🔁 Reconnecting...")
startBot()
}else{
console.log("⚠️ Session logged out. Hapus folder session lalu login ulang.")
}

}

})


// ===============================
// HANDLE PESAN MASUK
// ===============================
sock.ev.on("messages.upsert", async (m) => {

try{

const msg = m.messages[0]

if(!msg) return
if(!msg.message) return
if(msg.key?.remoteJid === "status@broadcast") return
if(msg.key.fromMe) return

const from = msg.key.remoteJid

const text =
msg.message?.conversation ||
msg.message?.extendedTextMessage?.text ||
msg.message?.imageMessage?.caption ||
msg.message?.videoMessage?.caption ||
""

if(!text) return

console.log("📩 Message dari:", from)
console.log("💬 Text:", text)


// ===============================
// SIMPAN MEMORY CHAT
// ===============================
if(!chatMemory[from]) chatMemory[from] = []

chatMemory[from].push({
user: msg.pushName || "User",
message: text
})

if(chatMemory[from].length > 10){
chatMemory[from].shift()
}


// ===============================
// SIMPAN MEMBER GRUP
// ===============================
if(from.endsWith("@g.us")){

if(!groupMembers[from]) groupMembers[from] = {}

let sender = msg.key.participant || msg.key.remoteJid
let userName = msg.pushName || sender.split("@")[0]

groupMembers[from][sender] = userName

}


// ===============================
// COMMAND AI
// ===============================
if(text.startsWith("!ai")){

const question = text.replace("!ai","").trim()

if(!question){
return sock.sendMessage(from,{
text:"Gunakan: !ai pertanyaan"
})
}

await sock.sendMessage(from,{
text:"🤖 AI sedang berpikir..."
})

await new Promise(r => setTimeout(r,1000))


let sender = msg.key.participant || msg.key.remoteJid

let userName =
msg.pushName ||
sender.split("@")[0]


let groupName = null
let membersList = ""
let adminsList = ""

if(from.endsWith("@g.us")){

try{

const group = await sock.groupMetadata(from)

groupName = group.subject

membersList = group.participants
.map(p => p.id.split("@")[0])
.filter(n => n.length > 10)
.join(", ")

adminsList = group.participants
.filter(p => p.admin)
.map(p => p.id.split("@")[0])
.filter(n => n.length > 10)
.join(", ")

}catch(e){
console.log("Group metadata error:",e)
}

}


const history = chatMemory[from]
.map(m => `${m.user}: ${m.message}`)
.join("\n")


const membersNames = groupMembers[from]
? Object.values(groupMembers[from]).join(", ")
: ""


const context = `
Percakapan terakhir di grup:

${history}

Anggota yang dikenal di grup:
${membersNames}

Nama orang yang bertanya: ${userName}

${groupName ? `Nama grup: ${groupName}` : ""}

${membersList ? `Anggota grup (nomor): ${membersList}` : ""}

${adminsList ? `Admin grup: ${adminsList}` : ""}

Pertanyaan:
${question}
`

const response = await askAI(context, userName, groupName)

await sock.sendMessage(from,{
text: response || "⚠️ AI tidak memberikan jawaban."
})

return
}


// ===============================
// COMMAND BOT BIASA
// ===============================
await commandHandler(sock,msg,text)

}catch(err){

console.log("❌ Error membaca pesan:", err)

}

})

}

startBot()