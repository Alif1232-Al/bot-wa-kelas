const Parser = require("rss-parser")

const parser = new Parser({
    headers: {
        "User-Agent": "Mozilla/5.0"
    },
    timeout: 10000
})

module.exports = async (sock, msg) => {

    const from = msg.key.remoteJid

    try {

        // loading message
        await sock.sendMessage(from, {
            text: "🔎 Mengambil berita terbaru..."
        })

        const feed = await parser.parseURL(
            "https://news.google.com/rss?hl=id&gl=ID&ceid=ID:id"
        )

        if (!feed.items || feed.items.length === 0) {
            return sock.sendMessage(from, {
                text: "❌ Berita tidak ditemukan."
            })
        }

        const now = new Date().toLocaleString("id-ID")

        let text = `📰 *BERITA TERBARU INDONESIA*\n`
        text += `⏰ ${now}\n\n`

        feed.items.slice(0, 5).forEach((item, i) => {

            const title = item.title || "Judul tidak tersedia"
            const link = item.link || ""

            text += `${i + 1}. ${title}\n`
            text += `${link}\n\n`

        })

        await sock.sendMessage(from, {
            text
        })

    } catch (err) {

        console.log("NEWS ERROR:", err)

        await sock.sendMessage(from, {
            text: "❌ Gagal mengambil berita.\nCoba lagi beberapa saat."
        })

    }

}