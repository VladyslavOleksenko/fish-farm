module.exports = {
  getTask,
  getTaskByFarm,
  getTaskByPool,
  getTaskArrayByWorker,

  createTask,
  getTaskHistory,

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
    `SELECT task.task_id,
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
     FROM farm_worker_task,
          task
     WHERE farm_worker_task.farm_worker_id = ${farmWorkerId}
       AND farm_worker_task.task_id = task.task_id`

  let dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows
}

async function createTask(newTaskData) {
  const farmWorkerId = newTaskData.farmWorkerId
  const farmWorker = await workerController.getWorker(farmWorkerId)
  if (!farmWorker) {
    throw new Error(`No farm worker with id ${newTaskData.farmWorkerId}`)
  }

  const insertTaskSqlCommand = await createInsertTaskSqlCommand(newTaskData)
  let dataBaseResponse = await sendDataBaseQuery(insertTaskSqlCommand)
  const newTaskId = dataBaseResponse.rows.insertId

  const insertFarmWorkerTaskSqlCommand =
    createInsertFarmWorkerTaskSqlCommand(farmWorkerId, newTaskId)
  dataBaseResponse = await sendDataBaseQuery(insertFarmWorkerTaskSqlCommand)
  return dataBaseResponse.rows.insertId


  async function createInsertTaskSqlCommand(newTaskData) {
    let poolId = newTaskData.poolId
    if (!poolId || !await poolController.getPoolByPoolId(poolId)) {
      poolId = 0
    }

    const title = newTaskData.title
    const description = newTaskData.description || "NULL"
    const createDate = new Date().toLocaleDateString()
    const createTime = new Date().toLocaleTimeString()

    const deadlineDate = newTaskData.deadlineDate || "NULL"
    let deadlineTime = "NULL"
    if (newTaskData.deadlineTime && deadlineDate !== "NULL") {
      deadlineTime = newTaskData.deadlineTime
    }

    const isRecurring = newTaskData.isRecurring ? 1 : 0
    const recurringPeriod = newTaskData.recurringPeriod || "NULL"
    const resultRequiredStatus = newTaskData.resultRequiredStatus ? 1 : 0

    return `INSERT
            INTO task (title,
                       description,
                       pool_id,
                       create_date,
                       create_time,
                       deadline_date,
                       deadline_time,
                       is_recurring,
                       recurring_period,
                       result_required_status)
            VALUES ('${title}',
                    '${description}',
                    '${poolId}',
                    '${createDate}',
                    '${createTime}',
                    '${deadlineDate}',
                    '${deadlineTime}',
                    '${isRecurring}',
                    '${recurringPeriod}',
                    '${resultRequiredStatus}')`
  }

  function createInsertFarmWorkerTaskSqlCommand(farmWorkerId, taskId) {
    return `INSERT
            INTO farm_worker_task (farm_worker_id,
                                   task_id)
            VALUES ('${farmWorkerId}',
                    '${taskId}')`
  }
}

async function getTaskHistory() {

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
    title: task.title,
    description: task.description,
    poolId: task.poolId,
    createDate: task["create_date"],
    createTime: task["create_time"],
    deadlineDate: task["deadline_date"],
    deadlineTime: task["deadline_time"],
    isRecurringStatus: task["is_recurring"],
    recurringPeriod: task["recurring_period"],
    resultRequiredStatus: task["result_required_status"]
  }
}


const workerController = require("./worker")
const poolController = require("./pool")
const {sendDataBaseQuery} = require("./../dataBase");