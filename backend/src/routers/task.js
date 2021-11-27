const express = require("express")
const farmController = require("../controllers/farm")
const userController = require("../controllers/user")
const logError = require("../errorHandler")

const router = express.Router()
router.get("/", getTaskRequest)
router.get("/farm", getTaskByFarmRequest)
router.get("/pool", getTaskByPoolRequest)
router.get("/worker", getTaskByWorkerRequest)
router.post("/", createTaskRequest)
router.get("/history", getTaskHistoryRequest)


async function getTaskRequest(request, response) {
  try {
    const taskId = request.query.taskId
  } catch (exception) {
    const message = "Can't get task by taskId"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function getTaskByFarmRequest(request, response) {
  try {
    const farmId = request.query.farmId
  } catch (exception) {
    const message = "Can't get task by farmId"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function getTaskByPoolRequest(request, response) {
  try {

  } catch (exception) {
    const message = "Can't get task by taskId"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function getTaskByWorkerRequest(request, response) {
  try {
    const workerId = request.query.workerId
  } catch (exception) {
    const message = "Can't get task by taskId"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function createTaskRequest(request, response) {
  try {
    const newTaskData = request.body
  } catch (exception) {
    const message = "Can't get task by taskId"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function getTaskHistoryRequest(request, response) {
  try {
    const taskId = request.query.taskId
  } catch (exception) {
    const message = "Can't get task by taskId"
    response.status(500).json({message})
    logError(message, exception)
  }
}


module.exports = router