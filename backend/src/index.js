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

// cria 1 usuario e salva no banco
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

// pega todos os usuarios
app.get("/user", async (req, res) => {
    const alluser = await user.find();
    //   return res.json(alluser)
    return res.json({
        users: alluser
    })

})

// pega um usuario unico
app.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    const iduser = await user.findById(id);
    // return res.json(iduser)
    return res.json({
        user: iduser
    })
})

// pega um usuario e deleta
app.delete("/user/:id", async (req, res) => {
    const { id } = req.params
    await user.deleteOne({
        _id: id
    })
    res.status(200)
    return res.send()
})

// edita um usuario
app.put("/user/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, idade } = req.body;
    const updateuser = await user.findByIdAndUpdate(id, {
        nome: nome,
        idade: idade
    }, {
        new: true
    })
    res.status(200)
    return res.json({
        user: updateuser
    })
})


app.listen(3003)



/* Quase deu certo para editar
app.put("/user/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, idade } = req.body;
    const updateuser = await user.updateOne({

        nome: nome,
        idade: idade
    }, id)
    res.status(200)
    return res.json({
        user: updateuser
    })
})
*/
