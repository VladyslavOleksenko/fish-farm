const getWorkerArray = module.exports.getWorkerArray = async function(farmId) {
  const farm = await getFarmByFarmId(farmId)
  if (!farm) {
    throw new Error(`No farm with id ${farmId}`)
  }

  const sqlCommand = `SELECT *
                      FROM farm_worker
                      WHERE farm_id LIKE '${farmId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows
}

const getWorkersIdArray = module.exports.getWorkersIdArray = async function(farmId) {
  const workerArray = await getWorkerArray(farmId)
  if (!workerArray) {
    throw new Error(`Can't get worker array ${farmId}`)
  }

  let workersIdArray = []
  for (let worker of workerArray) {
    workersIdArray.push(worker["farm_worker_id"])
  }
  return workersIdArray
}

const deleteAllFarmWorkers = module.exports.deleteAllFarmWorkers = async function(farmId) {
  const farmWorkersIdArray = await getWorkersIdArray(farmId)
  for (let farmWorkerId of farmWorkersIdArray) {
    await deleteFarmWorker(farmWorkerId)
  }
}

const deleteFarmWorker = module.exports.deleteFarmWorker = async function(farmWorkerId) {
  const sqlCommand = `DELETE
                      FROM farm_worker
                      WHERE farm_worker_id = ${farmWorkerId}`
  await sendDataBaseQuery(sqlCommand)
}


const formatWorkerArray = module.exports.formatWorkerArray = async function(workerArray) {
  let newWorkerArray = []
  for (let worker of workerArray) {
    newWorkerArray.push(await formatWorker(worker))
  }
  return newWorkerArray
}

const formatWorker = module.exports.formatWorker = async function(worker) {
  const dbUser = await getUserByUserId(worker["user_id"])
  const dbUserFormatted = formatUser(dbUser)
  return {
    farmWorkerId: worker["farm_worker_id"],
    farmId: worker["farm_id"],
    roleName: worker["role_name"],
    userId: worker["user_id"],
    firstName: dbUserFormatted.firstName,
    lastName: dbUserFormatted.lastName,
    email: dbUserFormatted.email
  }
}


const {sendDataBaseQuery} = require("./../dataBase");
const {getUserByUserId, formatUser} = require("./user")
const {getFarmByFarmId} = require("./farm");