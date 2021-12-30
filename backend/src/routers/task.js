const express = require("express")
const taskController = require("../controllers/task")
const logError = require("../errorHandler")

const router = express.Router()
router.delete("/", deleteTaskRequest)
router.get("/byFarmWorker", getTaskArrayByFarmWorkerRequest)
router.get("/byUserId", getTaskArrayByUserIdRequest)
router.post("/", createTaskRequest)
router.get("/history", getTaskHistoryRequest)
router.post("/done", setTaskResultRequest)
router.get("/statistic/task", getStatisticByTaskRequest)
router.get("/statistic/worker", getStatisticByWorkerRequest)
router.get("/statistic/pool", getStatisticByPoolRequest)


async function deleteTaskRequest(request, response) {
  try {
    const taskId = request.query.taskId
    await taskController.deleteTask(taskId)
    response.json({message: "task deleted"})
  } catch (exception) {
    const message = "Can't delete task by task id"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function getTaskArrayByFarmWorkerRequest(request, response) {
  try {
    const farmWorkerId = request.query.farmWorkerId
    const taskArray = await taskController.getTaskArrayByWorker(farmWorkerId)
    const taskArrayFormatted = await taskController.formatTaskArray(taskArray)
    response.status(200).json(taskArrayFormatted)
  } catch (exception) {
    const message = "Can't get task by farm worker id"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function getTaskArrayByUserIdRequest(request, response) {
  try {
    const userId = request.query.userId
    const taskArray = await taskController.getTaskArrayByUser(userId)
    const taskArrayFormatted = await taskController.formatTaskArray(taskArray)
    response.status(200).json(taskArrayFormatted)
  } catch (exception) {
    const message = "Can't get task array by user id"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function createTaskRequest(request, response) {
  try {
    const newTaskData = request.body
    const result = await taskController.createTask(newTaskData)
    response.status(200).json(result)
  } catch (exception) {
    const message = "Can't get task by taskId"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function getTaskHistoryRequest(request, response) {
  try {
    const taskId = request.query.taskId
    const taskHistoryArray = await taskController.getTaskHistory(taskId)
    const taskHistoryArrayFormatted =
      taskController.formatTaskHistoryArray(taskHistoryArray)
    response.status(200).json(taskHistoryArrayFormatted)
  } catch (exception) {
    const message = "Can't get task history by taskId"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function setTaskResultRequest(request, response) {
  try {
    const taskId = request.query.taskId
    const result = request.body.result
    const doneStatus = request.body.doneStatus
    const taskHistoryId =
      await taskController.setTaskResult(taskId, result, doneStatus)
    response.status(200).json(taskHistoryId)
  } catch (exception) {
    const message = "Can't set task result"
    response.status(500).json({message})
    logError(message, exception)
  }
}


async function getStatisticByTaskRequest(request, response) {
  try {
    const taskId = request.query.taskId
    const statistic = await taskController.getStatisticByTask(taskId)
    response.status(200).json(statistic)
  } catch (exception) {
    const message = "Can't set task to done"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function getStatisticByWorkerRequest(request, response) {
  try {
    const farmWorkerId = request.query.farmWorkerId
    const statistic = await taskController.getStatisticByWorker(farmWorkerId)
    response.status(200).json(statistic)
  } catch (exception) {
    const message = "Can't set task to done"
    response.status(500).json({message})
    logError(message, exception)
  }
}

async function getStatisticByPoolRequest(request, response) {
  try {
    const farmWorkerId = request.query.taskId

    response.status(200).json("ok")
  } catch (exception) {
    const message = "Can't set task to done"
    response.status(500).json({message})
    logError(message, exception)
  }
}


module.exports = router