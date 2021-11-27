const express = require("express")
const farmController = require("../controllers/farm")
const userController = require("../controllers/user")
const logError = require("../errorHandler")

const router = express.Router()
router.get("/", getFarmRequest)
router.delete("/", deleteFarmRequest)
router.get("/ownFarms", getFarmArrayByOwnerIdRequest)
router.post("/create", createFarmRequest)
router.get("/owner", getFarmOwnerRequest)


async function getFarmRequest(request, response) {
  try {
    const farmId = request.query.farmId
    const farm = await farmController.getFarmByFarmId(farmId)
    response.json(farm)
  } catch (exception) {
    const message = "Can't get farm"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function deleteFarmRequest(request, response) {
  try {
    const farmId = request.query.farmId
    await farmController.deleteFarm(farmId)
    response.status(200).json({message: "done"})
  } catch (exception) {
    const message = "Can't delete farm"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function getFarmArrayByOwnerIdRequest(request, response) {
  try {
    const ownerId = request.query.userId
    const farmArray = await farmController.getFarmArrayByOwnerId(ownerId)
    const farmArrayFormatted = farmController.formatFarmArray(farmArray)
    response.json(farmArrayFormatted)
  } catch (exception) {
    const message = "Can't get farm array by owner id"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function createFarmRequest(request, response) {
  try {
    const newFarmData = request.body
    const newFarmId = await farmController.createFarm(newFarmData)
    response.status(200).json({newFarmId})
  } catch (exception) {
    const message = "Can't create a farm"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function getFarmOwnerRequest(request, response) {
  try {
    const farmId = request.query.farmId
    const farmOwner = await farmController.getFarmOwner(farmId)
    const farmOwnerFormatted = userController.formatUser(farmOwner)
    response.status(200).json(farmOwnerFormatted)
  } catch (exception) {
    const message = "Can't get farm owner"
    response.status(500).json({message})
    logError(message, exception)
  }
}


module.exports = router