getAdministratorArray =
  module.exports.getAdministratorArray =
    async function (farmId) {
  const farm = await getFarmByFarmId(farmId)
  if (!farm) {
    throw new Error(`No farm with id ${farmId}`)
  }

  const sqlCommand = `SELECT *
                      FROM farm_administrator
                      WHERE farm_id LIKE '${farmId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows
}

getAdministratorsIdArray =
  module.exports.getAdministratorsIdArray =
    async function (farmId) {
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

deleteAllFarmAdministrators =
  module.exports.deleteAllFarmAdministrators =
    async function (farmId) {
  const farmAdministratorsIdArray = await getAdministratorsIdArray(farmId)
  for (let farmAdministratorId of farmAdministratorsIdArray) {
    await deleteFarmAdministrator(farmAdministratorId)
  }
}

deleteFarmAdministrator =
  module.exports.deleteFarmAdministrator =
    async function (farmAdministratorId) {
  const sqlCommand = `DELETE
                      FROM farm_administrator
                      WHERE farm_administrator_id = ${farmAdministratorId}`
  await sendDataBaseQuery(sqlCommand)
}

addAdministrator =
  module.exports.addAdministrator =
    async function (userId, invitorData) {
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

createAdministratorInvite =
  module.exports.createAdministratorInvite =
    async function (invitorData) {
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

checkInviteAdministratorAvailability =
  module.exports.checkInviteAdministratorAvailability =
    async (email, farmId) => {
  const sqlCommand = `SELECT *
                      FROM administrator_invite
                      WHERE email LIKE '${email}'
                        AND farm_id = ${farmId}`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return !dataBaseResponse.rows.length
}

inviteAdministrator =
  module.exports.inviteAdministrator =
    async function(farm, invitorData) {
      const inviteAdministratorAvailability =
        await checkInviteAdministratorAvailability(
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


const formatAdministratorArray = module.exports.formatAdministratorArray = async function (administratorArray) {
  let newAdministratorArray = []
  for (let administrator of administratorArray) {
    newAdministratorArray.push(await formatAdministrator(administrator))
  }
  return newAdministratorArray
}

const formatAdministrator = module.exports.formatAdministrator = async function (administrator) {
  const dbUser = await getUserByUserId(administrator["user_id"])
  const dbUserFormatted = formatUser(dbUser)
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
const {getFarmByFarmId} = require("./farm")
const {getUserByUserId, formatUser} = require("./user");
const {sendInviteAdministratorMail} = require("../mailer");