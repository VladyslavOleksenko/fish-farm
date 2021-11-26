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

  const farmOwner = await getUserByUserId(farm["owner_id"])
  if (!farmOwner) {
    throw new Error(`No user with id ${farm["owner_id"]}`)
  }

  return farmOwner
}

async function createFarm(newFarmData) {
  const user = await getUserByUserId(newFarmData.userId)
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

  await deleteAllFarmAdministrators(farmId)
  await deleteAllFarmWorkers(farmId)

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

  const candidate = await getUserByEmail(invitorData.email)
  if (candidate) {
    return await addEmployee(candidate, farm, invitorData)
  }

  return await inviteEmployee(farm, invitorData)
}

async function addEmployee(candidate, farm, invitorData) {
  if (invitorData.category === "administrator") {
    await addAdministrator(candidate["user_id"], invitorData)
    return "Administrator added"
  }
  if (invitorData.category === "worker") {
    await addWorker(candidate["user_id"], invitorData)
    return "Administrator added"
  }
}

async function inviteEmployee(farm, invitorData) {
  if (invitorData.category === "administrator") {
    return await inviteAdministrator(farm, invitorData)
  }
  if (invitorData.category === "worker") {
    return await inviteWorker(farm, invitorData)
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
const {getUserByUserId, getUserByEmail} = require("./user")
const {
  deleteAllFarmWorkers,
  addWorker,
  inviteWorker
} = require("./worker");
const {
  deleteAllFarmAdministrators,
  addAdministrator,
  inviteAdministrator
} = require("./administrator");
const {sendInviteAdministratorMail, sendInviteWorkerMail} = require("../mailer");