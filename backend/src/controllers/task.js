module.exports = {
  getTask,
  getTaskByFarm,
  getTaskByPool,
  getTaskArrayByWorker,
  getTaskArrayByUser,
  getTaskHistory,

  createTask,
  setTaskResult,

  deleteTask,

  formatTaskArray,
  formatTask
}


async function getTask(taskId) {
  const sqlCommand = `SELECT *
                      FROM task
                      WHERE task_id LIKE '${taskId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}

async function getTaskByFarm() {

}

async function getTaskByPool() {

}

async function getTaskArrayByWorker(farmWorkerId) {
  const sqlCommand =
    `SELECT *
     FROM task
     WHERE task.farm_worker_id = ${farmWorkerId}`

  let dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows
}

async function getTaskArrayByUser(userId) {
  const candidate = userController.getUserByUserId(userId)
  if (!candidate) {
    throw new Error(`No user with id ${userId}`)
  }

  const sqlCommand =
    `SELECT task.task_id,
            task.farm_worker_id,
            task.title,
            task.description,
            task.pool_id,
            task.create_date,
            task.create_time,
            task.deadline_date,
            task.deadline_time,
            task.is_recurring,
            task.recurring_period,
            task.result_required_status
     FROM task,
          farm_worker
     WHERE task.farm_worker_id = farm_worker.farm_worker_id
       AND farm_worker.user_id = ${userId}`

  let dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows
}

async function getTaskHistory() {

}


async function createTask(newTaskData) {
  const farmWorkerId = newTaskData.farmWorkerId
  const farmWorker = await workerController.getWorker(farmWorkerId)
  if (!farmWorker) {
    throw new Error(`No farm worker with id ${newTaskData.farmWorkerId}`)
  }

  let poolId = newTaskData.poolId
  if (!poolId || !await poolController.getPoolByPoolId(poolId)) {
    poolId = 0
  }

  const title = newTaskData.title
  const description = newTaskData.description || "NULL"
  const createDate = dateController.getCurrentDateForDb()
  const createTime = dateController.getCurrentTimeForDb()

  const deadlineDate =
    dateController.prepareDateInputValueForDb(newTaskData.deadlineDate)
  let deadlineTime = "NULL"
  if (newTaskData.deadlineTime && deadlineDate !== "NULL") {
    deadlineTime = newTaskData.deadlineTime
  }

  const isRecurring = newTaskData.isRecurring ? 1 : 0
  const recurringPeriod = newTaskData.recurringPeriod || "NULL"
  const resultRequiredStatus = newTaskData.resultRequiredStatus ? 1 : 0

  const sqlCommand = `INSERT
                      INTO task (farm_worker_id,
                                 title,
                                 description,
                                 pool_id,
                                 create_date,
                                 create_time,
                                 deadline_date,
                                 deadline_time,
                                 is_recurring,
                                 recurring_period,
                                 result_required_status)
                      VALUES ('${farmWorkerId}',
                              '${title}',
                              '${description}',
                              '${poolId}',
                              '${createDate}',
                              '${createTime}',
                              '${deadlineDate}',
                              '${deadlineTime}',
                              '${isRecurring}',
                              '${recurringPeriod}',
                              '${resultRequiredStatus}')`

  let dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows.insertId
}

async function setTaskResult(taskId, result, doneStatus) {
  const task = await getTask(taskId)
  if (!task) {
    throw new Error(`No task with id ${taskId}`)
  }

  const currentDate = dateController.getCurrentDateForDb()
  const currentTime = dateController.getCurrentTimeForDb()

  const deadlineDate = parseInt(task["deadline_date"])
  const deadlineTime = task["deadline_time"]

  let inTime = 1
  if (currentDate > deadlineDate) {
    inTime = 0
  }
  if (currentDate === deadlineDate &&
    deadlineTime.toUpperCase() !== 'NULL' &&
    currentTime > deadlineTime) {
    inTime = 0
  }

  if (!doneStatus) {
    inTime = 2
  }

  const sqlCommand = `INSERT
                      INTO task_history (task_id,
                                         date,
                                         time,
                                         result,
                                         in_time)
                      VALUES ('${taskId}',
                              '${currentDate}',
                              '${currentTime}',
                              '${result}',
                              '${inTime}')`

  let dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows.insertId
}


async function deleteTask(taskId) {
  const task = await getTask(taskId)
  if (!task) {
    throw new Error(`No task with id ${taskId}`)
  }

  const sqlCommand = `DELETE
                      FROM task
                      WHERE task_id = ${taskId}`
  await sendDataBaseQuery(sqlCommand)
}


function formatTaskArray(taskArray) {
  let newTaskArray = []
  for (let task of taskArray) {
    newTaskArray.push(formatTask(task))
  }
  return newTaskArray
}

function formatTask(task) {
  return {
    taskId: task["task_id"],
    farmWorkerId: task["farm_worker_id"],
    title: task.title,
    description: task.description,
    poolId: task.poolId,
    createDate: task["create_date"],
    createTime: task["create_time"],
    deadlineDate: task["deadline_date"],
    deadlineTime: task["deadline_time"],
    isRecurringStatus: !!parseInt(task["is_recurring"]),
    recurringPeriod: task["recurring_period"],
    resultRequiredStatus: !!parseInt(task["result_required_status"])
  }
}


const workerController = require("./worker")
const userController = require("./user")
const poolController = require("./pool")
const {sendDataBaseQuery} = require("./../dataBase")
const dateController = require("./../date")