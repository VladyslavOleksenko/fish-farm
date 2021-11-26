module.exports = {
  getAdministratorArray,
  getAdministratorsIdArray,
  deleteAllFarmAdministrators,
  deleteFarmAdministrator,
  addAdministrator,
  createAdministratorInvite,
  checkInviteAvailability,
  inviteAdministrator,
  formatAdministratorArray,
  formatAdministrator
}


async function getAdministratorArray(farmId) {
  const farm = await farmController.getFarmByFarmId(farmId)
  if (!farm) {
    throw new Error(`No farm with id ${farmId}`)
  }

  const sqlCommand = `SELECT *
                      FROM farm_administrator
                      WHERE farm_id LIKE '${farmId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows
}

async function getAdministratorsIdArray(farmId) {
  const administratorArray = await getAdministratorArray(farmId)
  if (!administratorArray) {
    throw new Error(`Can't get administrator array ${farmId}`)
  }

  let administratorsIdArray = []
  for (let administrator of administratorArray) {
    administratorsIdArray.push(administrator["farm_administrator_id"])
  }
  return administratorsIdArray
}

async function deleteAllFarmAdministrators(farmId) {
  const farmAdministratorsIdArray = await getAdministratorsIdArray(farmId)
  for (let farmAdministratorId of farmAdministratorsIdArray) {
    await deleteFarmAdministrator(farmAdministratorId)
  }
}

async function deleteFarmAdministrator(farmAdministratorId) {
  const sqlCommand = `DELETE
                      FROM farm_administrator
                      WHERE farm_administrator_id = ${farmAdministratorId}`
  await sendDataBaseQuery(sqlCommand)
}

async function addAdministrator(userId, invitorData) {
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

async function checkInviteAvailability(email, farmId) {
  const sqlCommand = `SELECT *
                      FROM administrator_invite
                      WHERE email LIKE '${email}'
                        AND farm_id = ${farmId}`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return !dataBaseResponse.rows.length
}

async function inviteAdministrator(farm, invitorData) {
  const inviteAdministratorAvailability =
    await checkInviteAvailability(
      invitorData.email, invitorData.farmId)
  if (!inviteAdministratorAvailability) {
    const errorMessage = "The administrator already invited to farm " +
      invitorData.farmId
    throw new Error(errorMessage)
  }

  await createAdministratorInvite(invitorData)
  await sendInviteAdministratorMail(invitorData.email, farm.name)
  return "administrator invited"
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


const {sendDataBaseQuery, createInsertSqlCommand} = require("./../dataBase");
const {sendInviteAdministratorMail} = require("../mailer");
const farmController = require("./farm")
const userController = require("./user");