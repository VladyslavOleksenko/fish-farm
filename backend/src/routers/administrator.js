const express = require("express")
const administratorController = require("../controllers/administrator")
const logError = require("../errorHandler")


const router = express.Router()
router.get("/", getAdministratorArrayRequest)
router.put("/", changeAdministratorRequest)
router.delete("/", deleteAdministratorRequest)
router.get("/invite", getInviteArrayRequest)
router.post("/invite", inviteAdministratorRequest)
router.put("/invite", changeInviteRequest)
router.delete("/invite", deleteInviteRequest)


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

async function deleteAdministratorRequest(request, response) {
  try {
    const farmAdministratorId = request.query.farmAdministratorId
    await administratorController.deleteFarmAdministrator(farmAdministratorId)
    response.status(200).json({message: "done"})
  } catch (exception) {
    const message = "Can't delete administrator array"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function changeAdministratorRequest(request, response) {
  try {
    const administratorInviteId = request.query.administratorInviteId
    await administratorController.deleteInvite(administratorInviteId)
    response.status(200).json({message: "done"})
  } catch (exception) {
    const message = "Can't delete administrator invite"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function getInviteArrayRequest(request, response) {
  try {
    const farmId = request.query.farmId
    const inviteArray = await administratorController.getInviteArray(farmId)
    const inviteArrayFormatted =
      administratorController.formatInviteArray(inviteArray)
    response.status(200).json(inviteArrayFormatted)
  } catch (exception) {
    const message = "Can't get administrators invite array"
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

async function changeInviteRequest(request, response) {
  try {
    const inviteData = request.body
    const invite = await administratorController.changeInvite(inviteData)
    const inviteFormatted = administratorController.formatInvite(invite)
    response.status(200).json(inviteFormatted)
  } catch (exception) {
    const message = "Can't change administrator invite"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function deleteInviteRequest(request, response) {
  try {
    const administratorInviteId = request.query.administratorInviteId
    await administratorController.deleteInvite(administratorInviteId)
    response.status(200).json({message: "done"})
  } catch (exception) {
    const message = "Can't delete administrator invite"
    response.status(500).json({message})
    logError(message, exception)
  }
}


module.exports = router