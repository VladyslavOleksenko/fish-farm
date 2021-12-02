module.exports = {
  getTask,
  getTaskByFarm,
  getTaskByPool,
  getTaskByWorker,
  createTask,
  getTaskHistory
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

async function getTaskByWorker() {

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


const workerController = require("./worker")
const poolController = require("./pool")
const {sendDataBaseQuery} = require("./../dataBase");