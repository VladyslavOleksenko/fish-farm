const express = require("express")
const administratorController = require("../controllers/administrator")
const logError = require("../errorHandler")


const router = express.Router()
router.get("/byFarm", getAdministratorArrayRequest)


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
    logError(message)
    logError(exception)
  }
}


module.exports = router