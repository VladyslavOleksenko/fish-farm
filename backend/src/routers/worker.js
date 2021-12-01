const express = require("express")
const workerController = require("../controllers/worker")
const logError = require("../errorHandler")

const router = express.Router()
router.get("/", getWorkerArrayRequest)
router.delete("/", deleteWorkerRequest)
router.get("/invite", getInviteArrayRequest)
router.post("/invite", inviteWorkerRequest)
router.put("/invite", changeInviteRequest)
router.delete("/invite", deleteInviteRequest)


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

async function deleteWorkerRequest(request, response) {
  try {
    const farmWorkerId = request.query.farmWorkerId
    await workerController.deleteFarmWorker(farmWorkerId)
    response.status(200).json({message: "done"})
  } catch (exception) {
    const message = "Can't delete worker"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function getInviteArrayRequest(request, response) {
  try {
    const farmId = request.query.farmId
    const inviteArray = await workerController.getInviteArray(farmId)
    const inviteArrayFormatted =
      workerController.formatInviteArray(inviteArray)
    response.status(200).json(inviteArrayFormatted)
  } catch (exception) {
    const message = "Can't get workers invite array"
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

async function changeInviteRequest(request, response) {
  try {
    const inviteData = request.body
    const invite = await workerController.changeInvite(inviteData)
    const inviteFormatted = workerController.formatInvite(invite)
    response.status(200).json(inviteFormatted)
  } catch (exception) {
    const message = "Can't change worker invite"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function deleteInviteRequest(request, response) {
  try {
    const workerInviteId = request.query.workerInviteId
    await workerController.deleteInvite(workerInviteId)
    response.status(200).json({message: "done"})
  } catch (exception) {
    const message = "Can't delete worker invite"
    response.status(500).json({message})
    logError(message, exception)
  }
}


module.exports = router