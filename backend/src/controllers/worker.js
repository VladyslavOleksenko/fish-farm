module.exports = {
  getWorkerArray,
  getInviteArray,
  getWorker,
  getWorkerByFarmAndUserId,
  getInvite,
  getInviteByFarmAndEmail,

  inviteWorker,
  createWorker,
  createWorkerInvite,
  changeWorker,
  changeInvite,

  deleteFarmWorker,
  deleteAllFarmWorkers,
  deleteInvite,
  deleteAllFarmInvites,

  formatWorkerArray,
  formatWorker,
  formatInviteArray,
  formatInvite
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

async function getInviteArray(farmId) {
  const sqlCommand = `SELECT *
                      FROM worker_invite
                      WHERE farm_id LIKE '${farmId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows
}

async function getWorker(farmWorkerId) {
  const sqlCommand = `SELECT *
                      FROM farm_worker
                      WHERE farm_worker_id LIKE
                            '${farmWorkerId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}

async function getWorkerByFarmAndUserId(userId, farmId) {
  const sqlCommand = `SELECT *
                      FROM farm_worker
                      WHERE farm_id LIKE '${farmId}'
                        AND user_id = '${userId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}

async function getInvite(workerInviteId) {
  const sqlCommand = `SELECT *
                      FROM worker_invite
                      WHERE worker_invite_id LIKE
                            '${workerInviteId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}

async function getInviteByFarmAndEmail(email, farmId) {
  const sqlCommand = `SELECT *
                      FROM worker_invite
                      WHERE farm_id LIKE '${farmId}'
                        AND email = '${email}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}


async function inviteWorker(invitorData) {
  const farm = await farmController.getFarmByFarmId(invitorData.farmId)
  if (!farm) {
    throw new Error(`No farm with id ${invitorData.farmId}`)
  }

  const candidate = await userController.getUserByEmail(invitorData.email)
  if (candidate) {
    if (candidate["user_id"] === farm["owner_id"]) {
      throw new Error(`User is an owner of this farm`)
    }

    await createWorker(candidate["user_id"], invitorData)
    return "Registered worker invited"
  }

  await createWorkerInvite(invitorData)
  await sendInviteWorkerMail(invitorData.email, farm.name)
  return "Unregistered worker invited"
}

async function createWorker(userId, invitorData) {
  const farmId = invitorData.farmId
  const administratorCandidate =
    await administratorController.getAdministratorByFarmAndUserId(userId, farmId)
  const workerCandidate =
    await getWorkerByFarmAndUserId(userId, invitorData.farmId)
  if (administratorCandidate || workerCandidate) {
    throw new Error(`User already works on this farm`)
  }

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

async function createWorkerInvite(invitorData) {
  const email = invitorData.email
  const farmId = invitorData.farmId
  const invitedAdministratorCandidate =
    await administratorController.getInviteByFarmAndEmail(email, farmId)
  const invitedWorkerCandidate =
    await getInviteByFarmAndEmail(email, farmId)

  if (invitedAdministratorCandidate || invitedWorkerCandidate) {
    throw new Error(`User already invited to this farm`)
  }

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

async function changeWorker(workerData) {
  const workerId = workerData.farmWorkerId
  const candidate = getWorker(workerId)
  if (!candidate) {
    throw new Error(`No farm worker with id ${workerId}`)
  }

  const sqlCommand =
    `UPDATE farm_worker
     SET role_name         = '${workerData.roleName}'
     WHERE farm_worker_id = ${workerId}`
  await sendDataBaseQuery(sqlCommand)

  return getWorker(workerId)
}

async function changeInvite(inviteData) {
  const inviteId = inviteData.workerInviteId
  const candidate = getInvite(inviteId)
  if (!candidate) {
    throw new Error(`No worker invite with id ${inviteId}`)
  }

  const sqlCommand =
    `UPDATE worker_invite
     SET role_name = '${inviteData.roleName}'
     WHERE worker_invite_id = ${inviteId}`
  await sendDataBaseQuery(sqlCommand)

  return getInvite(inviteId)
}


async function deleteFarmWorker(farmWorkerId) {
  const sqlCommand = `DELETE
                      FROM farm_worker
                      WHERE farm_worker_id = ${farmWorkerId}`
  await sendDataBaseQuery(sqlCommand)
}

async function deleteAllFarmWorkers(farmId) {
  const sqlCommand = `DELETE
                      FROM farm_worker
                      WHERE farm_id = ${farmId}`
  await sendDataBaseQuery(sqlCommand)
}

async function deleteInvite(workerInviteId) {
  const sqlCommand = `DELETE
                      FROM worker_invite
                      WHERE worker_invite_id = ${workerInviteId}`
  await sendDataBaseQuery(sqlCommand)
}

async function deleteAllFarmInvites(farmId) {
  const sqlCommand = `DELETE
                      FROM worker_invite
                      WHERE farm_id = ${farmId}`
  await sendDataBaseQuery(sqlCommand)
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

function formatInviteArray(inviteArray) {
  let newInviteArray = []
  for (let invite of inviteArray) {
    newInviteArray.push(formatInvite(invite))
  }
  return newInviteArray
}

function formatInvite(invite) {
  return {
    workerInviteId: invite["worker_invite_id"],
    email: invite.email,
    farmId: invite["farm_id"],
    roleName: invite["role_name"]
  }
}


const {sendDataBaseQuery, createInsertSqlCommand} = require("./../dataBase")
const {sendInviteWorkerMail} = require("../mailer")
const farmController = require("./farm")
const userController = require("./user")
const administratorController = require("./administrator")