module.exports = {
  getAdministratorArray,
  getInviteArray,
  getAdministrator,
  getAdministratorByFarmAndUserId,
  getInvite,
  getInviteByFarmAndEmail,

  inviteAdministrator,
  createAdministrator,
  createAdministratorInvite,
  changeAdministrator,
  changeInvite,

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

async function getAdministrator(farmAdministratorId) {
  const sqlCommand = `SELECT *
                      FROM farm_administrator
                      WHERE farm_administrator_id LIKE
                            '${farmAdministratorId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}

async function getAdministratorByFarmAndUserId(userId, farmId) {
  const sqlCommand = `SELECT *
                      FROM farm_administrator
                      WHERE farm_id LIKE '${farmId}'
                        AND user_id = '${userId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}

async function getInvite(administratorInviteId) {
  const sqlCommand = `SELECT *
                      FROM administrator_invite
                      WHERE administrator_invite_id LIKE
                            '${administratorInviteId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}

async function getInviteByFarmAndEmail(email, farmId) {
  const sqlCommand = `SELECT *
                      FROM administrator_invite
                      WHERE farm_id LIKE '${farmId}'
                        AND email = '${email}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}


async function inviteAdministrator(invitorData) {
  const farm = await farmController.getFarmByFarmId(invitorData.farmId)
  if (!farm) {
    throw new Error(`No farm with id ${invitorData.farmId}`)
  }

  const candidate = await userController.getUserByEmail(invitorData.email)
  if (candidate) {
    if (candidate["user_id"] === farm["owner_id"]) {
      throw new Error(`User is an owner of this farm`)
    }

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
    await getInviteByFarmAndEmail(email, farmId)
  const invitedWorkerCandidate =
    await getInviteByFarmAndEmail(email, farmId)
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

async function changeAdministrator(administratorData) {
  const administratorId = administratorData.farmAdministratorId
  const candidate = getAdministrator(administratorId)
  if (!candidate) {
    throw new Error(`No farm administrator with id ${administratorId}`)
  }

  const managePoolsAccess =
    getIntByBoolean(administratorData.managePoolsAccess)
  const addAdministratorAccess =
    getIntByBoolean(administratorData.addAdministratorAccess)
  const deleteAdministratorAccess =
    getIntByBoolean(administratorData.deleteAdministratorAccess)
  const changeAccessesAccess =
    getIntByBoolean(administratorData.changeAccessesAccess)

  const sqlCommand =
    `UPDATE farm_administrator
     SET manage_pools_access         = '${managePoolsAccess}',
         add_administrator_access    = '${addAdministratorAccess}',
         delete_administrator_access = '${deleteAdministratorAccess}',
         change_accesses_access      = '${changeAccessesAccess}'
     WHERE farm_administrator_id = ${administratorId}`
  await sendDataBaseQuery(sqlCommand)

  return getAdministrator(administratorId)
}

async function changeInvite(inviteData) {
  const inviteId = inviteData.administratorInviteId
  const candidate = getInvite(inviteId)
  if (!candidate) {
    throw new Error(`No administrator invite with id ${inviteId}`)
  }

  const managePoolsAccess =
    getIntByBoolean(inviteData.managePoolsAccess)
  const addAdministratorAccess =
    getIntByBoolean(inviteData.addAdministratorAccess)
  const deleteAdministratorAccess =
    getIntByBoolean(inviteData.deleteAdministratorAccess)
  const changeAccessesAccess =
    getIntByBoolean(inviteData.changeAccessesAccess)

  const sqlCommand =
    `UPDATE administrator_invite
     SET manage_pools_access         = '${managePoolsAccess}',
         add_administrator_access    = '${addAdministratorAccess}',
         delete_administrator_access = '${deleteAdministratorAccess}',
         change_accesses_access      = '${changeAccessesAccess}'
     WHERE administrator_invite_id = ${inviteId}`
  await sendDataBaseQuery(sqlCommand)

  return getInvite(inviteId)
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


function getIntByBoolean(boolean) {
  return boolean ? 1 : 0
}


const {sendDataBaseQuery, createInsertSqlCommand} = require("./../dataBase")
const {sendInviteAdministratorMail} = require("../mailer")
const farmController = require("./farm")
const userController = require("./user")
const workerController = require("./worker")