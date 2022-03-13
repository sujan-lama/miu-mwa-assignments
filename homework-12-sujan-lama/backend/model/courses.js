const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const schema = new Schema({
    _id: Number,
    name: String,
    code: String,
})

module.exports = mongoose.model("Courses", schema)
