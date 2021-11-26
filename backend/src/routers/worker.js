const express = require("express")
const workerController = require("../controllers/worker")
const logError = require("../errorHandler")

const router = express.Router()
router.get("/byFarm", getWorkerArrayRequest)
router.post("/invite", inviteWorkerRequest)


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

async function inviteWorkerRequest(request, response) {
  try {
    const invitorData = request.body
    const message = await workerController.inviteWorker(invitorData)
    response.status(200).json({message})
  } catch (exception) {
    const message = "Can't invite worker"
    response.status(500).json({message, details: exception.message})
    logError(message, exception)
  }
}


module.exports = router