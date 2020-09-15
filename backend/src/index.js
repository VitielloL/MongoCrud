// servidor com express - node

const { user } = require("./models/user.js")
const express = require("express")
const mongo = require("mongoose")
const app = express()
app.use(express.json())

mongo.connect("mongodb://localhost/mongocrud")

app.get("/", async function (req, res) {
    return res.json({
        nome: "lucas",
    })
})

app.post("/user", async function (req, res) {
    const { nome, idade } = req.body;
    const newuser = new user({
        nome: nome,
        idade: idade,
    });
    const returnuser = await newuser.save();
    return res.json({
        user: returnuser,
    })
})

app.listen(3003)



