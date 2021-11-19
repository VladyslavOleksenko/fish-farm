const express = require("express")
const appConfig = require("../appConfig")

const app = express()

app.get("/", (req, res) => {
  res.send("Hello from server powered by node")
})

app.listen(appConfig.server.PORT, () => {
  console.log(`Server has been started on port ${appConfig.server.PORT}...`)
})