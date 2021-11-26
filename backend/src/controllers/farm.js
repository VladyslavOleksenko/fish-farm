module.exports = {
  getFarmArrayByOwnerId,
  getFarmByFarmId,
  getFarmOwner,
  createFarm,
  deleteFarm,
  invite,
  addEmployee,
  inviteEmployee,
  formatFarmArray,
  formatFarm,
}


async function getFarmArrayByOwnerId(ownerId) {
  const sqlCommand = `SELECT *
                      FROM farm
                      WHERE owner_id LIKE '${ownerId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows
}

async function getFarmByFarmId(farmId) {
  const sqlCommand = `SELECT *
                      FROM farm
                      WHERE farm_id LIKE '${farmId}'`
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows[0]
}

async function getFarmOwner(farmId) {
  const farm = await getFarmByFarmId(farmId)
  if (!farm) {
    throw new Error(`No farm with id ${farmId}`)
  }

  const farmOwnerId = farm["owner_id"]
  const farmOwner = await userController.getUserByUserId(farmOwnerId)
  if (!farmOwner) {
    throw new Error(`No user with id ${farm["owner_id"]}`)
  }

  return farmOwner
}

async function createFarm(newFarmData) {
  const user = await userController.getUserByUserId(newFarmData.userId)
  if (!user) {
    throw new Error(`No user with id ${newFarmData.userId}`)
  }

  const tableName = "farm"
  const fieldNames = [
    "farm_id",
    "name",
    "description",
    "owner_id"
  ]
  const fieldValues = [
    null,
    newFarmData.name,
    newFarmData.description,
    newFarmData.userId
  ]

  const sqlCommand = createInsertSqlCommand(tableName, fieldNames, fieldValues)
  const dataBaseResponse = await sendDataBaseQuery(sqlCommand)
  return dataBaseResponse.rows.insertId
}

async function deleteFarm(farmId) {
  const farm = getFarmByFarmId(farmId)
  if (!farm) {
    throw new Error(`No farm with id ${farmId}`)
  }

  await administratorController.deleteAllFarmAdministrators(farmId)
  await workerController.deleteAllFarmWorkers(farmId)

  const sqlCommand = `DELETE
                      FROM farm
                      WHERE farm_id = ${farmId}`
  await sendDataBaseQuery(sqlCommand)
}

async function invite(invitorData) {
  const farm = getFarmByFarmId(invitorData.farmId)
  if (!farm) {
    throw new Error(`No farm with id ${invitorData.farmId}`)
  }

  const candidate = await userController.getUserByEmail(invitorData.email)
  if (candidate) {
    const userId = candidate["user_id"]
    return await addEmployee(userId, farm, invitorData)
  }

  return await inviteEmployee(farm, invitorData)
}

async function addEmployee(userId, farm, invitorData) {
  if (invitorData.category === "administrator") {
    await administratorController.addAdministrator(userId, invitorData)
    return "Administrator added"
  }
  if (invitorData.category === "worker") {
    await workerController.addWorker(userId, invitorData)
    return "Administrator added"
  }
}

async function inviteEmployee(farm, invitorData) {
  if (invitorData.category === "administrator") {
    return await administratorController.inviteAdministrator(farm, invitorData)
  }
  if (invitorData.category === "worker") {
    return await workerController.inviteWorker(farm, invitorData)
  }
}


function formatFarmArray(farmArray) {
  let farmArrayFormatted = []
  for (let farm of farmArray) {
    farmArrayFormatted.push(formatFarm(farm))
  }
  return farmArrayFormatted
}

function formatFarm(farm) {
  return {
    farmId: farm["farm_id"],
    name: farm.name,
    description: farm.description,
    ownerId: farm["owner_id"]
  }
}


const {createInsertSqlCommand, sendDataBaseQuery} = require("./../dataBase");
const userController = require("./user")
const administratorController = require("./administrator");
const workerController = require("./worker");