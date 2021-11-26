module.exports = {
  getAdministratorArray,
  getInviteArray,
  getAdministratorByFarmAndUserId,
  getAdministratorInviteByFarmAndEmail,

  inviteAdministrator,
  createAdministrator,
  createAdministratorInvite,

  deleteFarmAdministrator,
  deleteAllFarmAdministrators,
  deleteInvite,
  deleteAllFarmInvites,

  formatAdministratorArray,
  formatAdministrator,
  formatInviteArray,
  formatInvite
}


async function getAdministratorArray(farmId) {
  const sqlCommand = `SELECT *
                      FROM farm_administrator
                      WHERE farm_id LIKE '${farmId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows
}

async function getInviteArray(farmId) {
  const sqlCommand = `SELECT *
                      FROM administrator_invite
                      WHERE farm_id LIKE '${farmId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows
}

async function getAdministratorByFarmAndUserId(userId, farmId) {
  const sqlCommand = `SELECT *
                      FROM farm_administrator
                      WHERE farm_id LIKE '${farmId}'
                        AND user_id = '${userId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}

async function getAdministratorInviteByFarmAndEmail(email, farmId) {
  const sqlCommand = `SELECT *
                      FROM administrator_invite
                      WHERE farm_id LIKE '${farmId}'
                        AND email = '${email}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}


async function inviteAdministrator(invitorData) {
  const farm = farmController.getFarmByFarmId(invitorData.farmId)
  if (!farm) {
    throw new Error(`No farm with id ${invitorData.farmId}`)
  }

  const candidate = await userController.getUserByEmail(invitorData.email)
  if (candidate) {
    await createAdministrator(candidate["user_id"], invitorData)
    return "Registered administrator invited"
  }

  await createAdministratorInvite(invitorData)
  await sendInviteAdministratorMail(invitorData.email, farm.name)
  return "Unregistered administrator invited"
}

async function createAdministrator(userId, invitorData) {
  const farmId = invitorData.farmId
  const administratorCandidate =
    await getAdministratorByFarmAndUserId(userId, farmId)
  const workerCandidate =
    await workerController.getWorkerByFarmAndUserId(userId, farmId)
  if (administratorCandidate || workerCandidate) {
    throw new Error(`User already works on this farm`)
  }

  const tableName = "farm_administrator"
  const fieldNames = [
    "farm_administrator_id",
    "farm_id",
    "user_id",
    "add_administrator_access",
    "delete_administrator_access",
    "manage_pools_access",
    "change_accesses_access"
  ]
  const fieldValues = [
    null,
    invitorData.farmId,
    userId,
    invitorData.addAdministratorAccess,
    invitorData.deleteAdministratorAccess,
    invitorData.managePoolsAccess,
    invitorData.changeAccessesAccess
  ]

  const sqlCommand = createInsertSqlCommand(tableName, fieldNames, fieldValues)
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows.insertId
}

async function createAdministratorInvite(invitorData) {
  const email = invitorData.email
  const farmId = invitorData.farmId
  const invitedAdministratorCandidate =
    await getAdministratorInviteByFarmAndEmail(email, farmId)
  const invitedWorkerCandidate =
    await getWorkerInviteByFarmAndEmail(email, farmId)
  if (invitedAdministratorCandidate || invitedWorkerCandidate) {
    throw new Error(`User already invited to this farm`)
  }

  const tableName = "administrator_invite"
  const fieldNames = [
    "administrator_invite_id",
    "email",
    "farm_id",
    "add_administrator_access",
    "delete_administrator_access",
    "manage_pools_access",
    "change_accesses_access"
  ]
  const fieldValues = [
    null,
    invitorData.email,
    invitorData.farmId,
    invitorData.addAdministratorAccess,
    invitorData.deleteAdministratorAccess,
    invitorData.managePoolsAccess,
    invitorData.changeAccessesAccess
  ]

  const sqlCommand = createInsertSqlCommand(tableName, fieldNames, fieldValues)
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows.insertId
}


async function deleteFarmAdministrator(farmAdministratorId) {
  const sqlCommand = `DELETE
                      FROM farm_administrator
                      WHERE farm_administrator_id = ${farmAdministratorId}`
  await sendDataBaseQuery(sqlCommand)
}

async function deleteAllFarmAdministrators(farmId) {
  const sqlCommand = `DELETE
                      FROM farm_administrator
                      WHERE farm_id = ${farmId}`
  await sendDataBaseQuery(sqlCommand)
}

async function deleteInvite(administratorInviteId) {
  const sqlCommand = `DELETE
                      FROM administrator_invite
                      WHERE administrator_invite_id = ${administratorInviteId}`
  await sendDataBaseQuery(sqlCommand)
}

async function deleteAllFarmInvites(farmId) {
  const sqlCommand = `DELETE
                      FROM administrator_invite
                      WHERE farm_id = ${farmId}`
  await sendDataBaseQuery(sqlCommand)
}


async function formatAdministratorArray(administratorArray) {
  let newAdministratorArray = []
  for (let administrator of administratorArray) {
    newAdministratorArray.push(await formatAdministrator(administrator))
  }
  return newAdministratorArray
}

async function formatAdministrator(administrator) {
  const userId = administrator["user_id"]
  const dbUser = await userController.getUserByUserId(userId)
  const dbUserFormatted = userController.formatUser(dbUser)
  return {
    farmAdministratorId: administrator["farm_administrator_id"],
    farmId: administrator["farm_id"],
    addAdministratorAccess: !!administrator["add_administrator_access"],
    deleteAdministratorAccess: !!administrator["delete_administrator_access"],
    managePoolsAccess: !!administrator["manage_pools_access"],
    changeAccessesAccess: !!administrator["change_accesses_access"],
    userId: administrator["user_id"],
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
    administratorInviteId: invite["administrator_invite_id"],
    farmId: invite["farm_id"],
    email: invite.email,
    addAdministratorAccess: !!invite["add_administrator_access"],
    deleteAdministratorAccess: !!invite["delete_administrator_access"],
    managePoolsAccess: !!invite["manage_pools_access"],
    changeAccessesAccess: !!invite["change_accesses_access"]
  }
}


const {sendDataBaseQuery, createInsertSqlCommand} = require("./../dataBase")
const {sendInviteAdministratorMail} = require("../mailer")
const farmController = require("./farm")
const userController = require("./user")
const workerController = require("./worker")
const {getWorkerInviteByFarmAndEmail} = require("./worker");