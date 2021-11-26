const express = require("express")
const administratorController = require("../controllers/administrator")
const logError = require("../errorHandler")


const router = express.Router()
router.get("/byFarm", getAdministratorArrayRequest)
router.post("/invite", inviteAdministratorRequest)


async function getAdministratorArrayRequest(request, response) {
  try {
    const farmId = request.query.farmId
    const administratorArray =
      await administratorController.getAdministratorArray(farmId)
    const administratorArrayFormatted =
      await administratorController.formatAdministratorArray(administratorArray)
    response.status(200).json(administratorArrayFormatted)
  } catch (exception) {
    const message = "Can't get administrator array"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function inviteAdministratorRequest(request, response) {
  try {
    const invitorData = request.body
    const message = await administratorController.inviteAdministrator(invitorData)
    response.status(200).json({message})
  } catch (exception) {
    const message = "Can't invite administrator"
    response.status(500).json({message, details: exception.message})
    logError(message, exception)
  }
}


module.exports = router