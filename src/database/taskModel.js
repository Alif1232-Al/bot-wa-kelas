const db = require("./db")

const TaskModel = {

create(task, deadline) {

return new Promise((resolve, reject) => {

db.run(
"INSERT INTO tasks (task, deadline, created_at) VALUES (?, ?, datetime('now'))",
[task, deadline],
function(err){

if(err) reject(err)

resolve(this.lastID)

}
)

})

},

getAll(){

return new Promise((resolve, reject)=>{

db.all("SELECT * FROM tasks ORDER BY deadline ASC", (err,rows)=>{

if(err) reject(err)

resolve(rows)

})

})

},

delete(id){

return new Promise((resolve,reject)=>{

db.run("DELETE FROM tasks WHERE id = ?",[id],function(err){

if(err) reject(err)

resolve(this.changes)

})

})

}

}

module.exports = TaskModel