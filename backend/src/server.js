const express = require("express")
const cors = require("cors")
const myRouter = require("./myRouter")

const app = express()
app.use(cors())
app.use("/api", myRouter)

const PORT = require("../appConfig").server.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`)
})