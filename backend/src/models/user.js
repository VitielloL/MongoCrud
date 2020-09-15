const mongo = require("mongoose")

let userSchema = mongo.Schema({
    nome: {
        type: String,
    },
    idade: {
        type: Number,
    }
});

exports.userSchema = userSchema
exports.user = mongo.model("User", userSchema, "Users")

