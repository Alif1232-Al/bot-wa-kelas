const sqlite3 = require("sqlite3").verbose()

// buat database file
const db = new sqlite3.Database("./tasks.db", (err) => {

if(err){
console.error("❌ Database error:", err.message)
}else{
console.log("✅ Database connected")
}

})

// buat table jika belum ada
db.run(`
CREATE TABLE IF NOT EXISTS tasks (
id INTEGER PRIMARY KEY AUTOINCREMENT,
task TEXT NOT NULL,
deadline TEXT NOT NULL,
chat_id TEXT NOT NULL,
created_at TEXT
)
`)

module.exports = db