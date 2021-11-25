const express = require("express")
const logError = require("../errorHandler")
const {createPool} = require("../controllers/pool");

const router = express.Router()
router.post("/create", createPoolRequest)


async function createPoolRequest(request, response) {
  try {
    const newPoolData = request.body
    const newPoolId = await createPool(newPoolData)
    response.status(200).json({newPoolId})
  } catch (exception) {
    const message = "Can't create pool"
    response.status(500).json({message})
    logError(message, exception)
  }
}


module.exports = router