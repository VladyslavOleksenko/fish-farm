const getAdministratorArray = module.exports.getAdministratorArray = async function(farmId) {
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

const getAdministratorsIdArray = module.exports.getAdministratorsIdArray = async function(farmId) {
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

const deleteAllFarmAdministrators = module.exports.deleteAllFarmAdministrators = async function(farmId) {
  const farmAdministratorsIdArray = await getAdministratorsIdArray(farmId)
  for (let farmAdministratorId of farmAdministratorsIdArray) {
    await deleteFarmAdministrator(farmAdministratorId)
  }
}

const deleteFarmAdministrator = module.exports.deleteFarmAdministrator = async function(farmAdministratorId) {
  const sqlCommand = `DELETE
                      FROM farm_administrator
                      WHERE farm_administrator_id = ${farmAdministratorId}`
  await sendDataBaseQuery(sqlCommand)
}


const formatAdministratorArray = module.exports.formatAdministratorArray = async function(administratorArray) {
  let newAdministratorArray = []
  for (let administrator of administratorArray) {
    newAdministratorArray.push(await formatAdministrator(administrator))
  }
  return newAdministratorArray
}

const formatAdministrator = module.exports.formatAdministrator = async function(administrator) {
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


const {sendDataBaseQuery} = require("./../dataBase");
const {getFarmByFarmId} = require("./farm")
const {getUserByUserId, formatUser} = require("./user");