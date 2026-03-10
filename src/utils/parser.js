module.exports = (text) => {

const args = text.trim().split(" ")

const command = args.shift().toLowerCase()

return {
command,
args
}

}