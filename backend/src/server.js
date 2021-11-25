const express = require("express")
const cors = require("cors")

const userRouter = require("./controllers/user").router
const farmRouter = require("./controllers/farm").router
const administratorRouter = require("./controllers/administrator").router
const workerRouter = require("./controllers/worker").router


const app = express()
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({extended: true}))
  .use("/api/user", userRouter)
  .use("/api/farm", farmRouter)
  .use("/api/administrator", administratorRouter)
  .use("/api/worker", workerRouter)

const PORT = require("../appConfig").server.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`)
})