const express = require("express")
const controller = require("../controllers/boletimController")

const app = express.Router()

app.get("/boletim", controller.obterTodos)
app.get("/boletim/:id", controller.obterPorId)
app.get("/boletim/:id/resultado", controller.obterResultado)
app.post("/boletim", controller.cadastrar)
app.patch("/boletim/:id", controller.atualizar)
app.delete("/boletim/:id", controller.deletar)

module.exports = app
