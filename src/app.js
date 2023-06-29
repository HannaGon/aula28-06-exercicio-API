const express = require("express")
const router = require("../src/routes/boletimRoute")

const app = express()
app.use(express.json())

app.use("/api", router)

module.exports = app
