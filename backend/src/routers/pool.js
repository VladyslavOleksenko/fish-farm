const express = require("express")
const poolController = require("../controllers/pool")
const logError = require("../errorHandler")

const router = express.Router()
router.get("/", getPoolArrayRequest)
router.put("/", changePoolDataRequest)
router.delete("/", deletePoolRequest)
router.post("/create", createPoolRequest)
router.put("/indicators", updateDeviceIndicatorsRequest)


async function getPoolArrayRequest(request, response) {
  try {
    const farmId = request.query.farmId
    const poolArray = await poolController.getPoolArray(farmId)
    const poolArrayFormatted = poolController.formatPoolArray(poolArray)
    response.status(200).json(poolArrayFormatted)
  } catch (exception) {
    const message = "Can't get pool array by farmId"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function changePoolDataRequest(request, response) {
  try {
    const poolData = request.body
    const pool = await poolController.changePoolData(poolData)
    const poolFormatted = poolController.formatPool(pool)
    response.status(200).json(poolFormatted)
  } catch (exception) {
    const message = "Can't change pool"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function deletePoolRequest(request, response) {
  try {
    const poolId = request.query.poolId
    await poolController.deletePool(poolId)
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
    const newPoolId = await poolController.createPool(newPoolData)
    response.status(200).json({newPoolId})
  } catch (exception) {
    const message = "Can't create pool"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function updateDeviceIndicatorsRequest(request, response) {
  try {
    const deviceData = request.body
    await poolController.updateDeviceIndicators(deviceData)
    response.status(200).json("done")
  } catch (exception) {
    const message = "Can't update device indicators"
    response.status(500).json({message})
    logError(message, exception)
  }
}


module.exports = router