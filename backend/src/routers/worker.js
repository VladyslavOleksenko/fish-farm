const express = require("express")
const workerController = require("../controllers/worker")
const logError = require("../errorHandler")

const router = express.Router()
router.get("/byFarm", getWorkerArrayRequest)


async function getWorkerArrayRequest(request, response) {
  try {
    const farmId = request.query.farmId
    const workerArray = await workerController.getWorkerArray(farmId)
    const workerArrayFormatted =
      await workerController.formatWorkerArray(workerArray)
    response.status(200).json(workerArrayFormatted)
  } catch (exception) {
    const message = "Can't get worker array"
    response.status(500).json({message})
    logError(message, exception)
  }
}


module.exports = router