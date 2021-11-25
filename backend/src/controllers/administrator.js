const express = require("express")
const {sendDataBaseQuery} = require("./../dataBase");
const {getFarmByFarmId} = require("./farm")
const {getUserByUserId, formatUser} = require("./user");
const logError = require("../errorHandler")


const router = express.Router()
router.get("/byFarm", getAdministratorArrayRequest)
router.delete("/byFarm", deleteAllFarmAdministratorsRequest)


async function getAdministratorArrayRequest(request, response) {
  try {
    const farmId = request.query.farmId
    const administratorArray = await getAdministratorArray(farmId)
    const administratorArrayFormatted =
      await formatAdministratorArray(administratorArray)
    response.status(200).json(administratorArrayFormatted)
  } catch (exception) {
    const message = "Can't get administrator array"
    response.status(500).json({message})
    logError(message)
    logError(exception)
  }
}

async function deleteAllFarmAdministratorsRequest(request, response) {
  try {
    const farmId = request.query.farmId
    await deleteAllFarmAdministrators(farmId)
    response.status(200).json({message: "done"})
  } catch (exception) {
    const message = "Can't delete all farm administrators"
    response.status(500).json(message)
    logError(message)
    logError(exception)
  }
}


async function getAdministratorArray(farmId) {
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

async function deleteAllFarmAdministrators(farmId) {
  const farmAdministratorsIdArray = await getAdministratorsIdArray(farmId)
  for (let farmAdministratorId of farmAdministratorsIdArray) {
    await deleteFarmAdministrator(farmAdministratorId)
  }
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

async function deleteFarmAdministrator(farmAdministratorId) {
  const sqlCommand = `DELETE
                      FROM farm_administrator
                      WHERE farm_administrator_id = ${farmAdministratorId}`
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


module.exports = {
  router,
}