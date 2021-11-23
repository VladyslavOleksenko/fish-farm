const express = require("express")
const cors = require("cors")

const userRouter = require("./controllers/user").router


const app = express()
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({extended: true}))
  .use("/api/user", userRouter)

const PORT = require("../appConfig").server.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`)
})