const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    activity:{type:String},
    status:{type:String},
    timeTaken:{type:Timestamp}
})

const TodoData = mongoose.model('todo' , todoSchema);

module.exports = todoSchema;