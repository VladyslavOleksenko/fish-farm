const express = require("express")
const cors = require("cors")

const userRouter = require("./routers/user")
const farmRouter = require("./routers/farm")
const administratorRouter = require("./routers/administrator")
const workerRouter = require("./routers/worker")
const poolRouter = require("./routers/pool")
const taskRouter = require("./routers/task")


const app = express()
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({extended: true}))
  .use("/api/user", userRouter)
  .use("/api/farm", farmRouter)
  .use("/api/administrator", administratorRouter)
  .use("/api/worker", workerRouter)
  .use("/api/pool", poolRouter)
  .use("/api/task", taskRouter)

const PORT = require("../appConfig").server.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`)
})