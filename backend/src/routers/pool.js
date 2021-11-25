const express = require("express")
const logError = require("../errorHandler")
const {
  createPool,
  getPoolArray,
  formatPoolArray,
  deletePool
} = require("../controllers/pool");

const router = express.Router()
router.get("/", getPoolArrayRequest)
router.delete("/", deletePoolRequest)
router.post("/create", createPoolRequest)


async function getPoolArrayRequest(request, response) {
  try {
    const farmId = request.query.farmId
    const poolArray = await getPoolArray(farmId)
    const poolArrayFormatted = formatPoolArray(poolArray)
    response.status(200).json(poolArrayFormatted)
  } catch (exception) {
    const message = "Can't get pool array by farmId"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function deletePoolRequest(request, response) {
  try {
    const poolId = request.query.poolId
    await deletePool(poolId)
    response.json({message: "pool deleted"})
  } catch (exception) {
    const message = "Can't delete pool"
    response.status(500).json({message})
    logError(message, exception)
  }
}

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