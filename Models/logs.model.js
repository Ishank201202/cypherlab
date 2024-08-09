const { default: mongoose } = require("mongoose")

const logSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true,
    },
    cipher: {
        type: String,
        required: true,
    },
    key: {
        type: String,
    },
    output: {
        type: String,
    },
},{timestamps:true})

const Logs = mongoose.model('log',logSchema)
module.exports = Logs