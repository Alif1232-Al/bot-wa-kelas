const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

async function askAI(prompt, userName = "User", groupName = null){

try{

const model = genAI.getGenerativeModel({
model: "gemini-flash-latest"
})

let fullPrompt = `
Kamu adalah AI assistant di bot WhatsApp bernama "Bot Parkiran".

Gaya bicaramu seperti mahasiswa / anak kuliahan Indonesia:
- santai
- bahasa gaul ringan
- friendly
- kadang pakai emoji
- jangan terlalu formal

Nama orang yang bertanya: ${userName}
${groupName ? `Pesan ini dikirim dari grup "${groupName}".` : "Pesan ini dari chat pribadi."}

Jawab seperti ngobrol santai di grup kampus.

Pertanyaan:
${prompt}
`

const result = await model.generateContent(fullPrompt)

return result.response.text()

}catch(err){

console.log("AI ERROR:", err)

return "⚠️ AI lagi error bro, coba lagi bentar."

}

}

module.exports = askAI