module.exports = {
  getWorkerArray,
  getWorkersIdArray,
  deleteAllFarmWorkers,
  deleteFarmWorker,
  addWorker,
  createWorkerInvite,
  checkInviteWorkerAvailability: checkInviteAvailability,
  formatWorkerArray,
  formatWorker,
  inviteWorker
}


async function getWorkerArray(farmId) {
  const farm = await farmController.getFarmByFarmId(farmId)
  if (!farm) {
    throw new Error(`No farm with id ${farmId}`)
  }

  const sqlCommand = `SELECT *
                      FROM farm_worker
                      WHERE farm_id LIKE '${farmId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows
}

async function getWorkersIdArray(farmId) {
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

async function deleteAllFarmWorkers(farmId) {
  const farmWorkersIdArray = await getWorkersIdArray(farmId)
  for (let farmWorkerId of farmWorkersIdArray) {
    await deleteFarmWorker(farmWorkerId)
  }
}

async function deleteFarmWorker(farmWorkerId) {
  const sqlCommand = `DELETE
                      FROM farm_worker
                      WHERE farm_worker_id = ${farmWorkerId}`
  await sendDataBaseQuery(sqlCommand)
}

async function addWorker(userId, invitorData) {
  const tableName = "farm_worker"
  const fieldNames = [
    "farm_worker_id",
    "farm_id",
    "user_id",
    "role_name"
  ]
  const fieldValues = [
    null,
    invitorData.farmId,
    userId,
    invitorData.roleName
  ]

  const sqlCommand = createInsertSqlCommand(tableName, fieldNames, fieldValues)
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows.insertId
}


async function inviteWorker(farm, invitorData) {
  const inviteAvailability =
    await checkInviteAvailability(invitorData.email, farm.farmId)
  if (!inviteAvailability) {
    throw new Error(`The worker already invited to farm ${farm.farmId}`)
  }

  await createWorkerInvite(invitorData)
  await sendInviteWorkerMail(invitorData.email, farm.name)
  return "worker invited"
}

async function createWorkerInvite(invitorData) {
  const tableName = "worker_invite"
  const fieldNames = [
    "worker_invite_id",
    "email",
    "farm_id",
    "role_name"
  ]
  const fieldValues = [
    null,
    invitorData.email,
    invitorData.farmId,
    invitorData.roleName
  ]

  const sqlCommand = createInsertSqlCommand(tableName, fieldNames, fieldValues)
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows.insertId
}

async function checkInviteAvailability(email, farmId) {
  const sqlCommand = `SELECT *
                      FROM worker_invite
                      WHERE email LIKE '${email}'
                        AND farm_id = ${farmId}`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return !dataBaseResponse.rows.length
}


async function formatWorkerArray(workerArray) {
  let newWorkerArray = []
  for (let worker of workerArray) {
    newWorkerArray.push(await formatWorker(worker))
  }
  return newWorkerArray
}

async function formatWorker(worker) {
  const userId = worker["user_id"]
  const dbUser = await userController.getUserByUserId(userId)
  const dbUserFormatted = userController.formatUser(dbUser)
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


const {sendDataBaseQuery, createInsertSqlCommand} = require("./../dataBase");
const {sendInviteWorkerMail} = require("../mailer");
const userController = require("./user")
const farmController = require("./farm");
